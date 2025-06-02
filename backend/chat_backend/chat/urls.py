from django.urls import path, include
from .views import MessageListCreateView
from .views import ChatMessagesView

urlpatterns = [
    path('messages/', MessageListCreateView.as_view(), name='chat-messages'),
    path('messages/chat/', ChatMessagesView.as_view(), name='chat-messages'),
]
