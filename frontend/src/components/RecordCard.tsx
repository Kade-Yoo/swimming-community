'use client';

interface Record {
  id: number;
  event: string;
  record: string;
  holder: string;
  date: string;
  competition: string;
  category: string;
}

interface RecordCardProps {
  record: Record;
}

export default function RecordCard({ record }: RecordCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-timer-line text-blue-600"></i>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{record.event}</h3>
              <p className="text-sm text-gray-600">{record.category}</p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{record.record}</div>
          <div className="text-sm text-gray-500">기록</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span>{record.holder}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-calendar-line"></i>
              </div>
              <span>{record.date}</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 flex items-center justify-center mr-1">
              <i className="ri-trophy-line"></i>
            </div>
            <span>{record.competition}</span>
          </div>
        </div>
      </div>
    </div>
  );
}