import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';


import InputLogin from '../../components/InputLogin';
import ButtonLogin from '../../components/ButtonLogin';

import logoImg from '../../assets/image001.png';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';


interface ResetPasswordFormData{
    password: string;
    password_confirmation: string;
}


const ResetPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { addToast } = useToast();
    const location = useLocation();


    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatoria'),
                password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { password, password_confirmation } = data;
            const token = location.search.replace('?token=', '');

            if (!token){
                throw new Error();
            }

            await api.post('/password/reset', {
                password,
                password_confirmation,
                token,
            })

            addToast({
                type: 'sucess',
                title: 'Senha alterada com sucesso',
            });

            history.push('/');

        }catch(err){
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err as Yup.ValidationError);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
            });

        }

    }, [addToast, history, location]);



    return (
        <Container>

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBaber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar sua senha</h1>

                        <InputLogin name='password' icon={FiLock} type='password' placeholder = "Nova senha" />

                        <InputLogin name='password_confirmation' icon={FiLock} type='password' placeholder="Confirme sua senha" />

                        <ButtonLogin type= "submit">Alterar sua senha</ButtonLogin>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>



    );
}

export default ResetPassword;
