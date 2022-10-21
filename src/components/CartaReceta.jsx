import React from 'react';
import "./CartaReceta.css";
import Boton from './Boton'
import {Link} from 'react-router-dom';

function CartaReceta({data,index}) {
    return (
        <div className='receta-wrapper'>
            <img src={data.imagen} alt='' />
            <div className="receta-data">
                <div className="receta-titulo">
                    {data.titulo}
                </div>
                <hr/>
                <div className="accion" >
                    <Link to={'/receta/'+index} style={{ textDecoration: 'none' }}>
                    <Boton titulo="Ver receta"/>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default CartaReceta;