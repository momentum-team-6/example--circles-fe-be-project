from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer


class TestView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data)
