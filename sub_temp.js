const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

let received = 0;

client.on('connect', () => {
  console.log('Subscriber TEMP conectado (QoS 0)');
  client.subscribe('estufa/temp/ambiente', { qos: 0 });
});

client.on('message', (topic, message) => {
  received++;
  console.log(`Temp: ${message.toString()} | Total: ${received}`);
});

// relatório
setInterval(() => {
  console.log(`TEMP recebidas: ${received}`);
}, 30000);