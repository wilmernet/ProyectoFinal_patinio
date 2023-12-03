let sidebar = document.querySelector(".sidebar");
let tablero = document.querySelector(".tablero");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
//------ inicio de sesión
let sesionOnBtn= document.getElementById("sesionOnBtn");
let nombUsuario= document.getElementById("nombUsuario");
let passbUsuario= document.getElementById("passUsuario");
let campoPassword= document.getElementById("entradaPass");
let tituloInicioSesion= document.getElementById("tituloInicioSesion");
let formInicioSesion=document.getElementById("formInicioSesion");
//------- Donantes
let listadoDonantes= document.getElementById("listadoDonantes");
let textoTotalDonantes=document.getElementById("textoTotalDonantes");
//------- Donaciones
let listaDonaciones= document.getElementById("listaDonaciones");
let detalleDonacion= document.getElementById("detalleDonacion");
let textoTotal=document.getElementById("textoTotalAportes");
let idEspecimen=document.getElementById("idEspecimen");
//------- Donar
let listaDesplegableAnimales= document.getElementById("listaDesplegableAnimales");
let nuevaDonacionBtn= document.getElementById("nuevaDonacionBtn");
let especimenesBtn= document.getElementById("especimenesBtn");
let valor= document.getElementById("valor");
let donarForm= document.getElementById("donarForm");
//------- Animales
let animalesActivos= document.getElementById("animalesActivos");
let animalSelec= document.getElementsByClassName("animalSelec");
//------- secciones del menú desplegable
let menuItem = document.getElementsByClassName("menuItem");
let seccion = document.getElementsByClassName("seccion");
let opcionSegunRol = document.getElementsByClassName("opcionSegunRol");


// ==================================  cargar las secciones del menú de opciones ==================================

for (let index = 0; index < menuItem.length; index++) {  
  menuItem[index].addEventListener("click", (event) => {
    //hace invisible todas las secciones
    for (let i = seccion.length-1; i >= 0; i--) {
      seccion[i].classList.replace("visible", "invisible");                 
    }
    //se enciede la sección sobre la que se hizo click
    seccion[index].classList.contains("visible")?seccion[index].classList.replace("visible", "invisible"):seccion[index].classList.replace("invisible", "visible");          
  });    
}
menuItem[0].click(); // muestra la presentación de la aplicación (opción inicio)

// ----------- opciones del menú según el rol
let activarOpMenu=(itemDelMenuHabilitadas)=>{
  //apaga todos los items del menu
  for (let index = 0; index < opcionSegunRol.length; index++) {
    const element = opcionSegunRol[index];
    element.classList.replace("visible","invisible");
  }
  //enciende solo los requeridos
  for (let index = 0; index < itemDelMenuHabilitadas.length; index++) {
    const element = opcionSegunRol[itemDelMenuHabilitadas[index]];
    element.classList.replace("invisible","visible");
  }
};

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  tablero.classList.toggle("open");
  menuBtnChange(); //Función que se ejecuta al hacer click en buscar
});

searchBtn.addEventListener("click", () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  tablero.classList.toggle("open");
  menuBtnChange(); //Función que se ejecuta al hacer click en buscar
});

//  ---------- FUNCIONES INVOCADAS EN EL MENU ---------------
function menuBtnChange() {
  sidebar.classList.contains("open")?closeBtn.classList.replace("bx-menu", "bx-left-indent"):closeBtn.classList.replace("bx-left-indent", "bx-menu");  
}

// ================================== cargar datos iniciales en el STORAGE ==================================

class Donacion{
  constructor(id, fecha, cantidad){
      this.id=id || 0;                // identificador del animal al que dona si el identificador es 0 será para cualquier animal
      this.fecha=fecha || new Date();  // fecha de la donación
      this.cantidad=cantidad || "0";  // cantidad de dinero 
  }
}

let arregloDeAnimales;

const cargarDatos=()=>{
  
  const usuarios=[
    {user:"wilmer", pass:"123abc",nombres:"Wilmer Arley",apellidos:"Patiño Perdomo" ,cel:"3118121696", email:"wilmer@mail.com",donaciones:[new Donacion(1,"2023-11-13",150),new Donacion(2,"2023-10-13",120)]},
    {user:"emmy", pass:"124abc",nombres:"Emmy Johanna",apellidos:"Cruz Trujillo" ,cel:"3100001213", email:"emmy@mail.com",donaciones:[]},
    {user:"stefania", pass:"125abc",nombres:"Stefanía",apellidos:"Patiño Cruz" ,cel:"3134325657", email:"stefania@mail.com",donaciones:[]},
    {user:"salome", pass:"126abc",nombres:"Salomé",apellidos:"Patiño Cruz" ,cel:"3126547890", email:"salome@mail.com",donaciones:[]},
    {user:"santiago", pass:"127abc",nombres:"Santiago",apellidos:"Patiño Cruz" ,cel:"3100001232", email:"santiago@mail.com",donaciones:[]}
  ]
  localStorage.clear();
  getDataAnimals();
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("logueado",0);
};


// --------- TRAER AL LOCALSATORAGE LA INFORMACIÓN DESDE EL JSON (local) ---------------

const getDataAnimals= async ()=>{
  try{
    const response= await fetch("../data/animales.json");
    const data= await response.json();
    arregloDeAnimales=JSON.stringify(data);        
    arregloDeAnimales=JSON.parse(arregloDeAnimales);        
  }catch(error){
    console.log(error);
  }
};


window.addEventListener('load', ()=>{
  cargarDatos()
  activarOpMenu([1,2]);
});


//  ============== FUNCIONES DE LA APLICACIÓN ===================

// ------- ABRIR y CERRAR sesión -----------
const sesion = (log) => {
  if (log != 0) {
    let tmp=localStorage.getItem("logueado");        
    Swal.fire({
      icon: "info",
      title: "¿Desea CERRAR la Sesión?",
      showDenyButton: true,      
      confirmButtonText: "Cerrar",
      denyButtonText: `No cerrar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Sesión Finalizada!", "", "success");
        activarOpMenu([1,2]);              
        localStorage.setItem("logueado",0);  
        sesionOnBtn.innerHTML="Iniciar Sesión";
        tituloInicioSesion.innerHTML="INICIAR SESIÓN";
        campoPassword.classList.remove("invisible");    
        formInicioSesion.reset();    
      } else if (result.isDenied) {
        Swal.fire("La sesión no se cerró", "", "Sesión vigente");
        activarOpMenu([0,1,2,3,4,5,6]);              
        localStorage.setItem("logueado",tmp); 
        sesionOnBtn.innerHTML="Cerrar Sesión";
        campoPassword.classList.add("invisible");
        tituloInicioSesion.innerHTML="SESIÓN INICIADA";      
      }            
    });
  } else {      
    let usuarioIngresado = nombUsuario.value;
    let passIngresado = passbUsuario.value;
    let usuariosCargados=JSON.parse(localStorage.getItem("usuarios"));
    let user = usuariosCargados.find((element) => element.user == usuarioIngresado);
    if (user) {
      if (passIngresado == user.pass) {        
        Swal.fire({
          title: "Sesión iniciada con Éxito!",
          text: `${user.nombres} bienvenido al CREAS, desde ya, infinitas gracias por tu apoyo!`,
          icon: "success"
        });
        localStorage.setItem("logueado",user.user);  
        cargarDonaciones(user.user);        
        cargarDonantes();
        cargarAnimales();
        activarOpMenu([0,1,2,3,4,5,6]);  
        sesionOnBtn.innerHTML="Cerrar Sesión";
        campoPassword.classList.add("invisible");
        tituloInicioSesion.innerHTML="SESIÓN INICIADA";        
        //return user.user;
      } else {        
        activarOpMenu([1,2]);
        localStorage.setItem("logueado",0);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ERROR al validar la contraseña!",          
        });
        sesionOnBtn.innerHTML="Iniciar Sesión";
        tituloInicioSesion.innerHTML="INICIAR SESIÓN";
        campoPassword.classList.remove("invisible");    
        formInicioSesion.reset();    
      }
    } else {      
      activarOpMenu([1,2]);
      localStorage.setItem("logueado",0);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR al validar el usuario!",          
      });      
      sesionOnBtn.innerHTML="Iniciar Sesión";
      tituloInicioSesion.innerHTML="INICIAR SESIÓN";
      campoPassword.classList.remove("invisible");    
      formInicioSesion.reset();    
    }          
  }
};

sesionOnBtn.addEventListener("click", (event) => {
  let loginOnOff=localStorage.getItem("logueado");  
  sesion(loginOnOff);      
});

// ------------ VER DONACIONES --------------

let cargarDonaciones= idUser=>{    
  let donacionesCargadas=buscarDonaciones(idUser);
  //borrar todos los li de la lista
  let itemsDonaciones=listaDonaciones.children;
  for (let index = itemsDonaciones.length-1; index >= 0; index--) {
    listaDonaciones.removeChild(itemsDonaciones[index]);    
  }
  //cargar los li en la lista según las donaciones guardadas
  for (let donacion of donacionesCargadas) {            
    let animalesEncontrado=buscarAnimal(donacion.id);
    let createOption= document.createElement("option");
    createOption.innerHTML=`${animalesEncontrado.nombreComun} (ID:${animalesEncontrado.id}) - ${donacion.fecha} USD$${donacion.cantidad}`;  
    listaDonaciones.appendChild(createOption);
  }
  //totalizar las donaciones
  let totalAportes= donacionesCargadas.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0);  
  
  textoTotal.innerHTML=totalAportes+"=";
  detalleDonacion.innerHTML="";
};

document.getElementById('listaDonaciones').addEventListener('change', function(event) {
  let select = this;
  let selectedIndex = select.selectedIndex;
  let selectedOption = select.options[selectedIndex];
  let selectedText = selectedOption.text;
  let createOption= document.createElement("option");
  let usuarioLogueado=localStorage.getItem("logueado");  
  let donado=buscarDonaciones(usuarioLogueado);
  let itemSeleccionado=donado[selectedIndex];
  let animal=buscarAnimal(itemSeleccionado.id);  
  detalleDonacion.innerHTML=`Aporte realizado el ${itemSeleccionado.fecha} por la suma de USD$${itemSeleccionado.cantidad} con destino a atender: ${animal.nombreComun} identificada con ID:${animal.id}`;
});

// ------------ VER DONANTES --------------

let cargarDonantes= ()=>{    
  let donantesCargados=JSON.parse(localStorage.getItem("usuarios"));
  //borrar todos los li de la lista
  let itemsDonantes=listadoDonantes.children;
  for (let index = itemsDonantes.length-1; index >= 0; index--) {
    listadoDonantes.removeChild(itemsDonantes[index]);    
  }
  //cargar los li en la lista según las donaciones guardadas
  for (let donante of donantesCargados) {            
    let createOption= document.createElement("option");
    createOption.innerHTML=`Donante: ${donante.nombres} ${donante.apellidos} - Celular: ${donante.cel} - Correo electrónico: ${donante.email}`;  
    listadoDonantes.appendChild(createOption);
  }
  //totalizar las donaciones
  let totalDonantes= donantesCargados.reduce((contador, elemento) => contador + 1, 0);  
  textoTotalDonantes.innerHTML=totalDonantes; 
};

// ------- DONAR  -----------

especimenesBtn.addEventListener("click",()=>{
  menuItem[5].click();
});

nuevaDonacionBtn.addEventListener("click",()=>{
  if(idEspecimen.value!="" && valor.value!=""){
    let usuarioLogueado=localStorage.getItem("logueado");
    let usuariosCargados=JSON.parse(localStorage.getItem("usuarios"));
    let encontrados=usuariosCargados.find((element) => element.user == usuarioLogueado);  
    let hoy = new Date();
    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let anio = hoy.getFullYear();
    encontrados.donaciones.push(new Donacion(idEspecimen.value,anio + '-' + mes + '-' + dia,parseFloat(valor.value)));
    localStorage.setItem('usuarios', JSON.stringify(usuariosCargados));
    cargarDonaciones(usuarioLogueado);
    Swal.fire({
      title: "Donación realizada con Éxito!",
      text: `${buscarUsuario(usuarioLogueado).nombres} Gracias por tu generoso aporte de USD$${parseFloat(valor.value)} para nuestr@ ${buscarAnimal(idEspecimen.value).nombreComun}!`,
      icon: "success"
    });
    donarForm.reset();
  }
  
});

// --------- mostrar los animales en el DOM ---------------

let cargarAnimales=()=>{
  for (let index = 0; index < arregloDeAnimales.length; index++) {
    let nuevoAnimal= document.createElement("div");
    nuevoAnimal.innerHTML=`<p>${arregloDeAnimales[index].nombreComun}</p> 
    <button class="boton animalSelec" id="${arregloDeAnimales[index].id}">Seleccionar <b>ID: ${arregloDeAnimales[index].id}</b></button>
    <p>Especie: ${arregloDeAnimales[index].especie}</p>
    <p>Sexo: ${(arregloDeAnimales[index].sexo)?"Macho":"Hembra"}</p>
    <p>Edad: ${arregloDeAnimales[index].edad} años</p>
    <img class="imgAnimal" src="${arregloDeAnimales[index].img}">`;
    nuevoAnimal.className="contenedorAnimalNuevo";
    animalesActivos.appendChild(nuevoAnimal);
    for (let index = 0; index < animalSelec.length; index++) {  
      animalSelec[index].addEventListener("click", (event) => {        
        menuItem[4].click();
        idEspecimen.value=animalSelec[index].id;        
      });    
    }
  }
};


// ------------ filtros ------------
const buscarAnimal=(id)=>{  
  return arregloDeAnimales.find((element)=>element.id==id);
};

const buscarUsuario=(user)=>{
  let usuariosCargados=JSON.parse(localStorage.getItem("usuarios"));
  let encontrados=usuariosCargados.find((element) => element.user == user);  
  return encontrados;
};

const buscarDonaciones=(idUser)=>{
  let encontrados=buscarUsuario(idUser);
  return encontrados.donaciones;
}