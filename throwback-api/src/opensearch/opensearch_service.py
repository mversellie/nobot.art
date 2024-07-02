import string

from settings_service import SettingsService
from opensearchpy import OpenSearch, Document, Search

class OpenSearchService:
    def __init__(self):
        self.settings = SettingsService()
        username = self.settings.get("OPENSEARCH_USERNAME")
        password = self.settings.get("OPENSEARCH_PASSWORD")
        auth = (username,password)
        self.client = OpenSearch(
            hosts = [{'host': self.settings.get("OPENSEARCH_HOST"),
                      'port': self.settings.get("OPENSEARCH_PORT")}],
            http_compress = True, # enables gzip compression for request bodies
            http_auth = auth,
            use_ssl = True,
            verify_certs = False,
            ssl_assert_hostname = False,
            ssl_show_warn = False
        )

    def save(self,a_document:Document):
        a_document.save(using = self.client)

    def start_index_search(self,index:string):
        return Search(using=self.client, index=index )

