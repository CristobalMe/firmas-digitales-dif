# DIF Digital signatures

## Overview

This project implements digital signature functionality, providing a secure way to verify the authenticity and integrity of digital documents.

![image](https://github.com/user-attachments/assets/1362cef6-cfdd-435a-bc6a-81b9d910cc4b)
![image](https://github.com/user-attachments/assets/7370ffd7-2197-4947-b3bc-c2fea1a2b8c7)
![image](https://github.com/user-attachments/assets/99cb4cd5-b191-4507-84c1-d11392d33ccc)

## Getting Started

To run the project:
```bash
git clone firmas-digitales-dif
cd firmas-digitales-dif
docker-compose up -d --build
```
Then, open your browser and go to `http://localhost:3000`.
You should see the application running.

## Techniques Used

This project leverages several mathematical and computational techniques to achieve secure digital signatures:

- **Elliptic Curve Cryptography (ECC):**  
  ECC is used for key generation and digital signature creation. Specifically, the `prime256v1` curve (also known as `secp256r1`) is employed, offering a good balance of security and performance. The `cryptoService.js` file contains the implementation for generating ECC key pairs.

- **SHA-256 Hashing:**  
  The SHA-256 algorithm is used to generate a cryptographic hash of the document being signed. This hash serves as a unique fingerprint of the document. Any alteration to the document will result in a different hash value. The `cryptoService.js` file uses SHA-256 for signing and verification.

- **Digital Signature Algorithm (ECDSA):**  
  ECDSA is used to generate the digital signature itself. The signature is created using the private key and the SHA-256 hash of the document.

- **Base64 Encoding:**  
  Base64 encoding is used to represent the digital signature in a text format that can be easily stored and transmitted.

- **Prisma:**  
  Prisma is an ORM (Object-Relational Mapper) that is used to interact with the database. It provides a type-safe way to perform CRUD (Create, Read, Update, Delete) operations on the database.

## File Structure

- **backend:** Contains the backend code, including the API endpoints, database models, and cryptographic functions.
- **frontend:** Contains the frontend code, including the user interface and logic for interacting with the backend.
- **docker-compose.yml:** Defines the services, networks, and volumes for the Docker application.
- **README.md:** This file, providing an overview of the project.

## Dependencies

- Node.js  
- Docker  
- Docker Compose  
- Prisma

