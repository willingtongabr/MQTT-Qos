const mqtt = require("mqtt");

const options = {
  clientId: "sub_agua_01",
  clean: false
};

const client = mqtt.connect("mqtt://localhost:1883", options);

let recebidas = 0;
let duplicadas = 0;
let idsRecebidos = new Set();

client.on("connect", (connack) => {
  console.log(`SUB conectado (sessão: ${connack.sessionPresent})`);
  client.subscribe("estufa/agua/nivel", { qos: 1 });
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());

  if (idsRecebidos.has(data.id)) {
    duplicadas++;
    console.log("DUPLICADA ID:", data.id);
  } else {
    idsRecebidos.add(data.id);
  }

  recebidas++;
  console.log(`Água ID ${data.id} | Total: ${recebidas}`);
});

// relatório final
setInterval(() => {
  console.log("\nRELATÓRIO ÁGUA");
  console.log("Recebidas:", recebidas);
  console.log("Duplicadas:", duplicadas);
}, 30000);