import {useEffect} from 'react';
import RECETAS from '../data/recetas.json';

function LoadFiles(props) {
    
    useEffect(() => {
        const data = localStorage.getItem('recetas-ls');
        if (data === null ){
            localStorage.setItem('recetas-ls', JSON.stringify(RECETAS));
            console.log("loaded")
        }else{            
            console.log("not loaded")
        }
        
    }, []);

    return (
        <></>
    );
}

export default LoadFiles;