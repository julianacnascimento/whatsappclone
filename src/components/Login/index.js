import React from 'react';
import { loginWithGoogle } from "../../services/api"

import "./styles.css"

export const Login = ({ onReceive }) => {

  // const handleFacebookLogin = async () => {
  //   let result = await loginWithFacebook();

  //   if(result){
  //     onReceive(result.user);
  //   }else {
  //     alert("Erro ao tentar logar com facebook!")
  //   }
  // }

  const handleGoogleLogin = async () => {
    let result = await loginWithGoogle();

    if(result){
      onReceive(result.user);
    }else {
      alert("Erro ao tentar logar com facebook!")
    }
  }

  return(
    <div className="loginPage">
      <button onClick={handleGoogleLogin}>
        Entrar com o Google
      </button>
    </div>
  )
}