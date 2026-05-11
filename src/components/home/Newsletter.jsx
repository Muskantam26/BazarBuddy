import React from 'react';

import Input from '../ui/Input';

const Newsletter = () => {
  return (
    <section className="mt-10 p-4">
      <div className="bg-[var(--primary-color)] rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-3xl md:text-3xl font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white opacity-90 text-lg">
            Subscribe to get exclusive offers, recipes, and health tips delivered to your inbox.
          </p>
        </div>

        <div className="w-full lg:auto flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative ">
            <Input 
              type="email" 
              placeholder="Enter Email" 
              className="w-full px-6 py-3 rounded-xl  border border-white text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all bg-transparent"
            />
          </div>
          <button className="w-full sm:w-auto px-6 py-3 bg-[var(--white)] text-[var(--black)] font-bold rounded-xl hover:bg-[var(--bg-soft)] transition-colors shadow-lg">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
