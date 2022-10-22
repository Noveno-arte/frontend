import React from 'react';
import "./ListaRecetas.css";
import logo from '../images/recipe-logo.png'
import CartaReceta from '../components/CartaReceta'
import { IoIosAddCircleOutline} from 'react-icons/io';
import {Link} from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

//https://www.recetasgratis.net/
function ListaRecetas(props) {
    const recetas = JSON.parse(localStorage.getItem('recetas-ls'));
    return (
        <>
        <ScrollToTop />
        <div className='main-page'>    
            <div className='header-wrapper' style={{display:'flex',justifyContent:'space-between'}}>
                <div className="header">
                    <img src={logo} alt=''/>
                    <div className="header-titulo">
                        Lista de recetas
                    </div>
                </div>
                <Link className="agregar-receta" to='/agregar' style={{textDecoration:'none', color:'black'}}>
                    <div className="icono">
                        <IoIosAddCircleOutline size={60} color={'#782701'}/>
                    </div>
                    <span>
                        Añadir receta
                    </span>
                </Link>
            </div>
            <div className="recetas-container">
                <div className="titulo">

                </div>
                <div className="lista-container">
                    {recetas ?                                  
                    recetas.map((receta,i)=>(
                        <CartaReceta key={i} data = {receta} index={i}/>
                    ))
                    :<></>}
                </div>
            </div>            
        </div>
        </>
    );
}

export default ListaRecetas;