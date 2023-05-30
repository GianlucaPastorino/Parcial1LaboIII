import {LeerData} from "./localStorage.js";

const superheroes = LeerData("superheroesPastorino");
const $articulos = document.getElementById("articulos");

if(superheroes.length)
{
        superheroes.forEach(superheroe => 
        {
            $articulos.insertAdjacentHTML("beforeend",
            `<article>
                <p>Nombre: ${superheroe.nombre}</p>
                <p>Alias: ${superheroe.alias}</p>
                <p>Editorial: ${superheroe.editorial}</p>
                <p>Fuerza: ${superheroe.fuerza}</p>
                <p>Arma: ${superheroe.arma}</p>
            </article>`);
        });
}