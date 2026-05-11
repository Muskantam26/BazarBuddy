import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import CategoryBanner from '../components/home/CategoryBanner';
import CollectionCard from '../components/home/CollectionCard';
import paths from '../path/path';

import bannerVeg from "../assets/vagetables.png";
import bannerSnacks from "../assets/snacks.png";
import bannerGroceries from "../assets/groceries.png";

const TopCollection = () => {
  const featuredCollections = [
    { name: "Vegetables", image: bannerVeg, path: paths.home + "vegetables" },
    { name: "Snacks", image: bannerSnacks, path: paths.home + "snacks" },
  ];

  const allCollections = [
    { name: "Vegetables", image: bannerVeg, path: paths.home + "vegetables" },
    { name: "Snacks", image: bannerSnacks, path: paths.home + "snacks" },
    { name: "Groceries", image: bannerGroceries, path: paths.home + "groceries" }
    
  ];

  return (
    <div className="">
      <PageHeader title="Collection List" />
      
      <div className="  px-4">
        {/* Featured Collections Section */}
        <section className="mb-10">
          <SectionHeader title="Featured Collections" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCollections.map((item, index) => (
              <CategoryBanner 
                key={index}
                name={item.name}
                image={item.image}
                path={item.path}
                className={"h-[300px]"}
              />
            ))}
          </div>
        </section>

        {/* Browse All Collections Section */}
        <section>
          <SectionHeader title="Browse All Collections" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCollections.map((item, index) => (
              <CollectionCard 
                key={index}
                name={item.name}
                image={item.image}
                path={item.path}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TopCollection;
