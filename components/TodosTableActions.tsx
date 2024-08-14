"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Pen, Trash } from 'lucide-react'
import Spinner from './Spinner'
import { deleteTodoAction } from '@/actions/todo.actions'

const TodosTableActions = ({id}:{id:string}) => {
    const [isLoading,setIsLoading] = useState(false)

  return (
    <>
        <Button size={"icon"}>
            <Pen size={16}/>
        </Button>
        <Button size={"icon"} variant={"destructive"} onClick={async ()=>{
            setIsLoading(true);
            await deleteTodoAction(id);
            setIsLoading(false);
        }}>
            {isLoading ? <Spinner />:<Trash  size={16} />}
        </Button>
    </>
  )
}

export default TodosTableActions