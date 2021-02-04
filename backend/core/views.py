from django.core.exceptions import PermissionDenied
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from core.models import Circle, Post

from .serializers import CircleSerializer, PostSerializer


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


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user


class PostViewSet(ModelViewSet):
    # TODO narrow down what posts are seen
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        data = serializer.validated_data
        circle = data['circle']

        if circle.is_member(self.request.user):
            serializer.save(author=self.request.user)
        else:
            raise PermissionDenied("You are not a member of that circle.")
