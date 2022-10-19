import React from 'react';
import "./CartaReceta.css";
import Boton from './Boton'
import {Link} from 'react-router-dom';

function CartaReceta({data}) {
    return (
        <div className='receta-wrapper'>
            <img src={data.imagen} alt='' />
            <div className="receta-data">
                <div className="receta-titulo">
                    {data.titulo}
                </div>
                <hr/>
                <div className="accion" >
                    <Link to={'/receta/'+data.titulo} style={{ textDecoration: 'none' }}>
                    <Boton />
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default CartaReceta;