# Configuration des Variables d'Environnement - AfriLance

## 🔐 Variables d'Environnement Requises

Ce document décrit toutes les variables d'environnement nécessaires pour faire fonctionner la plateforme AfriLance.

### 📋 Installation Rapide

1. **Copiez le fichier d'exemple :**
   ```bash
   cp env.example .env.local
   ```

2. **Modifiez les valeurs dans `.env.local`** selon votre configuration

### 🗄️ Base de Données

```env
# MongoDB local
DATABASE_URL="mongodb://localhost:27017/afrilance"

# MongoDB Atlas (production)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/afrilance"
```

### 🔑 Authentification JWT

```env
JWT_SECRET="votre-clé-secrète-jwt-minimum-32-caractères"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="votre-clé-refresh-token"
JWT_REFRESH_EXPIRES_IN="30d"
```

**⚠️ Important :** `JWT_SECRET` doit être une chaîne aléatoire d'au moins 32 caractères.

### 📧 Configuration Email

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-application"
EMAIL_FROM="AfriLance <noreply@afrilance.com>"
```

**Gmail :** Utilisez un "Mot de passe d'application" au lieu de votre mot de passe principal.

### 💳 Paiements Stripe

```env
STRIPE_SECRET_KEY="sk_test_votre_clé_secrète"
STRIPE_PUBLISHABLE_KEY="pk_test_votre_clé_publique"
STRIPE_WEBHOOK_SECRET="whsec_votre_webhook_secret"
```

### 📱 Mobile Money (Afrique)

#### Orange Money
```env
ORANGE_MONEY_API_KEY="votre-clé-api-orange"
ORANGE_MONEY_API_SECRET="votre-secret-orange"
ORANGE_MONEY_BASE_URL="https://api.orange.com/orange-money-webpay"
```

#### MTN Money
```env
MTN_MONEY_API_KEY="votre-clé-api-mtn"
MTN_MONEY_API_SECRET="votre-secret-mtn"
MTN_MONEY_BASE_URL="https://sandbox.momodeveloper.mtn.com"
```

#### Moov Money & Wave
```env
MOOV_MONEY_API_KEY="votre-clé-api-moov"
MOOV_MONEY_API_SECRET="votre-secret-moov"
WAVE_API_KEY="votre-clé-api-wave"
WAVE_API_SECRET="votre-secret-wave"
```

### 🔔 Notifications Temps Réel (Pusher)

```env
PUSHER_APP_ID="votre-app-id-pusher"
PUSHER_KEY="votre-clé-pusher"
PUSHER_SECRET="votre-secret-pusher"
PUSHER_CLUSTER="eu"
```

### 🌐 URLs Application

```env
NEXTAUTH_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:3000/api"
```

### 📁 Stockage de Fichiers

#### Cloudinary (Recommandé)
```env
CLOUDINARY_CLOUD_NAME="votre-nom-cloud"
CLOUDINARY_API_KEY="votre-clé-api"
CLOUDINARY_API_SECRET="votre-secret-api"
```

#### AWS S3 (Alternative)
```env
AWS_ACCESS_KEY_ID="votre-access-key"
AWS_SECRET_ACCESS_KEY="votre-secret-key"
AWS_REGION="eu-west-1"
AWS_S3_BUCKET="afrilance-uploads"
```

### 🔒 Sécurité

```env
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

### ⚙️ Configuration Plateforme

```env
PLATFORM_FEE_PERCENTAGE=10
MIN_WITHDRAWAL_AMOUNT=10000
MAX_FILE_SIZE_MB=10
```

### 📱 SMS (Optionnel)

```env
SMS_API_KEY="votre-clé-sms"
SMS_API_SECRET="votre-secret-sms"
SMS_SENDER_ID="AfriLance"
```

### 🛠️ Développement

```env
NODE_ENV="development"
DEBUG=true
```

## 🚀 Démarrage Rapide

### Variables Minimales Requises

Pour démarrer rapidement en développement, vous avez besoin au minimum de :

```env
DATABASE_URL="mongodb://localhost:27017/afrilance"
JWT_SECRET="votre-super-secret-jwt-key-minimum-32-caracteres"
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-app"
```

### Commandes de Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Générer le client Prisma
npm run prisma:generate

# 3. Synchroniser la base de données
npm run prisma:db:push

# 4. Démarrer le serveur
npm run dev
```

## 🔍 Validation

Le système valide automatiquement les variables d'environnement critiques au démarrage. Si des variables sont manquantes, vous verrez une erreur explicite.

## 🔐 Sécurité

- **Jamais de commit des fichiers `.env*`** dans Git
- Utilisez des clés différentes entre développement et production
- Régénérez les secrets régulièrement en production
- Utilisez des services de gestion de secrets en production (AWS Secrets Manager, etc.)

## 📞 Support

Pour toute question sur la configuration, consultez la documentation ou contactez l'équipe de développement.
