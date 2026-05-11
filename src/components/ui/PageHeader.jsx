import React from 'react';

const PageHeader = ({ title }) => {
  return (
    <section className="page-header-bg py-20 px-4 mb-10 relative overflow-hidden">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 z-0"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-extrabold text-[var(--black)] tracking-tight drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHeader;
