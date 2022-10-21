import React,{useState,useContext} from 'react';
import "./EditarReceta.css";
import { AiOutlineArrowLeft,AiOutlineDelete, AiOutlineCloudDownload } from 'react-icons/ai';
import { IoIosAddCircleOutline} from 'react-icons/io';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Boton from '../components/Boton';
import { UserContext } from '../components/UserContext';

//https://www.recetasgratis.net/
function DetallesReceta() {    
    const { id } = useParams();
    const {recetas,setRecetas} = useContext(UserContext);  
    const RECETA =  recetas[Number(id)];   

    const [titulo, setTitulo] = useState(RECETA.titulo);   
    const [imagen, setImagen] = useState(RECETA.imagen);   
    const [url, setUrl] = useState(RECETA.imagen);    

    const [ingredientes, setIngredientes] = useState(RECETA.ingredientes);
    const [ingrediente, setIngrediente] = useState(null);

    const [preparaciones, setPreparaciones] = useState(RECETA.preparacion);
    const [preparacion, setPreparacion] = useState(null);    

    const handleDeleteIngredientes = (index) => setIngredientes(ingredientes.filter(item => item !== ingredientes[index]));
    const handleDeletePreparaciones = (index) => setPreparaciones(preparaciones.filter(item => item !== preparaciones[index]));

    const handleAddingIngredientes = () => ingrediente.split(" ").join("").length !== 0 ? setIngredientes([...ingredientes,ingrediente]):'';
    const handleAddingPreparaciones = () => preparacion.split(" ").join("").length !== 0 ? setPreparaciones([...preparaciones,preparacion]):'';
    const handleAddingImagen = () => url.split(" ").join("").length !== 0 ? setImagen(url):'';

    const onChangeHandlerIngredientes = event => setIngrediente(event.target.value);
    const onChangeHandlerPreparaciones = event => setPreparacion(event.target.value);
    const onChangeHandlerUrl= event => setUrl(event.target.value);
    const onChangeHandlerTitulo= event => setTitulo(event.target.value);

    const handleGuardar = () => {
        const temp = Object.assign({}, recetas);
        temp[Number(id)].titulo = titulo;
        temp[Number(id)].imagen = imagen;
        temp[Number(id)].ingredientes = ingredientes;
        temp[Number(id)].preparacion = preparaciones;
        setRecetas(temp);
        console.log(recetas[Number(id)]);
        window.location.href = '/receta/'+id;
    };

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
                <div className="edit-titulo">                                                 
                    <div className="subtitulo">
                        Titulo
                    </div>  
                    <div className="input-wrapper" style={{width:'100%'}}>
                        <input className="input-text" style={{width:'80%'}} type="text" onChange={onChangeHandlerTitulo} value={titulo} />
                    </div>                     
                </div>
                <div className="edicion-imagen">                                   
                    <div className="subtitulo">
                        Imagen
                    </div>
                    <img src={imagen} alt=''/> 
                    <div className="edicion">                        
                        <div className="input-wrapper" style={{width:'100%'}}>
                            <input className="input-text" type="text" placeholder='Añadir URL' style={{width:'80%'}} onChange={onChangeHandlerUrl} value={url}/>
                            <AiOutlineCloudDownload style={{cursor:'pointer'}} onClick={handleAddingImagen} size={40} />
                        </div>
                    </div>
                </div>
                <div className="edit-ingredientes">
                    <div className="subtitulo">
                        Ingredientes
                    </div>
                    <ul>
                    {ingredientes.map((ingrediente,i)=>(
                        <div style={{display:'grid',gridTemplateColumns:'4fr 1fr', alignItems:'center',gap:'10px'}}>
                            <li style={{margin:'10px 0'}}>{ingrediente}</li>
                            <AiOutlineDelete style={{cursor:'pointer'}} onClick={() => handleDeleteIngredientes(i)} size={20}/>
                        </div>
                    ))}                        
                    </ul>
                    <div className="input-wrapper" style={{width:'100%'}}>
                        <input className="input-text" type="text" placeholder='Añadir ingrediente' style={{width:'70%'}} onChange={onChangeHandlerIngredientes} value={ingrediente}/>
                        <IoIosAddCircleOutline style={{cursor:'pointer'}} onClick={handleAddingIngredientes} size={40} />
                    </div>
                </div>  
                <div className="edit-preparacion">        
                    <div className="subtitulo">
                        Preparación
                    </div>
                    <ol>
                    {preparaciones.map((preparacion,i)=>(
                        <div style={{display:'grid',gridTemplateColumns:'4fr 1fr', alignItems:'center',gap:'10px'}}>
                            <li style={{margin:'10px 0'}}>{preparacion}</li>
                            <AiOutlineDelete style={{cursor:'pointer'}} onClick={() => handleDeletePreparaciones(i)} size={20}/>
                        </div>
                    ))}                        
                    </ol>
                    <div className="input-wrapper" style={{width:'100%'}} >
                        <input className="input-text" type="text" placeholder='Añadir paso' style={{width:'70%'}} onChange={onChangeHandlerPreparaciones} value={preparacion}/>
                        <IoIosAddCircleOutline style={{cursor:'pointer'}} onClick={handleAddingPreparaciones} size={40} />
                    </div>     
                </div> 
                <div className="opciones">
                    <span  onClick={handleGuardar}>
                        <Boton titulo='Guardar'/>
                    </span>
                    <Link to={'/receta/'+id} style={{textDecoration:'none'}}>
                        <Boton titulo='Cancelar'/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DetallesReceta;