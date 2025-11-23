const express = require('express');
const createError = require('http-errors');
const path = require('path');

const { dbMiddleware } = require('./bin/db');
const initializeDatabase = require('./setup_scripts/setup');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use an async function to initialize DB first
async function startServer() {
    try {
        await initializeDatabase();  // Wait for DB setup
        app.use(dbMiddleware);       // Attach middleware after DB is ready

        // Routes
        app.use('/', indexRouter);

        // catch 404
        app.use((req, res, next) => {
            next(createError(404));
        });

        // error handler
        app.use((err, req, res, next) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        });

        // Start server
        const port = 3000;
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
}

// Run the async start
startServer();

module.exports = app;
