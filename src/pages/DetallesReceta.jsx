import React, { useContext } from 'react';
import {UserContext} from "../components/UserContext"
import "./DetallesReceta.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Lista from '../components/Lista';
import Boton from '../components/Boton';


//https://www.recetasgratis.net/
function DetallesReceta() {    

    const {recetas,setRecetas} = useContext(UserContext); 
    const {setPath} = useContext(UserContext); 
    const {indice} = useContext(UserContext); 

    const RECETA = recetas[indice];

    const handleEliminar = () =>{
        const newArray = Object.assign([], recetas);
        newArray.splice(indice, 1);
        setRecetas(newArray);
        setPath(0);
    };


    return (      
        <div className='main-page'>
            <div className="return-wrapper">
                <span style={{ textDecoration: 'none', color:'#782701', display:'flex',alignItems:'center',gap:'1rem', cursor:'pointer'}} onClick={()=>{setPath(0)}}>
                    <AiOutlineArrowLeft size={30}/>                
                    <div className="header-return" >
                        Volver
                    </div>
                </span>
            </div>
            <div className="recetas-container">                
                <div className="receta-header">                 
                    <div className="titulo">                        
                        {RECETA.titulo}
                    </div> 
                    <div className="accion-imagen">
                        <img src={RECETA.imagen} alt=''/> 
                        <div className="accion">
                            <span className='accion-editar-btn' style={{ textDecoration: 'none' ,cursor:'pointer'}} onClick={()=>{setPath(2)}}>
                                <Boton titulo='Editar'/>         
                            </span>
                            <div className='accion-eliminar-btn' onClick={handleEliminar} >
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
    );
}

export default DetallesReceta;