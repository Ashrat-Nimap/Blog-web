const db = require('../config/db');

db.run(`ALTER TABLE blogs ADD COLUMN likedBy TEXT DEFAULT '[]';`, (err) => {
    if (err) {
        if (err.message.includes("duplicate column name")) {
            console.log("Column 'likedBy' already exists.");
        } else {
            console.error("Error adding column:", err.message);
        }
    } else {
        console.log("Column 'likedBy' added successfully!");
    }
    db.close();
});
