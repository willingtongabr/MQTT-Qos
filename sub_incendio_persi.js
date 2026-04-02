const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "sub-incendio-qos2",
  clean: false // 🔥 ESSENCIAL
});

const recebidas = new Set();

client.on("connect", () => {
  console.log("SUB Incêndio conectado");

  client.subscribe("estufa/alerta/incendio", { qos: 2 }, () => {
    console.log("SUB inscrito em estufa/alerta/incendio");
  });
});

client.on("message", (topic, msg) => {
  const mensagem = msg.toString();

  if (recebidas.has(mensagem)) {
    console.log("DUPLICADA:", mensagem);
  } else {
    recebidas.add(mensagem);
    console.log("ALERTA RECEBIDO:", mensagem);
  }
});