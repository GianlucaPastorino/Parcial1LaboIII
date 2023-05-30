import {actualizarTabla} from "./tabla.js";
import {Superheroe} from "./superheroe.js";
import {LeerData, GuardarData} from "./localStorage.js";

const armas = ["Armadura", "Espada", "Martillo", "Escudo", "Arma de Fuego", "Flechas"];
GuardarData("armas", armas);

const $selectArmas = document.getElementById("selectArmas");
const armasStorage = LeerData("armas");

armasStorage.forEach(arma => {
    $selectArmas.innerHTML += `<option value="${arma}">${arma}</option>`;
});


const superheroes = LeerData("superheroesPastorino");
const $tabla = document.getElementById("tabla");
const $formulario = document.forms[0];
const $spinner = document.getElementById("spinner");
const $btnCancelar = document.getElementById("cancelar");
const $btnEliminar = document.getElementById("eliminar");

if(superheroes.length)
{
    setTimeout(()=>{
        actualizarTabla($tabla, superheroes);
        $spinner.classList.add("ocultar");
    }, 2000);
}
else
{
    setTimeout(() => {
        $spinner.classList.add("ocultar");
        $tabla.insertAdjacentHTML("afterbegin", `<p>No se encontraron superheroes.</p>`);
    }, 2000);
}

/*** MANEJADORES DE EVENTOS ***/

window.addEventListener("click", (e)=>{
    if(e.target.matches("td"))
    {
        const id = e.target.parentElement.dataset.id;
        
        const selectedSuperheroe = superheroes.find((superheroe)=> superheroe.id == id);
        cargarFormulario($formulario, selectedSuperheroe);
        MostrarBotonesEliminarCancelar();
    }
    else if(e.target.matches("input[value='Eliminar']")){
        handlerEliminar(parseInt($formulario.txtId.value));
        $formulario.reset();
        $formulario.txtId.value = "";
        OcultarBotonesEliminarCancelar();
    }
    else if(e.target.matches("input[value='Cancelar']")){
        $formulario.reset();
        $formulario.txtId.value = "";
        OcultarBotonesEliminarCancelar();
    }
});

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const {txtId, txtNombre, rangeFuerza, txtAlias, rdoEditorial, selectArma} = $formulario;
    
    if(txtNombre.value.length < 100 && txtAlias.value.length < 100 && txtNombre.value.length > 0 && txtAlias.value.length > 0 && isNaN(txtNombre.value) && isNaN(txtAlias.value))
    {
        if(txtId.value === ""){
            const nuevoSuperheroe = new Superheroe(Date.now(), txtNombre.value, parseInt(rangeFuerza.value), txtAlias.value, rdoEditorial.value, selectArma.value);
    
            handlerCrear(nuevoSuperheroe);
        }
        else{
            const superheroeActualizado = new Superheroe(parseInt(txtId.value), txtNombre.value, parseInt(rangeFuerza.value), txtAlias.value, rdoEditorial.value, selectArma.value);
           
            handlerActualizar(superheroeActualizado);
            $btnCancelar.classList.toggle("ocultar");
            $btnEliminar.classList.toggle("ocultar");
        }
    
        $formulario.reset();
    }
    else
    {
        alert("Verifique los datos ingresados.");
    }
   
});

/*** FUNCIONES CRUD ***/

function handlerCrear(superheroe){
    superheroes.push(superheroe);
    GuardarData("superheroesPastorino", superheroes);
    $spinner.classList.remove("ocultar");
    $tabla.classList.add("ocultar");

    setTimeout(()=>{
        actualizarTabla($tabla, superheroes);
        $spinner.classList.add("ocultar");
        $tabla.classList.remove("ocultar");
    }, 2000);
}

function handlerActualizar(superheroeActualizado){
    let index = superheroes.findIndex((superheroe)=> superheroe.id == superheroeActualizado.id);
    superheroes.splice(index, 1, superheroeActualizado);

    GuardarData("superheroesPastorino", superheroes);
    $spinner.classList.remove("ocultar");
    $tabla.classList.add("ocultar");


    setTimeout(()=>{
        actualizarTabla($tabla, superheroes);
        $spinner.classList.add("ocultar");
        $tabla.classList.remove("ocultar");
    }, 2000);
}

function handlerEliminar(id){
    let index = superheroes.findIndex((superheroe)=> superheroe.id == id);
    if(index != -1)
    {
        superheroes.splice(index, 1);

        GuardarData("superheroesPastorino", superheroes);
        $spinner.classList.remove("ocultar");
        $tabla.classList.add("ocultar");

        setTimeout(()=>{
            actualizarTabla($tabla, superheroes);
            $spinner.classList.add("ocultar");
            $tabla.classList.remove("ocultar");
            if(!superheroes.length)
            {
                $tabla.insertAdjacentHTML("afterbegin", `<p>No se encontraron superheroes.</p>`);
            }
        }, 2000);
    }
}

/*** Otras Funciones ***/

function cargarFormulario(formulario, superheroe){
    formulario.txtId.value = superheroe.id;
    formulario.txtNombre.value = superheroe.nombre;
    formulario.rangeFuerza.value = superheroe.fuerza;
    formulario.txtAlias.value = superheroe.alias;
    formulario.rdoEditorial.value = superheroe.editorial;
    formulario.selectArma.value = superheroe.arma;
}

function MostrarBotonesEliminarCancelar() {
    if($btnCancelar.classList.contains("ocultar") && $btnEliminar.classList.contains("ocultar"))
    {
        $btnCancelar.classList.remove("ocultar");
        $btnEliminar.classList.remove("ocultar");
    }
}

function OcultarBotonesEliminarCancelar() {
    if(!$btnCancelar.classList.contains("ocultar") && !$btnEliminar.classList.contains("ocultar"))
    {
        $btnCancelar.classList.add("ocultar");
        $btnEliminar.classList.add("ocultar");
    }
}