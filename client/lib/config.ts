// Configuration centralisée pour toutes les variables d'environnement
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL!,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // Email
  email: {
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
    from: process.env.EMAIL_FROM!,
  },

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  },

  // Mobile Money
  mobileMoney: {
    orange: {
      apiKey: process.env.ORANGE_MONEY_API_KEY!,
      apiSecret: process.env.ORANGE_MONEY_API_SECRET!,
      baseUrl: process.env.ORANGE_MONEY_BASE_URL!,
    },
    mtn: {
      apiKey: process.env.MTN_MONEY_API_KEY!,
      apiSecret: process.env.MTN_MONEY_API_SECRET!,
      baseUrl: process.env.MTN_MONEY_BASE_URL!,
    },
    moov: {
      apiKey: process.env.MOOV_MONEY_API_KEY!,
      apiSecret: process.env.MOOV_MONEY_API_SECRET!,
    },
    wave: {
      apiKey: process.env.WAVE_API_KEY!,
      apiSecret: process.env.WAVE_API_SECRET!,
    },
  },

  // Pusher
  pusher: {
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER || 'eu',
  },

  // URLs
  urls: {
    frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
    backend: process.env.BACKEND_URL || 'http://localhost:3000/api',
    nextAuth: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },

  // File Upload
  upload: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      apiSecret: process.env.CLOUDINARY_API_SECRET!,
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      region: process.env.AWS_REGION || 'eu-west-1',
      bucket: process.env.AWS_S3_BUCKET!,
    },
    maxSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || '10'),
  },

  // Security
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  },

  // Platform
  platform: {
    feePercentage: parseInt(process.env.PLATFORM_FEE_PERCENTAGE || '10'),
    minWithdrawalAmount: parseInt(process.env.MIN_WITHDRAWAL_AMOUNT || '10000'),
  },

  // SMS
  sms: {
    apiKey: process.env.SMS_API_KEY!,
    apiSecret: process.env.SMS_API_SECRET!,
    senderId: process.env.SMS_SENDER_ID || 'AfriLance',
  },

  // Environment
  env: {
    nodeEnv: process.env.NODE_ENV || 'development',
    debug: process.env.DEBUG === 'true',
  },
}

// Validation des variables d'environnement critiques
export const validateConfig = () => {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'EMAIL_HOST',
    'EMAIL_USER',
    'EMAIL_PASS',
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Variables d'environnement manquantes: ${missing.join(', ')}`)
  }
}
