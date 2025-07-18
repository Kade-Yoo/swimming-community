import React from 'react';
import type { RefObject } from 'react';

interface WritePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  value: { title: string; author: string; content: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  titleRef: RefObject<HTMLInputElement | null>;
}

const WritePostModal: React.FC<WritePostModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  value,
  onChange,
  titleRef,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn" onSubmit={onSubmit}>
        <h3 className="text-2xl font-bold text-blue-700 mb-4">글쓰기</h3>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">제목</label>
          <input name="title" value={value.title} onChange={onChange} ref={titleRef} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required maxLength={50} />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">작성자</label>
          <input name="author" value={value.author} onChange={onChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required maxLength={20} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">본문</label>
          <textarea name="content" value={value.content} onChange={onChange} className="w-full border rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" required maxLength={1000} />
        </div>
        {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded" disabled={loading || !value.title.trim() || !value.author.trim() || !value.content.trim()}>등록</button>
          <button type="button" className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded" onClick={onClose}>취소</button>
        </div>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-xl font-bold" type="button" onClick={onClose} aria-label="닫기">×</button>
      </form>
    </div>
  );
};

export default WritePostModal; 