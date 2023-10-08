import { create } from "zustand";
import { persist } from "zustand/middleware";

const localStorageItemName = "user";

export const useUserStore = create(
	persist(
		(set, get) => ({
			token: null,
			setToken: token => set({ token }),
			info: null,
			setUser: userInfo => set({ info: userInfo })
		}),
		{ name: localStorageItemName }
	)
)
