import { createContext, useContext, useReducer } from "react";

const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        case 'ERROR':
            return action.payload;
        default:
            return state;
    }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUserDispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={[user, setUserDispatch]}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext);
    return userAndDispatch[0];
};

export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext);
    return userAndDispatch[1];
};

export default UserContext;
