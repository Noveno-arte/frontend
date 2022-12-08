import React from 'react';
import "./DetallesReceta.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { useParams,useNavigate  } from 'react-router-dom';
import Lista from '../components/Lista';
import Boton from '../components/Boton';
import ScrollToTop from '../components/ScrollToTop';
import axios from 'axios';
import LoadingArea from '../components/Utils/LoadingArea';
import defaultImage from '../images/default.jpg';

//https://www.recetasgratis.net/
function DetallesReceta() {    
    const navigate = useNavigate()
    const { id } = useParams();  
    const [receta,setReceta] = React.useState(null);
    const [isloaded,setIsloaded] = React.useState(true);

    const handleEliminar = async () =>{
        const url ='http://localhost:8000/api/recetas/'+id+'/'
        await axios.delete(url)
        .then(res => {  
            navigate('/');     
        })
        .catch(err => {
            console.log(err)
        })       
    };
    const replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = defaultImage; 
        setIsloaded(false)
    }


    React.useEffect(() => {
        const getReceta = async () => {    
            const url ='http://localhost:8000/api/recetas/'+id+'/'
            
            await axios.get(url)
            .then(res => {                          
                setReceta(res.data)        
            })
            .catch(err => {
                console.log(err)
            })
        };
        if (id){
            getReceta();
        }
    },[id]);

    return (      
        <>
        <ScrollToTop />  
        <div className='main-page'>
            <div className="return-wrapper">
                <Link id='return-btn' to='/' style={{ textDecoration: 'none', color:'#782701', display:'flex',alignItems:'center',gap:'1rem', cursor:'pointer'}} >
                    <AiOutlineArrowLeft size={30}/>                
                    <div id='return-btn-text' className="header-return" >
                        Volver
                    </div>
                </Link>
            </div>
            <div className="recetas-container">   
            {receta ? <>  
                <div className="receta-header">                 
                    <div id='id-titulo-receta' className="titulo">                        
                        {receta.titulo}
                    </div> 
                    <div className="accion-imagen">
                        <img id={isloaded ? 'img-src-loaded':'img-src-default'} src={receta.imagen} alt='' onError={replaceImage}/> 
                        <div className="accion">
                            <Link id={'accion-editar-btn-id'} to={'/editar/'+receta.id} className='accion-editar-btn' style={{ textDecoration: 'none' ,cursor:'pointer'}}>
                                <Boton titulo='Editar'/>         
                            </Link>
                            <div id={'accion-eliminar-btn-id'} className='accion-eliminar-btn' onClick={handleEliminar} >
                                <Boton titulo='Eliminar'/>   
                            </div>                  
                        </div>

                    </div> 
                </div>
                <div className="subtitulo">
                    Ingredientes
                </div>
                <div className="sublista-container">
                    <Lista datos={receta.ingredientes} tipo ='ul'/>
                </div>                
                <div className="subtitulo">
                    Preparación
                </div>
                <div className="sublista-container" tipo ='ol'>
                    <Lista datos={receta.preparacion}/>
                </div>
            </>
            :
            <LoadingArea/>
            }    
            </div>      
        </div>
        </>
    );
}

export default DetallesReceta;