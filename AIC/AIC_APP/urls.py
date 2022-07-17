
from . import views
from django.urls import path, include


urlpatterns = [

    path('', views.index, name="AIC"),
    path('fetchInputTextArea', views.fetchInputTextArea, name="fetchInputTextArea"),
    path('QueGenerator', views.QueGenerator, name="QueGenerator"),
    path('generateFAQs', views.generateFAQs, name="generateFAQs"),
    path('takeOutputdp', views.takeOutputdp, name="takeOutput"),
    path('QueShow', views.QueShow, name="QueShow"),
    path('trainModel', views.trainModel, name="trainModel"),
    path('chatAssistant', views.chatAssistant, name="chatAssistant"),
    path('onlyAnswersData', views.onlyAnswersData, name="onlyAnswersData"),
    path('questionAnswerData', views.questionAnswerData, name="questionAnswerData"),
    path('linkSubmit', views.linkSubmit, name="linkSubmit"),
    path('fileSubmit', views.fileSubmit, name="csvSubmit"),
    path('improveFeatures', views.improveFeatures, name="improveFeatures"),
    path('questionAnswers', views.questionAnswers, name="questionAnswers"),
    path('onlyAnswers', views.onlyAnswers, name="onlyAnswers"),
    path('linkInput', views.linkInput, name="linkInput"),
    path('filesInput', views.filesInput, name="filesInput"),
    path('paragraph', views.paragraph, name="paragraph"),
]
