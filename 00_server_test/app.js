require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// rest package
const cors = require('cors');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandleMiddleware = require('./middleware/error-handler');

// router
const userRouter = require('./routes/user');

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 5555;
const start = async () => {
    try {
        await app.listen(port, () =>
            console.log(`Server listen on port ${port}...`)
        );
    } catch (err) {}
};

start();
