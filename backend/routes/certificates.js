import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import forge from 'node-forge';
import fs from 'fs';

const router = express.Router();
const prisma = new PrismaClient();

const caPrivateKeyPem = fs.readFileSync('./ca/ca-key.pem', 'utf-8');
const caCertPem = fs.readFileSync('./ca/ca-cert.pem', 'utf-8');

router.post('/issue', async (req, res) => {
  try {
    const { userId } = req.body;
    const key = await prisma.key.findFirst({ where: { userId } });
    if (!key) return res.status(404).json({ error: 'Key not found' });

    const cert = forge.pki.createCertificate();
    cert.publicKey = forge.pki.publicKeyFromPem(key.publicKey);
    cert.serialNumber = Date.now().toString();
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    cert.setSubject([{ name: 'commonName', value: userId }]);

    // TO DO: FIX CA
    cert.setIssuer(forge.pki.certificateFromPem(caCertPem).subject.attributes);
    const caKey = forge.pki.privateKeyFromPem(caPrivateKeyPem);
    cert.sign(caKey, forge.md.sha256.create());

    const pem = forge.pki.certificateToPem(cert);
    const created = await prisma.certificate.create({
      data: {
        pem,
        keyId: key.id,
      },
    });

    res.json({ message: 'Certificate issued', cert: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const keys = await prisma.key.findMany({ where: { userId }, include: { certificate: true } });
    res.json(keys.map(k => k.certificate));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/revoke/:certId', async (req, res) => {
  try {
    const { certId } = req.params;
    const cert = await prisma.certificate.update({
      where: { id: certId },
      data: { revoked: true, revokedAt: new Date() },
    });
    res.json({ message: 'Certificate revoked', cert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;