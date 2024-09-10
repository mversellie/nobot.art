FROM python:3.9.19-bullseye

ENV PYTHONUNBUFFERED=1

COPY src .
COPY requirements.txt  requirements.txt
RUN pip install pyjwt[crypto]
RUN pip install -r ./requirements.txt
RUN pip install psycopg2-binary
RUN pip install boto3
EXPOSE 5000
ENTRYPOINT ["gunicorn"]
CMD ["--log-level=DEBUG", "-b", "0.0.0.0:5000","wgsi:app"]