import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft,FiPhoneCall } from 'react-icons/fi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';


import InputLogin from '../../components/InputLogin';
import ButtonLogin from '../../components/ButtonLogin';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';



interface   ProfileFormData{
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}


const Profile: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory()

    const { users, signOut, updateUser } = useAuth();


    const handleSubmit = useCallback(async (data: ProfileFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
                cpf: Yup.string().required('CPF obrigatório'),
                telefone: Yup.string().required('Telefone obrigatório'),
                old_password: Yup.string(),
                password: Yup.string().when('old_password', {
                    is: val => !!val.lenght,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string(),
                }),
                password_confirmation: Yup.string().when('old_password', {
                    is: val => !!val.lenght,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string(),
                }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { nome, email, cpf, telefone, old_password, password, password_confirmation } = data;

            const formData = {nome, email, cpf, telefone, ...(old_password ? {
                old_password,
                password,
                password_confirmation,
            } : {})};

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            history.push('/dashboard');

            addToast({
                type: 'sucess',
                title: 'Perfil atualizado',
                description: 'Suas informações do perfil foram atualizadas com sucesso',
            })

        }catch(err){
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err as Yup.ValidationError);
                formRef.current?.setErrors(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao atualizar o perfil, tente novamente.',
            });
        }
    }, [addToast, history, updateUser ]);


    const handleAvatarChange = useCallback(async(e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const data = new FormData();

            data.append('avatar', e.target.files[0]);

            await api.patch('/client/avatar', data).then((response) => {
                updateUser(response.data)

                addToast({
                    type: 'sucess',
                    title: 'Avatar atualizado!',
                });
            });
        }
    }, [addToast, updateUser]);



    const handleLogOutandDeleteProfile = useCallback(async () => {
        try{
            await api.delete('/profile');
            addToast({
                type: 'sucess',
                title: 'Perfil Deletado',
            });
            signOut();

        }catch(err){
            addToast({
                type: 'error',
                title: 'Erro ao deletar perfil',
                description: 'Ocorreu um erro ao deletar o perfil.',
            });
        }
    }, [addToast, signOut]);



    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>


            <Content>
                    <Form ref={formRef} initialData={{nome:users.nome, email:users.email}} onSubmit={handleSubmit}>

                        <AvatarInput>
                            <img src={users.avatar_url} alt={users.nome} />
                            <label htmlFor='avatar'>
                                <FiCamera />

                                <input type="file" id="avatar"  onChange={handleAvatarChange} />
                            </label>
                        </AvatarInput>


                        <h1>Meu Perfil</h1>

                        <InputLogin name='nome' icon={FiUser} placeholder= "Nome"/>

                        <InputLogin name='email' icon={FiMail} placeholder= "E-mail"/>

                        <InputLogin name='cpf' icon={AiOutlineFieldNumber} placeholder= "CPF"/>

                        <InputLogin name='telefone' icon={FiPhoneCall} placeholder= "Telefone"/>

                        <InputLogin containerStyle={{ marginTop: 24 }} name='old_password' icon={FiLock} type='password' placeholder = "Senha atual"/>

                        <InputLogin name='password' icon={FiLock} type='password' placeholder = "Nova senha"/>

                        <InputLogin name='password_confirmation' icon={FiLock} type='password' placeholder = "Confirmar senha"/>

                        <ButtonLogin type= "submit">Confirmar mudanças</ButtonLogin>

                    </Form>

                    <button type="button" onClick={handleLogOutandDeleteProfile}>
                        <RiDeleteBack2Line/>
                        Excluir Perfil
                    </button>
            </Content>
        </Container>

    );
};

export default Profile;
