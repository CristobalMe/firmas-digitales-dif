import forge from 'node-forge';
import fs from 'fs';

const generateCACertificate = () => {
    let certificateExists = false;
    // Check if the CA directory exists, if not create it
    if (!fs.existsSync('./ca')) {
        fs.mkdirSync('./ca', { recursive: true });
    }

    // Check if the CA key and certificate already exist
    if (fs.existsSync('./ca/ca-key.pem') && fs.existsSync('./ca/ca-cert.pem')) {
        certificateExists = true;
    }

    if (!certificateExists) {
        // Generate a new CA certificate and private key
        const ec = forge.pki.ec;
        const keypair = ec.generateKeyPair({ namedCurve: 'P-256' }); // or 'secp256r1'

        const caPrivateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
        const caPublicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);

        fs.writeFileSync('./ca/ca-key.pem', caPrivateKeyPem, 'utf-8');
        fs.writeFileSync('./ca/ca-cert.pem', caPublicKeyPem, 'utf-8');
    }

    
    // Create a self-signed CA certificate
    const cert = forge.pki.createCertificate();
    // cert.publicKey = keypair.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10); // 10 years of validity

    // load public key from file
    const publicKey = fs.readFileSync('./ca/ca-key.pem', 'utf-8');
    const privateKey = fs.readFileSync('./ca/ca-cert.pem', 'utf-8');

    cert.publicKey = forge.pki.publicKeyFromPem(publicKey);
    cert.privateKey = forge.pki.privateKeyFromPem(privateKey);


    const attrs = [
        { name: 'commonName', value: 'CA Modern Algebras' },
        { name: 'countryName', value: 'MX' },
        { shortName: 'ST', value: 'Jalisco' },
        { name: 'localityName', value: 'Zapopan' },
        { name: 'organizationName', value: 'TEC' },
    ];

    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    cert.setExtensions([
        { name: 'basicConstraints', cA: true },
        { name: 'keyUsage', keyCertSign: true, digitalSignature: true },
    ]);

    cert.sign(cert.privateKey, forge.md.sha256.create());

    const caCertPem = forge.pki.certificateToPem(cert);
}

// TODO: CODE A FUNCTION TO GENERATE CERTIFICATES FOR USERS FROM THIS CODE

// Generate a new CA certificate and private key
const ec = forge.pki.ec;
const keypair = ec.generateKeyPair({ namedCurve: 'P-256' }); // or 'secp256r1'

const caPrivateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
const caPublicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);

fs.writeFileSync('./ca/ca-key.pem', caPrivateKeyPem, 'utf-8');
fs.writeFileSync('./ca/ca-cert.pem', caPublicKeyPem, 'utf-8');

// Create a self-signed CA certificate
const cert = forge.pki.createCertificate();
cert.publicKey = keypair.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10); // 10 years of validity

const attrs = [
  { name: 'commonName', value: 'CA Modern Algebras' },
  { name: 'countryName', value: 'MX' },
  { shortName: 'ST', value: 'Jalisco' },
  { name: 'localityName', value: 'Zapopan' },
  { name: 'organizationName', value: 'TEC' },
];

cert.setSubject(attrs);
cert.setIssuer(attrs);

cert.setExtensions([
  { name: 'basicConstraints', cA: true },
  { name: 'keyUsage', keyCertSign: true, digitalSignature: true },
]);

cert.sign(keypair.privateKey, forge.md.sha256.create());

const caCertPem = forge.pki.certificateToPem(cert);
