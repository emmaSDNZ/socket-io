const lbOnline      = document.querySelector('#lbOnline');
const lbOffline     = document.querySelector('#lbOffline');
const textMensaje   = document.querySelector('#textMensaje');
const btnEnviar     = document.querySelector('#btnEnviar');


const socket = io()

//on escucha eventos
// emit : emite un evento
socket.on('connect', ()=>{
    console.log("conectado")

    lbOffline.style.display = 'none';
    lbOnline.style.display  = ''
})

socket.on('disconnect', ()=>{
    console.log("desconectado del servidor")

    lbOffline.style.display = '';
    lbOnline.style.display  = 'none'
});

btnEnviar.addEventListener('click', ()=>{
    const mensaje = textMensaje.value
    
    const payload= {
        mensaje,
        id: 1234,
        fecha: new Date().getTime(),
    }
    socket.emit('enviar-mensaje', payload, ( id )=>{
        console.log("Desde el server", id);
    })
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})