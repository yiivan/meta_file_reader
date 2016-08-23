import os
import json
from django.conf import settings
from django.shortcuts import render



# Create your views here.

def index(request):
    #opens the json file and saves the raw contents
    opener = open(os.path.join(settings.ROOT_PATH, 'sample.json'))
    data = opener.read()

    #disconnects the file from the variable
    opener.close()

    return render(request, 'index.html', {'data': data})
