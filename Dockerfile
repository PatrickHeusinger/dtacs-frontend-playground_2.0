# --- Build Webapp ---
FROM python:3 as build-webapp

ARG BUILD_HOME=/build

WORKDIR $BUILD_HOME

# Node.js installieren (hier Node 18 als Beispiel)
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs git openssh-client

# package.json und package-lock.json kopieren für npm ci
COPY webapp/package*.json ./
RUN ls -la && cat package.json
RUN npm install

# Rest der Webapp kopieren
COPY webapp .

RUN npm run build

RUN mkdir -p build/templates && \
    mv -t build/templates/ build/index.html && \
    mv -t build/static/ build/asset-manifest.json build/favicon.ico build/manifest.json build/robots.txt


# --- Build Python dependencies ---
FROM python:3 as build-python

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y build-essential libpq-dev ca-certificates git && \
    pip install --trusted-host '*' --no-cache-dir --disable-pip-version-check -r requirements.txt --prefix=/install


# --- Final Image ---
FROM python:3

ENV APP_HOME /seidr
ENV PATH $PATH:$APP_HOME
ENV PYTHONUNBUFFERED=1

WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/* && apt-get clean

COPY app $APP_HOME/app

COPY --from=build-webapp /build/build $APP_HOME/app

COPY --from=build-python /install /usr/local

ENV SEIDR_INDEX_VIEW=TRUE

CMD ["gunicorn", "--bind=:8080", "app:app"]
