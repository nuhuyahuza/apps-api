import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import sequelize from '@src/utils/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import appRoutes from './routes/app.routes';
import { APIResponse } from './types/api-response';

// Load environment variables from .env file
dotenv.config();

const app = express();

interface CorsOptions {
  origin: string;
}

const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN || "https://localhost:8000",
};


// Middleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/apps', appRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ _msg: 'Welcome to the App Dashboard API' } as APIResponse);
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' } as APIResponse);
});

// Sync database and start server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
export default app;