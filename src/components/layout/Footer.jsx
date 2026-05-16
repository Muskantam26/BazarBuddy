import React from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../../path/path';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import appFooterLogo from '../../assets/footerlogo.png';

const Footer = () => {
  const navigate = useNavigate();
  const footerData = {
    quickLinks: [
      { name: 'Blog', path: '/blog' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'About Us', path: '/about' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    customerService: [
      { name: 'Order Tracking', path: '/tracking' },
      { name: 'Product List Page', path: paths.products },
      { name: 'Category Collection', path: '/categories' },
      { name: 'Contact Us', path: '/contact' },
    ],
    contactInfo: [
      { icon: <FiMapPin />, text: '123 Organic Way, Green City' },
      { icon: <FiPhone />, text: '(555) 123-4567' },
      { icon: <FiMail />, text: 'hello@greentic.com' },
    ],
    socialLinks: [
      { icon: <FaFacebookF />, path: '#' },
      { icon: <FaXTwitter />, path: '#' },
      { icon: <FaInstagram />, path: '#' },
      { icon: <FaPinterestP />, path: '#' },
    ]
  };

  return (
    <footer className="bg-[var(--dark-bg)] text-white px-4 py-10  mt-10">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <div onClick={() => navigate(paths.home)} className="flex-shrink-0 cursor-pointer">
              {/* <img src={appFooterLogo} alt="Greentic" className="h-10 w-auto" /> */}
              <h1 className="text-2xl font-extrabold text-white italic">BazarBuddy</h1>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-xs text-lg">
            Delivering farm-fresh organic groceries straight to your doorstep since 2010.
          </p>
          <div className="flex ">
            {footerData.socialLinks.map((social, index) => (
              <div
                key={index} 
                onClick={() => social.path !== '#' && navigate(social.path)} 
                className="w-15 h-15 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {social.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            {footerData.quickLinks.map((link, index) => (
              <li key={index}>
                <div onClick={() => navigate(link.path)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {link.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-bold mb-4">Customer Service</h4>
          <ul className="flex flex-col gap-2">
            {footerData.customerService.map((link, index) => (
              <li key={index}>
                <div onClick={() => navigate(link.path)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {link.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <ul className="flex flex-col gap-2">
            {footerData.contactInfo.map((info, index) => (
              <li key={index} className="flex items-center gap-4 text-gray-400">
                <span className="text-lg ">{info.icon}</span>
                <span>{info.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className=" mx-auto border-t border-white/5 mt-5 pt-5 text-center text-gray-400 text-lg">
        <p>© 2025, Greentic rights reserved.</p>
      </div>
    </footer>
  );
}; 

export default Footer;