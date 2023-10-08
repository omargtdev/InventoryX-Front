import { useUserStore } from "../store/useUserStore"

export const useIsUserLoggedIn = () => {
	const token = useUserStore(state => state.token);
	return Boolean(token);
}
