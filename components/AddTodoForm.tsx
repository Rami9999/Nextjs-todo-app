"use client";

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { todoFormSchema, TodoFormValues } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodoAction } from '@/actions/todo.actions';
import { Checkbox } from "@/components/ui/checkbox"
import Spinner from './Spinner';
const AddTodoForm = ({userId}:{userId:string | null}) => {

    const [isLoading,setIsLoading] = useState(false)
    const [isOpen,setIsOpen] = useState(false)

  // This can come from your database or API.
  const defaultValues: Partial<TodoFormValues> = {
    title: "",
    body:"",
    completed:false
  }

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = async (data:TodoFormValues) => {
    const {title,body,completed} = data;
    console.log(data)
    await createTodoAction({
        title,
        body,
        completed,
        userId
    });
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild className="mx-auto">
      <Button>
        <Plus size={14} className="mr-1" />
        New Todo
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Todo</DialogTitle>
      </DialogHeader>
      <div className="py-4">
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Interduce your self" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Short description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    
                    name="completed"
                    render={({ field }) => (
                    <FormItem>
                    <div className='flex items-center space-x-1'>
                        <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="completed" {...field} />
                        </FormControl>
                        <FormLabel className='cursor-pointer'>Completed</FormLabel>
                    </div>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
                />

                
                <Button type="submit" disabled={isLoading}>
                    {
                        isLoading? <Spinner />:"Add"
                    }</Button>
            </form>
        </Form>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default AddTodoForm