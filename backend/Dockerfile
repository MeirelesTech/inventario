 FROM inventario_backend:v1

#  RUN mkdir /backend
 WORKDIR /backend
 
 ENV PYTHONUNBUFFERED 1
 ENV PYTHONDONTWRITEBYTECODE 1

 COPY requirements.txt /backend
 COPY . /backend
 
#  RUN apt-get update \
#   && apt-get install -y --no-install-recommends \
#   postgresql-client \
#   && rm -rf /var/lib/apt/lists/* && python -m pip install -U pip

#  RUN pip install -r requirements.txt
 EXPOSE 8010
 ADD entrypoint.sh /backend
 RUN chmod +x entrypoint.sh
 ENTRYPOINT ["/backend/entrypoint.sh"]
#  CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

