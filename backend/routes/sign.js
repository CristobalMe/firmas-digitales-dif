import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import { signData, verifySignature } from '../services/cryptoService.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/sign', async (req, res) => {
  try {
    const { userId, data } = req.body;
    const key = await prisma.key.findFirst({ where: { userId } });
    if (!key) return res.status(404).json({ error: 'Key not found' });

    const signature = signData(key.privateKey, Buffer.from(data));
    res.json({ signature });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { userId, data, signature } = req.body;
    const key = await prisma.key.findFirst({ where: { userId } });
    if (!key) return res.status(404).json({ error: 'Key not found' });

    const valid = verifySignature(key.publicKey, Buffer.from(data), signature);
    res.json({ valid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;