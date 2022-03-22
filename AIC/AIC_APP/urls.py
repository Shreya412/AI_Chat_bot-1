from django.urls import path

from . import views

urlpatterns = [
    path('home', views.index, name="Home"),
    path('', views.index, name="Home"),
    path('fetchInputTextArea', views.fetchInputTextArea, name="fetchInputTextArea"),
    path('QueGenerator', views.QueGenerator, name="QueGenerator"),
    path('takeOutputdp', views.takeOutputdp, name="takeOutput"),
    path('QueShow', views.QueShow, name="QueShow"),
    path('trainModel', views.trainModel, name="trainModel"),
    path('updateJson', views.updateJson, name="updateJson"),
    path('improveFeatures', views.improveFeatures, name="improveFeatures")

]
