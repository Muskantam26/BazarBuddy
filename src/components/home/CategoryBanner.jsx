import { useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import Button1 from '../ui/Button1';

const CategoryBanner = ({ image, name, path ,className}) => {
  const navigate = useNavigate();
  return (
    <div className={`relative h-[200px] ${className} rounded-2xl overflow-hidden group`}>
      {/* Background Image */}
      <img 
        src={image} 
        alt={name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {name}
        </h3>
        
        <Button1
          onClick={() => path && navigate(path)}
          className="inline-flex items-center gap-2 w-fit"
        >
          Shop Now
          <HiArrowRight />
        </Button1>
      </div>
    </div>
  );
};

export default CategoryBanner;
