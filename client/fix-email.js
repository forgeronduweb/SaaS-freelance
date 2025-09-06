// Script pour corriger directement l'email non vérifié
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixFreelanceEmail() {
  try {
    console.log('🔧 Correction de l\'email pour freelance1@gmail.com...');
    
    const updatedUser = await prisma.user.update({
      where: { 
        email: 'freelance1@gmail.com' 
      },
      data: { 
        isEmailVerified: true,
        emailVerificationToken: null
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        isEmailVerified: true,
        isActive: true,
        role: true
      }
    });
    
    console.log('✅ Email vérifié avec succès !');
    console.log('📋 Détails:', updatedUser);
    
    // Vérifier que le freelance est maintenant visible
    const visibleFreelances = await prisma.user.findMany({
      where: {
        role: 'FREELANCE',
        isActive: true,
        isEmailVerified: true
      },
      select: {
        id: true,
        fullName: true,
        email: true
      }
    });
    
    console.log(`\n🎉 Freelances maintenant visibles: ${visibleFreelances.length}`);
    visibleFreelances.forEach(f => {
      console.log(`- ${f.fullName} (${f.email})`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixFreelanceEmail();
