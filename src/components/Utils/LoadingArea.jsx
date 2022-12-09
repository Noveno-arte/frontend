import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingArea(props) {
    return (
        <div className='loading-screen'>
            <div className="loading-icon" >
                <CircularProgress color="inherit" size={90}/>
            </div>
            <p className='text-message'>Cargando</p>
        </div>
    );
}

export default LoadingArea;