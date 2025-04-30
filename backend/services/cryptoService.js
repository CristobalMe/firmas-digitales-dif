import { generateKeyPairSync, createSign, createVerify } from 'crypto';

export function generateECCKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync('ec', {
    namedCurve: 'prime256v1', // secp256r1
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  return { publicKey, privateKey };
}

export function signData(privateKeyPem, data) {
  const sign = createSign('SHA256');
  sign.update(data);
  sign.end();
  return sign.sign(privateKeyPem, 'base64');
}

export function verifySignature(publicKeyPem, data, signature) {
  const verify = createVerify('SHA256');
  verify.update(data);
  verify.end();
  return verify.verify(publicKeyPem, signature, 'base64');
}