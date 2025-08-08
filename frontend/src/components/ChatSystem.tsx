import React, { useState, useEffect, useRef } from 'react';

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'join' | 'leave';
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  messages: ChatMessage[];
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 더미 메시지 생성
  useEffect(() => {
    if (isOpen) {
      const dummyMessages: ChatMessage[] = [
        {
          id: '1',
          author: '시스템',
          content: '수영 커뮤니티 채팅방에 오신 것을 환영합니다!',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          type: 'system'
        },
        {
          id: '2',
          author: 'user1',
          content: '안녕하세요! 오늘 수영 연습하신 분 있나요?',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          type: 'text'
        },
        {
          id: '3',
          author: 'user2',
          content: '저는 오늘 자유형 연습했어요. 호흡이 많이 좋아졌어요!',
          timestamp: new Date(Date.now() - 6 * 60 * 1000),
          type: 'text'
        },
        {
          id: '4',
          author: 'user3',
          content: '평영 킥 연습 중인데 팁 있으신 분?',
          timestamp: new Date(Date.now() - 4 * 60 * 1000),
          type: 'text'
        },
        {
          id: '5',
          author: 'user1',
          content: '발목을 자연스럽게 펴서 킥하시면 됩니다!',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          type: 'text'
        }
      ];
      setMessages(dummyMessages);
    }
  }, [isOpen]);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 입력 필드 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      author: currentUser,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageClass = (message: ChatMessage) => {
    const baseClass = 'p-3 rounded-lg mb-2 max-w-xs';
    
    if (message.type === 'system') {
      return `${baseClass} bg-gray-100 text-gray-600 text-center mx-auto text-sm`;
    }
    
    if (message.author === currentUser) {
      return `${baseClass} bg-blue-500 text-white ml-auto`;
    }
    
    return `${baseClass} bg-gray-200 text-gray-800`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-message-3-line"></i>
          <h3 className="font-semibold">실시간 채팅</h3>
          <span className="text-xs bg-green-400 px-2 py-1 rounded-full">온라인</span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-2">
          {messages.map((message) => (
            <div key={message.id} className={getMessageClass(message)}>
              {message.type === 'system' ? (
                <div className="text-center">
                  <span className="text-xs text-gray-500">{message.content}</span>
                </div>
              ) : (
                <div>
                  {message.author !== currentUser && (
                    <div className="text-xs text-gray-600 mb-1">{message.author}</div>
                  )}
                  <div className="break-words">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="bg-gray-200 text-gray-600 p-3 rounded-lg mb-2 max-w-xs">
              <div className="flex items-center gap-1">
                <span className="text-xs">누군가 입력 중...</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (!isTyping) setIsTyping(true);
              setTimeout(() => setIsTyping(false), 1000);
            }}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="ri-send-plane-line"></i>
          </button>
        </form>
        <div className="text-xs text-gray-500 mt-1 text-center">
          Enter로 전송, Shift+Enter로 줄바꿈
        </div>
      </div>
    </div>
  );
};

export default ChatSystem; 