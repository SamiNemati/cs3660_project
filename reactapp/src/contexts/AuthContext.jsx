import {createContext, useState} from 'react';
import {storeUser, readUser, clearUser} from "../assets/auth";

export const AuthContext = createContext();

export function AuthProvider({children})
{
    const [user, setUser] = useState(readUser());
    const updateAuth = ()=> setUser(readUser());
    const login = (response) => {
        if(response == "err_login_failed")
        {
            alert("Username and Password do not match!");
            return null;
        }
        try{var user = JSON.parse(response);}
        catch {alert("Unexpected Error"); return;}
        storeUser(user);
        alert(`Welcome, ${user.firstname}!`);
        updateAuth();
        return user;
    }
    const logout = () => {clearUser(); updateAuth();}
    const level =() => user && user.level ? user.level : 0;
    return (
        <AuthContext.Provider value={{login, logout, level}}>
            {children}
        </AuthContext.Provider>
    );
};
