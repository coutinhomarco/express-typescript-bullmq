import express from 'express';
import userRoutes from './api/routes/user.routes';
import { rateLimit } from 'express-rate-limit'

import './config/bullmq';


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,   // 15 minutes
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express();

app.use(limiter)

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});