const express = require('express');
const {app: appConfig} = require('./config/config');
const {db} = require('./models');

process.env.NODE_CONFIG_DIR = './config';

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));

const PORT = appConfig.port;

async function start() {
    try {
        await db.sequelize.sync();
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error:', e.message);
        process.exit(1);
    }
}

start().then(() => {});
