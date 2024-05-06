import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useEditorStore } from "./EditorStore";
import { useToolbarStore } from "./ToobarStore";
import { useClientStore } from "./ClientStore";

export const useBoundStore = create(
  persist(
    (...args) => ({
      ...useEditorStore(...args),
      ...useToolbarStore(...args),
      ...useClientStore(...args),
    }),
    {
      name: "bound-store",
      partialize: (state) => ({
        theme: state.theme,
        hasOnboarded: state.hasOnboarded,
        formattedThoughts: state.formattedThoughts,
      }),
    },
  )
);
