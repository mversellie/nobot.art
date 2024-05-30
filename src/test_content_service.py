import json
import unittest
import content_service


class TestContentService(unittest.TestCase):
    def test_json_works(self):
        actual = content_service.get_content_by_id("vue2")
        expected = content_service.content_mock()
        self.assertEqual(actual, json.dumps(expected.__dict__,indent=4, sort_keys=True, default=str))


if __name__ == '__main__':
    unittest.main()
