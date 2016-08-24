import os, glob, json, time
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# This creates a page that return JSON data for AJAX request.
def ajax(request):
    path = os.path.join(settings.FILE_PATH + "*.json")
    files = glob.glob(path)
    files_data = []
    for file in files:
        opener = open(file, 'r')
        json_data = opener.read()
        file_data = json.loads(json_data.replace("\'", '"'))
        files_data += file_data
        opener.close()
    return HttpResponse(json.dumps(files_data), content_type = "application/json")

# This creates the page where the table is rendered.
def index(request):
    return render(request, 'index.html')

# This helps in popping an alert with AJAX request when a new file is added or deleted.
def watch(request):
    path_to_watch = os.path.join(settings.FILE_PATH)
    before = dict ([(f, None) for f in os.listdir (path_to_watch)])
    while 1:
        time.sleep (10)
        after = dict ([(f, None) for f in os.listdir (path_to_watch)])
        added = [f for f in after if not f in before]
        removed = [f for f in before if not f in after]
        if added: return HttpResponse("Added")
        if removed: return HttpResponse("Removed")
        before = after
