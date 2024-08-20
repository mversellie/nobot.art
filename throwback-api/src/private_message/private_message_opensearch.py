import string
from datetime import datetime

from content.content_opensearch import Content
from content.content_response import ContentResponse
from exceptions.custom_exceptions import ContentNotFoundException
from opensearch.opensearch_service import OpenSearchService
from opensearchpy import Document, Text,Date, Keyword, Boolean,Integer

class PrivateMessage(Document):
    username = Text(fields={'raw': Keyword()})
    edited = Date()
    pmId = Text(fields={'raw': Keyword()})
    content = Text()

    class Index:
        name = "private_messages"

    def save(self, ** kwargs):
        return super(PrivateMessage, self).save(** kwargs)
