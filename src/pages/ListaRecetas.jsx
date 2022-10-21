import React,{useContext } from 'react';
import "./ListaRecetas.css";
import logo from '../images/recipe-logo.png'
import CartaReceta from '../components/CartaReceta'
import { UserContext } from '../components/UserContext';

//https://www.recetasgratis.net/
function ListaRecetas(props) {

    const {recetas,} = useContext(UserContext);  

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
                    {recetas.map((receta,i)=>(
                        <CartaReceta data = {receta} index={i}/>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default ListaRecetas;