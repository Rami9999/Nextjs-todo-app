"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { title } from "process";
const prisma = new PrismaClient()

export const getTodoListAction = async () => {
    return await prisma.todo.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
};
export const getTodoByIdAction = async(id:string) => {
    //return await prisma.todo.find(id)
};
export const createTodoAction = async ({title,body,completed}:{title:string,body?:string | undefined,completed:boolean}) => {
    await prisma.todo.create({

        data:{
            title,
            body,
            completed
        }
    });
    revalidatePath("/");
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async (id:string) => {
    await prisma.todo.delete({
        where:{
            id:id
        }
    })

    revalidatePath("/");
};