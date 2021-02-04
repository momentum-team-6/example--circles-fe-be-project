from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Circle(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(to=User,
                                     through='CircleMembership',
                                     related_name="circles")

    def is_member(self, user):
        return user in self.members.all()


class CircleMembership(models.Model):
    circle = models.ForeignKey(to=Circle,
                               related_name="memberships",
                               on_delete=models.CASCADE)
    user = models.ForeignKey(to=User,
                             related_name="memberships",
                             on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)


class Post(models.Model):
    author = models.ForeignKey(to=User,
                               on_delete=models.CASCADE,
                               related_name='posts')
    circle = models.ForeignKey(to=Circle,
                               on_delete=models.CASCADE,
                               related_name='posts')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
