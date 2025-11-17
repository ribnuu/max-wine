"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ShoppingCart,
  User,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import FilterPage from "@/Components/Ui/FilterPage";
import ELiquidProductsPage from "@/Components/Ui/E-LiquidProductspage";

// Mock Data
const deals = [
  {
    id: 1,
    title: "Spirit Of The Month",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
    link: "/latest-deals",
  },
  {
    id: 2,
    title: "Wine Of The Month",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    link: "/latest-deals",
  },
  {
    id: 3,
    title: "Ale Of The Month",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
    link: "/latest-deals",
  },
  {
    id: 4,
    title: "Cocktail Of The Month",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    link: "/latest-deals",
  },
  {
    id: 5,
    title: "Only £15.99 Each",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400",
    link: "/offers",
  },
  {
    id: 6,
    title: "2 for £11.50",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=400",
    link: "/offers",
  },
  {
    id: 7,
    title: "2 for £13",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    link: "/offers",
  },
  {
    id: 8,
    title: "2 For £14",
    image: "/istockphoto-1808368424-612x612.jpg",
    link: "/offers",
  },
];

const categories = [
  { name: "Spirits", link: "/products/spirits" },
  { name: "Wine", link: "/products/wine" },
  { name: "Beers & Ciders", link: "/products/beers" },
  { name: "Ready to Drink", link: "/products/rtd" },
  { name: "Low And No", link: "/products/low-no" },
  { name: "Soft Drinks", link: "/products/soft-drinks" },
  { name: "Snacks", link: "/products/snacks" },
];

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<any>(null);

  const navItems = [
    { name: "Home", page: "home" },
    { name: "Offers", page: "offers" },
    { name: "Latest Deals", page: "latest-deals" },
    // { name: "Festive Drinks", page: "festive" },
    { name: "Mak's Bar", page: "bar" },
    { name: "E-Liquid & Vapes", page: "eliquid" },
    {
      name: "Products",
      page: "products",
      dropdown: categories,
    },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-red-800 text-white sticky top-0 z-50 shadow-lg ">
      {/* Top Bar */}
      <div className="bg-red-800 py-2 px-4 border-b border-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> 01235 531 063
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> info@makwines.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 cursor-pointer hover:text-red-200" />
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-red-200" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20 gap-8">
          {/* Logo */}
          <div
            className="text-5xl sm:text-5xl text-white cursor-pointer whitespace-nowrap"
            onClick={() => handleNavClick("home")}
          >
            Mak <span className="font-bold">Wines</span>
          </div>

          {/* Desktop Navigation centered */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => !item.dropdown && handleNavClick(item.page)}
                  className="flex items-center gap-1 hover:text-red-200 transition py-2"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </button>
                {item.dropdown && (
                  <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48">
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleNavClick("products")}
                        className="block w-full text-left px-4 py-2 hover:bg-red-50 transition"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => handleNavClick("store-finder")}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-500 px-4 py-2 rounded transition"
            >
              <MapPin className="w-4 h-4" />
              Store Finder
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden absolute right-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pb-4">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  if (!item.dropdown) {
                    handleNavClick(item.page);
                    setMobileMenuOpen(false);
                  } else {
                    setActiveDropdown(
                      activeDropdown === item.name ? null : item.name
                    );
                  }
                }}
                className="block w-full text-left py-2 hover:text-red-200 transition"
              >
                {item.name}
              </button>
              {item.dropdown && activeDropdown === item.name && (
                <div className="pl-4 bg-red-600 rounded my-1">
                  {item.dropdown.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => {
                        handleNavClick("products");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-sm hover:text-red-200"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }: any) => {
  const [email, setEmail] = useState("");

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* Newsletter */}
      <div className="bg-red-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Mak Wines News</h3>
            <p className="mb-4">
              Join and find out about all of our latest deals
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded text-white border-2 border-white bg-red-600 focus:outline-"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 px-6 py-2 rounded font-semibold transition border-2 border-white"
              >
                Join Now!
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div
            className="text-3xl sm:text-3xl text-white cursor-pointer whitespace-nowrap"
            onClick={() => handleNavClick("home")}
          >
            Mak <span className="font-bold">Wines</span>
          </div>
          <p className="text-gray-400 text-sm">
            Your premier destination for quality drinks at unbeatable prices.
          </p>
          <div className="flex gap-4 mt-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <button
                onClick={() => handleNavClick("about")}
                className="hover:text-white transition"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("store-finder")}
                className="hover:text-white transition"
              >
                Store Finder
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("contact")}
                className="hover:text-white transition"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("careers")}
                className="hover:text-white transition"
              >
                Careers
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Categories</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <button
                onClick={() => handleNavClick("products")}
                className="hover:text-white transition"
              >
                Spirits
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("products")}
                className="hover:text-white transition"
              >
                Wine
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("products")}
                className="hover:text-white transition"
              >
                Beers & Ciders
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("products")}
                className="hover:text-white transition"
              >
                Soft Drinks
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Legal</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <button
                onClick={() => handleNavClick("privacy")}
                className="hover:text-white transition"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("terms")}
                className="hover:text-white transition"
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("cookies")}
                className="hover:text-white transition"
              >
                Cookie Policy
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>
            © 2025 Mak Wines. All rights reserved. | Drink responsibly. Must be
            18+
          </p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }: any) => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative text-white py-50 image-full bg-cover bg-center mb-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200')",
          backgroundBlendMode: "overlay",
          // backgroundColor: "rgba(127, 29, 29, 0.7)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to Mak Wines</h1>
            <p className="text-xl mb-6">
              Discover unbeatable deals on premium spirits, wines, and more
            </p>
            <button
              onClick={() => setCurrentPage("offers")}
              className="bg-white text-red-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition"
            >
              Shop Latest Offers
            </button>
          </div>
        </div>
      </div>

      {/* Latest Deals Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-700">
          Latest Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-red-700">
          {deals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => setCurrentPage("latest-deals")}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{deal.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-700">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-red-700">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setCurrentPage("products")}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center font-semibold hover:bg-red-50"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Offers Page
const OffersPage = () => {
  const offers = [
    {
      title: "2 for £11.50",
      desc: "Selected Spirits",
      image:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400",
    },
    {
      title: "2 for £13",
      desc: "Premium Wines",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    },
    {
      title: "2 for £14",
      desc: "Craft Beers",
      image:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
    },
    {
      title: "£15.99 Each",
      desc: "Premium Whisky",
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
    },
    {
      title: "3 for £6",
      desc: "Ready to Drink",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    },
    {
      title: "4 for £11",
      desc: "Soft Drinks",
      image:
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                {offer.title}
              </h3>
              <p className="text-gray-600">{offer.desc}</p>
              <button className="mt-4 bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Latest Deals Page
const LatestDealsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Latest Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {deals.slice(0, 6).map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-red-700">
                {deal.title}
              </h3>
              <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                View Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Other Pages (simplified for space)
// const FestivePage = () => (
//   <div className="max-w-7xl mx-auto px-4 py-12">
//     <h1 className="text-4xl font-bold mb-8 text-red-700">Festive Drinks</h1>
//     <div className="bg-linear-to-r from-green-700 to-red-700 text-white p-12 rounded-lg mb-8">
//       <h2 className="text-3xl font-bold mb-4">Celebrate in Style</h2>
//       <p className="text-xl">
//         Discover our festive collection of champagnes, wines, and spirits
//         perfect for your celebrations
//       </p>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//         <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
//           <div className="h-40 bg-gray-200 rounded mb-4"></div>
//           <h3 className="font-bold mb-2 text-red-700">Festive Product {i}</h3>
//           <p className="text-red-700 font-bold">£{15 + i * 2}.99</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

const BarPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">Mak's Bar</h1>
    <div className="bg-red-700 text-white p-12 rounded-lg mb-8">
      <h2 className="text-3xl font-bold mb-4">Craft Your Perfect Cocktail</h2>
      <p className="text-xl">Everything you need to become a home bartender</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-red-700">
      {["Cocktail Kits", "Bar Tools", "Recipe Books"].map((item) => (
        <div
          key={item}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <div className="h-48 bg-gray-200 rounded mb-4"></div>
          <h3 className="text-xl font-bold">{item}</h3>
        </div>
      ))}
    </div>
  </div>
);

const ELiquidPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700"></h1>
      <ELiquidProductsPage />
      {/* <p className="text-xl text-gray-600 mb-8">
        Browse our wide selection of vapes and e-liquids
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-bold mb-2 text-red-700">E-Liquid {i}</h3>
            <p className="text-red-700 font-bold">£{8 + i}.99</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

const ProductsPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700"></h1>
    <FilterPage />
    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className="bg-red-700 text-white p-4 rounded-lg hover:bg-red-600 transition"
        >
          {cat.name}
        </button>
      ))}
    </div> */}
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h3 className="font-bold mb-2 text-red-700">Product Name {i}</h3>
            <p className="text-gray-600 text-sm mb-2">Description of product</p>
            <p className="text-red-700 font-bold text-xl">£{10 + i * 2}.99</p>
            <button className="w-full mt-3 bg-red-700 text-white py-2 rounded hover:bg-red-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div> */}
  </div>
);

const StoreFinderPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">Find a Store</h1>
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <input
        type="text"
        placeholder="Enter your postcode or city"
        className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg"
      />
      <button className="mt-4 bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition">
        Search Stores
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-2 text-red-700">
            Mak Wines - Store {i}
          </h3>
          <p className="text-gray-600 mb-2">
            {" "}
            6 Peachcroft Shopping Centre,
            <br /> Peachcroft road,
            <br /> Abingdon,
            <br /> Oxfordshire,
            <br /> OX14 2QA.
          </p>
          <p className="text-gray-600 mb-4">
            Open: Mon-Sat 9am-10pm, Sun 10am-8pm
          </p>
          <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Get Directions
          </button>
        </div>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">About Mak Wines</h1>
    <div className="prose max-w-none">
      <p className="text-lg text-gray-700 mb-6">
        Welcome to Mak Wines, your premier destination for quality drinks at
        unbeatable prices. We've been serving our community for over 15 years,
        providing an extensive selection of spirits, wines, beers, and more.
      </p>
      <h2 className="text-2xl font-bold mb-4 mt-8 text-red-700">Our Story</h2>
      <p className="text-gray-700 mb-6">
        Founded in 2010, Mak Wines started as a small family business with a
        passion for bringing quality beverages to our local community. Today, we
        operate multiple stores across the region, each committed to the same
        values of quality, affordability, and excellent customer service.
      </p>
      <h2 className="text-2xl font-bold mb-4 mt-8 text-red-700">Our Values</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>Quality products at competitive prices</li>
        <li>Expert knowledge and friendly service</li>
        <li>Responsible retailing and community engagement</li>
        <li>Wide selection to suit every taste and occasion</li>
      </ul>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">Contact Us</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-red-700">Get In Touch</h2>
        <div className="space-y-4 text-gray-700">
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-700" /> 01235 531 063
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-red-700" /> info@makwines.com
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-700" /> 6 Peachcroft Shopping
            Centre,
            <br /> Peachcroft road,
            <br /> Abingdon,
            <br /> Oxfordshire,
            <br /> OX14 2QA.
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-red-700">Send a Message</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-red-700 text-white px-6 py-3 rounded hover:bg-red-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">Privacy Policy</h1>
    <div className="prose max-w-none text-gray-700 space-y-4">
      <p>Last updated: November 2025</p>
      <h2 className="text-2xl font-bold mt-6">1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us, such as when you
        create an account, make a purchase, or contact us.
      </p>
      <h2 className="text-2xl font-bold mt-6">
        2. How We Use Your Information
      </h2>
      <p>
        We use the information we collect to provide, maintain, and improve our
        services, process transactions, and communicate with you.
      </p>
      <h2 className="text-2xl font-bold mt-6">3. Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share information with
        service providers who assist in our operations.
      </p>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">Terms & Conditions</h1>
    <div className="prose max-w-none text-gray-700 space-y-4">
      <p>Last updated: November 2025</p>
      <h2 className="text-2xl font-bold mt-6">1. Acceptance of Terms</h2>
      <p>
        By accessing and using this website, you accept and agree to be bound by
        the terms and provision of this agreement.
      </p>
      <h2 className="text-2xl font-bold mt-6">2. Age Restriction</h2>
      <p>
        You must be 18 years or older to purchase alcohol from our website. We
        reserve the right to refuse service to anyone.
      </p>
      <h2 className="text-2xl font-bold mt-6">3. Product Information</h2>
      <p>
        We strive to provide accurate product information, but we do not warrant
        that product descriptions or other content is accurate, complete, or
        error-free.
      </p>
      <h2 className="text-2xl font-bold mt-6">4. Pricing and Availability</h2>
      <p>
        All prices are subject to change without notice. We reserve the right to
        limit quantities and discontinue products.
      </p>
    </div>
  </div>
);

const CookiesPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">Cookie Policy</h1>
    <div className="prose max-w-none text-gray-700 space-y-4">
      <p>Last updated: November 2025</p>
      <h2 className="text-2xl font-bold mt-6">What Are Cookies</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile
        device when you visit our website.
      </p>
      <h2 className="text-2xl font-bold mt-6">How We Use Cookies</h2>
      <p>
        We use cookies to improve your browsing experience, analyze site
        traffic, and personalize content.
      </p>
      <h2 className="text-2xl font-bold mt-6">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Essential Cookies:</strong> Required for the website to
          function properly
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand how visitors
          interact with our website
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used to deliver relevant
          advertisements
        </li>
      </ul>
      <h2 className="text-2xl font-bold mt-6">Managing Cookies</h2>
      <p>
        You can control and/or delete cookies as you wish. You can delete all
        cookies that are already on your computer and you can set most browsers
        to prevent them from being placed.
      </p>
    </div>
  </div>
);

const CareersPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700">
      Careers at Mak Wines
    </h1>
    <div className="bg-red-700 text-white p-8 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
      <p className="text-lg">
        We're always looking for passionate people to join our growing team.
        Discover exciting career opportunities at Mak Wines.
      </p>
    </div>

    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-red-700">Store Manager</h3>
        <p className="text-gray-600 mb-2">
          Location: 6 Peachcroft Shopping Centre,
          <br /> Peachcroft road,
          <br /> Abingdon,
          <br /> Oxfordshire, <br />
          OX14 2QA. | Full-time
        </p>
        <p className="text-gray-700 mb-4">
          We're seeking an experienced store manager to lead our Manchester
          location. Must have retail management experience and excellent
          customer service skills.
        </p>
        <button className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600 transition">
          Apply Now
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-red-700">Sales Associate</h3>
        <p className="text-gray-600 mb-2">Location: Birmingham | Part-time</p>
        <p className="text-gray-700 mb-4">
          Join our team as a sales associate. Perfect for someone with a passion
          for customer service and product knowledge.
        </p>
        <button className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600 transition">
          Apply Now
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-red-700">
          Warehouse Operative
        </h3>
        <p className="text-gray-600 mb-2">Location: London | Full-time</p>
        <p className="text-gray-700 mb-4">
          We're looking for reliable warehouse operatives to join our
          distribution center. Experience in logistics preferred.
        </p>
        <button className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600 transition">
          Apply Now
        </button>
      </div>
    </div>

    <div className="mt-12 bg-gray-50 p-8 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-red-700">
        Why Work With Us?
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-red-700 font-bold">✓</span>
          <span>Competitive salary and benefits</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-700 font-bold">✓</span>
          <span>Employee discounts</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-700 font-bold">✓</span>
          <span>Career development opportunities</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-700 font-bold">✓</span>
          <span>Supportive team environment</span>
        </li>
      </ul>
    </div>
  </div>
);

// Main App Component
const MakWinesApp = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "offers":
        return <OffersPage />;
      case "latest-deals":
        return <LatestDealsPage />;
      // case "festive":
      //   return <FestivePage />;
      case "bar":
        return <BarPage />;
      case "eliquid":
        return <ELiquidPage />;
      case "products":
        return <ProductsPage />;
      case "store-finder":
        return <StoreFinderPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "privacy":
        return <PrivacyPage />;
      case "terms":
        return <TermsPage />;
      case "cookies":
        return <CookiesPage />;
      case "careers":
        return <CareersPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default MakWinesApp;
