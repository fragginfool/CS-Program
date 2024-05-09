#!/usr/bin/python3
nameHandle = open('fileName','w')

for i in range(2):
    name = input('Enter Name: ')
    nameHandle.write(name + '\n')

nameHandle.close()

