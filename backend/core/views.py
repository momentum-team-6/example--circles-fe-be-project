from core.models import Circle, Post
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import CircleSerializer, PostSerializer, UserSerializer


class TestView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data)


class CircleViewSet(ModelViewSet):
    queryset = Circle.objects.all()
    serializer_class = CircleSerializer

    # on create, we need to make a circle membership
    # for the user creating the circle and make them an admin
    def perform_create(self, serializer):
        circle = serializer.save()
        circle.memberships.create(user=self.request.user, is_admin=True)

    # TODO add permissioning to make sure only admins can update or delete
    # a circle


class PostViewSet(ModelViewSet):
    # TODO narrow down what posts are seen
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # TODO ensure user has access to circle they are creating post in
        serializer.save(author=self.request.user)
