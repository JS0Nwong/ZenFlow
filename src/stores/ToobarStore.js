import { create } from "zustand";

export const useToolbarStore = ((set) => ({
    toggleBlur: false,
    toggleZen: false,
    toggleSearch: false,
    setToggleBlur: (toggle) => set({ toggleBlur: toggle }),
    setToggleZen: (toggle) => set({ toggleZen: toggle }),
    setToggleSearch: (toggle) => set({ toggleSearch: toggle }),
}));
