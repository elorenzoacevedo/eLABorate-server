import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    password: '!QAZxsw2',
    host:'localhost',
    port: 5432,
    database: 'inital_db',
    
});