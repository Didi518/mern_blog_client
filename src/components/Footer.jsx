import {
  AiFillHeart,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

import images from "../constants/images";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">Produit</h3>
          <ul className="text-[#959ead] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Page d'accueil</a>
            </li>
            <li>
              <a href="/">Fonctionnalités</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Programme</a>
            </li>
            <li>
              <a href="/">Tarifs</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">Services</h3>
          <ul className="text-[#959ead] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Design</a>
            </li>
            <li>
              <a href="/">Thèmes</a>
            </li>
            <li>
              <a href="/">Illustrations</a>
            </li>
            <li>
              <a href="/">Kit UI</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
          <h3 className="text-dark-light font-bold md:text-lg">Entreprise</h3>
          <ul className="text-[#959ead] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Présentation</a>
            </li>
            <li>
              <a href="/">Conditions</a>
            </li>
            <li>
              <a href="/">Confidentialité</a>
            </li>
            <li>
              <a href="/">Carrières</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">Plus</h3>
          <ul className="text-[#959ead] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Liscence</a>
            </li>
            <li>
              <a href="/">Evolutions</a>
            </li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4">
          <img
            src={images.Logo}
            alt="logo"
            className="brightness-0 invert mx-auto md:mx-0"
          />
          <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base lg:text-sm">
            Concevez un site moderne et créatif avec crealand
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <AiOutlineTwitter className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <FaFacebook className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTelegram className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:grid-cols-10">
          <div className="bg-primary text-white p-3 rounded-full">
            <AiFillHeart className="w-7 h-auto" />
          </div>
          <p className="font-bold italic text-dark-light">
            Copyright &copy; 2024. Conçu avec passion.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
