import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEditorStore = ((set) => ({
  currentUserInput: "",
  inputHistory: [],
  setCurrentUserInput: (input) => set({ currentUserInput: input }),
  setInputHistory: () =>
    set((state) => ({
      inputHistory: [{
        text: state.currentUserInput,
        timeStamp: new Date(),
        id: crypto.randomUUID(),
      }, ...state.inputHistory],
      currentUserInput: "",
    })),
  clearHistory: () => set({ inputHistory: [] }),
}));
