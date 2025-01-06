/**
 * author: Apurbo Howlader
 * date: 11/11/2024
 * description: create a crud feature
 */

// dependencies
const express = require('express');
const validation = require('./middleware/validation');
const signup = require('./middleware/crud/signup');
const login = require('./middleware/crud/login');
const dbManage = require('./middleware/dbManage');
const auth = require('./middleware/auth');
const cors = require('cors');

function dev_web0n({dir, port, auth: ah}) {
    require('./utils/dbListen')({dir});
    require('./middleware/isKey')({dir});
    const app = express();
    app.use(express.json());
    app.use(
        cors({
            origin: 'http://localhost:5173',
            allowedHeaders: ['Content-Type', 'Authorization'],
        })
    );

    app.post('/signup', validation, signup);

    app.post('/login', login);

    app.use(auth({auth:ah, dir}), dbManage);

    app.listen(port, () => {
        console.log(`server is running port on ${port}....`);
    });
}

dev_web0n({auth:true, dir: __dirname, port: 3000})

module.exports = dev_web0n;
