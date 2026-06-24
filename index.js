const { loadEnvFile } = require("node:process");
if (process.env.NODE_ENV !== "production") {
  loadEnvFile(".env");
}

const server = require("./src/server");

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log("server ejecutandose en el puerto", PORT);
});