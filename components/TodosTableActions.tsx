"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Pen, Trash } from 'lucide-react'
import Spinner from './Spinner'
import { deleteTodoAction } from '@/actions/todo.actions'
import EditTodoForm from './EditTodoForm';
import { ITodo } from '@/interfaces';

const TodosTableActions = ({todo}:{todo:ITodo}) => {
    const [isLoading,setIsLoading] = useState(false)

  return (
    <>

        <EditTodoForm todo={todo}/>
        <Button size={"icon"} variant={"destructive"} onClick={async ()=>{
            setIsLoading(true);
            await deleteTodoAction(todo.id as string);
            setIsLoading(false);
        }}>
            {isLoading ? <Spinner />:<Trash  size={16} />}
        </Button>
    </>
  )
}

export default TodosTableActions