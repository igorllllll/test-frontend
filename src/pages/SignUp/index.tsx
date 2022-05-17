import React, { useCallback, useRef } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { FiMail, FiUser, FiLock, FiArrowLeft, FiPhoneCall } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import logoImg from '../../assets/image001.png';

import InputLogin from '../../components/InputLogin';
import ButtonLogin from '../../components/ButtonLogin';

import { Container, Content, AnimationContainer, Background } from './styles';



interface   SignUpFormData{
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    password: string;
}


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome obrigatório'),
                cpf: Yup.string().required('CPF obrigatório'),
                telefone: Yup.string().required('Telefone obrigatório'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/client', data);

            history.push('/');

            addToast({
                type: 'sucess',
                title: 'Cadastro realizado',
                description: 'Você ja pode fazer seu Login',
            })

        }catch(err){
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err as Yup.ValidationError);
                formRef.current?.setErrors(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, cheque as credenciais.',
            });
        }
    }, [addToast, history]);


    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Qualicorp"/>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu Cadastro</h1>

                        <InputLogin name='nome' icon={FiUser} placeholder= "Nome"/>

                        <InputLogin name='cpf' icon={AiOutlineFieldNumber} placeholder= "CPF"/>

                        <InputLogin name='telefone' icon={FiPhoneCall} placeholder= "Telefone"/>

                        <InputLogin name='email' icon={FiMail} placeholder= "E-mail"/>

                        <InputLogin name='password' icon={FiLock} type='password' placeholder = "Senha"/>

                        <ButtonLogin type= "submit">Cadastrar</ButtonLogin>

                    </Form>

                    <Link to="/">
                        <FiArrowLeft/>
                        Voltar para Login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>

    );
};

export default SignUp;
