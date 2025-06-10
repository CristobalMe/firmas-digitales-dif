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
    const { data, signature } = req.body;
    const keys = await prisma.key.findMany({});
    let valid_key = null;

    if (!keys.length) return res.status(404).json({ error: 'Key not found' });

    let valid = false;
    for (const key of keys) {
      valid = verifySignature(key.publicKey, Buffer.from(data), signature);
      if (valid) {
        valid_key = key;
        const user = await prisma.user.findFirst({ where: { id: key.userId } });
        return res.json({ isValid: valid, user: { email: user.email, name:user.name } });
      }
    }
    return res.json({ isValid: false })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;