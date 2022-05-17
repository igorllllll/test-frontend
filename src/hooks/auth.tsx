import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';


interface User{
    id: string;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    avatar_url: string;
}


interface AuthState{
    token: string;
    client: User;
};

interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData {
    users: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(client: User): void;
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(()=> {
        const token = localStorage.getItem('@Qualicorp:token');
        const client = localStorage.getItem('@Qualicorp:client');

        if (token && client){

            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token, client: JSON.parse(client) };
        }



        return {} as AuthState;
    });


    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email, password,
        });

        const { token, client } = response.data;

        localStorage.setItem('@Qualicorp:token', token);
        localStorage.setItem('@Qualicorp:client', JSON.stringify(client));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, client });
    }, []);


    const signOut = useCallback(() => {
        localStorage.removeItem('@Qualicorp:token');
        localStorage.removeItem('@Qualicorp:client');

        setData({} as AuthState);
    }, []);


    const updateUser = useCallback((client: User) => {
        localStorage.setItem('@Qualicorp:client', JSON.stringify(client));
        setData({
            token: data.token,
            client,
        })
    }, [setData, data.token]);



    return (
        <AuthContext.Provider value={{ users: data.client, signIn, signOut, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
