import React, { useContext } from 'react';
import {UserContext} from "../components/UserContext"
import "./ListaRecetas.css";
import logo from '../images/recipe-logo.png'
import CartaReceta from '../components/CartaReceta'
import { IoIosAddCircleOutline} from 'react-icons/io';

//https://www.recetasgratis.net/
function ListaRecetas() {
    const {recetas} = useContext(UserContext);
    const {setPath} = useContext(UserContext);

    return (
        <div className='main-page'>    
            <div className='header-wrapper' style={{display:'flex',justifyContent:'space-between'}}>
                <div className="header">
                    <img src={logo} alt=''/>
                    <div className="header-titulo">
                        Lista de recetas
                    </div>
                </div>
                <span className="agregar-receta" style={{textDecoration:'none', color:'black', cursor:'pointer'}} onClick={()=>{setPath(3)}}>
                    <div className="icono">
                        <IoIosAddCircleOutline size={60} color={'#782701'}/>
                    </div>
                    <span>
                        Añadir receta
                    </span>
                </span>
            </div>
            <div className="recetas-container">
                <div className="lista-container">
                    {
                    recetas.map((receta,i)=>(
                        <div id={'carta-'+i} className='carta-receta' key={i} >
                            <CartaReceta  data = {receta} index={i}/>
                        </div>
                    ))}
                </div>
            </div>            
        </div>
    );
}

export default ListaRecetas;