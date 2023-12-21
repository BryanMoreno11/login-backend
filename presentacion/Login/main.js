document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    try {
        const response = await verificarUsuario(data);
        if (response.ok) {
            alert('Usuario registrado');
        } else {
            alert('El usuario no está registrado');
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
    }
});
//Funciones
async function verificarUsuario(data) {
    const URL_BACKEND = 'http://localhost:3000/api/';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${URL_BACKEND}verificarUsuario`, requestOptions);
        const responseData = await response.json();
        return { ok: response.ok, responseData };
    } catch (error) {
        throw new Error('Error al llamar al backend');
    }
}