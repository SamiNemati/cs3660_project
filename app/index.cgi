#! C:\Users\samin\AppData\Local\Microsoft\WindowsApps\python.exe
from wsgiref.handlers import CGIHandler
from app import app
CGIHandler().run(app)