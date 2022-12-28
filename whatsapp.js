const qrcode = require("qrcode-terminal");
const { Client, MessageMedia } = require("whatsapp-web.js");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Aplicacion comenzada correctamente!");
});

//* Mostrar mensajes que me envian.
client.on("message", (message) => {
  console.log(message.body);
});

//* Enviar pdf local
const media = MessageMedia.fromFilePath(
  "./files/Presupuesto100-5070B-SAN-HerrajesSRL-SGCompany.pdf"
);
// chat.sendMessage(media);

//* Escuchar mensajes y responder.
client.on("message", (message) => {
  if (message.body.toLowerCase() === "quiero un presupuesto") {
    message.reply(
      "Hola, gracias por comunicarse con SG COMPANY. En instantes estaremos comunicandonos"
    );
    client.sendMessage(message.from, media);
  }
});

client.initialize();

// Explicacion.
//  Escanear QR pero no puede tener abierto ningun otra sessionStorage. Se suele cerrar solo.
// Que te manden quiero un presupuesto y se mandar un mensaje
// https://pedroslopez.gitbook.io/whatsapp-web-js/
// npm i whatsapp-web.js
// npm i qrcode-terminal
