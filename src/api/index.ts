import express from 'express';
import cors from 'cors';
import instructDrone from './routes/instruct-drone';
import getBillboard from './routes/get-billboard';

const app = express();

app.use(cors());

app.get('/instruct-drone', instructDrone);
app.get('/get-billboard', getBillboard);

app.get('/', (req, res) => {
    res.send('Welcome to the Drone API');
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
