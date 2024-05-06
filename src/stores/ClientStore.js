export const useClientStore = (set) => ({
  hasOnboarded: false,
  theme: "dark",
  setHasOnboarded: (bool) => set({ hasOnboarded: bool }),
  setToggleTheme: () => {
    if (
      localStorage.getItem("client-theme") === "dark" ||
      (!("client-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // has client theme set in local storage
    if (localStorage.getItem("client-theme")) {
      if (localStorage.getItem("client-theme") === "dark") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("client-theme", "light");
        set({ theme: "light" });
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("client-theme", "dark");
        set({ theme: "dark" });
      }
      // no client theme in local storage found
    } else {
      console.log("no theme found");
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("client-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("client-theme", "dark");
      }
    }
  },
});
