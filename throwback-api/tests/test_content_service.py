import uuid
import time
from unittest.mock import MagicMock, Mock, patch

import unittest

import minio
from content.content_database import ContentRepository
from content.content_service import ContentService
from exceptions.custom_exceptions import ContentNotFoundException
from mocks.test_mocks import get_throwback_content_mock, get_mock_upload_content_request
from minio import Minio


class TestContentService(unittest.TestCase):

    test_uuid = uuid.uuid4()
    test_time = time.time()

    def test_get_content_works(self):
        test_content_service = ContentService()
        content_mock = get_throwback_content_mock()
        test_content_service.content_repository.get_content_by_creator_and_name = MagicMock(return_value=content_mock)
        actual = test_content_service.get_content_by_creator_and_name(content_mock["title"],content_mock["creator"])
        expected = content_mock
        self.assertEqual(actual, expected)

    def test_get_content_not_found_exception_raised(self):
        test_content_service = ContentService()
        content_mock = get_throwback_content_mock()
        test_content_service.content_repository.get_content_by_creator_and_name = (
            MagicMock(side_effect=ContentNotFoundException("not found")))
        with self.assertRaises(ContentNotFoundException) as raised:
            test_content_service.get_content_by_creator_and_name(content_mock["title"],content_mock["creator"])

    @patch.object(minio.Minio, 'put_object', MagicMock())
    @patch.object(minio.Minio, 'bucket_exists', MagicMock(return_value=True))
    @patch.object(ContentRepository, 'save_new_content', MagicMock())
    @patch.object(uuid, 'uuid4', MagicMock(return_value= test_uuid))
    @patch.object(time, 'time', MagicMock(return_value = test_time))
    def test_save_content_works(self):
        #arrange
        test_content_service = ContentService()
        expected_bucket = test_content_service.bucket
        content_input = get_mock_upload_content_request()
        expected_args = {"width":720,"height":720,"extension":"png","creator":"aCreator","description":"a description",
                         "filename":"the_filename.png","name":"aTitle",
                         "created":self.test_time,"content_id":str(self.test_uuid),"filename_S3":"aTitle-aCreator.png"}

        #act
        test_content_service.save_content(content_input)

        #assert
        minio_stats:Minio = test_content_service.s3_client
        repo_stats:ContentRepository = test_content_service.content_repository
        self.assertEqual(minio_stats.bucket_exists.mock_calls[0].args[0],expected_bucket)

        self.assertEqual(minio_stats.put_object.mock_calls[0].args[0],("main"))
        self.assertEqual(minio_stats.put_object.mock_calls[0].args[1],("full-aTitle-aCreator.png"))
        self.assertEqual(minio_stats.put_object.mock_calls[1].args[1],("aTitle-aCreator.png"))
        self.assertEqual(expected_args, repo_stats.save_new_content.mock_calls[0].kwargs)

    @patch.object(minio.Minio, 'put_object', MagicMock())
    @patch.object(minio.Minio, 'bucket_exists', MagicMock(return_value=True))
    @patch.object(ContentRepository, 'save_new_content', MagicMock())
    @patch.object(uuid, 'uuid4', MagicMock(return_value= test_uuid))
    @patch.object(time, 'time', MagicMock(return_value = test_time))
    def test_save_content_fails_on_type_mismatch(self):
        #arrange
        test_content_service = ContentService()
        expected_bucket = test_content_service.bucket
        content_input = get_mock_upload_content_request()
        content_input.filename="the_filename.badext"

        #act
        test_content_service.save_content(content_input)

        #assert
        minio_stats:Minio = test_content_service.s3_client
        repo_stats:ContentRepository = test_content_service.content_repository
        self.assertFalse(minio_stats.put_object.called)
        self.assertFalse(repo_stats.save_new_content.called)

    @patch.object(minio.Minio, 'put_object', MagicMock())
    @patch.object(minio.Minio, 'bucket_exists', MagicMock(return_value=True))
    @patch.object(ContentRepository, 'save_new_content', MagicMock())
    @patch.object(uuid, 'uuid4', MagicMock(return_value= test_uuid))
    @patch.object(time, 'time', MagicMock(return_value = test_time))
    def test_save_content_works_on_type_mismatch_for_jpg(self):
        #arrange
        test_content_service = ContentService()
        expected_bucket = test_content_service.bucket
        content_input = get_mock_upload_content_request()
        content_input.filename= "the_filename.jpg"
        content_input.file_data.close()
        content_input.file_data = open("tests/mocks/test.jpg","rb")

        #act
        test_content_service.save_content(content_input)

        #assert
        minio_stats:Minio = test_content_service.s3_client
        repo_stats:ContentRepository = test_content_service.content_repository
        self.assertTrue(minio_stats.put_object.called)
        self.assertTrue(repo_stats.save_new_content.called)

if __name__ == '__main__':
    unittest.main()
