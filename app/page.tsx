import { getTodoListAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const {userId} = auth();
  const todos = userId?  await getTodoListAction({userId}):[];

  return (
    <main className="container">
      <AddTodoForm userId={userId} />
      <TodoTable todos={todos}/>
    </main>
  );
}
