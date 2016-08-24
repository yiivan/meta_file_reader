import os, glob, json, time
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def ajax(request):
    path = os.path.join(settings.FILE_PATH + "*.json")
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

def watch_modified(request):
    path_to_watch = os.path.join(settings.FILE_PATH + "*.json")
    files = glob.glob(path_to_watch)
    cached_stamp = {}
    stamp = {}
    first = True
    while 1:
        time.sleep (10)
        for file in files:
            stamp[file] = os.stat(file).st_mtime
            if first:
                cached_stamp[file] = stamp[file]

            if stamp[file] != cached_stamp[file]:
                cached_stamp[file] = stamp[file]
                # File has changed, so do something...
                return HttpResponse("Modified")
        first = False
