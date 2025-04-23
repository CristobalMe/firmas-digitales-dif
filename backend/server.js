import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import certRoutes from './routes/certificates.js';
import signRoutes from './routes/sign.js';
import verifyRoutes from './routes/verify.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/certificates', certRoutes);
app.use('/sign', signRoutes);
app.use('/verify', verifyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});