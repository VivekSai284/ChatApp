# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer

class MessageListCreateView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]



class ChatMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user1 = request.query_params.get('user1')
        user2 = request.query_params.get('user2')

        if not user1 or not user2:
            return Response({'error': 'Missing user1 or user2 in query'}, status=400)

        # Fetch messages where user1 sent to user2 OR user2 sent to user1
        messages = Message.objects.filter(
            Q(sender_id=user1, receiver_id=user2) |
            Q(sender_id=user2, receiver_id=user1)
        ).order_by('timestamp')

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
