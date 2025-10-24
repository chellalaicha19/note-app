from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes,name='routes'),
    path('notes/',views.getNotes,name='notes'),
    path('notes/create/',views.addNote,name='note-create'),
    path('notes/<str:pk>/update/',views.updateNote,name='note-update'),
    path('notes/<str:pk>/delete/',views.deleteNote,name='note-delete'),
    
    path('notes/<str:pk>/',views.getNote,name='note'),
]

