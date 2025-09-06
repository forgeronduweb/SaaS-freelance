// Script de diagnostic pour vérifier les freelances dans la base de données
// Exécutez ce script avec Node.js pour diagnostiquer le problème

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugFreelances() {
  try {
    console.log('🔍 Diagnostic des freelances...\n');

    // 1. Compter tous les utilisateurs
    const totalUsers = await prisma.user.count();
    console.log(`📊 Total d'utilisateurs dans la BD: ${totalUsers}`);

    // 2. Compter les freelances
    const totalFreelances = await prisma.user.count({
      where: { role: 'FREELANCE' }
    });
    console.log(`👨‍💻 Total de freelances: ${totalFreelances}`);

    // 3. Compter les freelances actifs
    const activeFreelances = await prisma.user.count({
      where: { 
        role: 'FREELANCE',
        isActive: true 
      }
    });
    console.log(`✅ Freelances actifs: ${activeFreelances}`);

    // 4. Compter les freelances avec email vérifié
    const verifiedFreelances = await prisma.user.count({
      where: { 
        role: 'FREELANCE',
        isActive: true,
        isEmailVerified: true 
      }
    });
    console.log(`📧 Freelances actifs avec email vérifié: ${verifiedFreelances}`);

    // 5. Lister tous les freelances avec leurs statuts
    console.log('\n📋 Liste détaillée des freelances:');
    const allFreelances = await prisma.user.findMany({
      where: { role: 'FREELANCE' },
      select: {
        id: true,
        fullName: true,
        email: true,
        isActive: true,
        isEmailVerified: true,
        title: true,
        createdAt: true
      }
    });

    allFreelances.forEach((freelance, index) => {
      console.log(`\n${index + 1}. ${freelance.fullName} (${freelance.email})`);
      console.log(`   - ID: ${freelance.id}`);
      console.log(`   - Titre: ${freelance.title || 'Non défini'}`);
      console.log(`   - Actif: ${freelance.isActive ? '✅' : '❌'}`);
      console.log(`   - Email vérifié: ${freelance.isEmailVerified ? '✅' : '❌'}`);
      console.log(`   - Créé le: ${freelance.createdAt.toLocaleDateString()}`);
      
      if (!freelance.isActive || !freelance.isEmailVerified) {
        console.log(`   ⚠️  Ce freelance ne sera PAS visible côté client`);
      } else {
        console.log(`   ✅ Ce freelance DEVRAIT être visible côté client`);
      }
    });

    // 6. Simuler la requête API exacte
    console.log('\n🔄 Simulation de la requête API exacte...');
    const apiResult = await prisma.user.findMany({
      where: {
        isActive: true,
        isEmailVerified: true,
        role: 'FREELANCE'
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        profilePhoto: true,
        rating: true,
        totalReviews: true,
        title: true,
        bio: true,
        skills: true,
        categories: true,
        hourlyRate: true,
        dailyRate: true,
        completedProjects: true,
        portfolio: true,
        country: true,
        city: true,
        createdAt: true,
        lastLoginAt: true
      }
    });

    console.log(`📤 Freelances retournés par l'API: ${apiResult.length}`);
    
    if (apiResult.length > 0) {
      console.log('\n✅ Freelances qui DEVRAIENT apparaître côté client:');
      apiResult.forEach((freelance, index) => {
        console.log(`${index + 1}. ${freelance.fullName} - ${freelance.title || 'Sans titre'}`);
      });
    } else {
      console.log('\n❌ AUCUN freelance ne sera visible côté client !');
      console.log('💡 Vérifiez les champs isActive et isEmailVerified dans votre BD');
    }

  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugFreelances();
