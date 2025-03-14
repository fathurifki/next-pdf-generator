# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

ENV NEXT_PUBLIC_JSON_PLACEHOLDER_API_URL=https://jsonplaceholder.typicode.com/users
ENV NEXT_PUBLIC_RANDOM_USER_API_URL=https://randomuser.me/api/
ENV SECRET_JSON_PLACEHOLDER_API_URL=https://jsonplaceholder.typicode.com/users
ENV SECRET_RANDOM_USER_API_URL=https://randomuser.me/api/

# Create .env file from environment variables
RUN echo "Creating .env" && \
    echo "SECRET_JSON_PLACEHOLDER_API_URL=${SECRET_JSON_PLACEHOLDER_API_URL}" > .env && \
    echo "SECRET_RANDOM_USER_API_URL=${SECRET_RANDOM_USER_API_URL}" >> .env && \
    echo "NEXT_PUBLIC_JSON_PLACEHOLDER_API_URL=${NEXT_PUBLIC_JSON_PLACEHOLDER_API_URL}" >> .env && \
    echo "NEXT_PUBLIC_RANDOM_USER_API_URL=${NEXT_PUBLIC_RANDOM_USER_API_URL}" >> .env

RUN cat .env

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js uses
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]