import { mount } from 'enzyme';
import App from '../App';
import React from 'react';
import RECETAS from '../data/recetas.json';

localStorage.setItem('recetas-ls', JSON.stringify(RECETAS));

describe("<App />", () => { 
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />); //App está compuesto de varios otros componentes. mount(...) es para ello, ya que renderiza los componentes hijos también
    //wrapper = shallow(<App />); //shallow es para probar un componente por si solo.
  });

  it('Prueba de listado de recetas', () => { 
    const recetasTotales = wrapper.find('.carta-receta');
    //se espera que se cargen las 6 recetas que se encuentran en el archivo json
    expect(recetasTotales.length).toBe(6);
    expect(wrapper).toMatchSnapshot();
  }); 

  it('Añadir receta', () => {
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
    expect(wrapper).toMatchSnapshot();
  });

  it('Añadir receta con imagen', () => {
    //click en agregar receta
    wrapper.find('.agregar-receta').simulate('click');
    wrapper.update();
    //<<<se presenta la interfaz grafica para la creacion de la receta

    //se agrega un titulo
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: 'Titulo de receta' } });

    //se agrega la imagen
    wrapper.find('#input-url').invoke('onChange')({ target: { value: 'https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg' } });
    wrapper.find('#cargar-url').simulate('click'); //se carga la imagen del link
    wrapper.update();
    expect(wrapper.containsMatchingElement(      
      <img src="https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg" alt=''/>
    )).toBe(true);

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
    expect(wrapper.containsMatchingElement(      
      <img src="https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg" alt=''/>
    )).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('Eliminar receta', () => {

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
    
    expect(wrapper).toMatchSnapshot();
  });

  it('Editar receta', () => {

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
    const actualUrlImagen = actualDB[2].imagen; //url de la imagen de la receta 3

    //Se ingresa un nuevo titulo para la receta
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: actualTitulo+' editado' } });
    
    //Se ingresa nueva imagen
    wrapper.find('#input-url').invoke('onChange')({ target: { value: 'https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg' } });
    wrapper.find('#cargar-url').simulate('click'); //se carga nueva imagen
    expect(wrapper.containsMatchingElement(      
      <img src="https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg" alt=''/>
    )).toBe(true);
    expect(wrapper.containsMatchingElement(      
      <img src={actualUrlImagen} alt=''/>
    )).toBe(false); //la vieja imagen ya no está

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

    //se espera encontrar la nueva imagen
    expect(wrapper.containsMatchingElement(      
      <img src="https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg" alt=''/>
    )).toBe(true);

    //se espera encontrar los nuevos ingredientes agregados
    expect(wrapper.find('#ing-'+(indice_ing)).text()).toEqual('4 Huevos');
    expect(wrapper.find('#ing-'+(indice_ing+1)).text()).toEqual('300g de Harina');
    
    //se espera encontrar el nuevo paso agregado
    expect(wrapper.find('#prep-'+(indice_prep)).text()).toEqual('agregar 4 huevos');

    expect(wrapper).toMatchSnapshot();
  });

  it('Cancelar editar receta', () => {

    //click en ver receta para la tercera receta en la lista
    wrapper.find('.link-to-3-btn').simulate('click');

    //<<<se presenta los detalles de la receta seleccionada>>>

    //click en editar receta
    wrapper.find('.accion-editar-btn').simulate('click');
    wrapper.update();
    
    //<<<se presenta la interfaz grafica para la edicion de la receta>>>

    const actualDB = JSON.parse(localStorage.getItem('recetas-ls'));//recetas actuales

    const actualTitulo = actualDB[3].titulo; //titulo de la receta 3
    const actualIngredientes = actualDB[3].ingredientes; //ingredientes de la receta 3
    const actualPreparacion = actualDB[3].preparacion; //preparacion de la receta 3
    const actualUrlImagen = actualDB[3].imagen; //url de la imagen de la receta 3

    //Se ingresa un nuevo titulo para la receta
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: actualTitulo+' editado' } });
    
    //Se ingresa nueva imagen
    wrapper.find('#input-url').invoke('onChange')({ target: { value: 'https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg' } });
    wrapper.find('#cargar-url').simulate('click'); //se carga nueva imagen
    expect(wrapper.containsMatchingElement(      
      <img src="https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg" alt=''/>
    )).toBe(true);
    expect(wrapper.containsMatchingElement(      
      <img src={actualUrlImagen} alt=''/>
    )).toBe(false); //la vieja imagen ya no está

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

    //Se hace click en cancelar la edicion
    wrapper.find('#cancelar-receta').simulate('click');
    wrapper.update();

    //<<<se presenta los detalles de la receta recientemente cancelada edicion == igual que al inicio>>>

    //se espera no encontrar el titulo editado
    expect(wrapper.find('.titulo').text()).not.toEqual(actualTitulo+' editado');

    //se espera no encontrar la nueva imagen
    expect(wrapper.containsMatchingElement(      
      <img src="https://www.recetasnestle.cl/sites/default/files/2022-04/que-es-la-zanahoria.jpg" alt=''/>
    )).toBe(false);

    //se espera no encontrar el nuevo ingrediente agregado
    expect(wrapper.find('#ing-'+(indice_ing)).text()).not.toEqual('4 Huevos');
    
    //se espera no encontrar el nuevo paso agregado
    expect(wrapper.find('#prep-'+(indice_prep)).text()).not.toEqual('agregar 4 huevos');


    //se espera encontrar los datos originales
    expect(wrapper.find('.titulo').text()).toEqual(actualTitulo);

    expect(wrapper.containsMatchingElement(      
      <img src={actualUrlImagen} alt=''/>
    )).toBe(true);

    expect(wrapper.find('#ing-'+(indice_ing)).text()).toEqual('1 huevo (para pintar)');
    
    expect(wrapper.find('#prep-'+(indice_prep)).text()).toEqual('Cuando estén listas las empanadas de zapallo y queso, ya podrás disfrutarlas durante un almuerzo o cena liviana saludable y deliciosa. ¡A comer! Cuéntanos qué te ha parecido esta receta en los comentarios.');

    expect(wrapper).toMatchSnapshot();
  });

  it('Seleccionar receta', () => {

    //click en ver receta para la tercera receta en la lista
    wrapper.find('.link-to-3-btn').simulate('click');

    
    //<<<se presenta la interfaz grafica para la edicion de la receta>>>

    const actualDB = JSON.parse(localStorage.getItem('recetas-ls'));//recetas actuales

    const actualTitulo = actualDB[3].titulo; //titulo de la receta 3

    //Se ingresa un nuevo titulo para la receta
    expect(wrapper.find('.titulo').text()).toEqual(actualTitulo);
    
  });

  it('Añadir receta /Caso límite en título', () => {
    //click en agregar receta
    wrapper.find('.agregar-receta').simulate('click');
    wrapper.update();
    //<<<se presenta la interfaz grafica para la creacion de la receta

    //se agrega un titulo con más de 80 caracteres
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: 'texto largo de muchos caracteres para probar el limite de 81 caracteres en el tit' } });

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
      <div className="warning-length" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
        ¡El titulo no puede exceder los 80 caracteres!
      </div>
    )).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('Añadir receta sin título /Caso inválido', () => {
    //click en agregar receta
    wrapper.find('.agregar-receta').simulate('click');
    wrapper.update();
    //<<<se presenta la interfaz grafica para la creacion de la receta

    //se agrega un titulo con más de 80 caracteres
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: '' } });

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
      <div className="warning-empty" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
        ¡Existen campos sin rellenar!
      </div>
    )).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('Añadir receta con 0 ingredientes /Caso inválido', () => {
    //click en agregar receta
    wrapper.find('.agregar-receta').simulate('click');
    wrapper.update();
    //<<<se presenta la interfaz grafica para la creacion de la receta

    //se agrega un titulo con más de 80 caracteres
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: 'Titulo' } });

    //se ingresa un paso a la preparacion
    wrapper.find('#input-preparacion').invoke('onChange')({ target: { value: 'paso 1' } });
    wrapper.find('#cargar-preparacion').simulate('click'); //se carga el paso a la lista
    //se ingresa un paso a la preparacion
    wrapper.find('#input-preparacion').invoke('onChange')({ target: { value: 'paso 2' } });
    wrapper.find('#cargar-preparacion').simulate('click'); //se carga el paso a la lista

    //Se guarda a la receta y se regresa a la pagina principal
    wrapper.find('#guardar-receta').simulate('click');
    wrapper.update();

    //se espera encontrar un mensaje de error
    expect(wrapper.containsMatchingElement(      
      <div className="warning-empty" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
        ¡Existen campos sin rellenar!
      </div>
    )).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('Añadir receta con 0 pasos /Caso inválido', () => {
    //click en agregar receta
    wrapper.find('.agregar-receta').simulate('click');
    wrapper.update();
    //<<<se presenta la interfaz grafica para la creacion de la receta

    //se agrega un titulo con más de 80 caracteres
    wrapper.find('#input-titulo').invoke('onChange')({ target: { value: 'Titulo' } });

    //se ingresa un ingrediente al input
    wrapper.find('#input-ingrediente').invoke('onChange')({ target: { value: 'ingrediente 1' } });
    wrapper.find('#cargar-ingrediente').simulate('click'); //se carga el ingrediente a la lista
    //se ingresa un ingrediente al input
    wrapper.find('#input-ingrediente').invoke('onChange')({ target: { value: 'ingrediente 2' } });
    wrapper.find('#cargar-ingrediente').simulate('click'); //se carga el ingrediente a la lista

    //Se guarda a la receta y se regresa a la pagina principal
    wrapper.find('#guardar-receta').simulate('click');
    wrapper.update();

    //se espera encontrar un mensaje de error
    expect(wrapper.containsMatchingElement(      
      <div className="warning-empty" style={{color:'red',display:'flex',justifyContent:'center',margin:'10px 0'}}>
        ¡Existen campos sin rellenar!
      </div>
    )).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });


});
