export const useToolbarStore = ((set) => ({
    toggleBlur: false,
    toggleZen: false,
    toggleSearch: false,
    setToggleZen: (toggle) => set({ toggleZen: toggle }),
    setToggleSearch: (toggle) => set({ toggleSearch: toggle }),
    setToggleBlur: (toggle) => set({ toggleBlur: toggle })
}));
