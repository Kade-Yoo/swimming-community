import React from 'react';
import type { RefObject } from 'react';

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  value,
  onChange,
  textareaRef,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn" onSubmit={onSubmit}>
        <h3 className="text-xl font-bold text-red-600 mb-4">신고하기</h3>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">신고 사유</label>
          <textarea
            value={value}
            onChange={onChange}
            ref={textareaRef}
            className="w-full border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
            required
            maxLength={300}
            placeholder="신고 사유를 입력해 주세요."
          />
        </div>
        {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded" disabled={loading || !value.trim()}>확인</button>
          <button type="button" className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded" onClick={onClose}>취소</button>
        </div>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-xl font-bold" type="button" onClick={onClose} aria-label="닫기">×</button>
      </form>
    </div>
  );
};

export default ReportModal; 