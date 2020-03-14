require('dotenv').config();

const {NODE_ENV, JWT_SECRET, POSTGRES_URL} = process.env;
const env = NODE_ENV || 'dev';

const dev = {
    "app": {
        "port": 5000,
        "jwtSecret": JWT_SECRET || 'its secret code',
    },
    "database": {
        dialect: 'sqlite',
        storage: "./moneymanagerdb.sqlite3",
        define: {
            timestamps: false
        }
    }
};

const test = {
    "app": {
        "port": 5000,
        "jwtSecret": JWT_SECRET || 'its secret code',
    },
    "database": {
        dialect: 'sqlite',
        storage: "./moneymanagerdb.sqlite3",
        define: {
            timestamps: false
        }
    }
};

const prod = {
    "app": {
        "port": 5000,
        "jwtSecret": JWT_SECRET,
    },
    "database": {
        dialect: 'postgres',
        url: POSTGRES_URL,
        define: {
            timestamps: false
        }
    }
};

const config = {
    dev, test, prod
};

module.exports = config[env];
