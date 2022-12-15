import React from 'react';
import './Utils.css';

function EmptyArea(props) {
    return (
        <div className='empty-message'>
            <img src='https://www.granjasanfrancisco.com/wp-content/uploads/2019/04/recetas.png' alt='' />
            <p className='text-message'>¡No hay recetas!</p>
        </div>
    );
}

export default EmptyArea;