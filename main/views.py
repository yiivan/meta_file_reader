import os
import json
import glob
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
# import pdb

# Create your views here.

def index(request):
    #opens the json files and saves the raw contents and deserialize it
    path = os.path.join(settings.FILE_PATH)
    files = glob.glob(path)
    files_data = []
    for file in files:
        opener = open(file, 'r')
        json_data = opener.read()
        file_data = json.loads(json_data.replace("\'", '"'))
        files_data += file_data
    #disconnects the file from the variable
        opener.close()

        # pdb.set_trace()

    return render(request, 'index.html', {'data': files_data})

def ajax(request):
    path = os.path.join(settings.FILE_PATH)
    files = glob.glob(path)
    files_data = []
    for file in files:
        opener = open(file, 'r')
        json_data = opener.read()
        file_data = json.loads(json_data.replace("\'", '"'))
        files_data += file_data
    #disconnects the file from the variable
        opener.close()
    return HttpResponse(json.dumps(files_data), content_type = "application/json")

def index2(request):
    return render(request, 'index2.html')
