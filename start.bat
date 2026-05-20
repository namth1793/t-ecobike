@echo off
echo ========================================
echo  KAI Electric Scooter - Starting...
echo ========================================
echo.
echo  Backend : http://localhost:5028
echo  Frontend: http://localhost:5174
echo ========================================
echo.

start "KAI Backend" cmd /k "cd backend && npm run dev"
timeout /t 2 /nobreak >nul
start "KAI Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:5174
