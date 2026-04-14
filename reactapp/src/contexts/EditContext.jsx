import {createContext, useContext, useState} from 'react';
import {AuthContext} from './AuthContext'

export const EditContext = createContext();

export function EditProvider({children})
{
    const {level} = useContext(AuthContext);
    const [editMode, setEditMode] = useState(level() > 1);
    const toggleEditMode = () => {
        setEditMode(editMode ? false : true)
    }
    return (
        <EditContext.Provider value={{editMode, toggleEditMode}}>
            {children}
        </EditContext.Provider>
    );
};
