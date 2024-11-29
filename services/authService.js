import  {JwtService}  from './auth/jwtService.js';

import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('../db/users.db');

db.run(`CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT,
        message TEXT,
        timestamp DATETIME
        )`
    );
async function registerUser(){

}