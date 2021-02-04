from rest_framework import serializers
from .models import Circle, CircleMembership, Post, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]


class CircleMembershipSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CircleMembership
        fields = ['pk', 'user', 'is_admin', 'created_at']


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['url', 'author', 'circle', 'message', 'created_at']


class CircleSerializer(serializers.HyperlinkedModelSerializer):
    memberships = CircleMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Circle
        fields = [
            'pk',
            'url',
            'name',
            'memberships',
        ]


class DetailedCircleSerializer(serializers.HyperlinkedModelSerializer):
    memberships = CircleMembershipSerializer(many=True, read_only=True)
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Circle
        fields = [
            'pk',
            'url',
            'name',
            'memberships',
            'posts',
        ]
