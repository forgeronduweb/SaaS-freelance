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
  const currentUserId = 'me';

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConversationView, setShowConversationView] = useState(false);

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

  const filteredConversations = conversations.filter(conversation =>
    conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conversation.projectTitle && conversation.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'client-1',
      senderName: 'Aminata Traoré',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Bonjour ! J\'ai vu votre profil et je suis très intéressée par vos services.',
      timestamp: '2024-01-20T10:00:00Z',
      isRead: true
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'Moi',
      senderAvatar: '/avatars/me.jpg',
      content: 'Bonjour Fatou ! Merci pour votre intérêt. Pouvez-vous me parler de votre expérience ?',
      timestamp: '2024-01-20T10:45:00Z',
      isRead: true
    },
    {
      id: '3',
      senderId: 'client-1',
      senderName: 'Fatou Sow',
      senderAvatar: '/avatars/fatou.jpg',
      content: 'J\'ai 5 ans d\'expérience en React Native et Flutter.',
      timestamp: '2024-01-20T11:00:00Z',
      isRead: true
    },
    {
      id: '4',
      senderId: 'me',
      senderName: 'Moi',
      senderAvatar: '/avatars/me.jpg',
      content: 'Excellent ! Le projet consiste à développer une application de e-commerce.',
      timestamp: '2024-01-20T11:15:00Z',
      isRead: true
    },
    {
      id: '5',
      senderId: 'client-1',
      senderName: 'Fatou Sow',
      senderAvatar: '/avatars/fatou.jpg',
      content: 'Pour une application complète avec paiement mobile money, je dirais 6-8 semaines.',
      timestamp: '2024-01-20T12:15:00Z',
      isRead: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Envoi du message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout userType={userType} pageTitle="Messagerie">
      <div className="h-screen flex flex-col">
        {/* Mobile */}
        <div className={`md:hidden ${showConversationView ? 'hidden' : 'flex flex-col h-screen bg-white'}`}>
          <div className="sticky top-0 bg-white border-b border-slate-200 z-10 px-4 py-2">
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

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => { setSelectedConversation(conversation.id); setShowConversationView(true); }}
                className="px-3 py-2 border-b border-slate-100 active:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="relative flex-shrink-0">
                    <Image src={conversation.participantAvatar} alt={conversation.participantName} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                    {conversation.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-medium text-slate-900 truncate text-sm">{conversation.participantName}</h3>
                      <span className="text-xs text-slate-500 flex-shrink-0 ml-2">{formatTime(conversation.lastMessageTime)}</span>
                    </div>
                    {conversation.projectTitle && <p className="text-xs text-orange-600 mb-0.5 truncate">{conversation.projectTitle}</p>}
                    <p className="text-xs text-slate-600 truncate leading-4">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && <div className="bg-orange-600 text-white text-xs rounded-full min-w-[18px] h-4 flex items-center justify-center px-1 flex-shrink-0">{conversation.unreadCount}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile conversation view */}
        <div className={`md:hidden ${showConversationView ? 'flex flex-col h-screen bg-white' : 'hidden'}`}>
          {selectedConv && (
            <>
              <div className="sticky top-0 bg-white border-b border-slate-200 z-10 px-2 py-1.5 flex items-center">
                <button onClick={() => setShowConversationView(false)} className="p-1.5 mr-1.5 text-slate-600 hover:text-orange-600 transition-colors rounded-full hover:bg-slate-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="relative flex-shrink-0">
                  <Image src={selectedConv.participantAvatar} alt={selectedConv.participantName} width={40} height={40} className="w-8 h-8 rounded-full object-cover" />
                  {selectedConv.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 ml-2 min-w-0">
                  <h2 className="font-medium text-slate-900 truncate text-xs">{selectedConv.participantName}</h2>
                  <div className="flex items-center text-xs text-slate-500">
                    <span>{selectedConv.isOnline ? 'En ligne' : 'Hors ligne'}</span>
                    {selectedConv.projectTitle && <><span className="mx-1">•</span><span className="text-orange-600 truncate text-xs">{selectedConv.projectTitle}</span></>}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-2 pb-4 bg-slate-50 space-y-2">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[280px] px-3 py-2 rounded-2xl ${message.senderId === currentUserId ? 'bg-orange-600 text-white rounded-br-md' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'}`}>
                      <p className="text-sm leading-5">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.senderId === currentUserId ? 'text-orange-100' : 'text-slate-400'}`}>{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-3 flex items-end space-x-2 z-10">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 border-0 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                  onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-orange-600 text-white p-2.5 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex h-screen">
          {/* Conversations list */}
          <div className="w-1/3 border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">Conversations</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 ${selectedConversation === conversation.id ? 'bg-orange-50 border-orange-200' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Image src={conversation.participantAvatar} alt={conversation.participantName} width={40} height={40} className="w-12 h-12 rounded-full object-cover" />
                      {conversation.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-slate-800 truncate">{conversation.participantName}</h3>
                        <span className="text-xs text-slate-500">{formatTime(conversation.lastMessageTime)}</span>
                      </div>
                      {conversation.projectTitle && <p className="text-xs text-orange-600 mb-1 truncate">{conversation.projectTitle}</p>}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && <span className="bg-orange-600 text-white text-xs rounded-full px-2 py-0.5 ml-2">{conversation.unreadCount}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages panel */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                <div className="sticky top-0 bg-white border-b border-slate-200 z-10 px-4 py-3 flex items-center space-x-3">
                  <div className="relative">
                    <Image src={selectedConv.participantAvatar} alt={selectedConv.participantName} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                    {selectedConv.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div>
                    <h2 className="font-medium text-slate-900">{selectedConv.participantName}</h2>
                    <p className="text-xs text-slate-500">{selectedConv.isOnline ? 'En ligne' : 'Hors ligne'}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-lg px-3 py-2 rounded-2xl ${message.senderId === currentUserId ? 'bg-orange-600 text-white rounded-br-md' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'}`}>
                        <p className="text-sm leading-5">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.senderId === currentUserId ? 'text-orange-100' : 'text-slate-400'}`}>{formatTime(message.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex items-center space-x-2 z-10">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message..."
                    className="flex-1 px-4 py-2.5 bg-slate-100 border-0 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                    onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-orange-600 text-white p-2.5 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">Sélectionnez une conversation</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessageCenter;
