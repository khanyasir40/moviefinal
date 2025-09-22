#!/bin/bash

echo "====================================="
echo "   Movie App Quick Setup Script"
echo "====================================="
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    echo
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed!${NC}"
    echo "Please install Git from https://git-scm.com/"
    echo
    exit 1
fi

echo -e "${GREEN}✅ Node.js and Git are installed!${NC}"
echo

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 Creating .env file...${NC}"
    cat > .env << EOF
MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
EOF
    echo -e "${GREEN}✅ .env file created!${NC}"
else
    echo -e "${GREEN}✅ .env file already exists!${NC}"
fi
echo

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
if [ -d "backend" ] && [ -f "backend/package.json" ]; then
    cd backend
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend dependencies installed!${NC}"
    else
        echo -e "${RED}❌ Failed to install backend dependencies!${NC}"
        cd ..
        exit 1
    fi
    cd ..
else
    echo -e "${RED}❌ backend/package.json not found!${NC}"
    exit 1
fi
echo

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
    cd frontend
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend dependencies installed!${NC}"
    else
        echo -e "${RED}❌ Failed to install frontend dependencies!${NC}"
        cd ..
        exit 1
    fi
    cd ..
else
    echo -e "${RED}❌ frontend/package.json not found!${NC}"
    exit 1
fi
echo

echo "====================================="
echo -e "${GREEN}   ✅ Setup Complete!${NC}"
echo "====================================="
echo
echo "To run your movie app:"
echo
echo "1. Open TWO terminals"
echo
echo "2. In Terminal 1 (Backend):"
echo "   cd backend"
echo "   npm start"
echo
echo "3. In Terminal 2 (Frontend):"
echo "   cd frontend"
echo "   npm start"
echo
echo "4. Open browser to: http://localhost:3000"
echo
echo "====================================="
echo