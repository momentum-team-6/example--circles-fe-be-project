from django.core.exceptions import PermissionDenied
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination

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


class MembershipsViewSet(ModelViewSet):
    pass

    # TODO allow admins of circles to add, update, and delete members from circles


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        """Users should only be able to see posts from the circles they are
        members of. They can optionally filter by circle pk."""

        posts = Post.objects.filter(circle__members=self.request.user)
        circle_pk = self.request.query_params.get('circle', None)
        if circle_pk is not None:
            posts = posts.filter(circle__pk=circle_pk)
        return posts

    @action(detail=False, methods=['get'])
    def mine(self, request):
        queryset = Post.objects.filter(
            author=request.user).order_by('-created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        data = serializer.validated_data
        circle = data['circle']

        if circle.is_member(self.request.user):
            serializer.save(author=self.request.user)
        else:
            raise PermissionDenied("You are not a member of that circle.")
