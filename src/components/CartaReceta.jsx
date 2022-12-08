import React from 'react';
import "./CartaReceta.css";
import Boton from './Boton'
import {Link} from 'react-router-dom';
import defaultImage from '../images/default.jpg';

function CartaReceta({data,index}) {
    const replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = defaultImage; 
    }
    return (
        <div className='receta-wrapper'>
            <img src={data.imagen} alt='' onError={replaceImage}/>
            <div className="receta-data">
                <div className="receta-titulo">
                    {data.titulo}
                </div>
                <hr/>
                <div className="accion" >
                    <Link to={'/receta/'+data.id} className={'link-to-'+index+'-btn'} style={{ textDecoration: 'none' }}>
                        <Boton titulo="Ver receta"/>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default CartaReceta;