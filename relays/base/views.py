from django.shortcuts import render
from .models import RelayRoom

# Create your views here.
#relayrooms=[
#    {'id':1,'name':'SEL'},
#    {'id':2, 'name':'MicoM'},
#    {'id':3, 'name':'Siemens'},
#]
 

def home(request):
    relayrooms = RelayRoom.objects.all()
    context ={'relayrooms':relayrooms}
    return render(request, 'base/home.html',context)

def relayroom(request, pk):
    relayroom=RelayRoom.objects.get(id=pk)
    context ={'relayroom':relayroom}
    return render(request,'base/relayroom.html',context)