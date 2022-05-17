import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';


import InputLogin from '../../components/InputLogin';
import ButtonLogin from '../../components/ButtonLogin';

import logoImg from '../../assets/image001.png';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';


interface ForgotPasswordFormData{
    email: string;
}


const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);

    const history = useHistory();
    const { addToast } = useToast();


    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try{
            setLoading(true);
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/password/forgot', {
                email: data.email,
            });

            addToast({
                type: 'sucess',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um e-mail pra confirmar a recuperação de senha, cheque sua caixa de entrada',
            });

        }catch(err){
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err as Yup.ValidationError);
                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realizar a recuperaçao de senha, tente novamente.',
            });

        } finally{
            setLoading(false);
        }

    }, [addToast, history],);



    return (
        <Container>

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBaber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar a senha</h1>

                        <InputLogin name='email' icon={FiMail} placeholder= "E-mail" />

                        <ButtonLogin loading={loading} type= "submit">Recuperar</ButtonLogin>
                    </Form>

                    <Link to="/">
                        <FiLogIn/>
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>



    );
}

export default ForgotPassword;
