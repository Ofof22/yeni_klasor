@echo off

:start
cls
color 7
node .
color 4
echo App crashed. Trying again within 5 seconds
timeout /t 5 /nobreak > nul


goto start