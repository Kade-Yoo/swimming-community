'use client';

const reviews = [
  {
    id: 1,
    product: "Speedo Endurance+ Swimsuit",
    reviewer: "Emma Johnson",
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Professional%20female%20swimmer%20wearing%20modern%20competitive%20swimsuit%2C%20pool%20background%2C%20athletic%20pose%2C%20high-quality%20swimming%20gear%2C%20clean%20blue%20water%20environment%2C%20professional%20sports%20photography&width=300&height=300&seq=review1&orientation=squarish",
    comment: "Excellent quality and perfect fit. Great for competitive swimming."
  },
  {
    id: 2,
    product: "Aqua Sphere Goggles",
    reviewer: "Michael Chen",
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Close-up%20of%20premium%20swimming%20goggles%20on%20swimmer%2C%20clear%20underwater%20vision%2C%20modern%20aquatic%20equipment%2C%20professional%20swimming%20gear%2C%20blue%20water%20background%2C%20high-quality%20sports%20equipment&width=300&height=300&seq=review2&orientation=squarish",
    comment: "Crystal clear vision underwater. Comfortable for long sessions."
  },
  {
    id: 3,
    product: "TYR Training Fins",
    reviewer: "Sarah Williams",
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Swimming%20training%20fins%20in%20action%2C%20athlete%20using%20fins%20in%20pool%2C%20professional%20swimming%20training%20equipment%2C%20underwater%20shot%2C%20aquatic%20sports%20gear%2C%20modern%20pool%20environment&width=300&height=300&seq=review3&orientation=squarish",
    comment: "Perfect for training. Really helps improve technique and speed."
  },
  {
    id: 4,
    product: "Arena Kickboard",
    reviewer: "David Martinez",
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Swimming%20kickboard%20training%20session%2C%20athlete%20using%20kickboard%20in%20pool%2C%20professional%20aquatic%20training%20equipment%2C%20clear%20blue%20water%2C%20modern%20swimming%20facility%2C%20sports%20training%20gear&width=300&height=300&seq=review4&orientation=squarish",
    comment: "Sturdy and durable. Great for building leg strength."
  },
  {
    id: 5,
    product: "Zoomers Training Paddles",
    reviewer: "Lisa Thompson",
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Swimming%20hand%20paddles%20training%20equipment%2C%20swimmer%20using%20paddles%20in%20pool%2C%20professional%20aquatic%20training%20gear%2C%20blue%20water%20background%2C%20modern%20swimming%20accessories%2C%20sports%20equipment&width=300&height=300&seq=review5&orientation=squarish",
    comment: "Excellent for building upper body strength. Highly recommend!"
  },
  {
    id: 6,
    product: "Aqua Fitness Belt",
    reviewer: "Robert Kim",
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Aqua%20fitness%20belt%20water%20exercise%20equipment%2C%20pool%20fitness%20training%2C%20modern%20aquatic%20fitness%20gear%2C%20clear%20blue%20water%2C%20professional%20water%20sports%20equipment%2C%20athletic%20training%20session&width=300&height=300&seq=review6&orientation=squarish",
    comment: "Perfect for water workouts. Comfortable and effective."
  }
];

export default function ReviewPhotos() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Equipment Reviews</h2>
          <p className="text-xl text-gray-600">Real reviews from our swimming community</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={review.image} 
                  alt={review.product}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {review.rating}/5 ⭐
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{review.product}</h3>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {review.reviewer.charAt(0)}
                  </div>
                  <span className="ml-3 text-gray-600">{review.reviewer}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 