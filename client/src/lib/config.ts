/**
 * Configuration centralisée pour AfriLance
 * Toutes les variables d'environnement sont gérées ici
 */

// Générer des valeurs par défaut sécurisées
const generateDefaultSecret = () => {
  return 'dev-secret-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Fonction pour obtenir ou générer JWT_SECRET
const getJwtSecret = (): string => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️  JWT_SECRET n\'est pas défini en production. Utilisation d\'une clé générée aléatoirement.');
  } else {
    console.warn('⚠️  JWT_SECRET n\'est pas défini. Utilisation d\'une valeur par défaut pour le développement.');
  }
  
  return generateDefaultSecret();
};

// Fonction pour obtenir ou générer NEXTAUTH_SECRET
const getNextAuthSecret = (): string => {
  if (process.env.NEXTAUTH_SECRET) {
    return process.env.NEXTAUTH_SECRET;
  }
  
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️  NEXTAUTH_SECRET n\'est pas défini en production. Utilisation d\'une clé générée aléatoirement.');
  } else {
    console.warn('⚠️  NEXTAUTH_SECRET n\'est pas défini. Utilisation d\'une valeur par défaut pour le développement.');
  }
  
  return generateDefaultSecret();
};

export const config = {
  // Base de données (désactivée pour l'authentification simple)
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/afrilance',
    name: 'afrilance',
    enabled: process.env.USE_DATABASE === 'true',
  },

  // Utilisateurs statiques pour l'authentification sans DB
  staticUsers: [
    {
      id: '1',
      email: 'admin@afrilance.com',
      password: 'admin123', // En production, utilisez un hash
      name: 'Administrateur',
      role: 'admin',
    },
    {
      id: '2', 
      email: 'freelance@afrilance.com',
      password: 'freelance123',
      name: 'Freelance Demo',
      role: 'freelance',
    },
    {
      id: '3',
      email: 'client@afrilance.com', 
      password: 'client123',
      name: 'Client Demo',
      role: 'client',
    },
  ],

  // Authentification
  auth: {
    jwtSecret: getJwtSecret(),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    sessionTimeout: process.env.SESSION_TIMEOUT || '7d',
  },

  // NextAuth
  nextAuth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: getNextAuthSecret(),
  },

  // Email
  email: {
    host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    user: process.env.EMAIL_SERVER_USER,
    password: process.env.EMAIL_SERVER_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@afrilance.com',
  },

  // Upload de fichiers
  upload: {
    directory: process.env.UPLOAD_DIR || './public/uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB par défaut
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'],
  },

  // Paiement
  payment: {
    apiKey: process.env.PAYMENT_PROVIDER_API_KEY,
    secret: process.env.PAYMENT_PROVIDER_SECRET,
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET,
  },

  // Application
  app: {
    name: process.env.APP_NAME || 'AfriLance',
    url: process.env.APP_URL || 'http://localhost:3000',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@afrilance.com',
    environment: process.env.NODE_ENV || 'development',
    debugMode: process.env.DEBUG_MODE === 'true',
  },

  // Limites de l'application
  limits: {
    // Freelances
    maxSkillsPerFreelance: 20,
    maxPortfolioItems: 10,
    maxBioLength: 1000,

    // Projets
    maxProjectTitleLength: 200,
    maxProjectDescriptionLength: 5000,
    maxApplicationsPerProject: 50,
    maxMessagesPerProject: 1000,

    // Général
    maxFileUploadsPerProject: 20,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // limite par fenêtre par IP
    },
  },

  // Catégories de services AfriLance
  serviceCategories: {
    'developpement-web': {
      name: 'Développement Web',
      skills: ['JavaScript', 'React', 'Node.js', 'PHP', 'Python', 'HTML', 'CSS'],
    },
    'design-graphique': {
      name: 'Design Graphique',
      skills: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX', 'Logo Design'],
    },
    'redaction-traduction': {
      name: 'Rédaction & Traduction',
      skills: ['Rédaction', 'Traduction', 'Copywriting', 'SEO Writing'],
    },
    'marketing-digital': {
      name: 'Marketing Digital',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Email Marketing'],
    },
  },

  // Plans tarifaires AfriLance
  plans: {
    gratuit: {
      name: 'Gratuit',
      price: 0,
      commission: 0.05, // 5%
      features: ['Profil de base', 'Candidatures limitées', 'Support communautaire'],
    },
    premium: {
      name: 'Premium',
      price: 5000, // FCFA
      commission: 0, // 0%
      features: ['Profil avancé', 'Candidatures illimitées', 'Support prioritaire', 'Badge Premium'],
    },
    'pro-elite': {
      name: 'Pro Elite',
      price: 15000, // FCFA
      commission: 0, // 0%
      features: ['Tout Premium', 'Mise en avant', 'Analytics avancées', 'Manager dédié'],
    },
  },

  // Devises supportées
  currencies: {
    primary: 'FCFA',
    supported: ['FCFA', 'USD', 'EUR'],
    exchangeRates: {
      USD: 600, // 1 USD = 600 FCFA (approximatif)
      EUR: 650, // 1 EUR = 650 FCFA (approximatif)
    },
  },
} as const;

// Types pour TypeScript
export type ServiceCategory = keyof typeof config.serviceCategories;
export type PlanType = keyof typeof config.plans;
export type Currency = keyof typeof config.currencies.exchangeRates | 'FCFA';

// Fonction utilitaire pour valider la configuration
export function validateConfig(): boolean {
  try {
    // Vérifications supplémentaires
    if (!config.database.uri.includes('mongodb')) {
      throw new Error('MONGODB_URI doit être une URI MongoDB valide');
    }

    if (config.auth.jwtSecret.length < 32) {
      console.warn('⚠️  JWT_SECRET devrait faire au moins 32 caractères pour une sécurité optimale');
    }

    if (config.app.environment === 'production' && config.app.debugMode) {
      console.warn('⚠️  DEBUG_MODE ne devrait pas être activé en production');
    }

    return true;
  } catch (error) {
    console.error('❌ Erreur de configuration:', error);
    return false;
  }
}

// Valider la configuration au démarrage
if (typeof window === 'undefined') { // Côté serveur seulement
  validateConfig();
}
