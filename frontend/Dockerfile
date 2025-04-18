# Use the official Node.js 14 image.
FROM node:23-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Now copy the rest of the app (including tsconfig.json, src/, public/, etc.)
COPY . .

# Build the app now that everything is available
RUN npm run build

# Expose port 3000 for the React dev server
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
