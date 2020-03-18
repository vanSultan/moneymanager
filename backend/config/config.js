require('dotenv').config();

const {
  NODE_ENV, NODE_PORT, JWT_SECRET,
  POSTGRES_USER, POSTGRES_PASSWORD,
  POSTGRES_HOST, POSTGRES_PORT,
  POSTGRES_DATABASE,
} = process.env;
const env = NODE_ENV || 'dev';

const dev = {
  app: {
    port: NODE_PORT || 5000,
    jwtSecret: JWT_SECRET || 'its secret code',
  },
  database: {
    storage: './moneymanagerdb.sqlite3',
    dialect: 'sqlite',
    define: {
      timestamps: false,
    },
    timestamp_now_function: 'current_timestamp',
  },
};

const test = {
  app: {
    port: NODE_PORT || 5000,
    jwtSecret: JWT_SECRET || 'its secret code',
  },
  database: {
    database: POSTGRES_DATABASE,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    dialect: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    define: {
      timestamps: false,
    },
    timestamp_now_function: 'now()',
  },
};

const prod = {
  app: {
    port: NODE_PORT,
    jwtSecret: JWT_SECRET,
  },
  database: {
    database: POSTGRES_DATABASE,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    dialect: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    define: {
      timestamps: false,
    },
    timestamp_now_function: 'now()',
  },
};

const config = {
  dev, test, prod,
};

module.exports = config[env];
