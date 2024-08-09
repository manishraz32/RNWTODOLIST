import { createContext, useContext, useState } from "react";

export const ResetTaksContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTasksContext = () => {  // by this line we will get the auth value
	return useContext(ResetTaksContext);
};

export const ResetTaksContextProvider = ({ children }) => {
	const [taskStatus, setTaskStatus] = useState();

	return <ResetTaksContext.Provider value={{ taskStatus, setTaskStatus }}>
            {children}
        </ResetTaksContext.Provider>;
};