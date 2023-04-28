import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';


import InputLogin from '../../components/InputLogin';
import ButtonLogin from '../../components/ButtonLogin';

import logoImg from '../../assets/image001.png';

import { Container, Content, AnimationContainer, Background } from './styles';


interface SignInFormData{
    email: string;
    password: string;
}


const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const history = useHistory();
    const { addToast } = useToast();


    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatoria'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });

            addToast({
                type: 'sucess',
                title: 'Login Realizado',
            });

            history.push('/dashboard');

        }catch(err){
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err as Yup.ValidationError);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
            });

        }

    }, [signIn, addToast, history],);



    return (
        <Container>

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBaber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu Logisssssssssssn</h1>

                        <InputLogin name='email' icon={FiMail} placeholder= "E-mail" />

                        <InputLogin name='password' icon={FiLock} type='password' placeholder = "Senha" />

                        <ButtonLogin type= "submit">Entrar</ButtonLogin>

                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn/>
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
}

export default SignIn;
