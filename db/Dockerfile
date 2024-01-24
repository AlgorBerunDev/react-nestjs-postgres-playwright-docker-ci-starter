# Используем конкретную версию образа PostgreSQL
FROM postgres:13

# Устанавливаем cron
RUN apt-get update && apt-get install -y cron

# Копируем скрипт бэкапа и файл crontab в контейнер
COPY ./backup.sh /usr/local/bin/backup.sh
COPY ./my-crontab /etc/cron.d/backup-cron

# Даем права на выполнение скрипта бэкапа
RUN chmod +x /usr/local/bin/backup.sh

# Даем права на файл crontab и устанавливаем его
RUN chmod 0644 /etc/cron.d/backup-cron
RUN crontab /etc/cron.d/backup-cron

# Создаем лог файл для cron и даем права на его запись
RUN touch /var/log/cron.log
RUN chmod 0666 /var/log/cron.log

# Запускаем cron в фоновом режиме и основной процесс PostgreSQL
CMD cron && docker-entrypoint.sh postgres
