'use client';

interface Competition {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  status: string;
  image: string;
  participants: number;
  events: string[];
}

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '참가접수중':
        return 'bg-green-100 text-green-800';
      case '예정':
        return 'bg-blue-100 text-blue-800';
      case '준비중':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={competition.image}
          alt={competition.title}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(competition.status)}`}>
            {competition.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">{competition.category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{competition.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-calendar-line"></i>
            </div>
            <span className="text-sm">{competition.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-map-pin-line"></i>
            </div>
            <span className="text-sm">{competition.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-group-line"></i>
            </div>
            <span className="text-sm">{competition.participants}명 참가</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">경기 종목</h4>
          <div className="flex flex-wrap gap-1">
            {competition.events.map((event, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
              >
                {event}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-colors whitespace-nowrap cursor-pointer">
            자세히 보기
          </button>
          {competition.status === '참가접수중' && (
            <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer">
              참가 신청
            </button>
          )}
        </div>
      </div>
    </div>
  );
}