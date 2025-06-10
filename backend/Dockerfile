FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 4000

# Command to run the application and apply migrations
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]