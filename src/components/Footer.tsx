/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FiGithub } from "react-icons/fi";
import { LiaLinkedin } from "react-icons/lia";
import { TbBrandTwitter } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#1f5f8d] text-white px-4 md:px-20 py-4 md:py-16">
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
            <p className=" text-[#fdb557] font-bold mb-2 md:text-end">Follow Us</p>
            <div className="flex space-x-3">
              <div className="w-[45px] h-[45px] bg-[#84dccf] rounded-full flex items-center justify-center hover:bg-[#fdb557] cursor-pointer">
                <FiGithub className="w-6 h-6 text-black" />
              </div>
              <div className="w-[45px] h-[45px] bg-[#84dccf] rounded-full flex items-center justify-center hover:bg-[#fdb557] cursor-pointer">
                <LiaLinkedin className="w-6 h-6 text-black" />
              </div>
              <div className="w-[45px] h-[45px] bg-[#84dccf] rounded-full flex items-center justify-center hover:bg-[#fdb557] cursor-pointer">
                <TbBrandTwitter className="w-6 h-6 text-black" />
              </div>
              <div className="w-[45px] h-[45px] bg-[#84dccf] rounded-full flex items-center justify-center hover:bg-[#fdb557] cursor-pointer">
                <FiFacebook className="w-6 h-6 text-black" />
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
