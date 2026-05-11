import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const TestimonialCard = ({ name, avatar, rating, review }) => {
  return (
    <div className="bg-white p-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="flex items-center gap-4 p-2">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <div className="flex text-yellow-400 text-xl mt-1">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-200'} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600   p-2 line-clamp-3">
        "{review}"
      </p>
    </div>
  );
};

export default TestimonialCard;
