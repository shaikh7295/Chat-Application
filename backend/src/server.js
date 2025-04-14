    require('dotenv').config();
    const http = require('http');
    const app = require('./app');
    const { configureSocket } = require('./config/socketConfig');
    const router = require('./route/route')

    const port = process.env.PORT || 5001;

    const server = http.createServer(app);
    const io = configureSocket(server);

    app.use('/api', router)

    app.set('io', io);


    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
