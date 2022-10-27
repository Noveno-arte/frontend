import React, { useState, useContext } from 'react';
import {UserContext} from "../components/UserContext";
import "./EditarReceta.css";
import { AiOutlineArrowLeft,AiOutlineDelete, AiOutlineCloudDownload } from 'react-icons/ai';
import { IoIosAddCircleOutline} from 'react-icons/io';
import Boton from '../components/Boton';

//https://www.recetasgratis.net/
function EditarReceta() {    

    const {recetas,setRecetas} = useContext(UserContext); 
    const {setPath} = useContext(UserContext); 
    const {indice} = useContext(UserContext); 

    const RECETA = recetas[indice];

    const [error, setError] = useState(false);  

    const [titulo, setTitulo] = useState(RECETA.titulo);   
    const [imagen, setImagen] = useState(RECETA.imagen);   
    const [url, setUrl] = useState(RECETA.imagen);    

    const [ingredientes, setIngredientes] = useState(RECETA.ingredientes);
    const [ingrediente, setIngrediente] = useState('');

    const [preparaciones, setPreparaciones] = useState(RECETA.preparacion);
    const [preparacion, setPreparacion] = useState('');    

    const handleDeleteIngredientes = (index) => setIngredientes(ingredientes.filter(item => item !== ingredientes[index]));
    const handleDeletePreparaciones = (index) => setPreparaciones(preparaciones.filter(item => item !== preparaciones[index]));

    const handleAddingIngredientes = () => {if (ingrediente.split(" ").join("").length !== 0) setIngredientes([...ingredientes,ingrediente]); setIngrediente('')};
    const handleAddingPreparaciones = () => {if (preparacion.split(" ").join("").length !== 0) setPreparaciones([...preparaciones,preparacion]); setPreparacion('')};
    const handleAddingImagen = () => url.split(" ").join("").length !== 0 ? setImagen(url):'';

    const onChangeHandlerIngredientes = event => setIngrediente(event.target.value);
    const onChangeHandlerPreparaciones = event => setPreparacion(event.target.value);
    const onChangeHandlerUrl= event => setUrl(event.target.value);
    const onChangeHandlerTitulo= event => setTitulo(event.target.value);

    const handleGuardar = () => {
        if (ingredientes.length !== 0 && preparaciones.length !== 0 && titulo !== ''){
            const temp = Object.assign([], recetas);
            temp[indice].titulo = titulo;
            temp[indice].imagen = imagen;
            temp[indice].ingredientes = ingredientes;
            temp[indice].preparacion = preparaciones;
            setRecetas(temp);
            setError(false);
            setPath(1);
        }else{
            setError(true);
        }
    };

    return (        
        <div className='main-page'>            
            <div className="return-wrapper">
                <span style={{ textDecoration: 'none', color:'#782701', display:'flex',alignItems:'center',gap:'1rem',cursor:'pointer'}} onClick={()=>{setPath(1)}} >
                    <AiOutlineArrowLeft size={30}/>                
                    <div className="header-return" >
                        Volver
                    </div>
                </span>
            </div>
            <div className="recetas-container">
                <div className="edit-titulo">                                                 
                    <div className="subtitulo">
                        Titulo
                    </div>  
                    <div className="input-wrapper" style={{width:'100%'}}>
                        <input id='input-titulo' className="input-text" style={{width:'80%'}} type="text" onChange={onChangeHandlerTitulo} value={titulo} placeholder='Nombre de la receta'/>
                    </div>                     
                </div>
                <div className="edicion-imagen">                                   
                    <div className="subtitulo">
                        Imagen
                    </div>
                    <img src={imagen} alt=''/> 
                    <div className="edicion">                        
                        <div className="input-wrapper" style={{width:'100%'}}>
                            <input className="input-text" type="text" placeholder='URL de la imagen' style={{width:'70%'}} onChange={onChangeHandlerUrl} value={url}/>
                            <span  id='cargar-url' onClick={handleAddingImagen} >
                                <AiOutlineCloudDownload style={{cursor:'pointer'}} size={40} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="edit-ingredientes">
                    <div className="subtitulo">
                        Ingredientes
                    </div>
                    <ul>
                    {ingredientes.map((ingrediente,i)=>(
                        <div key={i} style={{display:'grid',gridTemplateColumns:'4fr 1fr', alignItems:'center',gap:'10px'}}>
                            <li id={'ing-'+i} style={{margin:'10px 0'}}>{ingrediente}</li>
                            <span id={'eliminar-ingrediente-'+i} onClick={() => handleDeleteIngredientes(i)}  >
                                <AiOutlineDelete style={{cursor:'pointer'}} size={20}/>
                            </span>
                        </div>
                    ))}                        
                    </ul>
                    <div className="input-wrapper" style={{width:'100%'}}>
                        <input id='input-ingrediente' className="input-text" type="text" placeholder='Añadir ingrediente' style={{width:'70%'}} onChange={onChangeHandlerIngredientes} value={ingrediente}/>
                        <span id='cargar-ingrediente' onClick={handleAddingIngredientes} >
                            <IoIosAddCircleOutline style={{cursor:'pointer'}} size={40} />
                        </span>
                    </div>
                </div>  
                <div className="edit-preparacion">        
                    <div className="subtitulo">
                        Preparación
                    </div>
                    <ol>
                    {preparaciones.map((preparacion,i)=>(
                        <div key={i} style={{display:'grid',gridTemplateColumns:'4fr 1fr', alignItems:'center',gap:'10px'}}>
                            <li id={'prep-'+i} style={{margin:'10px 0'}}>{preparacion}</li>
                            <span id={'eliminar-preparacion-'+i} onClick={() => handleDeletePreparaciones(i)} >
                                <AiOutlineDelete style={{cursor:'pointer'}} size={20}/>
                            </span>
                        </div>
                    ))}                        
                    </ol>
                    <div className="input-wrapper" style={{width:'100%'}} >
                        <input id='input-preparacion' className="input-text" type="text" placeholder='Añadir paso' style={{width:'70%'}} onChange={onChangeHandlerPreparaciones} value={preparacion}/>
                        <span id='cargar-preparacion' onClick={handleAddingPreparaciones} >
                            <IoIosAddCircleOutline style={{cursor:'pointer'}} size={40} />
                        </span>
                    </div>     
                </div> 
                {error && (
                <div className="warning" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
                    Existen campos sin rellenar
                </div>
                )}
                <div className="opciones">
                    <span id='guardar-receta' onClick={handleGuardar}>
                        <Boton titulo='Guardar'/>
                    </span>
                    <span style={{textDecoration:'none'}} onClick={()=>{setPath(1)}}>
                        <Boton titulo='Cancelar'/>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default EditarReceta;