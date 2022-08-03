import express, { Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv'

import Routes from './routes';

import mustache from 'mustache-express';


dotenv.config();


const app = express();

app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(Routes);

app.use((req:Request, res:Response) => {

    res.status(404).render('pages/notfound');
})

app.listen(process.env.PORT, () => console.log('Server is up and running'))