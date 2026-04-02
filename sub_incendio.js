const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

let received = 0;
let mensagens = new Set();
let duplicadas = 0;

client.on('connect', () => {
  console.log('Subscriber INCÊNDIO conectado (QoS 2)');
  client.subscribe('estufa/alerta/incendio', { qos: 2 });
});

client.on('message', (topic, message) => {
  const msg = message.toString();

  if (mensagens.has(msg)) {
    duplicadas++;
    console.log('DUPLICADA:', msg);
  } else {
    mensagens.add(msg);
  }

  received++;
  console.log(`ALERTA: ${msg} | Total: ${received}`);
});

// relatório simples
setInterval(() => {
  console.log('\n INCÊNDIO');
  console.log('Recebidas:', received);
  console.log('Duplicadas:', duplicadas);
}, 10000);