const Database = require('better-sqlite3')
const db = new Database("produtos.db")

db.exec(`CREATE TABLE IF NOT EXISTS produtos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            desc TEXT NOT NULL
    )
`)

module.exports = db