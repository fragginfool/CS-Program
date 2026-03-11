"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: { order: "asc" }
  })
  return tasks
}

export async function addTask(title: string, priority: string, dueDateStr?: string) {
  const count = await prisma.task.count()
  await prisma.task.create({
    data: {
      title,
      status: "todo",
      priority,
      dueDate: dueDateStr ? new Date(dueDateStr) : null,
      order: count // append to end
    }
  })
  revalidatePath("/")
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === "done" ? "todo" : "done"

  // If we are completing the task, log it as a journal post
  if (newStatus === "done") {
    const task = await prisma.task.findUnique({ where: { id } })
    if (task) {
      await prisma.post.create({
        data: {
          author: "User",
          content: `Completed task: ${task.title}`
        }
      })
    }
  }

  await prisma.task.update({
    where: { id },
    data: { status: newStatus }
  })

  revalidatePath("/")
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id }
  })
  revalidatePath("/")
}

export async function updateTaskOrder(items: { id: string, order: number }[]) {
  // Use transaction to update all orders safely
  const updatePromises = items.map(item =>
    prisma.task.update({
      where: { id: item.id },
      data: { order: item.order }
    })
  )

  await prisma.$transaction(updatePromises)
  revalidatePath("/")
}
