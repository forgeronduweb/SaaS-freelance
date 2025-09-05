# Configuration MongoDB pour AfriLance

## Option 1: MongoDB Atlas (Recommandé - Cloud)

1. Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un nouveau cluster (gratuit M0)
3. Configurez l'accès réseau (0.0.0.0/0 pour le développement)
4. Créez un utilisateur de base de données
5. Récupérez la chaîne de connexion

Exemple de DATABASE_URL pour Atlas:
```
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/afrilance?retryWrites=true&w=majority"
```

## Option 2: MongoDB Local

### Installation Windows:
1. Téléchargez MongoDB Community Server depuis https://www.mongodb.com/try/download/community
2. Installez avec les options par défaut
3. MongoDB sera disponible sur `mongodb://localhost:27017`

### Avec Docker:
```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

## Configuration .env.local

Créez le fichier `.env.local` avec:
```env
DATABASE_URL="mongodb+srv://forgeronduweb:PUyhrRQpyxe4ZlTH@cluster0.drfeiye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="afrilance-super-secret-jwt-key-minimum-32-characters-long-for-security"
JWT_EXPIRES_IN="7d"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

## Migration Prisma

Une fois MongoDB configuré, exécutez:
```bash
npx prisma generate
npx prisma db push
```

Cela créera automatiquement les collections MongoDB basées sur le schéma Prisma.
