import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('logs.db');

db.run(`CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT,
        message TEXT,
        timestamp DATETIME
        )`
    );
const saveLog = (level, message)=>{
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

    db.run( 

        `INSERT INTO logs (level, message, timestamp) VALUES (?, ?, ?)`,
        [level, message, timestamp],
        (err) => {
            if (err) {
                console.error('Ошибка при сохранении лога:', err);
            } else {
                console.log('Лог успешно сохранён:', { level, message, timestamp });
            }
        }
    );    
}
export default {saveLog};