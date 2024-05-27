// FORM LOGIN
document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('form');

    const mostrarError = (input, mensaje) =>{
        const divPadre = input.parentNode;
        const errorText = divPadre.querySelector('.error-text');
        divPadre.classList.add('error');
        errorText.innerText = mensaje;
    }

    const input = document.querySelector('#email');
    const mensaje = 'Campo obligatorio';

    const eliminarError = input =>{
        const divPadre = input.parentNode;
        divPadre.classList.remove('error');
        const errorText = divPadre.querySelector('.error-text');
        errorText.innerText = '';
    }      

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', ()=>{
            const valor = input.value.trim();
            if(valor != ''){
                eliminarError(input);
            }
        })
    })

    function validarCampo(campoId, mensaje){
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value == ''){
            mostrarError(campo, mensaje);
            return false;
        }else{
            eliminarError(campo);
            return true;
        }
    }

    function validarEmail(email){
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email)
    }   

    function validarCampoEmail(campoId, mensaje){
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();

        if (email == ''){
            mostrarError(campo, mensaje);
            return false;
        }else if (!validarEmail){
            mostrarError(campo, 'El correo electronico es obligatorio');
            return false;
        }else{
            eliminarError(campo);
            return true;
        }
    }
    
    const validarForm = () =>{
        let validar = true;

        validar = validarCampoEmail('email', 'El correo electronico no es valido') && validar;

        validar = validarCampo('password', 'La contraseña es obligatoria') && validar;

        return validar;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!validarForm()){
            event.preventDefault();
            console.log("El formulario no es valido");
        }else{
            event.preventDefault();
            console.log("El formulario es valido...");
        }
    })
})

// TENDENCIAS
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzIxODhiYzFhZWJmZWNhZGFiNTI3MDZjNGRiZDM0OSIsInN1YiI6IjY2NTRiMmM3ZTdlNDk3OTJkYjVhNWU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2NLZMgDjHVjdvCKsVoB6_btu9UX6uZhAjqCO_T60xMQ'
const API_URL = 'https://api.themoviedb.org/3'

let currentPage = 1;

function llamarAPI(page){
    fetch(`${API_URL}/movie/popular?page=${page}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
    .then(response => response.json())
    .then(data => dibujarDatos(data));
    
}

function Pelicula(obj){
    return `
    <a href="#">
        <div class="pelicula">
            <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}">
            <div class="tituloPelicula">
                <h4>${obj.title}</h4>
            </div>
        </div>
    </a>
    `;
}

function dibujarDatos(json){
    const filas = json.results.map(obj => Pelicula(obj));
    document.querySelector('.peliculasTendencia .peliculas').innerHTML =
    filas.join('');
}

function cargarPaginaSiguiente(){
    currentPage++;
    llamarAPI(currentPage);
}

function cargarPaginaAnterior(){
    if(currentPage > 1){
        currentPage--;
        llamarAPI(currentPage);
    }
}

document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);

llamarAPI(currentPage);