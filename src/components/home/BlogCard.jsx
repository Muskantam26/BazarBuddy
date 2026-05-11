import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const BlogCard = ({ image, tag, date, title, description, path }) => {
  const navigate = useNavigate();
  const getTagColor = (tag) => {
    // Using accent color for tags
    return 'bg-[var(--accent-color)]';
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover "
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <span className={`${getTagColor(tag)} text-white text-[10px] font-extrabold px-3 py-1 rounded-[4px] uppercase tracking-wider`}>
            {tag}
          </span>
          <span className="text-gray-400 text-sm font-medium">
            {date}
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[var(--primary-color)] transition-colors line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-gray-500 text-lg mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto">
          <div
            onClick={() => path && navigate(path)}
            className="inline-flex items-center gap-2 text-[var(--primary-color)] font-extrabold text-sm hover:gap-3 transition-all duration-300 cursor-pointer"
          >
            Read More <HiOutlineArrowNarrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
