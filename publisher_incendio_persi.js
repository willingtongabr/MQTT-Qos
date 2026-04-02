const mqtt = require('mqtt');


const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Sensor de Incêndio conectado (QoS 2)");

  let i = 0;

  const enviar = () => {
    const msg = `FOGO-${i}`;

    client.publish("estufa/alerta/incendio", msg, { qos: 2 }, () => {
      console.log("PUB enviou:", msg);
    });

    i++;

    if (i < 5) {
      setTimeout(enviar, 2000); // mais lento (simulando evento)
    } else {
      console.log("PUB finalizou");
      client.end();
    }
  };

  enviar();
});