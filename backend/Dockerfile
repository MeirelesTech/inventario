 FROM python:3.8-slim

 RUN mkdir /backend
 WORKDIR /backend
 
 ENV PYTHONDONTWRITEBYTECODE 1
 ENV PYTHONUNBUFFERED 1

 COPY requirements.txt /backend
 COPY . /backend
 
 RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/* && python -m pip install -U pip

 RUN pip install -r requirements.txt
 EXPOSE 8010
 
 RUN chmod +x entrypoint.sh
 ENTRYPOINT ["/backend/entrypoint.sh"]

