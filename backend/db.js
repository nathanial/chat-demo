const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chat-demo.sqlite3');

function setupDB(){
  db.serialize(() => {
    db.run('CREATE TABLE user (id INT PRIMARY KEY, name TEXT)');
    db.run('CREATE TABLE message (id INT PRIMARY KEY, user_id INT REFERENCES user(id), message TEXT)');
    db.run('INSERT INTO user (id, name) VALUES (1, "Default User")');
  });
}

function insertMessage(message) {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(() => {
        const stmt = db.prepare("INSERT INTO message (user_id, message) VALUES (?,?)");
        stmt.run(1, message, function() {
          resolve(this.lastID);
        });
        stmt.finalize();
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {setupDB: setupDB, insertMessage: insertMessage}