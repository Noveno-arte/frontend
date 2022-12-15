import React,{useState} from 'react';
import "./EditarReceta.css";
import { AiOutlineArrowLeft,AiOutlineDelete } from 'react-icons/ai';
import { IoIosAddCircleOutline} from 'react-icons/io';
import {Link} from 'react-router-dom';
import { useParams,useNavigate } from 'react-router-dom';
import Boton from '../components/Boton';
import axios from 'axios';
import LoadingArea from '../components/Utils/LoadingArea';
import noimage from '../images/no-image-icon.png';

//https://www.recetasgratis.net/
function EditarReceta() {    
    const navigate = useNavigate()
    const { id } = useParams();  

    const [error, setError] = useState(false);  
    const [mlerror, setMlerror] = useState(false);    
    const [saveerror, setSaveerror] = useState(false);  

    const [titulo, setTitulo] = useState(null);   
    const [imagen, setImagen] = useState(null);   
    const [url, setUrl] = useState(null);    

    const [ingredientes, setIngredientes] = useState(null);
    const [ingrediente, setIngrediente] = useState('');

    const [preparaciones, setPreparaciones] = useState(null);
    const [preparacion, setPreparacion] = useState('');    

    const handleDeleteIngredientes = (index) => setIngredientes(ingredientes.filter(item => item !== ingredientes[index]));
    const handleDeletePreparaciones = (index) => setPreparaciones(preparaciones.filter(item => item !== preparaciones[index]));

    const handleAddingIngredientes = () => {if (ingrediente.split(" ").join("").length !== 0) setIngredientes([...ingredientes,ingrediente]); setIngrediente('')};
    const handleAddingPreparaciones = () => {if (preparacion.split(" ").join("").length !== 0) setPreparaciones([...preparaciones,preparacion]); setPreparacion('')};
    //const handleAddingImagen = () => url.split(" ").join("").length !== 0 ? setImagen(url):'';

    const onChangeHandlerIngredientes = event => setIngrediente(event.target.value);
    const onChangeHandlerPreparaciones = event => setPreparacion(event.target.value);
    //const onChangeHandlerUrl= event => setUrl(event.target.value);
    const onChangeHandlerTitulo= event => setTitulo(event.target.value);

    const onChangeHandlerUpload = (event) => {
        event.preventDefault();
        const value = URL.createObjectURL(event.target.files[0]);
        setUrl(value)
        setImagen(event.target.files[0]);

    }


    const putReceta = async () => {
        const _url ='http://localhost:8000/api/recetas/'+id+'/';  
        
        let formData = new FormData()
        formData.append('id',id)
        formData.append('titulo',titulo)
        formData.append('ingredientes',ingredientes.join('<<separation>>'))
        formData.append('preparacion',preparaciones.join('<<separation>>'))
        formData.append('imagen',imagen)

        await axios.put(_url,formData)
        .then(res => {                          
            navigate('/receta/'+id );    
        })
        .catch(err => {
            console.log(err)
            setSaveerror(true)  
        })
    };

    const handleGuardar = () => {
        if (ingredientes.length === 0 || preparaciones.length === 0 || titulo === ''){
            setError(true);
        }else if (titulo.length > 80 ){
            setMlerror(true)
        }
        else{
            putReceta();
        }
    };

    React.useEffect(() => {
        const getReceta = async () => {    
            const url ='http://localhost:8000/api/recetas/'+id+'/'
            
            await axios.get(url)
            .then(res => {               
                const receta = res.data;
                setTitulo(receta.titulo) 
                //setImagen(receta.imagen);   
                setUrl(receta.imagen);  
                setIngredientes(receta.ingredientes);   
                setPreparaciones(receta.preparacion);  
            })
            .catch(err => {
                console.log(err)
            })
        };
        if (id){
            getReceta()
        }        
    },[id]);

    return (        
        <div className='main-page'>            
            <div className="return-wrapper">
                <Link id='return-btn' to={'/receta/'+id} style={{ textDecoration: 'none', color:'#782701', display:'flex',alignItems:'center',gap:'1rem',cursor:'pointer'}} >
                    <AiOutlineArrowLeft size={30}/>                
                    <div className="header-return" >
                        Volver
                    </div>
                </Link>
            </div>
            {ingredientes && preparaciones ?
            <div className="recetas-container">            
                <div className="edit-titulo">                                                 
                    <div className="subtitulo">
                        Titulo
                    </div>  
                    <div className="input-wrapper" style={{width:'100%'}}>
                        <input id='input-titulo' className="input-text" style={{width:'80%'}} type="text" onChange={onChangeHandlerTitulo} value={titulo} placeholder='Nombre de la receta'/>
                    </div>                     
                </div>                
                {mlerror && (
                <div id='warning-length-id' className="warning-length" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
                    ¡El titulo no puede exceder los 80 caracteres!
                </div>
                )}
                <div className="edicion-imagen">                                   
                <div className="subtitulo">
                        Imagen
                    </div>
                    {url ?
                    <img id='recipe-image' src={url} alt=''/> 
                    :
                    <img id='recipe-default-image' className='no-image-upload' src={noimage} alt=''/> 
                    }
                    
                    <div className="edicion">                        
                        <div className="input-wrapper" style={{width:'100%'}}>
                            <input className="input-imagen" type='file' name='file' accept='image/*' onChange={onChangeHandlerUpload}/>
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
                                <AiOutlineDelete id={'eliminar-ingrediente-btn-'+i} style={{cursor:'pointer'}} size={20}/>
                            </span>
                        </div>
                    ))}                        
                    </ul>
                    <div className="input-wrapper" style={{width:'100%'}}>
                        <input id='input-ingrediente' className="input-text" type="text" placeholder='Añadir ingrediente' style={{width:'70%'}} onChange={onChangeHandlerIngredientes} value={ingrediente}/>
                        <span id='cargar-ingrediente' onClick={handleAddingIngredientes} >
                            <IoIosAddCircleOutline id='cargar-ingrediente-btn' style={{cursor:'pointer'}} size={40} />
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
                                <AiOutlineDelete id={'eliminar-preparacion-btn-'+i} style={{cursor:'pointer'}} size={20}/>
                            </span>
                        </div>
                    ))}                        
                    </ol>
                    <div className="input-wrapper" style={{width:'100%'}} >
                        <input id='input-preparacion' className="input-text" type="text" placeholder='Añadir paso' style={{width:'70%'}} onChange={onChangeHandlerPreparaciones} value={preparacion}/>
                        <span id='cargar-preparacion' onClick={handleAddingPreparaciones} >
                            <IoIosAddCircleOutline id='cargar-preparacion-btn' style={{cursor:'pointer'}} size={40} />
                        </span>
                    </div>     
                </div> 
                {error && (
                <div id='warning-empty-id' className="warning-empty" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
                    Existen campos sin rellenar
                </div>
                )}
                <div className="opciones">
                    <span id='guardar-receta' onClick={handleGuardar}>
                        <Boton titulo='Guardar'/>
                    </span>
                    <Link id='cancelar-receta'  to={'/receta/'+id} style={{textDecoration:'none'}}>
                        <Boton titulo='Cancelar'/>
                    </Link>
                </div>  
                {saveerror && (
                <div id='warning-save-id' className="warning-empty" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
                    ¡No se pudo guardar!
                </div>
                )}          
            </div>  
            : 
            <LoadingArea/>
            }          
        </div>
        
    );
}

export default EditarReceta;