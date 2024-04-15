import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useClientStore = ((set) => ({
    theme: "light",
}));