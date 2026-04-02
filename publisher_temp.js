const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

let i = 0;

client.on('connect', () => {
  console.log('Sensor de Temperatura conectado (QoS 0)');

  const t = setInterval(() => {
    const temp = (20 + Math.random() * 10).toFixed(2);

    client.publish('estufa/temp/ambiente', temp, { qos: 0 });
    i++;

    console.log(`Enviada: ${temp} | Total: ${i}`);

    if (i === 10) {
      clearInterval(t); 
      client.end();
    }
  }, 5000);
});