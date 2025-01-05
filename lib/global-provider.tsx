import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from './appwrite'


interface GlobalContextType {
	isLoggedIn: boolean;
	user: User | null;
	loading: boolean;
	refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

interface User {
	$id: string;
	name: string;
	email: string;
	avatar: string
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

	const {
		data: user,
		loading,
		refetch
	} = useAppwrite({
		fn: getCurrentUser,
	});

	const isLoggedIn = !!user;


	return (
		<GlobalContext.Provider value={{
			isLoggedIn,
			user,
			loading,
			refetch,
		}}>

			{children}

		</GlobalContext.Provider>
	)
}

export const useGlobalContext = (): GlobalContextType => {
	const context = useContext(GlobalContext);

	if(!context) {
		throw new Error('useGlobalContext must be user within a GlobalProvider')
	}

	return context;
}

export default GlobalProvider;