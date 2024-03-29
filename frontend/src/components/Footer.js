import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="pt-20">
      <div class="container mx-auto flex flex-wrap justify-between pt-4 pb-6 max-w-7xl">
        <div class="">
          <h3 class="font-bold text-3xl text-black mb-3">
            Pets<span class="text-blue-400">Prism</span>
          </h3>
          <p class="text-gray-900 leading-loose">
            If you have any Question,Please Contact us At support@gmail.com
          </p>
        </div>
        <div class="">
          <h3 class="font-bold text-gray-500 mb-3">Services</h3>
          <ul class="list-none">
            <li class="mb-2">Help & information</li>
            <li class="mb-2">
              <Link to="/About">About us</Link>
            </li>
            <li class="mb-2">Privacy Policy</li>
            <li class="mb-2">Terms & Condition</li>
            <li class="mb-2">Product Return</li>
            <li class="mb-2">Wholesale policy</li>
          </ul>
        </div>
        <div class="w-full md:w-1/3 px-4">
          <h3 class="font-bold text-gray-500 mb-3">Stay Connected</h3>
          <p class="text-gray-900 leading-loose">
            Get the latest news and updates from our store by subscribing to our
            newsletter.
          </p>
        </div>
      </div>
      <div class="border-t border-gray-800">
        <div class="container mx-auto px-4">
          <div class="text-center text-gray-500 py-6">
            © 2023 Pets E-commerce. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
