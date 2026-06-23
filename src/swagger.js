const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./openapi.yaml');

module.exports = { swaggerUi, swaggerDocument };