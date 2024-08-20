const btnEncriptar = document.querySelector('.btn-encriptar');
const txtEncriptar = document.querySelector('.encriptar');
const aviso = document.querySelector('.texto-aviso');
const respuesta = document.querySelector('.evaluar'); 
const contenido = document.querySelector('.tarjeta-contenedor');
const btnCopiar = document.querySelector('.btn-copiar');
const btnDesencriptar = document.querySelector('.btn-desencriptar');
const btnBorrar = document.querySelector('.btn-borrar');

// Función para mostrar mensaje de aviso
function mostrarAviso(mensaje) {
    aviso.style.background = "#ff0000";
    aviso.style.color = "#FFFFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;

    setTimeout(() => {
        aviso.removeAttribute('style');
    }, 3500);
}

// Función para filtrar la entrada del usuario
function filtrarEntrada(event) {
    let valor = event.target.value;

    // Convertir a minúsculas
    valor = valor.toLowerCase();

    // Eliminar acentos y caracteres no permitidos
    valor = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
    valor = valor.replace(/[^a-z\s]/g, ""); // Permite solo letras minúsculas y espacios

    // Actualiza el campo de texto con el valor filtrado
    event.target.value = valor;
}

// Función para manejar el proceso de encriptación y desencriptación
function procesarTexto(encriptar) {
    let texto = txtEncriptar.value;

    // Eliminar acentos y caracteres especiales
    let textoLimpio = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

    // Validar que el texto solo contenga letras minúsculas y espacios
    if (!/^[a-z\s]+$/.test(textoLimpio)) {
        mostrarAviso("El texto debe ser todo en minúsculas y no debe tener caracteres especiales.");
        return false; // Texto no válido
    }

    // Procesar texto encriptado o desencriptado
    if (encriptar) {
        texto = textoLimpio
            .replace(/e/g, 'enter')
            .replace(/i/g, 'imes')
            .replace(/a/g, 'ai')
            .replace(/o/g, 'ober')
            .replace(/u/g, 'ufat');
    } else {
        texto = textoLimpio
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
    }

    respuesta.value = texto; // Usar `value` para <textarea>
    btnCopiar.style.visibility = "visible";

    if (contenido) {
        contenido.style.display = 'none'; // Oculta el contenedor en lugar de eliminarlo
    }
    return true; // Texto válido
}

// Botón Encriptar
btnEncriptar.addEventListener('click', e => {
    e.preventDefault();
    procesarTexto(true);
});

// Botón Desencriptar
btnDesencriptar.addEventListener('click', e => {
    e.preventDefault();
    procesarTexto(false);
});

// Botón Copiar
btnCopiar.addEventListener('click', async e => {
    e.preventDefault();
    try {
        await navigator.clipboard.writeText(respuesta.value);
        mostrarAviso("Texto copiado al portapapeles");
    } catch (err) {
        mostrarAviso("No se pudo copiar al portapapeles");
    }
});

// Función para borrar el contenido del textarea
function borrarTexto() {
    txtEncriptar.value = ""; // Borra el texto del textarea
    respuesta.value = ""; // Borra el texto de la respuesta
    btnCopiar.style.visibility = "hidden"; // Oculta el botón de copiar
    if (contenido) {
        contenido.style.display = 'block'; // Muestra el contenedor si estaba oculto
    }
}

// Agrega un evento click al botón de borrar
btnBorrar.addEventListener('click', e => {
    e.preventDefault();
    borrarTexto();
});

// Agregar el evento input al campo de texto para filtrar caracteres
txtEncriptar.addEventListener('input', filtrarEntrada);