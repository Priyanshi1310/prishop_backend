const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = 3000;

async function startServer() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            dbName: 'shop'
        });
        console.log('Connected to MongoDB');

        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
}

startServer();