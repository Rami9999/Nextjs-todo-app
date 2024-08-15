"use server";

import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { title } from "process";
const prisma = new PrismaClient()

export const getTodoListAction = async ({userId}:{userId:string|null}) => {
    return await prisma.todo.findMany({
        where:{
            user_id:userId as string
        },
        orderBy:{
            createdAt:"desc"
        }
    })
};
export const getTodoByIdAction = async(id:string) => {

    return await prisma.todo.findFirst({where:{id:id}});
};
export const createTodoAction = async ({title,body,completed,userId}:{title:string,body?:string | undefined,completed:boolean,userId:string|null}) => {
    await prisma.todo.create({

        data:{
            title,
            body,
            completed,
            user_id:userId as string
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