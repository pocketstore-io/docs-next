#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available (plugin or standalone)
if ! docker compose version &> /dev/null
then
    echo "❌ Docker Compose is not installed or not available as 'docker compose'."
    echo "   Install Docker Compose plugin:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker & Docker Compose are installed."

# Clone repository
if git clone https://github.com/pocketstore-io/demo.git /var/www/demo; then
    echo "Repository cloned successfully."
else
    echo "❌ Failed to clone the repository."
    exit 1
fi

cd /var/www/demo || { echo "❌ Failed to enter project directory."; exit 1; }

# Start Docker containers
echo "🚀 Starting Docker containers..."
docker compose up