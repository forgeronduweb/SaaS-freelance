'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantType: 'freelance' | 'client';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  projectTitle?: string;
}

interface MessageCenterProps {
  userType?: 'freelance' | 'client';
}

const MessageCenter = ({ userType = 'freelance' }: MessageCenterProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConversationView, setShowConversationView] = useState(false);

  // Données mockées pour les conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      participantId: 'client-1',
      participantName: 'Aminata Traoré',
      participantAvatar: '/api/placeholder/40/40',
      participantType: 'client',
      lastMessage: 'Parfait ! Quand pouvez-vous commencer le projet ?',
      lastMessageTime: '2024-01-20T14:30:00Z',
      unreadCount: 2,
      isOnline: true,
      projectTitle: 'Application mobile e-commerce'
    },
    {
      id: '2',
      participantId: 'freelance-1',
      participantName: 'Moussa Diallo',
      participantAvatar: '/api/placeholder/40/40',
      participantType: 'freelance',
      lastMessage: 'J\'ai terminé la première version du logo',
      lastMessageTime: '2024-01-20T12:15:00Z',
      unreadCount: 0,
      isOnline: false,
      projectTitle: 'Design de logo et identité visuelle'
    },
    {
      id: '3',
      participantId: 'client-2',
      participantName: 'Ibrahim Koné',
      participantAvatar: '/api/placeholder/40/40',
      participantType: 'client',
      lastMessage: 'Merci pour votre proposition détaillée',
      lastMessageTime: '2024-01-19T16:45:00Z',
      unreadCount: 1,
      isOnline: true,
      projectTitle: 'Site web vitrine'
    }
  ];

  // Fonction pour formater le temps
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  // Filtrer les conversations selon la recherche
  const filteredConversations = conversations.filter(conversation =>
    conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conversation.projectTitle && conversation.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Trouver la conversation sélectionnée
  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  // Messages pour la conversation sélectionnée
  const messages: Message[] = [
    {
      id: '1',
      senderId: 'client-1',
      senderName: 'Aminata Traoré',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Bonjour ! J\'ai vu votre profil et je suis très intéressée par vos services pour développer notre application mobile.',
      timestamp: '2024-01-20T10:00:00Z',
      isRead: true
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'Moi',
      senderAvatar: '/avatars/me.jpg',
      content: 'Bonjour Fatou ! Merci pour votre intérêt. Pouvez-vous me parler de votre expérience en développement mobile ?',
      timestamp: '10:45',
      isRead: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Fatou Sow',
      senderAvatar: '/avatars/fatou.jpg',
      content: 'J\'ai 5 ans d\'expérience en React Native et Flutter. J\'ai développé plus de 15 applications mobiles pour des clients en Afrique de l\'Ouest.',
      timestamp: '11:00',
      isRead: true
    },
    {
      id: '4',
      senderId: 'me',
      senderName: 'Moi',
      senderAvatar: '/avatars/me.jpg',
      content: 'Excellent ! Le projet consiste à développer une application de e-commerce. Quel serait votre délai estimé ?',
      timestamp: '11:15',
      isRead: true
    },
    {
      id: '5',
      senderId: '2',
      senderName: 'Fatou Sow',
      senderAvatar: '/avatars/fatou.jpg',
      content: 'Pour une application complète avec paiement mobile money, je dirais 6-8 semaines. Pouvez-vous me donner plus de détails sur le design ?',
      timestamp: '12:15',
      isRead: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Ici on ajouterait la logique d'envoi du message
      console.log('Envoi du message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout 
      userType={userType}
      pageTitle="Messagerie"
    >
      <div className="h-full">
        {/* Mobile: Vue liste des conversations */}
        <div className={`md:hidden ${showConversationView ? 'hidden' : 'block'} h-screen bg-white`}>
          {/* Header liste conversations mobile */}
          <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
            <div className="px-4 py-2">
              <h2 className="text-base font-semibold text-slate-800 mb-2">Messages</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-slate-50 border-0 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                />
                <svg className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Liste conversations mobile */}
          <div className="overflow-y-auto h-full pb-20">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation.id);
                  setShowConversationView(true);
                }}
                className="px-3 py-2 border-b border-slate-100 active:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="relative flex-shrink-0">
                    <Image 
                        src={conversation.participantAvatar} 
                        alt={conversation.participantName} 
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-medium text-slate-900 truncate text-sm">
                        {conversation.participantName}
                      </h3>
                      <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    {conversation.projectTitle && (
                      <p className="text-xs text-orange-600 mb-0.5 truncate">
                        {conversation.projectTitle}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 truncate leading-4">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-orange-600 text-white text-xs rounded-full min-w-[18px] h-4 flex items-center justify-center px-1 flex-shrink-0">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vue conversation */}
        <div className={`md:hidden ${showConversationView ? 'block' : 'hidden'} h-screen bg-white flex flex-col`}>
          {selectedConv && (
            <>
              {/* Header conversation mobile */}
              <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
                <div className="flex items-center px-2 py-1.5">
                  <button
                    onClick={() => setShowConversationView(false)}
                    className="p-1.5 mr-1.5 text-slate-600 hover:text-orange-600 transition-colors rounded-full hover:bg-slate-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="relative flex-shrink-0">
                    <Image 
                        src={selectedConv.participantAvatar} 
                        alt={selectedConv.participantName} 
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    {selectedConv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 ml-2 min-w-0">
                    <h2 className="font-medium text-slate-900 truncate text-xs">{selectedConv.participantName}</h2>
                    <div className="flex items-center text-xs text-slate-500">
                      <span className="text-xs">{selectedConv.isOnline ? 'En ligne' : 'Hors ligne'}</span>
                      {selectedConv.projectTitle && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="text-orange-600 truncate text-xs">{selectedConv.projectTitle}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages mobile */}
              <div className="flex-1 overflow-y-auto px-3 py-2 pb-4 bg-slate-50">
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[280px] px-3 py-2 rounded-2xl ${
                        message.senderId === 'current-user'
                          ? 'bg-orange-600 text-white rounded-br-md'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-5">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'current-user' ? 'text-orange-100' : 'text-slate-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone de saisie mobile */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-3 z-10">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Message..."
                      className="w-full px-4 py-2.5 bg-slate-100 border-0 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-orange-600 text-white p-2.5 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Desktop: Vue classique */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden" style={{ height: 'calc(100vh - 12rem)' }}>
            <div className="flex h-full">
              {/* Liste des conversations desktop */}
              <div className="w-1/3 border-r border-slate-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-800 mb-3">Conversations</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher une conversation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Liste des conversations desktop */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-orange-50 border-orange-200' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Image 
                              src={conversation.participantAvatar} 
                              alt={conversation.participantName} 
                              width={40}
                              height={40}
                              className="w-12 h-12 rounded-full object-cover"
                          />
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-slate-800 truncate">
                              {conversation.participantName}
                            </h3>
                            <span className="text-xs text-slate-500">
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          {conversation.projectTitle && (
                            <p className="text-xs text-orange-600 mb-1 truncate">
                              {conversation.projectTitle}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600 truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-orange-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone de conversation desktop */}
              <div className="flex-1 flex flex-col">
                {selectedConv ? (
                  <>
                    {/* Header de la conversation desktop */}
                    <div className="p-4 border-b border-slate-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image 
                              src={selectedConv.participantAvatar} 
                              alt={selectedConv.participantName} 
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedConv.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h2 className="font-medium text-slate-800">{selectedConv.participantName}</h2>
                          <p className="text-sm text-slate-600">
                            {selectedConv.isOnline ? 'En ligne' : 'Hors ligne'} • {selectedConv.participantType === 'client' ? 'Client' : 'Freelance'}
                          </p>
                          {selectedConv.projectTitle && (
                            <p className="text-xs text-orange-600">{selectedConv.projectTitle}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Messages desktop */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                            message.senderId === 'current-user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <Image 
                                src={message.senderAvatar} 
                                alt={message.senderName} 
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <div className={`px-4 py-2 rounded-lg ${
                                message.senderId === 'current-user'
                                  ? 'bg-orange-600 text-white'
                                  : 'bg-slate-100 text-slate-800'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Zone de saisie desktop */}
                    <div className="p-4 border-t border-slate-200 bg-white">
                      <div className="flex items-end space-x-3">
                        <div className="flex-1">
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Tapez votre message..."
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-slate-50">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-lg font-medium text-slate-800 mb-2">Sélectionnez une conversation</h3>
                      <p className="text-slate-600">Choisissez une conversation dans la liste pour commencer à échanger</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessageCenter;
