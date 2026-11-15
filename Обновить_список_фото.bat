@echo off
cd /d "%~dp0"
py -3 update_photos.py
if errorlevel 1 python update_photos.py
pause
