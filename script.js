
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


