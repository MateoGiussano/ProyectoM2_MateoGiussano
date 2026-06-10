const { loadEnvFile } = require("node:process");
loadEnvFile(".env");

const server = require("./src/server");

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log("server ejecutandose en el puerto", PORT);
});