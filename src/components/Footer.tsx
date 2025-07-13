/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1f5f8d] text-white px-20 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-2 pb-8">
            <img src="/logo.png" alt="" className="w-10 h-10" />
            <span className="text-xl font-semibold">CivicDataSpace</span>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
            <span className="text-gray-300 hover:text-white cursor-pointer">
              ABOUT US
            </span>
            <span className="text-gray-300 hover:text-white cursor-pointer">
              SITEMAP
            </span>
            <span className="text-gray-300 hover:text-white cursor-pointer">
              CONTACT US
            </span>
          </div>
        </div>

        {/* Social Media Icons and Made By */}
        <div className="flex flex-col items-start md:items-end">
          <div className="pb-8">
            <p className=" text-[#fdb557] font-bold mb-2 text-end">Follow Us</p>
            <div className="flex space-x-3">
              <div className="w-[45px] h-[45px] bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer">
                <FaGithub className="w-6 h-6 text-white" />
              </div>
              <div className="w-[45px] h-[45px] bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer">
                <FaLinkedin className="w-6 h-6 text-white" />
              </div>
              <div className="w-[45px] h-[45px] bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer">
                <FaTwitter className="w-6 h-6 text-white" />
              </div>
              <div className="w-[45px] h-[45px] bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer">
                <FaFacebook className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Made By */}
          <div className="flex items-center">
            <span className="text-sm text-gray-300 mr-2">made by</span>
            <span className=" text-white font-bold">Shridhi Aggarwal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
