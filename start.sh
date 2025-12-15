#!/bin/bash

# Start both backend and frontend servers
echo "Starting SurveyJS Evaluation Tool..."
echo ""

# Start backend in background
echo "Starting backend server on port 3001..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start frontend
echo "Starting frontend on port 4200..."
cd frontend
npm start
cd ..
