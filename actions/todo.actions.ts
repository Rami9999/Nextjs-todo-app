"use server";

import { ITodo } from "@/interfaces";
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

    const todo = await prisma.todo.findFirst({where:{id:id}});
    return todo;
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
export const updateTodoAction = async (todo:ITodo) => {
    await prisma.todo.update({
        where:{
            id:todo.id
        },
        data:{
            title:todo.title,
            body:todo.body,
            completed:todo.completed
        }
    });
    revalidatePath("/");
};
export const deleteTodoAction = async (id:string) => {
    await prisma.todo.delete({
        where:{
            id:id
        }
    })

    revalidatePath("/");
};