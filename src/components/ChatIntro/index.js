import React from "react";

import intro from "../../assets/intro-connection.jpeg"
import "./styles.css";

export const ChatIntro = () => {
    return(
        <div className="chatIntro">
            <img src={intro} alt="" />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conect ao seu telefone para sincronizar suas mensagens. <br/>Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</h2>
        </div>
    )
}