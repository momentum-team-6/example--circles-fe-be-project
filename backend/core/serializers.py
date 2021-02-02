from rest_framework import serializers
from .models import Circle, CircleMembership, Post, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]


class EmbeddedCircleMembershipSerializer(serializers.HyperlinkedModelSerializer
                                         ):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CircleMembership
        fields = ['user', 'is_admin', 'created_at']


class CircleSerializer(serializers.HyperlinkedModelSerializer):
    memberships = EmbeddedCircleMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Circle
        fields = [
            'url',
            'name',
            'memberships',
        ]


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['url', 'author', 'circle', 'message', 'created_at']
