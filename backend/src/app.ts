import express, { Application, Request, Response, NextFunction  } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);


dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../.env') });

const app: Application = express();

// Middleware
app.use(cors({
  origin: [
    "https://note-taking-app-1.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);


const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

export default app;