import { mount } from 'enzyme';
import App from './App';
import React from 'react';
import RECETAS from './data/recetas.json';

localStorage.setItem('recetas-ls', JSON.stringify(RECETAS));

describe("<App />", () => { 
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('prueba de listado de recetas', () => { 
    const recetasTotales = wrapper.find('.carta-receta');
    //se espera que se cargen las 6 recetas que se encuentran en el archivo json
    expect(recetasTotales.length).toBe(6);
  }); 

  it('Creacion de receta', () => {
    //click en agregar receta
    wrapper.find('.agregar-receta').simulate('click');
    wrapper.update();
    //<<<se presenta la interfaz grafica para la creacion de la receta

    //se agrega un titulo
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: 'Titulo de receta' } });

    //se ingresa un ingrediente al input
    wrapper.find('#input-ingrediente').invoke('onChange')({ target: { value: 'ingrediente 1' } });
    wrapper.find('#cargar-ingrediente').simulate('click'); //se carga el ingrediente a la lista
    //se ingresa un ingrediente al input
    wrapper.find('#input-ingrediente').invoke('onChange')({ target: { value: 'ingrediente 2' } });
    wrapper.find('#cargar-ingrediente').simulate('click'); //se carga el ingrediente a la lista

    //se ingresa un paso a la preparacion
    wrapper.find('#input-preparacion').invoke('onChange')({ target: { value: 'paso 1' } });
    wrapper.find('#cargar-preparacion').simulate('click'); //se carga el paso a la lista
    //se ingresa un paso a la preparacion
    wrapper.find('#input-preparacion').invoke('onChange')({ target: { value: 'paso 2' } });
    wrapper.find('#cargar-preparacion').simulate('click'); //se carga el paso a la lista

    //Se guarda a la receta y se regresa a la pagina principal
    wrapper.find('#guardar-receta').simulate('click');
    wrapper.update();

    //se espera encontrar la receta creada en la lista principal
    expect(wrapper.containsMatchingElement(      
      <div >
          Titulo de receta
      </div>
    )).toBe(true);

  }); 

  it('Edicion de receta', () => {

    //click en ver receta para la tercera receta en la lista
    wrapper.find('.link-to-2-btn').simulate('click');

    //<<<se presenta los detalles de la receta seleccionada>>>

    //click en editar receta
    wrapper.find('.accion-editar-btn').simulate('click');
    wrapper.update();
    
    //<<<se presenta la interfaz grafica para la edicion de la receta>>>

    const actualDB = JSON.parse(localStorage.getItem('recetas-ls'));//recetas actuales

    const actualTitulo = actualDB[2].titulo; //titulo de la receta 3
    const actualIngredientes = actualDB[2].ingredientes; //ingredientes de la receta 3
    const actualPreparacion = actualDB[2].preparacion; //preparacion de la receta 3

    //Se ingresa un nuevo titulo para la receta
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: actualTitulo+' editado' } });    
  
    const indice_ing = actualIngredientes.length -1;

    //Se espera que el ingrediente en la posicion "indice_ing" exista
    expect(wrapper.exists('#ing-'+indice_ing)).toBe(true);
    wrapper.find('#eliminar-ingrediente-'+indice_ing).simulate('click');// Se hace click en eliminar dicho ingrediente
    //Se espera que el ingrediente en la posicion "indice_ing" ya no exista
    expect(wrapper.exists('#ing-'+indice_ing)).toBe(false);

    const indice_prep = actualPreparacion.length -1;

    //Se espera que el paso de la preparacion en la posicion "indice_prep" exista
    expect(wrapper.exists('#prep-'+indice_prep)).toBe(true);
    wrapper.find('#eliminar-preparacion-'+indice_prep).simulate('click');// Se hace click en eliminar dicho paso
    //Se espera que el paso de la preparacion en la posicion "indice_prep" ya no exista
    expect(wrapper.exists('#prep-'+indice_prep)).toBe(false);

    //Se agrega un nuevo ingrediente
    wrapper.find('#input-ingrediente').invoke('onChange')({ target: { value: '4 Huevos' } });    
    wrapper.find('#cargar-ingrediente').simulate('click');//Se carga el ingrediente a la lista
    //Se agrega un nuevo ingrediente
    wrapper.find('#input-ingrediente').invoke('onChange')({ target: { value: '300g de Harina' } }); 
    wrapper.find('#cargar-ingrediente').simulate('click');//Se carga el ingrediente a la lista

    //Se carga un nuevo paso a la preparacion
    wrapper.find('#input-preparacion').invoke('onChange')({ target: { value: 'agregar 4 huevos' } });    
    wrapper.find('#cargar-preparacion').simulate('click');//Se carga el paso a la lista

    //Se hace click en guardar la edicion
    wrapper.find('#guardar-receta').simulate('click');
    wrapper.update();

    //<<<se presenta los detalles de la receta recientemente editada>>>

    //se espera encontrar el titulo editado
    expect(wrapper.find('.titulo').text()).toEqual(actualTitulo+' editado');

    //se espera encontrar los nuevos ingredientes agregados
    expect(wrapper.find('#ing-'+(indice_ing)).text()).toEqual('4 Huevos');
    expect(wrapper.find('#ing-'+(indice_ing+1)).text()).toEqual('300g de Harina');
    
    //se espera encontrar el nuevo paso agregado
    expect(wrapper.find('#prep-'+(indice_prep)).text()).toEqual('agregar 4 huevos');
  }); 

  it('prueba de eliminacion', () => {

    const RecetaActual = JSON.parse(localStorage.getItem('recetas-ls'))[4];//receta numero 5

    //se espera encontrar la receta numero 5 en la lista
    expect(wrapper.containsMatchingElement(      
      <div >
          {RecetaActual.titulo}
      </div>
    )).toBe(true);

    //Se hace click en ver receta para la receta en la posicion 5
    wrapper.find('.link-to-4-btn').simulate('click');
    wrapper.update();

    //<<< se presenta los detalles de la receta seleccionada >>>

    //se hace click en la boton eliminar
    wrapper.find('.accion-eliminar-btn').simulate('click');
    wrapper.update();
  
    //<<< se presenta la interfaz grafica que muestra la lista de todas las recetas>>>

    //se espera que la receta 5 ya no exista
    expect(wrapper.containsMatchingElement(      
      <div >
          {RecetaActual.titulo}
      </div>
    )).toBe(false);
  }); 


});
