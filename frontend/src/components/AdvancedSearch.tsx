import React, { useState } from 'react';

export interface SearchFilter {
  keyword: string;
  category: string;
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  author: string;
  tags: string[];
  sortBy: 'relevance' | 'date' | 'likes' | 'comments' | 'views';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filter: SearchFilter) => void;
  initialFilter?: Partial<SearchFilter>;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  initialFilter
}) => {
  const [filter, setFilter] = useState<SearchFilter>({
    keyword: '',
    category: 'all',
    dateRange: 'all',
    author: '',
    tags: [],
    sortBy: 'relevance',
    sortOrder: 'desc',
    ...initialFilter
  });

  const [availableTags] = useState([
    '자유형', '평영', '배영', '접영', '호흡법', '킥', '스트로크', '턴', '스타트',
    '기초', '중급', '고급', '대회', '연습', '팁', '질문', '후기'
  ]);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'general', label: '일반' },
    { value: 'technique', label: '기술' },
    { value: 'competition', label: '대회' },
    { value: 'equipment', label: '장비' },
    { value: 'training', label: '연습' },
    { value: 'question', label: '질문' }
  ];

  const dateRanges = [
    { value: 'all', label: '전체 기간' },
    { value: 'today', label: '오늘' },
    { value: 'week', label: '이번 주' },
    { value: 'month', label: '이번 달' },
    { value: 'year', label: '올해' }
  ];

  const sortOptions = [
    { value: 'relevance', label: '관련도' },
    { value: 'date', label: '날짜' },
    { value: 'likes', label: '좋아요' },
    { value: 'comments', label: '댓글' },
    { value: 'views', label: '조회수' }
  ];

  const handleInputChange = (field: keyof SearchFilter, value: any) => {
    setFilter(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFilter(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filter);
    onClose();
  };

  const handleReset = () => {
    setFilter({
      keyword: '',
      category: 'all',
      dateRange: 'all',
      author: '',
      tags: [],
      sortBy: 'relevance',
      sortOrder: 'desc'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-950/40 dark:bg-blue-950/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-xl font-semibold">고급 검색</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 검색 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 키워드 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              검색어
            </label>
            <input
              type="text"
              value={filter.keyword}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              placeholder="제목, 내용, 작성자로 검색..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 카테고리 및 날짜 범위 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                카테고리
              </label>
              <select
                value={filter.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                날짜 범위
              </label>
              <select
                value={filter.dateRange}
                onChange={(e) => handleInputChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 작성자 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              작성자
            </label>
            <input
              type="text"
              value={filter.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="작성자명으로 검색..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 태그 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              태그 선택
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    filter.tags.includes(tag)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                정렬 기준
              </label>
              <select
                value={filter.sortBy}
                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                정렬 순서
              </label>
              <select
                value={filter.sortOrder}
                onChange={(e) => handleInputChange('sortOrder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="desc">내림차순</option>
                <option value="asc">오름차순</option>
              </select>
            </div>
          </div>

          {/* 선택된 필터 표시 */}
          {(filter.keyword || filter.category !== 'all' || filter.dateRange !== 'all' || filter.author || filter.tags.length > 0) && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">적용된 필터:</h4>
              <div className="flex flex-wrap gap-2">
                {filter.keyword && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    검색어: {filter.keyword}
                  </span>
                )}
                {filter.category !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    카테고리: {categories.find(c => c.value === filter.category)?.label}
                  </span>
                )}
                {filter.dateRange !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    기간: {dateRanges.find(d => d.value === filter.dateRange)?.label}
                  </span>
                )}
                {filter.author && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    작성자: {filter.author}
                  </span>
                )}
                {filter.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    태그: {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              검색
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedSearch; 