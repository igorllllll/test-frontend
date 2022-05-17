import styled from 'styled-components';
import { shade } from 'polished';



export const Container = styled.div`
    > header{
        height: 130px;
        background: #000C92;

        display: flex;
        align-items: center;

        div{
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;

            svg{
                color: #fff;
                width: 24px;
                height: 24px;
            }


        }
    }

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -100px auto 0;

    width: 100%;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            margin-left: 15%;
            font-size: 20px;
            text-align: left;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            margin-left: 25%;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
                color: ${shade(0.2, '#f4ede8')};
            }
        }

        input[name='old_password']{
            margin-top: 24px;
        }

    }

    > button {
        color: #c53030;
        display: block;
        border: 0;
        background: transparent;
        margin-top: -35px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;

        svg{
            margin-right: 8px;
        }

        &:hover{
            color: ${shade(0.2, '#c53030')};
        }
    }


`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label{
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        cursor: pointer;
        transition: background-color 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        input{
            display: none;
        }

        svg{
            width: 20px;
            height: 20px;
            color: #312e38;
        }

        &:hover{
            background: ${shade(0.2, '#ff9000')};
        }

    }
`;


