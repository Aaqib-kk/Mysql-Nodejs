const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'aqib',
    password: 'Abcd1234',
});

const dbName = 'nodemysqlV2';

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL server');

    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log(`Database '${dbName}' created successfully`);

        connection.changeUser({ database: dbName }, (err) => {
            if (err) {
                console.error('Error switching to database:', err);
                return;
            }
            console.log(`Switched to database '${dbName}'`);

            const createUsersTableSQL = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    userEmail VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    profilePic VARCHAR(255) NOT NULL
                )
            `;

            connection.query(createUsersTableSQL, (err) => {
                if (err) {
                    console.error('Error creating users table:', err);
                    return;
                }
                console.log('Users table created successfully');

                const createOTPTableSQL = `
                    CREATE TABLE IF NOT EXISTS otp (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        otp VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `;
                connection.query(createOTPTableSQL, (err) => {
                    if (err) {
                        console.error('Error creating OTP table:', err);
                        return;
                    }
                    console.log('OTP Table created successfully');

                    const createChatTableSQL = `
                        CREATE TABLE IF NOT EXISTS chat (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            sender VARCHAR(255) NOT NULL,
                            receiver VARCHAR(255) NOT NULL,
                            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                    `;

                    connection.query(createChatTableSQL, (err) => {
                        if (err) {
                            console.error('Error creating chat table:', err);
                            return;
                        }
                        console.log('Chat Table created successfully');

                        const createMessageTableSQL = `
                            CREATE TABLE IF NOT EXISTS message (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                sender VARCHAR(255) NOT NULL,
                                chatId INT NOT NULL,
                                message VARCHAR(255) NOT NULL,
                                messageType VARCHAR(255) NOT NULL,
                                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (chatId) REFERENCES chat(id)
                            )
                        `;

                        connection.query(createMessageTableSQL, (err) => {
                            if (err) {
                                console.error('Error creating message table:', err);
                                return;
                            }
                            console.log('Message Table created successfully');

                            // Close the connection
                            connection.end((err) => {
                                if (err) {
                                    console.error('Error closing connection:', err);
                                } else {
                                    console.log('Connection closed');
                                }
                            });
                        });
                    });
                });
            });
        });
    });
});
    