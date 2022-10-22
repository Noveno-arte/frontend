import React from 'react';
import "./Lista.css";

function Lista({datos,tipo}) {
    return (
        <>
        {tipo === 'ul' ?        
            <ul className='lista-wrapper'>
                {datos.map((dato,i)=>(
                    <li  key={i}>
                        {dato}
                    </li>
                ))}
            </ul>
        :
        <ol className='lista-wrapper'>
            {datos.map((dato,i)=>(
                <li key={i}>
                    {dato}
                </li>
            ))}
        </ol>    
        }
        </>
    );
}

export default Lista;