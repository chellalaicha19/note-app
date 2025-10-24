from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import noteSerializer
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    return Response('Our API')

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = noteSerializer(notes,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request,pk):
    note = Note.objects.get(id=pk)
    serializer = noteSerializer(note,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = noteSerializer(instance=note, data=data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request,pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response("note deleted")
    
    
@api_view(['POST'])
def addNote(request):
    data = request.data
    note = Note.objects.create(body=data.get('body',''))
    serializer = noteSerializer(note)
        
    return Response(serializer.data)
    