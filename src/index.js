const express = require('express');
const app = express();
const router = require('./routes/userRoutes');
const db = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/api/user', router);

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})