FROM python:3.8-alpine

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# installing need python packages
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# copy codes to container
WORKDIR /app
COPY . /app

