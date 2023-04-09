# Utilisez l'image de base "node:19-alpine" à partir de Docker Hub
FROM node:19-alpine

# Définir le répertoire de travail dans /app
WORKDIR /app

# Définir la variable d'environnement PATH pour inclure /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# Copier les fichiers package.json et package-lock.json à la racine de /app
COPY *.json ./

# Copier les fichiers TypeScript à la racine de /app
COPY *.ts ./

# Exécuter la commande "npm ci" pour installer les dépendances
RUN npm ci

# Copier tous les autres fichiers et dossiers de l'application
COPY . ./

# Exposer le port 5173 pour les connexions entrantes
EXPOSE 5173

# Définir la commande par défaut pour démarrer l'application
CMD ["npm", "run", "dev"]
