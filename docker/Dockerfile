# Creating image based on official Python3 image
FROM python:3.7-slim

# Sets dumping log messages directly to stream instead of buffering
ENV PYTHONUNBUFFERED 1

WORKDIR app/
ADD . .

# Install all Python dependencies
RUN pip install -r requirements.txt

# Open port 8000
EXPOSE 8000

RUN rm -rf .venv && mkdir static
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate
CMD gunicorn --reload myproject.wsgi:application -b 0.0.0.0:8000