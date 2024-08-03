import express from 'express';
import login from './login.js';

const route = (app) => {
    app.use(
        express.json(),
        login
    )
}

export default route;