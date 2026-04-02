const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

let i = 0;

client.on('connect', () => {
  console.log('Sensor de Incêndio conectado (QoS 2)');

  const intervalo = setInterval(() => {

    const msg = `FOGO ${i}`;

    client.publish('estufa/alerta/incendio', msg, { qos: 2 });

    console.log(`ALERTA enviado: ${msg}`);
    i++;

    if (i === 10) {
      console.log("Finalizando envio...");
      clearInterval(intervalo);
      client.end();
    }

  }, 1000);
});