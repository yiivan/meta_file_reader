import os
import json
import glob
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

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

def index(request):
    return render(request, 'index.html')
