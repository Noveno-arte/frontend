import React from 'react';
import "./ListaRecetas.css";
import logo from '../images/recipe-logo.png'
import CartaReceta from '../components/CartaReceta'
import { IoIosAddCircleOutline} from 'react-icons/io';
import {Link} from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import axios from 'axios';
import EmptyArea from '../components/Utils/EmptyArea';
import LoadingArea from '../components/Utils/LoadingArea';

//https://www.recetasgratis.net/
function ListaRecetas(props) {
    //const recetas = JSON.parse(localStorage.getItem('recetas-ls'));

    const [recetas,setRecetas] = React.useState(null);

    const getReceta = async () => {    
        const url ='http://localhost:8000/api/recetas/'
        
        await axios.get(url)
        .then(res => {                           
            setRecetas(res.data)        
        })
        .catch(err => {
            console.log(err)
        })
    }


    React.useEffect(() => {
        getReceta();
    },[]);


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
                <Link className="agregar-receta" to='/agregar' style={{textDecoration:'none', color:'black', cursor:'pointer'}} >
                    <div className="icono">
                        <IoIosAddCircleOutline size={60} color={'#782701'}/>
                    </div>
                    <span>
                        Añadir receta
                    </span>
                </Link>
            </div>
            <div className="recetas-container">
                {recetas ?
                recetas.length !== 0 ?
                <div className="lista-container">                    
                    {recetas.map((receta,i)=>(
                        <div id={'carta-'+i} className='carta-receta' key={i} >
                            <CartaReceta  data = {receta} index={i}/>
                        </div>
                    ))}
                </div>                
                :
                <EmptyArea />
                :
                <LoadingArea/>                
                }
            </div>            
        </div>
        </>
    );
}

export default ListaRecetas;