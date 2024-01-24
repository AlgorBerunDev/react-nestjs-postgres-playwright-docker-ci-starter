#!/bin/bash
# Скрипт для бэкапа PostgreSQL

# Указываем путь для сохранения бэкапа
BACKUP_PATH="/backups"
BACKUP_FILENAME="postgres-backup-$(date +%Y-%m-%d_%H%M%S).sql"

# Команда для бэкапа, используя переменные окружения
pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_PATH/$BACKUP_FILENAME"
