import s from "./Card.module.css";
import React, { useState, useEffect, useCallback } from 'react';
import patternDivider from "../assets/pattern-divider-desktop.svg";
import iconDice from "../assets/icon-dice.svg";
import { FaHistory } from "react-icons/fa";


function Card({historyOpen, setHistoryOpen, history, setHistory}) {
    // Estados del advice carga y animación
    const [advice, setAdvice] = useState({ text: "", id: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);

    // Función que llama a la API y actualiza el advice
    const fetchAdvice = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`);
            const data = await response.json();
            // Seteamos el historial evitando duplicados
            setHistory((prev)=>{
                if(!prev.find(item => item.id === data.slip.id)){
                    return [data.slip, ...prev];
                }
                return prev;
            });
            setAdvice({
                text: data.slip.advice,
                id: data.slip.id
            });
    
        } catch (error) {
            console.error('Error al obtener el consejo:', error);
            setAdvice({
                text: 'Ocurrió un error. Intenta nuevamente.',
                id: 0
            });
        }
        setIsLoading(false);
    }, [setHistory]);

    const handleClick = useCallback(() => {
        setIsSpinning(true);
        fetchAdvice();
        // Cortamos la animación luego de 400ms
        setTimeout(() => {
            setIsSpinning(false);
        }, 500);
    }, [fetchAdvice]); // Solo depende de la función que llama a la API

    // useEffect al montar: carga inicial + escucha del teclado
    useEffect(() => {
        // Pedimos el primer consejo al montar
        fetchAdvice();

        // Tecla rápida: Enter o Space ejecutan handleClick
        const handleKeyPress = (e) => {
            if (e.key === "Enter" || e.code === "Space") {
                e.preventDefault();
                handleClick();
            }
        };
        // Agregamos y limpiamos el listener
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleClick, fetchAdvice]); // Incluímos dependencias porque son funciones memorizadas

    //Open-Close historial
    function historySwape (){
        setHistoryOpen(!historyOpen);
    }

    return (
        <div className={s.card}>
            <div className={s.top}>
                <span key={advice.id} className={s.id}>
                    {isLoading ? "" : `ADVICE #${advice.id}`}
                </span>
                <FaHistory onClick={historySwape} className={s.buttonHistory} />
            </div>
            <span key={advice.text} className={s.advice}>
                {isLoading ? <div className={s.loader}></div> : `"${advice.text}"`}
            </span>
            <img className={s.patternDivider} src={patternDivider} alt="pattern divider" />
            <button onClick={handleClick} className={s.randomButton}>
                <img
                    src={iconDice}
                    alt="icon dice"
                    className={isSpinning ? s.spin : ""}
                />
            </button>
        </div>
    );
}


export default Card;