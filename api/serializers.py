from rest_framework import serializers
from .models import Note


class noteSerializer(serializers.ModelSerializer):
    class Meta :
        model = Note
        fields = ['id','body', 'updated', 'created']
