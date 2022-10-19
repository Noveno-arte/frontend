import React from 'react';
import "./DetallesReceta.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import recetas from '../data/recetas.json';
import Lista from '../components/Lista';
import BottonIcon from '../components/BotonIcon';

//https://www.recetasgratis.net/
function DetallesReceta() {    
    const { id } = useParams();
    const RECETA =  recetas.filter(receta => receta.titulo === id);   

    return (        
        <div className='main-page'>            
            <div className="header">
                <Link to='/' style={{ textDecoration: 'none', color:'#782701', display:'flex',alignItems:'center',gap:'1rem'}} >
                    <AiOutlineArrowLeft size={30}/>                
                    <div className="header-return" >
                        Volver
                    </div>
                </Link>
            </div>
            <div className="recetas-container">                
                <div className="receta-header">                 
                    <div className="titulo">                        
                        {RECETA[0].titulo}
                    </div> 
                    <div className="accion-imagen">
                        <img src={RECETA[0].imagen} alt=''/> 
                        <div className="accion">
                            <BottonIcon titulo='Editar'/>         
                            <BottonIcon titulo='Eliminar'/>                     
                        </div>

                    </div> 
                </div>
                <div className="subtitulo">
                    Ingredientes
                </div>
                <div className="sublista-container">
                    <Lista datos={RECETA[0].ingredientes} tipo ='ul'/>
                </div>                
                <div className="subtitulo">
                    Preparación
                </div>
                <div className="sublista-container" tipo ='ol'>
                    <Lista datos={RECETA[0].preparacion}/>
                </div>
            </div>
            
        </div>
    );
}

export default DetallesReceta;