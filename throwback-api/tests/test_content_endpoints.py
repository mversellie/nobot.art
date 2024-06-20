import pytest
import throwback_flask
from flask import current_app


@pytest.fixture()
def client():
    yield throwback_flask.app.test_client()


@pytest.fixture()
def jwt_token():
    pass


def test_flask_app_fix(client):
    assert True is True
    response = client.get('/')
