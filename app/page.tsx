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
  ArrowLeft,
} from "lucide-react";
import FilterPage from "@/Components/Ui/FilterPage";
import ELiquidProductsPage from "@/Components/Ui/E-LiquidProductspage";
import HeroSlide from "@/Components/Ui/Hero-Slide";
import Image from "next/image";
// import CardDeck from "@/Components/Ui/Card-deck";

// Mock Data
const deals = [
  {
    id: 1,
    title: "Spirit Of The Week",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
    link: "/latest-deals",
  },
  {
    id: 2,
    title: "Wine Of The Week",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    link: "/latest-deals",
  },
  {
    id: 3,
    title: "Ale Of The Week",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
    link: "/latest-deals",
  },
  {
    id: 4,
    title: "Vapes & E-Liquids",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    link: "/latest-deals",
  },
  {
    id: 5,
    title: "£15.99",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400",
    link: "/offers",
  },
  {
    id: 6,
    title: "£11.50",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=400",
    link: "/offers",
  },
  {
    id: 7,
    title: "£13.00",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    link: "/offers",
  },
  {
    id: 8,
    title: "£14.00",
    image: "/istockphoto-1808368424-612x612.jpg",
    link: "/offers",
  },
];

const categories = [
  {
    name: "Spirits",
    link: "/products/spirits",
    image: require("@/public/Images/categories/Spirits.webp"),
  },
  {
    name: "Wines",
    link: "/products/wine",
    image: require("@/public/Images/categories/wines.jpg"),
  },
  {
    name: "Beers & Ciders",
    link: "/products/beers",
    image: require("@/public/Images/categories/Beers.jpeg"),
  },
  {
    name: "Ready Mixed Drinks",
    link: "/products/rtd",
    image: require("@/public/Images/categories/Ready Mixed Drinks.jpeg"),
  },
  {
    name: "Sweets",
    link: "/products/low-no",
    image: require("@/public/Images/categories/Sweets.jpeg"),
  },
  {
    name: "Vapes & E-Liquids",
    link: "/products/soft-drinks",
    image: require("@/public/Images/categories/Vapes & E-Liquids.webp"),
  },
];

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<any>(null);

  type NavItem = {
    name: string;
    page: string;
    dropdown?: { name: string; page: string }[];
  };

  const navItems: NavItem[] = [
    { name: "Home", page: "home" },
    { name: "Offers", page: "offers" },
    { name: "Week Deals", page: "Week-deals" },
    { name: "Vapes & E-Liquids", page: "eliquid" },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-[#660033] text-white sticky top-0 z-50 shadow-lg">
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
                  onClick={() => handleNavClick(item.page)}
                  className="flex items-center gap-1 hover:text-red-200 transition py-2"
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden absolute right-4">
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
      <div className="bg-[#660033] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Mak Wines News</h3>
            <p className="mb-4">
              Join and find out about all of our Week deals
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
                className="flex-1 px-4 py-2 rounded text-white border-2 border-white bg-[#660033] focus:outline-"
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
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div>
            <div className="space-y-4 text-gray-400 mt-4  ">
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" /> mak@makwines.co.uk
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" /> 6 Peachcroft
                Shopping Centre,
                <br /> Peachcroft road, Abingdon,
                <br /> Oxfordshire, OX14 2QA.
              </p>
            </div>
          </div>
          {/* <div className="flex gap-4 mt-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
          </div> */}
        </div>

        <div className="ml-35">
          <h5 className="font-semibold mb-3">Company</h5>
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
                onClick={() => handleNavClick("contact")}
                className="hover:text-white transition"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        <div className="ml-35">
          <h5 className="font-semibold mb-3">Legal</h5>
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

// Sample Product Data
const productsByCategory: Record<
  string,
  { id: number; name: string; image: string; category: string }[]
> = {
  Spirits: [
    {
      id: 1,
      name: "Premium Vodka",
      image: "/Images/Spirits/Gordon's dry gin pink edition.png",
      category: "Spirits",
    },
    {
      id: 2,
      name: "Scottish Whisky",
      image: "/Images/Spirits/Smirnoff Red label.jpeg",
      category: "Spirits",
    },
    {
      id: 3,
      name: "London Dry Gin",
      image: "/Images/Spirits/Captain morgan Original special gold.jpeg",
      category: "Spirits",
    },
    {
      id: 4,
      name: "Dark Rum",
      image: "/Images/Spirits/Buffalo trace bourbon.jpeg",
      category: "Spirits",
    },
    {
      id: 5,
      name: "Blended Whisky",
      image:
        "/Images/Spirits/Appleton estate 21 years old nassau valley casks.jpeg",
      category: "Spirits",
    },
    {
      id: 6,
      name: "Premium Tequila",
      image: "/Images/Spirits/Chivas legal.jpg",
      category: "Spirits",
    },
  ],
  Wines: [
    {
      id: 7,
      name: "Red Wine Cabernet",
      image: "/Images/Wines/Canti Prosecco.jpeg",
      category: "Wines",
    },
    {
      id: 8,
      name: "White Wine Chardonnay",
      image: "/Images/Wines/Chardonnay Rich and smooth.jpeg",
      category: "Wines",
    },
    {
      id: 9,
      name: "Rosé Wine",
      image: "/Images/Wines/High tide.png",
      category: "Wines",
    },
    {
      id: 10,
      name: "Sparkling Wine",
      image: "/Images/Wines/Isla Negra.png",
      category: "Wines",
    },
    {
      id: 11,
      name: "Merlot Red Wine",
      image: "/Images/Wines/Pinot Grigio.jpeg",
      category: "Wines",
    },
    {
      id: 12,
      name: "Pinot Grigio",
      image: "/Images/Wines/Prosecco.jpeg",
      category: "Wines",
    },
    {
      id: 13,
      name: "Sparkling Wine",
      image: "/Images/Wines/Sauvignon Blanc Oyster bay.jpeg",
      category: "Wines",
    },
    {
      id: 14,
      name: "Merlot Red Wine",
      image: "/Images/Wines/Chardonnay.jpeg",
      category: "Wines",
    },
    {
      id: 15,
      name: "Pinot Grigio",
      image: "/Images/Wines/Villa Maria.jpeg",
      category: "Wines",
    },
    {
      id: 16,
      name: "Sparkling Wine",
      image: "/Images/Wines/Sauvignon Blanc.jpeg",
      category: "Wines",
    },
    {
      id: 17,
      name: "Merlot Red Wine",
      image: "/Images/Wines/Jacob's Creek.jpg",
      category: "Wines",
    },
    // {
    //   id: 18,
    //   name: "Pinot Grigio",
    //   image:
    //     "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=400",
    //   category: "Wines",
    // },
  ],
  "Beers & Ciders": [
    {
      id: 13,
      name: "Premium Lager",
      image:
        "/Images/Beers & Cider's/pexels-paul-espinoza-841364529-30271798.jpg",
      category: "Beers & Ciders",
    },
    {
      id: 14,
      name: "Craft IPA",
      image: "/Images/Beers & Cider's/pexels-introspectivedsgn-9646267.jpg",
      category: "Beers & Ciders",
    },
    {
      id: 15,
      name: "Apple Cider",
      image: "/Images/Beers & Cider's/pexels-thatguycraig000-1634074.jpg",
      category: "Beers & Ciders",
    },
    {
      id: 16,
      name: "Dark Ale",
      image: "/Images/Beers & Cider's/pexels-brettjordan-25311376.jpg",
      category: "Beers & Ciders",
    },
    {
      id: 17,
      name: "Wheat Beer",
      image: "/Images/Beers & Cider's/pexels-ron-martinez-2313692-4044674.jpg",
      category: "Beers & Ciders",
    },
    {
      id: 18,
      name: "Pear Cider",
      image:
        "/Images/Beers & Cider's/pexels-christina-petsos-200616875-11568810.jpg",
      category: "Beers & Ciders",
    },
  ],
  "Ready Mixed Drinks": [
    {
      id: 19,
      name: "Mojito Mix",
      image:
        "/Images/Ready mixed drinks/pexels-8pcarlos-morocho-2150734957-35174177.jpg",
      category: "Ready Mixed Drinks",
    },
    {
      id: 20,
      name: "Margarita Mix",
      image:
        "/Images/Ready mixed drinks/pexels-ajit-shahu-1794732582-28321215.jpg",
      category: "Ready Mixed Drinks",
    },
    {
      id: 21,
      name: "Cosmopolitan Mix",
      image:
        "/Images/Ready mixed drinks/pexels-alle-alonso-3429039-5116860.jpg",
      category: "Ready Mixed Drinks",
    },
    {
      id: 22,
      name: "Long Island Mix",
      image: "/Images/Ready mixed drinks/pexels-bilakis-12360658.jpg",
      category: "Ready Mixed Drinks",
    },
    {
      id: 23,
      name: "Pina Colada Mix",
      image:
        "/Images/Ready mixed drinks/pexels-christopher-welsch-leveroni-2150186467-31562022.jpg",
      category: "Ready Mixed Drinks",
    },
    {
      id: 24,
      name: "Daiquiri Mix",
      image:
        "/Images/Ready mixed drinks/pexels-collab-media-173741945-27626300.jpg",
      category: "Ready Mixed Drinks",
    },
  ],
  Sweets: [
    {
      id: 25,
      name: "Chocolate Bars",
      image: "/Images/Sweets/pexels-pixabay-33239.jpg",
      category: "Sweets",
    },
    {
      id: 26,
      name: "Gummy Bears",
      image: "/Images/Sweets/pexels-anna-belousova-130658517-10325488.jpg",
      category: "Sweets",
    },
    {
      id: 27,
      name: "Hard Candys",
      image: "/Images/Sweets/pexels-nietjuhart-30399678.jpg",
      category: "Sweets",
    },
    {
      id: 28,
      name: "Lollipops",
      image: "/Images/Sweets/pexels-wwarby-19599854.jpg",
      category: "Sweets",
    },
    {
      id: 29,
      name: "Chocolate Truffles",
      image: "/Images/Sweets/pexels-planka-28892456.jpg",
      category: "Sweets",
    },
    {
      id: 30,
      name: "Fruit Jellies",
      image: "/Images/Sweets/pexels-daniblaj95-6007945.jpg",
      category: "Sweets",
    },
  ],
  "Vapes & E-Liquids": [
    {
      id: 31,
      name: "Elf Bar Raya D2",
      image: "/Images/Vapes & E-Liquids/Elf-bar-raya-d2.webp",
      category: "Vapes & E-Liquids",
    },
    {
      id: 32,
      name: "Fruit Bomb 130ml 30mg",
      image: "/Images/Vapes & E-Liquids/fruit-bomb2-130ml-30mg.webp",
      category: "Vapes & E-Liquids",
    },
    {
      id: 33,
      name: "Caliburn G2 Carbon Black",
      image: "/Images/Vapes & E-Liquids/Caliburn-g2-carbon-black.jpg",
      category: "Vapes & E-Liquids",
    },
    {
      id: 34,
      name: "Tokyo Iced Peach 30ml",
      image: "/Images/Vapes & E-Liquids/Tokyo-Iced-Peach-30ml.webp",
      category: "Vapes & E-Liquids",
    },
    {
      id: 35,
      name: "Cherry Cola",
      image: "/Images/Vapes & E-Liquids/Cherry Cola.webp",
      category: "Vapes & E-Liquids",
    },
    {
      id: 36,
      name: "Blueberry Raspberry",
      image: "/Images/Vapes & E-Liquids/Canada-blueberry-raspberry.webp",
      category: "Vapes & E-Liquids",
    },
  ],
};

// Home Page Component
const HomePage = ({ setCurrentPage }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(categoryName);
      setIsAnimating(false);
    }, 300);
  };

  const handleGoBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSlide />
      {/* <div
        className="relative text-white py-72 image-full bg-cover bg-center mb-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200')",
          backgroundBlendMode: "overlay",
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
              View Latest Offers
            </button>
          </div>
        </div>
      </div> */}

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-700">
            {selectedCategory ? selectedCategory : "Shop By Category"}
          </h2>

          {/* Category Cards or Product Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {!selectedCategory ? (
              // Display Category Cards
              categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer min-h-80px flex flex-col rounded-2xl"
                  style={{
                    transform: isAnimating ? "scale(0.7)" : "scale(1)",
                    transition: "transform 0.4s ease-in-out",
                  }}
                >
                  {/* IMAGE AREA WITH TEXT ON TOP */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />

                    {/* FLOATING TEXT IN CENTER */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <h3 className="text-white font-semibold text-xl text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              // Display Products with Go Back Card
              <>
                {/* Go Back Card */}
                <button
                  onClick={handleGoBack}
                  className="bg-[#660033] text-white rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3 min-h-[280px] hover:bg-[#550028]"
                  style={{
                    transform: isAnimating ? "scale(0.7)" : "scale(1)",
                    transition: "transform 0.4s ease-in-out",
                  }}
                >
                  <ArrowLeft className="w-8 h-8" />
                  <span className="text-lg font-semibold">Go Back</span>
                </button>

                {/* Product Cards */}
                {productsByCategory[selectedCategory]?.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-[#660033] rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                    style={{
                      transform: isAnimating ? "scale(0.7)" : "scale(1)",
                      transition: "transform 0.4s ease-in-out",
                      // backgroundImage: `url(/products/${product.image})`,
                      // backgroundSize: "cover",
                      // backgroundPosition: "center",
                      // transform: isAnimating ? "scale(0.7)" : "scale(1)",
                      // transition: "transform 0.4s ease-in-out",
                    }}
                  >
                    <div className="relative h-48 w-full bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-white text-base">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Latest Deals Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-700">
          Week Deals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          {deals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => setCurrentPage("Week-deals")}
              className="bg-[#660033] hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer min-h-80px flex flex-col rounded-2xl"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{deal.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Offers Page
const OffersPage = () => {
  const offers = [
    {
      title: "£11.50",
      desc: "Spirits",
      image:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400",
    },
    {
      title: "£13.00",
      desc: "Premium Wines",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    },
    {
      title: "£14.00",
      desc: "Beers & Ciders",
      image:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
    },
    {
      title: "£15.99",
      desc: "Vapes & E-Liquids",
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
    },
    {
      title: "£30.00",
      desc: "Ready Mixed Drinks",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    },
    {
      title: "£11.00",
      desc: "Soft Drinks",
      image:
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Special Offers</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8">
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
              <h3 className=" text-white font-bold text-lg mb-3 bg-red-600 rounded-4xl px-2 py-1 inline-block">
                {offer.title}
              </h3>
              <p className="text-gray-600">{offer.desc}</p>
              <button className="mt-4 bg-red-700 text-white px-6 py-2 rounded-3xl hover:bg-red-600 transition">
                View
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
      <h1 className="text-4xl font-bold mb-8 text-red-700">Week Deals</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {deals.slice(0, 6).map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-red-700">
                {deal.title}
              </h3>
              <button className="bg-red-700 text-white px-4 py-2 rounded-4xl hover:bg-red-600 transition">
                View Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ELiquidPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700"></h1>
      <ELiquidProductsPage />
    </div>
  );
};

const CardDeck = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700"></h1>
    </div>
  );
};

const ProductsPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8 text-red-700"></h1>
    {/* <CardDeck /> */}
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
    <h1 className="text-4xl font-bold mb-8 text-red-700 border-color:black ">
      Contact Us
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-red-700">Get In Touch</h2>
        <div className="space-y-4 text-red-700">
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-red-700" /> mak@makwines.co.uk
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
            className="w-full p-3 border rounded text-red-700 "
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded text-red-700"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 border rounded text-red-700"
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
      case "Week-deals":
        return <LatestDealsPage />;
      case "eliquid":
        return <ELiquidPage />;
      case "products":
        return <ProductsPage />;
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
      // case "careers":
      //   return <CareersPage />;
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
