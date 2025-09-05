# Migration vers MongoDB avec Prisma - Guide complet

## ✅ Migration terminée

La migration de PostgreSQL vers MongoDB a été effectuée avec succès. Voici les changements apportés :

### 🔄 Changements du schéma Prisma

1. **Provider de base de données** : `postgresql` → `mongodb`
2. **Types de données** : 
   - `Decimal` → `Float` (MongoDB ne supporte pas nativement Decimal)
   - `@id @default(cuid())` → `@id @default(auto()) @map("_id") @db.ObjectId`
   - Toutes les clés étrangères utilisent maintenant `@db.ObjectId`

3. **Collections créées** :
   - ✅ **Users** - Profils freelances et clients avec rôles
   - ✅ **Missions** - Projets avec statuts et relations
   - ✅ **Applications** - Candidatures aux missions
   - ✅ **Payments** - Système de paiement Mobile Money
   - ✅ **Escrows** - Système de séquestre sécurisé
   - ✅ **Conversations** - Chat entre utilisateurs
   - ✅ **Messages** - Messages avec pièces jointes
   - ✅ **Notifications** - Système de notifications multi-canaux
   - ✅ **Reviews** - Évaluations freelance/client (nouveau)

### 🔗 Relations MongoDB définies

- **Users → Profiles** : Intégré dans le modèle User (1:1)
- **Users → Messages** : Relation 1:N via senderId
- **Users → Missions** : Relations Client (1:N) et Freelance (1:N)
- **Missions → Payments** : Relation 1:N via missionId
- **Missions → Reviews** : Relation 1:N pour évaluations
- **Users → Reviews** : Relations freelance et client

## 🚀 Installation et configuration

### 1. Prérequis
```bash
# Installer MongoDB localement ou utiliser MongoDB Atlas
# MongoDB Community Server : https://www.mongodb.com/try/download/community
```

### 2. Configuration environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Modifier DATABASE_URL dans .env
DATABASE_URL="mongodb://localhost:27017/afrilance"
# ou pour MongoDB Atlas :
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/afrilance"
```

### 3. Installation des dépendances
```bash
cd backend
npm install
```

### 4. Génération du client Prisma
```bash
npm run prisma:generate
```

### 5. Synchronisation de la base de données
```bash
# Pour MongoDB, pas besoin de migrations traditionnelles
# Prisma va créer les collections automatiquement
npm run prisma:db:push
```

### 6. (Optionnel) Prisma Studio
```bash
npm run prisma:studio
```

### 7. Démarrage du backend
```bash
npm run start:dev
```

## 📊 Structure des collections

### Users
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String,
  fullName: String,
  role: "FREELANCE" | "CLIENT" | "ADMIN",
  // Champs freelance
  skills: [String],
  hourlyRate: Number,
  rating: Number,
  // Champs client
  companyName: String,
  totalBudgetSpent: Number,
  // Métadonnées
  createdAt: Date,
  updatedAt: Date
}
```

### Missions
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  requiredSkills: [String],
  budget: Number,
  status: "DRAFT" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
  clientId: ObjectId,
  assignedFreelanceId: ObjectId,
  deadline: Date,
  createdAt: Date
}
```

### Reviews (Nouveau)
```javascript
{
  _id: ObjectId,
  rating: Number, // 1-5
  comment: String,
  freelanceId: ObjectId,
  clientId: ObjectId,
  missionId: ObjectId,
  createdAt: Date,
  isPublic: Boolean
}
```

## 🔧 Fonctionnalités supportées

### ✅ Implémentées
- [x] Authentification JWT
- [x] CRUD utilisateurs (freelances/clients)
- [x] Gestion des missions
- [x] Système de candidatures
- [x] Paiements Mobile Money
- [x] Système escrow
- [x] Chat temps réel
- [x] Notifications multi-canaux
- [x] Évaluations/Reviews

### 🚧 À développer
- [ ] Filtrage avancé freelances/missions
- [ ] Notifications temps réel (WebSocket)
- [ ] Tableau de bord analytique
- [ ] Tests unitaires et E2E
- [ ] API REST complète

## 🎯 Avantages MongoDB

1. **Flexibilité** : Schéma flexible pour évolution rapide
2. **Performance** : Requêtes rapides pour données dénormalisées
3. **Scalabilité** : Sharding natif pour croissance
4. **JSON natif** : Parfait pour APIs REST/GraphQL
5. **Géolocalisation** : Support natif pour recherche géographique

## 🔍 Requêtes courantes

### Recherche freelances par compétences
```javascript
// Prisma
await prisma.user.findMany({
  where: {
    role: 'FREELANCE',
    skills: { hasEvery: ['JavaScript', 'React'] }
  }
})
```

### Missions par budget et localisation
```javascript
await prisma.mission.findMany({
  where: {
    budget: { gte: 50000, lte: 200000 },
    location: 'Dakar',
    status: 'OPEN'
  }
})
```

## 📝 Notes importantes

- Les types `Decimal` ont été convertis en `Float` (limitation MongoDB)
- Les relations utilisent des `ObjectId` au lieu d'UUID
- Les contraintes de clés étrangères sont gérées par Prisma
- Les index sont créés automatiquement pour les champs `@unique`
- Le modèle `Review` a été ajouté pour les évaluations

La migration est maintenant prête pour le développement avec MongoDB ! 🎉
