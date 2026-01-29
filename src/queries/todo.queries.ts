import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKey } from "./querykey";
import { useTodoStore } from "@/store/todo/todo.store";
import { CreateTodoSchema } from "@/store/todo/todoSchema";

import type { CreateTodoInput, TodoStatus } from "@/store/todo/todo.types";


export function useTodoQuery() {
  const todos = useTodoStore((state) => state.todos);

  return useQuery({
    queryKey: queryKey.all,
    queryFn: async () => todos,
    initialData: todos,
  });
}



export function useCreateTodo() {
  const addTodo = useTodoStore((s) => s.addTodo);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const  data =  CreateTodoSchema.parse(input);
      addTodo(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}



export function useUpdateTodoStatus() {
  const updateStatus = useTodoStore((s) => s.updateTodoStatus);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: TodoStatus;
    }) => {
      updateStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}



export function useDelete()
{
    const deleteTodo = useTodoStore(s=>s.deleteTodo);
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: async(id:string)=>{deleteTodo(id)}, onSuccess: ()=>{queryClient.invalidateQueries({queryKey:queryKey.all})}
        })
    )
}