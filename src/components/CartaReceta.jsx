import React, {useContext } from 'react';
import {UserContext} from "./UserContext"
import "./CartaReceta.css";
import Boton from './Boton'

function CartaReceta({data,index}) {

    const {setPath} = useContext(UserContext); 
    const {setIndice} = useContext(UserContext); 

    const handleClick =(index)=>{
        setPath(1);
        setIndice(index);
    }

    return (
        <div className='receta-wrapper'>
            <img src={data.imagen} alt='' />
            <div className="receta-data">
                <div className="receta-titulo">
                    {data.titulo}
                </div>
                <hr/>
                <div className="accion" >
                    <span className={'link-to-'+index+'-btn'} onClick={()=>{handleClick(index)}} style={{ textDecoration: 'none' }}>
                    <Boton titulo="Ver receta"/>
                    </span>
                </div>
            </div>

        </div>
    );
}

export default CartaReceta;