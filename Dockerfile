FROM python:3.9.19-bullseye

COPY throwback-api/src  .
COPY throwback-api/requirements.txt  requirements.txt
RUN pip install -r ./requirements.txt
EXPOSE 5000
CMD ["python", "nobot_flask.py"]