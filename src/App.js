import './App.css';
import ListaRecetas from './pages/ListaRecetas';
import DetallesReceta from './pages/DetallesReceta';
import EditarReceta from './pages/EditarReceta';
import AgregarReceta from './pages/AgregarReceta';
import React, { useState } from "react";
import {UserContext} from "./components/UserContext"
import RECETAS from './data/recetas.json';


function App() {
  //const {token,setToken} = useContext(UserContext); 
  const [recetas, setRecetas] = useState(RECETAS);
  const [path, setPath] = useState(0);
  const [indice, setIndice] = useState(0);

  const renderSwitch = (path) =>{
    switch(path){
      case 1:
        return <DetallesReceta/>;
      case 2:
        return <EditarReceta/>;
      case 3:
        return <AgregarReceta/>;
      default:
        return <ListaRecetas/>;
    }
  }

  return (
    <UserContext.Provider value={{recetas, setRecetas,path, setPath,indice, setIndice}}>
      <>
        {renderSwitch(path)};
      </>
    </UserContext.Provider>
  );
}

export default App;
