import React from 'react';
import "./DetallesReceta.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Lista from '../components/Lista';
import Boton from '../components/Boton';
import ScrollToTop from '../components/ScrollToTop';

//https://www.recetasgratis.net/
function DetallesReceta() {    
    const { id } = useParams();  
    const RECETA = JSON.parse(localStorage.getItem('recetas-ls'))[Number(id)];

    const handleEliminar = () =>{
        const newArray = Object.assign([], JSON.parse(localStorage.getItem('recetas-ls')));
        newArray.splice(Number(id), 1);
        localStorage.setItem('recetas-ls', JSON.stringify(newArray));
        window.location.href = '/';
    };

    return (      
        <>
        <ScrollToTop />  
        <div className='main-page'>       
            <div className="return-wrapper">
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
                        {RECETA.titulo}
                    </div> 
                    <div className="accion-imagen">
                        <img src={RECETA.imagen} alt=''/> 
                        <div className="accion">
                            <Link to={'/editar/'+id} style={{ textDecoration: 'none' }}>
                            <Boton titulo='Editar'/>         
                            </Link>
                            <div onClick={handleEliminar} >
                                <Boton titulo='Eliminar'/>   
                            </div>                  
                        </div>

                    </div> 
                </div>
                <div className="subtitulo">
                    Ingredientes
                </div>
                <div className="sublista-container">
                    <Lista datos={RECETA.ingredientes} tipo ='ul'/>
                </div>                
                <div className="subtitulo">
                    Preparación
                </div>
                <div className="sublista-container" tipo ='ol'>
                    <Lista datos={RECETA.preparacion}/>
                </div>
            </div>            
        </div>
        </>
    );
}

export default DetallesReceta;