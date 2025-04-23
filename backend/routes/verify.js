import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import forge from 'node-forge';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/certificate', async (req, res) => {
  try {
    const { certPem } = req.body;
    const cert = forge.pki.certificateFromPem(certPem);
    const caCert = forge.pki.certificateFromPem(fs.readFileSync('./ca/ca-cert.pem', 'utf-8'));

    const verified = caCert.verify(cert);
    const serial = cert.serialNumber;

    const dbCert = await prisma.certificate.findFirst({ where: { pem: certPem } });
    const isRevoked = dbCert?.revoked || false;

    res.json({ verified, revoked: isRevoked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

export default router;