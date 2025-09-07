# Guide de Déploiement Vercel

## Étapes de Déploiement

### 1. Configuration des Variables d'Environnement

Dans votre dashboard Vercel, ajoutez les variables suivantes :

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/freelance-platform?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here
PLATFORM_FEE_PERCENTAGE=10
```

### 2. Configuration MongoDB Atlas

Assurez-vous que votre cluster MongoDB Atlas :
- Accepte les connexions depuis toutes les IPs (0.0.0.0/0) pour Vercel
- A un utilisateur avec les permissions de lecture/écriture
- La chaîne de connexion est correcte

### 3. Build Settings

Dans Vercel, configurez :
- **Framework Preset**: Next.js
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Commandes de Déploiement

```bash
# 1. Installer les dépendances
cd client
npm install

# 2. Générer le client Prisma
npx prisma generate

# 3. Build le projet
npm run build

# 4. Déployer sur Vercel
npx vercel --prod
```

### 5. Vérifications Post-Déploiement

1. Testez les routes API : `/api/test`
2. Vérifiez la connexion à la base de données
3. Testez l'authentification
4. Vérifiez les logs dans le dashboard Vercel

### 6. Résolution des Problèmes Courants

#### Erreur "FUNCTION_INVOCATION_FAILED"
- Vérifiez les variables d'environnement
- Assurez-vous que DATABASE_URL est correct
- Vérifiez les logs de fonction dans Vercel

#### Erreur "DEPLOYMENT_NOT_FOUND"
- Redéployez le projet
- Vérifiez la configuration du domaine

#### Erreur de Build
- Vérifiez que toutes les dépendances sont installées
- Assurez-vous que `prisma generate` s'exécute correctement
- Vérifiez les erreurs TypeScript/ESLint

### 7. Configuration Avancée

Le fichier `vercel.json` configure :
- Runtime Node.js 18.x pour les fonctions API
- Timeout de 30 secondes pour les fonctions
- Headers CORS appropriés
- Redirections et rewrites

### 8. Monitoring

Surveillez :
- Les logs de fonction dans Vercel
- Les métriques de performance
- Les erreurs de base de données
- L'utilisation des ressources
