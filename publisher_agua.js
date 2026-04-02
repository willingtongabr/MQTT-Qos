const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");

let i = 0;

client.on("connect", () => {
  console.log("PUB conectado");

  const intervalo = setInterval(() => {
    const nivel = (Math.random() * 100).toFixed(2);

    const msg = JSON.stringify({
      id: i,
      nivel
    });

    client.publish("estufa/agua/nivel", msg, { qos: 1 });

    console.log("Enviado:", msg);
    i++;

    if (i === 10) {
      console.log("Finalizando envio...");
      clearInterval(intervalo);
      client.end();
    }
  }, 3000);
});