import { create } from "zustand";
import type { CounterStore } from "./counter.types";

export const useCounterStore = create<CounterStore>((set) => ({
  // STATE
  count: 0,

  // ACTIONS
  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - 1,
    })),

  reset: () =>
    set({ count: 0 }),
}));
