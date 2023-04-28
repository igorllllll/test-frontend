import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/background-sign-in.jpg';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';


export const Container = styled.body`
    margin:0;
    padding:0;
    color: #242424;
    font-family: sans-serif;
    word-wrap: break-word;
    overflow-wrap: break-word;

    h1,h2,h3,h4,h5,h6{
      font-weight: 400;
      color: #000;
    }

    .wrapper{
        width: 100%;
        margin: 0 auto;
    }
    main{
      display: block;
      background-color: #FFF;
    }

    .container{
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 0 20px;
    }

    section.module p{
      margin-bottom: 20px;
    }

    section.module:last-child{
      margin-bottom: 0;
    }

    section.module h2{
      margin-bottom: 30px;
      font-size: 30px;
    }

    section.module.content{
    padding: 40px 0;
    background: #ece7d5;
    }

    section.module.parallax{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 97vh !important;
      width: 100%;
      position: relative;
      overflow: hidden;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
    }

    section.module.parallax:after{
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 8;
      background: -moz-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 40%, #000 100% );
      background: -webkit-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 40%, #000 100% );
      background: linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 40%, #000 100% );
    }


    section.module.parallax-1{
      background-image: url(${img1})
    }

    section.module.parallax-2{
      background-image: url(${img2})
    }

    section.module.parallax-3{
      background-image:url(${img3})
    }

    section.module.parallax h1{
      color: #FFF;
      text-align: center;
      font-size: 78px;
      z-index: 50;
      text-transform: uppercase;
    }

    @media all and (max-width: 820px) {
      section.module h2 {
        font-size: 32px;
      }
      .module h2, p{
        padding: 0 8px;
      }

      .container{
        margin:0;
        padding:0;
      }

      section.module.parallax h1 {
        font-size: 36px;
      }
    }
`
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  opacity: 0.4;
  z-index: 999;
  padding: 0 2rem;
  border-bottom: 1px solid transparent
`;

export const Logo = styled.div`
  font-size: 1.1rem;
  letter-spacing: -1px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;

  &:hover {
      color: #A86F46;
    }
`;

export const Title = styled.nav`
  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  li {
    margin-left: 2rem;
  }

  span {
    text-decoration: none;
    color: #fff;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
    transition: all 0.3s ease-in-out;
    position: relative;
    animation: ${fadeIn} 1s ease-in-out;

    &:hover {
      color: #A86F46;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #A86F46;
      bottom: -2px;
      left: 0;
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

export const ButtonLogin = styled.button`
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
  font-size: 1rem;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 1s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #000;
  }

`;


export const Footer = styled.footer`
    background-color: #F8F8F8;
    padding: 2rem 0;

    .containerF {
      max-width: 960px;
      margin: 0 auto;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo-container a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      margin: 0 1rem;
      border-radius: 50%;
      background-color: #FFF;
      transition: background-color 0.3s ease;
    }

    .logo-container a:hover {
      background-color: #E5E5E5;
    }

    .logo-container img {
      width: 2rem;
      height: 2rem;
    }
`;
