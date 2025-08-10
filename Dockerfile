FROM docker.io/node:18.6 as build-webapp

ENV BUILD_HOME /build

ARG BUILD_HOME=/build
FROM node:18 AS build-webapp

WORKDIR $BUILD_HOME

COPY webapp $BUILD_HOME

RUN apt-get update && apt-get install -y git openssh-client
RUN npm ci
RUN npm run build

RUN mkdir -p build/templates \
    && mv -t build/templates/ build/index.html \
    && mv -t build/static/ build/asset-manifest.json build/favicon.ico build/manifest.json build/robots.txt

FROM python:3 AS build-python

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y build-essential libpq-dev ca-certificates git \
    && pip install --trusted-host '*' --no-cache-dir --disable-pip-version-check -r requirements.txt --prefix=/install

ARG APP_HOME=/seidr
FROM python:3

ENV APP_HOME=$APP_HOME
ENV PATH=$PATH:$APP_HOME
ENV PYTHONUNBUFFERED=1

WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/* && apt-get clean

COPY app $APP_HOME/app
COPY --from=build-webapp /build/build $APP_HOME/app
COPY --from=build-python /install /usr/local

CMD ["gunicorn", "--bind=:8080", "app:app"]
