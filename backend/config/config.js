require('dotenv').config();

const {
    NODE_ENV, NODE_PORT, JWT_SECRET,
    POSTGRES_USER, POSTGRES_PASSWORD,
    POSTGRES_HOST, POSTGRES_PORT,
    POSTGRES_DATABASE, POSTGRES_SCHEMA
} = process.env;
const env = NODE_ENV || 'dev';

const dev = {
    "app": {
        "port": NODE_PORT || 5000,
        "jwtSecret": JWT_SECRET || 'its secret code',
    },
    "database": {
        storage: "./moneymanagerdb.sqlite3",
        dialect: 'sqlite',
        schema: 'money_manager',
        define: {
            timestamps: false
        }
    }
};

const test = {
    "app": {
        "port": NODE_PORT || 5000,
        "jwtSecret": JWT_SECRET || 'its secret code',
    },
    "database": {
        database: POSTGRES_DATABASE || 'moneymanagerdb',
        username: POSTGRES_USER || 'moneymanager',
        password: POSTGRES_PASSWORD || 'mmpwd',
        dialect: 'postgres',
        host: POSTGRES_HOST || 'localhost',
        port: POSTGRES_PORT || '5432',
        schema: POSTGRES_SCHEMA || 'money_manager',
        define: {
            timestamps: false
        }
    }
};

const prod = {
    "app": {
        "port": NODE_PORT,
        "jwtSecret": JWT_SECRET,
    },
    "database": {
        database: POSTGRES_DATABASE,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        dialect: 'postgres',
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        schema: POSTGRES_SCHEMA,
        define: {
            timestamps: false
        }
    }
};

const config = {
    dev, test, prod
};

module.exports = config[env];
