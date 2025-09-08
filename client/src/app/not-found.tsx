import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-orange-600">404</span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Page introuvable
          </h2>
          
          <p className="text-slate-600 mb-6">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
            
            <Link
              href="/freelances"
              className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Parcourir les freelances
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
