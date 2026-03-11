"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  })
  return posts
}

export async function addPost(author: string, content: string, imageUrl?: string) {
  await prisma.post.create({
    data: {
      author,
      content,
      imageUrl: imageUrl || null
    }
  })
  revalidatePath("/")
}
