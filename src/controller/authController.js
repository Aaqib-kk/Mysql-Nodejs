const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
    const { userName, userEmail, password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // const sql = `INSERT INTO users (userName, userEmail, password) VALUES ('${userName}', '${UserEmail}', '${hashedPassword}')`;
        const sql = `INSERT INTO users (userName, userEmail, password) VALUES (?, ?, ?)`; // ? is a placeholder
        db.query(sql, [userName, userEmail, hashedPassword], (err, result) => {
            if(err) {
               res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'User registered successfully' });
            }

        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    register
}