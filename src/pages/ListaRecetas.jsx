import React from 'react';
import "./ListaRecetas.css";
import recetas from '../data/recetas.json'
import logo from '../images/recipe-logo.png'
import CartaReceta from '../components/CartaReceta'

//https://www.recetasgratis.net/
function ListaRecetas(props) {
    return (
        
        <div className='main-page'>            
            <div className="header">
                <img src={logo} alt=''/>
                <div className="header-titulo">
                    Lista de recetas
                </div>
            </div>
            <div className="recetas-container">
                <div className="titulo">

                </div>
                <div className="lista-container">
                    {recetas.map((receta)=>(
                        <CartaReceta data = {receta}/>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default ListaRecetas;