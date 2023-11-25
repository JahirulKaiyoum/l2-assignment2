import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './App/modules/user/user.routes';
const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World...............................................!');
});

app.use('/api/users', UserRoutes);

export default app;
