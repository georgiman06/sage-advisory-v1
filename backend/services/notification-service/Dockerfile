FROM python:3.11-slim

WORKDIR /app

COPY services/notification-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY shared/ ./shared/
COPY services/notification-service/app/ ./app/

ENV PYTHONPATH=/app

CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
