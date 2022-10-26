import React from 'react';

function testdeletion(props) {
    const handleEliminar = () =>{
        const newArray = Object.assign([], JSON.parse(localStorage.getItem('recetas-ls')));
        newArray.splice(Number(0), 1);
        localStorage.setItem('recetas-ls', JSON.stringify(newArray));
    };
    return (
        <div>
            {handleEliminar()}
        </div>
    );
}

export default testdeletion;