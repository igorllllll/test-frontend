import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';


import { Container, Header, Logo, Title, ButtonLogin, Footer } from './styles';


interface SignInFormData{
    email: string;
    password: string;
}


const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const history = useHistory();
    const { addToast } = useToast();


    // const handleSubmit = useCallback(async (data: SignInFormData) => {
    //     try{
    //         formRef.current?.setErrors({});
    //         const schema = Yup.object().shape({
    //             email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
    //             password: Yup.string().required('Senha obrigatoria'),
    //         });

    //         await schema.validate(data, {
    //             abortEarly: false,
    //         });

    //         await signIn({
    //             email: data.email,
    //             password: data.password,
    //         });

    //         addToast({
    //             type: 'sucess',
    //             title: 'Login Realizado',
    //         });

    //         history.push('/dashboard');

    //     }catch(err){
    //         if (err instanceof Yup.ValidationError){
    //             const errors = getValidationErrors(err as Yup.ValidationError);
    //             formRef.current?.setErrors(errors);
    //         }

    //         addToast({
    //             type: 'error',
    //             title: 'Erro na autenticação',
    //             description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
    //         });

    //     }

    // }, [signIn, addToast, history],);

    return (
      <Container>
        <Header>
          <Logo>
            igordev
          </Logo>
          <Title>
            <ul>
              <li>
                <span>architecture team</span>
              </li>
            </ul>
          </Title>
          <ButtonLogin>entrar</ButtonLogin>
        </Header>
        <div className="wrapper">
          <main>
            <section className="module parallax parallax-1">
              <h1>architecture team</h1>
            </section>
            <section className="module content">
              <div className="container">
                <h2>Architecture team</h2>
                <p>
                  Architecture team é um grupo com apenas um objetivo, criar soluções de design e construção mais eficientes, inovadoras e sustentáveis para atender às necessidades e demandas dos seus clientes.
                </p>
                <p>
                  Trabalhando em equipe, podemos combinar habilidades e conhecimentos para projetar espaços que maximizem o uso do espaço, a funcionalidade e a estética, levando em consideração questões de segurança, acessibilidade, conforto ambiental e uso de materiais e tecnologias sustentáveis.
                </p>
              </div>
            </section>
            <section className="module parallax parallax-2">
              <h1>sustentabilidade</h1>
            </section>
            <section className="module content">
              <div className="container">
                <h2>Responsabilidade ambiental</h2>
                <p>
                  Buscamos minimizar o impacto ambiental em nossos projetos, visando a preservação do meio ambiente. Consequentemente, solucionamos maneiras de economia de recursos usando materiais sustentáveis e eficiente.
                </p>
                <p>
                  A sustentabilidade exige que nossos arquitetos busquem soluções criativas e inovadoras para problemas ambientais, levando a projetos mais interessantes e desafiadores, possibilitando novas ideias e técnicas.
                </p>
                </div>
            </section>
            <section className="module parallax parallax-3" />
            {/* <section className="module content">
              <div className="container">
              <Footer>
                <div className="containerF">
                  <div className="logo-container">
                    <a href="https://www.facebook.com/" rel="noopener">
                      <img src="facebook-logo.png" alt="Facebook"/>
                    </a>
                    <a href="https://twitter.com/" rel="noopener">
                      <img src="twitter-logo.png" alt="Twitter"/>
                    </a>
                    <a href="https://www.instagram.com/" rel="noopener">
                      <img src="instagram-logo.png" alt="Instagram"/>
                    </a>
                  </div>
                </div>
              </Footer>
              </div>
            </section> */}
          </main>
        </div>
      </Container>
    );
}

export default SignIn;
