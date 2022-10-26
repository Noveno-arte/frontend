import React from 'react';
import "./Lista.css";

function Lista({datos,tipo}) {
    return (
        <>
        {tipo === 'ul' ?        
            <ul className='lista-wrapper'>
                {datos.map((dato,i)=>(
                    <li id={'ing-'+i} key={i}>
                        {dato}
                    </li>
                ))}
            </ul>
        :
        <ol className='lista-wrapper'>
            {datos.map((dato,i)=>(
                <li id={'prep-'+i} key={i}>
                    {dato}
                </li>
            ))}
        </ol>    
        }
        </>
    );
}

export default Lista;