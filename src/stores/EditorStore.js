const today = new Date();

export const useEditorStore = (set, get) => ({
  currentUserInput: "",
  thoughts: { Today: [] },
  formattedThoughts: { Today: [] },
  setCurrentUserInput: (input) => set({ currentUserInput: input }),
  setInputHistory: (height) => {
    if (!get().currentUserInput.trim()) return;
    set((state) => ({
      // Add the new entry to the thoughts object if it's the same day
      currentUserInput: "",
      formattedThoughts: {
        ...state.formattedThoughts,
        Today: [
          {
            text: state.currentUserInput,
            timeStamp: today.toISOString(),
            id: crypto.randomUUID(),
            readOnly: false,
            height: height,
          },
          ...state.formattedThoughts["Today"],
        ],
      },
    }));
  },
  clearHistory: () => set({ formattedThoughts: { Today: [] } }),
  setReadOnly: (id) => {
    set((state) => {
      const updatedThoughts = state.formattedThoughts["Today"].map((entry) => {
        if (entry.id === id) {
          entry.readOnly = true;
        }
        return entry;
      });
      return {
        formattedThoughts: {
          Today: updatedThoughts,
          ...state.formattedThoughts,
        },
      };
    });
  },
  editText: (text, id) => {
    set((state) => {
      const updatedThoughts = state.formattedThoughts["Today"].map((entry) => {
        if (entry.id === id) {
          entry.text = text;
        }
        return entry;
      });
      return {
        formattedThoughts: {
          Today: updatedThoughts,
          ...state.formattedThoughts,
        },
      };
    });
  },
  deleteEntry: (id) => {
    set((state) => {
      const updatedThoughts = state.formattedThoughts["Today"].filter(
        (entry) => entry.id !== id
      );
      console.log(updatedThoughts);
      return {
        formattedThoughts: {
          ...state.formattedThoughts,
          Today: updatedThoughts,
        },
      };
    });
  },
  formatHistory: (thoughts) =>
    set((state) => {
      return {
        formattedThoughts: { Today: [], ...thoughts },
      };
    }),
});
