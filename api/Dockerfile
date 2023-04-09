# Utiliser l'image de base Python officielle
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /api

# Copier les fichiers de l'application dans le conteneur
COPY . /api

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Lancer les tests
RUN pytest

# Exposer le port utilisé par l'application
EXPOSE 8000

# Lancer l'application avec uvicorn
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
