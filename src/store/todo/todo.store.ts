import { create } from "zustand";
import * as z from "zod"
import type { TodoStore } from "./todo.types";
import { nanoid } from "nanoid";


const todoInput = z.string().trim().min(2)
export const useTodoStore = create<TodoStore>((set) => ({
  works: [],
  error: null,

  addWork: (title) => {

    const result = todoInput.safeParse(title);
    if (!result.success) {
      set({ error: result.error.issues[0].message });
      alert("No spaces allowed");
      return;
    }

    set((state) => ({
      works: [
        ...state.works,
        {
          id: nanoid(),
          work: (result.data).trim(),
          completed: false,
        },
      ],
      error: null,
    }));
  },

  completeWork: (id) =>
    set((state) => ({
      works: state.works.map((work) =>
        work.id === id
          ? { ...work, completed: !work.completed }
          : work
      ),
    })),

  deleteWork: (id) =>
    set((state) => ({
      works: state.works.filter((todo) => todo.id !== id),
    })),

  clearError: () => set({ error: null }),
}));
