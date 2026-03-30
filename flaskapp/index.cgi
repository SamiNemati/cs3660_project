#!C:\Users\samin\AppData\Local\Programs\Python\Python314\python.exe
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from wsgiref.handlers import CGIHandler
from app import app
CGIHandler().run(app)