'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Transaction {
  id: string;
  type: 'payment' | 'escrow' | 'refund' | 'fee';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  mission: {
    id: string;
    title: string;
  };
  freelancer?: {
    id: string;
    name: string;
    avatar: string;
  };
  date: string;
  method: 'orange_money' | 'mtn_money' | 'moov_money' | 'wave' | 'card';
}

interface PaymentMethod {
  id: string;
  type: 'orange_money' | 'mtn_money' | 'moov_money' | 'wave' | 'card';
  label: string;
  number: string;
  isDefault: boolean;
}

const ClientPayments = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'methods' | 'escrow'>('transactions');
  const [showAddMethod, setShowAddMethod] = useState(false);

  // Données mockées pour les transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'escrow',
      amount: 2500000,
      status: 'completed',
      description: 'Dépôt en garantie pour le projet',
      mission: {
        id: 'm1',
        title: 'Développement application mobile e-commerce'
      },
      freelancer: {
        id: 'f1',
        name: 'Aminata Diallo',
        avatar: '/api/placeholder/40/40'
      },
      date: '2024-01-15T10:30:00Z',
      method: 'orange_money'
    },
    {
      id: '2',
      type: 'payment',
      amount: 2375000,
      status: 'completed',
      description: 'Paiement final du projet',
      mission: {
        id: 'm1',
        title: 'Développement application mobile e-commerce'
      },
      freelancer: {
        id: 'f1',
        name: 'Aminata Diallo',
        avatar: '/api/placeholder/40/40'
      },
      date: '2024-01-20T14:45:00Z',
      method: 'orange_money'
    },
    {
      id: '3',
      type: 'fee',
      amount: 125000,
      status: 'completed',
      description: 'Commission AfriLance (5%)',
      mission: {
        id: 'm1',
        title: 'Développement application mobile e-commerce'
      },
      date: '2024-01-20T14:45:00Z',
      method: 'orange_money'
    },
    {
      id: '4',
      type: 'escrow',
      amount: 800000,
      status: 'pending',
      description: 'Dépôt en garantie pour le projet',
      mission: {
        id: 'm2',
        title: 'Design UI/UX pour plateforme web'
      },
      date: '2024-01-22T09:15:00Z',
      method: 'mtn_money'
    }
  ];

  // Méthodes de paiement mockées
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'orange_money',
      label: 'Orange Money',
      number: '+221 77 123 45 67',
      isDefault: true
    },
    {
      id: '2',
      type: 'mtn_money',
      label: 'MTN Mobile Money',
      number: '+221 70 987 65 43',
      isDefault: false
    },
    {
      id: '3',
      type: 'card',
      label: 'Carte Visa',
      number: '**** **** **** 1234',
      isDefault: false
    }
  ];

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'text-green-600 bg-green-50';
      case 'escrow': return 'text-blue-600 bg-blue-50';
      case 'refund': return 'text-orange-600 bg-orange-50';
      case 'fee': return 'text-slate-600 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'payment': return 'Paiement';
      case 'escrow': return 'Garantie';
      case 'refund': return 'Remboursement';
      case 'fee': return 'Commission';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'cancelled': return 'text-slate-600 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'orange_money':
        return <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">OM</div>;
      case 'mtn_money':
        return <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">MTN</div>;
      case 'moov_money':
        return <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">MV</div>;
      case 'wave':
        return <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">W</div>;
      case 'card':
        return <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-xs">💳</div>;
      default:
        return <div className="w-8 h-8 bg-slate-400 rounded-full"></div>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSpent = transactions
    .filter(t => t.status === 'completed' && (t.type === 'payment' || t.type === 'fee'))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalEscrow = transactions
    .filter(t => t.status === 'pending' && t.type === 'escrow')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout userType="client" pageTitle="Paiements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Paiements</h1>
            <p className="text-slate-600 mt-1">Gérez vos transactions et méthodes de paiement</p>
          </div>
          <button
            onClick={() => setShowAddMethod(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une méthode
          </button>
        </div>

        {/* Stats Cards - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total dépensé</p>
                <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalSpent)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">En garantie</p>
                <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalEscrow)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Transactions</p>
                <p className="text-2xl font-bold text-slate-800">{transactions.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              {[
                { key: 'transactions', label: 'Transactions', icon: '📋' },
                { key: 'methods', label: 'Méthodes de paiement', icon: '💳' },
                { key: 'escrow', label: 'Garanties', icon: '🔒' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'transactions' | 'methods' | 'escrow')}
                  className={`flex-shrink-0 px-3 md:px-6 py-4 text-xs md:text-sm font-medium border-b-2 flex items-center gap-2 min-w-0 ${
                    activeTab === tab.key
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 sm:p-6">
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0">
                          {getMethodIcon(transaction.method)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeColor(transaction.type)}`}>
                              {getTransactionTypeLabel(transaction.type)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {getStatusLabel(transaction.status)}
                            </span>
                          </div>
                          <p className="font-medium text-slate-800 text-sm mb-1">{transaction.description}</p>
                          <p className="text-sm text-slate-600 mb-1 truncate">{transaction.mission.title}</p>
                          {transaction.freelancer && (
                            <p className="text-xs text-slate-500">Freelance: {transaction.freelancer.name}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className={`font-bold text-sm ${transaction.type === 'payment' || transaction.type === 'fee' ? 'text-red-600' : 'text-slate-800'}`}>
                          {transaction.type === 'payment' || transaction.type === 'fee' ? '-' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-slate-500">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Aucune transaction</h3>
                    <p className="text-slate-600">Vos transactions apparaîtront ici</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'methods' && (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {getMethodIcon(method.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-medium text-slate-800 text-sm">{method.label}</p>
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                              Par défaut
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 truncate">{method.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end sm:justify-start">
                      <button className="text-slate-600 hover:text-orange-600 p-2 rounded-lg hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] touch-manipulation">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-slate-600 hover:text-red-600 p-2 rounded-lg hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] touch-manipulation">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'escrow' && (
              <div className="space-y-4">
                {transactions.filter(t => t.type === 'escrow').map((transaction) => (
                  <div key={transaction.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-800">{transaction.mission.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {getStatusLabel(transaction.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Montant en garantie</p>
                        <p className="font-medium text-slate-800">{formatCurrency(transaction.amount)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Date de dépôt</p>
                        <p className="font-medium text-slate-800">{formatDate(transaction.date)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Méthode</p>
                        <div className="flex items-center gap-2">
                          {getMethodIcon(transaction.method)}
                          <span className="font-medium text-slate-800 capitalize">
                            {transaction.method.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {transaction.freelancer && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Freelance assigné</p>
                        <div className="flex items-center gap-2">
                          <img
                            src={transaction.freelancer.avatar}
                            alt={transaction.freelancer.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-medium text-slate-800">{transaction.freelancer.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientPayments;
