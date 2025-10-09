import mongoose from 'mongoose';
import { config } from './config';

interface ConnectionState {
  isConnected?: number;
}

const connection: ConnectionState = {};

export async function connectToDatabase() {
  if (connection.isConnected) {
    console.log('✅ Utilisation de la connexion MongoDB existante');
    return;
  }

  try {
    const db = await mongoose.connect(config.database.uri, {
      bufferCommands: false,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('✅ Nouvelle connexion MongoDB établie');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error);
    throw new Error('Impossible de se connecter à la base de données');
  }
}

export async function disconnectFromDatabase() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = 0;
    console.log('✅ Déconnexion MongoDB effectuée');
  }
}

// Fonction utilitaire pour s'assurer que la connexion est établie
export async function ensureConnection() {
  if (!connection.isConnected) {
    await connectToDatabase();
  }
}
