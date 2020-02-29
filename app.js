const express = require('express');
const config = require('config');
const { Sequelize } = require('sequelize');

const app = express();
const sequelize = new Sequelize(config.get('postgresUri'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (e) {
        console.log('Server Error:', e.message);
        process.exit(1);
    }
}

start().then(() => {});

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
