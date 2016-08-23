import os
import json
import glob
from django.conf import settings
from django.shortcuts import render
# import pdb

# Create your views here.

def index(request):
    #opens the json file and saves the raw contents
    path = os.path.join(settings.FILE_PATH)
    files = glob.glob(path)
    files_data = []
    for file in files:
        opener = open(file, 'r')
        file_data = opener.read()
        # d = serializers.serialize("json", file_data)
        # file_data = file_data.replace('\r', '\\r').replace('\n', '\\n')
        d = json.loads(file_data.replace("\'", '"'))


    #disconnects the file from the variable
        opener.close()

    # pdb.set_trace()
    return render(request, 'index.html', {'data': d})
