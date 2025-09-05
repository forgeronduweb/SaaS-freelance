import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Créer un compte
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Choisissez votre type de compte
                    </p>
                </div>
                <div className="space-y-4">
                    <Link 
                        href="/auth/freelance-signup"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        S'inscrire comme Freelance
                    </Link>
                    <Link 
                        href="/auth/client-signup"
                        className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        S'inscrire comme Client
                    </Link>
                </div>
                <div className="text-center">
                    <Link href="/auth/login" className="text-orange-600 hover:text-orange-500">
                        Déjà un compte ? Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}
