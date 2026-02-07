"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/lib/types/product";
import { WeekDeal } from "@/lib/types/weekDeal";
import {
  Menu,
  X,
  MapPin,
  Mail,
  ArrowLeft,
  Search,
  Phone,
  Clock,
} from "lucide-react";
import ELiquidProductsPage from "@/Components/Ui/E-LiquidProductspage";
import HeroSlide from "@/Components/Ui/Hero-Slide";
import Image from "next/image";

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
    image: "/Images/Vapes & E-Liquids/Vapes & E-liquids.jpg",
    link: "/latest-deals",
  },
  {
    id: 5,
    title: "Sweets Of The Week",
    image: "/Images/categories/Sweets.jpeg",
    link: "/offers",
  },
  {
    id: 6,
    title: "£11.50",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=400",
    link: "/offers",
  },
  // {
  //   id: 7,
  //   title: "£13.00",
  //   image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
  //   link: "/offers",
  // },
  // {
  //   id: 8,
  //   title: "£14.00",
  //   image: "/istockphoto-1808368424-612x612.jpg",
  //   link: "/offers",
  // },
];

const categories = [
  {
    name: "Spirits",
    link: "/products/spirits",
    image: "/Images/categories/Spirits.webp",
  },
  {
    name: "Wines",
    link: "/products/wine",
    image: "/Images/categories/wines.jpg",
  },
  {
    name: "Beers & Ciders",
    link: "/products/beers",
    image: "/Images/categories/Beers.jpeg",
  },
  {
    name: "Ready Mixed Drinks",
    link: "/products/rtd",
    image: "/Images/categories/Ready Mixed Drinks.jpeg",
  },
  {
    name: "Sweets",
    link: "/products/low-no",
    image: "/Images/categories/Sweets.jpeg",
  },
  {
    name: "Vapes & E-Liquids",
    link: "/products/soft-drinks",
    image: "/Images/categories/Vapes & E-Liquids.webp",
  },
];

// Navigation Component
const Navigation = ({
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  onSearch
}: {
  setCurrentPage: (page: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  type NavItem = {
    name: string;
    page: string;
  };

  const navItems: NavItem[] = [
    { name: "Home", page: "home" },
    { name: "Offers", page: "offers" },
    { name: "Week Deals", page: "Week-deals" },
    { name: "Category", page: "category" },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
    window.scrollTo(0, 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch();
      setShowMobileSearch(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#660033] text-white sticky top-0 z-50 shadow-lg">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div
            className="text-2xl sm:text-4xl md:text-5xl text-white cursor-pointer whitespace-nowrap flex items-baseline gap-1"
            onClick={() => handleNavClick("home")}
          >
            Mak <span className="font-bold">Wines</span>
            <span className="text-xl sm:text-2xl text-pink-200 font-light italic ml-1">(Abingdon)</span>
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/50 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => handleNavClick(item.page)}
                  className="flex items-center gap-1 hover:text-red-200 transition py-2 text-sm lg:text-base"
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Search & Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label="Search"
              className="p-2"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2"
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

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-4 border-t border-red-800">
          <form onSubmit={handleSearchSubmit} className="mt-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-10 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 text-sm"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-[#660033] px-3 py-1 rounded-full text-xs font-medium"
                >
                  Search
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pb-4 px-4 border-t border-red-800">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.page)}
              className="block w-full text-left py-3 hover:text-red-200 transition border-b border-red-800/50"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// Footer Component
const Footer = ({ setCurrentPage, siteSettings }: { setCurrentPage: (page: string) => void; siteSettings: { email: string; phone: string; address: string; opening_hours_weekday: string; opening_hours_weekend: string } }) => {
  const [email, setEmail] = useState("");

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* Newsletter */}
      <div className="bg-[#660033] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Mak Wines News</h3>
            <p className="mb-4 text-sm sm:text-base">
              Join and find out about all of our Week deals
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded text-white border-2 border-white bg-[#660033] focus:outline-none text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 px-6 py-2 rounded font-semibold transition border-2 border-white text-sm sm:text-base whitespace-nowrap"
              >
                Join Now!
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <div
            className="text-2xl sm:text-3xl text-white cursor-pointer whitespace-nowrap mb-2 flex items-baseline gap-1"
            onClick={() => handleNavClick("home")}
          >
            Mak <span className="font-bold">Wines</span>
            <span className="text-xl sm:text-2xl text-white font-light italic ml-1">(Abingdon)</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Your premier destination for quality drinks at unbeatable prices.
          </p>
          <div className="space-y-3 text-gray-400 text-sm">
            <p className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" /> {siteSettings.email}
            </p>
            {siteSettings.phone && (
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" /> {siteSettings.phone}
              </p>
            )}
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{siteSettings.address}</span>
            </p>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>{siteSettings.opening_hours_weekday}</p>
                <p>{siteSettings.opening_hours_weekend}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-3 text-sm sm:text-base">Company</h5>
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

        <div>
          <h5 className="font-semibold mb-3 text-sm sm:text-base">Legal</h5>
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

// Home Page Component - No product limit

const HomePage = ({ setCurrentPage, onDealClick }: { setCurrentPage: (page: string) => void; onDealClick?: (deal: WeekDeal) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dynamicProducts, setDynamicProducts] = useState<Record<string, Product[]>>({});
  const [, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [weekDeals, setWeekDeals] = useState<WeekDeal[]>([]);

  // Fetch products from Supabase
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Group products by category
          const grouped = data.reduce((acc: Record<string, Product[]>, product: Product) => {
            if (!acc[product.category]) {
              acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
          }, {});
          setDynamicProducts(grouped);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch week deals
    fetch("/api/week-deals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWeekDeals(data);
        }
      })
      .catch(() => {});
  }, []);

  // Use dynamic products if available, otherwise fallback to hardcoded
  const productsToShow = Object.keys(dynamicProducts).length > 0 ? dynamicProducts : productsByCategory;

  // Get current category products - show all without limit
  const currentCategoryProducts = selectedCategory ? (productsToShow[selectedCategory] || []) : [];

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
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-red-700">
            {selectedCategory ? selectedCategory : "Shop By Category"}
          </h2>

          {/* Category Cards or Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {!selectedCategory ? (
              // Display Category Cards
              categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col rounded-xl sm:rounded-2xl"
                  style={{
                    transform: isAnimating ? "scale(0.7)" : "scale(1)",
                    transition: "transform 0.4s ease-in-out",
                  }}
                >
                  {/* IMAGE AREA WITH TEXT ON TOP */}
                  <div className="relative h-32 sm:h-40 md:h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />

                    {/* FLOATING TEXT IN CENTER */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <h3 className="text-white font-semibold text-sm sm:text-lg md:text-xl text-center px-2">
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
                  className="bg-[#660033] text-white rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[180px] sm:min-h-[220px] md:min-h-[280px] hover:bg-[#550028]"
                  style={{
                    transform: isAnimating ? "scale(0.7)" : "scale(1)",
                    transition: "transform 0.4s ease-in-out",
                  }}
                >
                  <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-sm sm:text-lg font-semibold">Go Back</span>
                </button>

                {/* Product Cards - All Products */}
                {currentCategoryProducts.map((product: any, index: number) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-[#660033] rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                    style={{
                      transform: isAnimating ? "scale(0.7)" : "scale(1)",
                      transition: "transform 0.4s ease-in-out",
                    }}
                  >
                    <div className="relative h-32 sm:h-40 md:h-48 w-full bg-white flex items-center justify-center p-2">
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-2 sm:p-4 text-center">
                      <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base line-clamp-2">
                        {product.name}
                      </h3>
                      {product.show_price !== false && (
                        product.offer_quantity && product.offer_price ? (
                          <p className="text-pink-200 text-xs sm:text-sm mt-1">
                            {product.offer_quantity} for £{product.offer_price}
                          </p>
                        ) : product.price ? (
                          <p className="text-xs sm:text-sm mt-1 flex items-center justify-center gap-1 flex-wrap">
                            <span className="text-white font-bold">£{product.price}</span>
                            {product.compare_at_price && product.compare_at_price > product.price && (
                              <span className="text-white font-bold" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '1.5px' }}>£{product.compare_at_price}</span>
                            )}
                          </p>
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

        </div>
      </div>

      {/* Latest Deals Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-red-700">
          Week Deals
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 text-white">
          {(weekDeals.length > 0 ? weekDeals : deals).map((deal: any) => {
            const isClickable = deal.is_clickable !== false;
            return (
              <div
                key={deal.id}
                onClick={() => {
                  if (isClickable && onDealClick && deal.id) {
                    onDealClick(deal as WeekDeal);
                  } else if (isClickable) {
                    setCurrentPage("Week-deals");
                  }
                }}
                className={`bg-[#660033] hover:shadow-2xl transition-all transform overflow-hidden flex flex-col rounded-xl sm:rounded-2xl ${
                  isClickable ? "hover:-translate-y-1 cursor-pointer" : "cursor-default"
                }`}
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover"
                />
                <div className="p-2 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2">{deal.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Product Image */}
            <div className="relative bg-white p-6 flex items-center justify-center h-64 sm:h-80">
              <img
                src={selectedProduct.images?.[0] || selectedProduct.image}
                alt={selectedProduct.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-6 bg-[#660033] text-white rounded-b-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>

              {/* Price */}
              {selectedProduct.show_price !== false && (
                selectedProduct.offer_quantity && selectedProduct.offer_price ? (
                  <p className="text-2xl sm:text-3xl font-bold text-pink-200 mb-4">
                    {selectedProduct.offer_quantity} for £{typeof selectedProduct.offer_price === 'number' ? selectedProduct.offer_price.toFixed(2) : selectedProduct.offer_price}
                  </p>
                ) : selectedProduct.price ? (
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      £{typeof selectedProduct.price === 'number' ? selectedProduct.price.toFixed(2) : selectedProduct.price}
                    </p>
                    {selectedProduct.compare_at_price && selectedProduct.compare_at_price > selectedProduct.price && (
                      <p className="text-2xl sm:text-3xl text-white font-bold" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '2px' }}>
                        £{typeof selectedProduct.compare_at_price === 'number' ? selectedProduct.compare_at_price.toFixed(2) : selectedProduct.compare_at_price}
                      </p>
                    )}
                  </div>
                ) : null
              )}

              {/* Description */}
              {selectedProduct.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-pink-200 mb-1">Description</h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    {selectedProduct.description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {selectedProduct.category && (
                  <div>
                    <span className="text-pink-200">Category:</span>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                )}
                {selectedProduct.size && (
                  <div>
                    <span className="text-pink-200">Size:</span>
                    <p className="font-medium">{selectedProduct.size}</p>
                  </div>
                )}
                {selectedProduct.strength && (
                  <div>
                    <span className="text-pink-200">Strength:</span>
                    <p className="font-medium">{selectedProduct.strength}</p>
                  </div>
                )}
                {selectedProduct.flavor && (
                  <div>
                    <span className="text-pink-200">Flavour:</span>
                    <p className="font-medium">{selectedProduct.flavor}</p>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-6 w-full bg-white text-[#660033] py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Offers Page
const OffersPage = ({ onProductClick }: { onProductClick: (product: Product) => void }) => {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter products that are marked as offers
          const offers = data.filter((p: Product) => p.is_offer === true);
          setOfferProducts(offers);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold mb-2">Special Offers</h1>
        <p className="text-orange-100 text-sm sm:text-lg">Amazing deals on selected products!</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : offerProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🏷️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No offers available</h2>
          <p className="text-gray-500">Check back soon for amazing deals!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {offerProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-[#660033] rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer relative"
            >
              {/* Offer Badge */}
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                OFFER
              </div>
              <div className="relative h-32 sm:h-40 md:h-48 w-full bg-white flex items-center justify-center p-2">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-2 sm:p-4 text-center">
                <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-pink-200 text-[10px] sm:text-xs mt-1">
                  {product.category}
                </p>
                {product.show_price !== false && (
                  product.offer_quantity && product.offer_price ? (
                    <p className="text-orange-300 font-bold text-xs sm:text-sm mt-1">
                      {product.offer_quantity} for £{product.offer_price}
                    </p>
                  ) : product.price ? (
                    <p className="text-xs sm:text-sm mt-1 flex items-center justify-center gap-1 flex-wrap">
                      <span className="text-orange-300 font-bold">£{product.price}</span>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="text-white font-bold" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '1.5px' }}>£{product.compare_at_price}</span>
                      )}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Latest Deals Page (Week Deals)
const LatestDealsPage = ({ onDealClick }: { onDealClick?: (deal: WeekDeal) => void }) => {
  const [weekDeals, setWeekDeals] = useState<WeekDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/week-deals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWeekDeals(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const dealsToShow = weekDeals.length > 0 ? weekDeals : deals;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-[#660033] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Week Deals</h1>
          <p className="text-lg sm:text-xl text-pink-200 max-w-2xl mx-auto">
            Discover our amazing weekly offers and save big on your favorite products!
          </p>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#660033]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {dealsToShow.map((deal) => {
                const isClickable = (deal as WeekDeal).is_clickable !== false;
                const weekDeal = deal as WeekDeal;
                return (
                  <div
                    key={deal.id}
                    onClick={() => isClickable && onDealClick && weekDeal.id && onDealClick(weekDeal)}
                    className={`bg-[#660033] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ${
                      isClickable ? "hover:scale-105 hover:shadow-2xl cursor-pointer" : ""
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-3 sm:p-5 text-white">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold line-clamp-2 mb-2">
                        {deal.title}
                      </h3>
                      {isClickable && (
                        <span className="inline-block bg-white text-[#660033] px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          View Products
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info Section */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#660033] mb-4">
                About Our Week Deals
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-[#660033]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏷️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Weekly Updates</h3>
                  <p className="text-gray-600 text-sm">
                    New deals every week! Check back often for the latest offers.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-[#660033]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Great Savings</h3>
                  <p className="text-gray-600 text-sm">
                    Save money on premium spirits, wines, beers, and more.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-[#660033]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit In-Store</h3>
                  <p className="text-gray-600 text-sm">
                    Come visit us to grab these amazing deals before they're gone!
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
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
        unbeatable prices. We&apos;ve been serving our community for over 15 years,
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
        We&apos;re always looking for passionate people to join our growing team.
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
          We&apos;re seeking an experienced store manager to lead our Manchester
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
          We&apos;re looking for reliable warehouse operatives to join our
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

// Search Results Page with improved search
const SearchResultsPage = ({
  searchQuery,
  allProducts,
  onProductClick,
}: {
  searchQuery: string;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
}) => {
  const query = searchQuery.toLowerCase().trim();
  const searchTerms = query.split(/\s+/).filter(term => term.length > 0);

  // Calculate relevance score for each product
  const getSearchScore = (product: Product): number => {
    let score = 0;
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    const description = (product.description || "").toLowerCase();
    const flavor = (product.flavor || "").toLowerCase();
    const size = (product.size || "").toLowerCase();
    const strength = (product.strength || "").toLowerCase();

    for (const term of searchTerms) {
      // Exact name match (highest priority)
      if (name === term) score += 100;
      // Name starts with term
      else if (name.startsWith(term)) score += 50;
      // Name contains term
      else if (name.includes(term)) score += 30;

      // Category match
      if (category.includes(term)) score += 20;

      // Other fields
      if (flavor.includes(term)) score += 15;
      if (description.includes(term)) score += 10;
      if (size.includes(term)) score += 5;
      if (strength.includes(term)) score += 5;

      // Fuzzy matching - check for partial matches (at least 3 chars)
      if (term.length >= 3) {
        const words = name.split(/\s+/);
        for (const word of words) {
          if (word.startsWith(term.slice(0, 3))) score += 5;
        }
      }
    }
    return score;
  };

  // Filter and sort products by relevance
  const searchResults = allProducts
    .map(product => ({ product, score: getSearchScore(product) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  // Get suggested categories from results
  const suggestedCategories = [...new Set(searchResults.slice(0, 10).map(p => p.category))];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-red-700">
        Search Results
      </h1>
      <p className="text-gray-600 mb-4">
        {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
      </p>

      {/* Category suggestions */}
      {searchResults.length > 0 && suggestedCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-500">Found in:</span>
          {suggestedCategories.map(cat => (
            <span key={cat} className="px-3 py-1 bg-[#660033]/10 text-[#660033] text-sm rounded-full">
              {cat}
            </span>
          ))}
        </div>
      )}

      {searchResults.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-500 mb-4">Try searching with different keywords</p>
          <div className="text-sm text-gray-400">
            <p>Suggestions:</p>
            <p className="mt-1">• Try shorter words like &quot;vodka&quot; or &quot;wine&quot;</p>
            <p>• Check spelling</p>
            <p>• Search by category: Spirits, Wines, Beers, Vapes</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-[#660033] rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="relative h-32 sm:h-40 md:h-48 w-full bg-white flex items-center justify-center p-2">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-2 sm:p-4 text-center">
                <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-pink-200 text-[10px] sm:text-xs mt-1">
                  {product.category}
                </p>
                {product.show_price !== false && (
                  product.offer_quantity && product.offer_price ? (
                    <p className="text-pink-200 text-xs sm:text-sm mt-1">
                      {product.offer_quantity} for £{product.offer_price}
                    </p>
                  ) : product.price ? (
                    <p className="text-xs sm:text-sm mt-1 flex items-center justify-center gap-1 flex-wrap">
                      <span className="text-white font-bold">£{product.price}</span>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="text-white font-bold" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '1.5px' }}>£{product.compare_at_price}</span>
                      )}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Week Deal Detail Page - Shows products assigned to a specific week deal
const WeekDealDetailPage = ({
  deal,
  allProducts,
  onProductClick,
  onBack,
}: {
  deal: WeekDeal;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  onBack: () => void;
}) => {
  // Filter products that belong to this week deal
  const dealProducts = allProducts.filter((p) => p.week_deal_id === deal.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-[#660033] text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-200 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Week Deals
          </button>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{deal.title}</h1>
              <p className="text-lg text-pink-200">
                {dealProducts.length} product{dealProducts.length !== 1 ? "s" : ""} in this deal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {dealProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No products yet</h2>
            <p className="text-gray-500">Products will appear here when added to this deal.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {dealProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="bg-[#660033] rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                <div className="relative h-32 sm:h-40 md:h-48 w-full bg-white flex items-center justify-center p-2">
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base line-clamp-2">
                    {product.name}
                  </h3>
                  {product.show_price !== false && (
                    product.offer_quantity && product.offer_price ? (
                      <p className="text-pink-200 text-xs sm:text-sm mt-1">
                        {product.offer_quantity} for £{product.offer_price}
                      </p>
                    ) : product.price ? (
                      <p className="text-xs sm:text-sm mt-1 flex items-center justify-center gap-1 flex-wrap">
                        <span className="text-white font-bold">£{product.price}</span>
                        {product.compare_at_price && product.compare_at_price > product.price && (
                          <span className="text-white font-bold" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '1.5px' }}>£{product.compare_at_price}</span>
                        )}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const MakWinesApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<WeekDeal | null>(null);
  const [allWeekDeals, setAllWeekDeals] = useState<WeekDeal[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    email: "mak@makwines.co.uk",
    phone: "",
    address: "6 Peachcroft Shopping Centre, Peachcroft road, Abingdon, Oxfordshire, OX14 2QA.",
    opening_hours_weekday: "Sun - Thu: 12pm - 9pm",
    opening_hours_weekend: "Fri - Sat: 12pm - 10pm",
  });

  // Fetch all products, week deals, and site settings
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllProducts(data);
        }
      })
      .catch(() => {});

    fetch("/api/week-deals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllWeekDeals(data);
        }
      })
      .catch(() => {});

    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSiteSettings(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentPage("search");
      window.scrollTo(0, 0);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDealClick = (deal: WeekDeal) => {
    setSelectedDeal(deal);
    setCurrentPage("week-deal-detail");
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} onDealClick={handleDealClick} />;
      case "offers":
        return <OffersPage onProductClick={handleProductClick} />;
      case "Week-deals":
        return <LatestDealsPage onDealClick={handleDealClick} />;
      case "week-deal-detail":
        return selectedDeal ? (
          <WeekDealDetailPage
            deal={selectedDeal}
            allProducts={allProducts}
            onProductClick={handleProductClick}
            onBack={() => setCurrentPage("Week-deals")}
          />
        ) : (
          <LatestDealsPage onDealClick={handleDealClick} />
        );
      case "eliquid":
        return <ELiquidPage />;
      case "category":
        return <HomePage setCurrentPage={setCurrentPage} />;
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
      case "search":
        return (
          <SearchResultsPage
            searchQuery={searchQuery}
            allProducts={allProducts}
            onProductClick={handleProductClick}
          />
        );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} siteSettings={siteSettings} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative bg-white p-6 flex items-center justify-center h-64 sm:h-80">
              <img
                src={selectedProduct.images?.[0] || "/placeholder.png"}
                alt={selectedProduct.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-6 bg-[#660033] text-white rounded-b-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>
              {selectedProduct.show_price !== false && (
                selectedProduct.offer_quantity && selectedProduct.offer_price ? (
                  <p className="text-2xl sm:text-3xl font-bold text-pink-200 mb-4">
                    {selectedProduct.offer_quantity} for £{typeof selectedProduct.offer_price === 'number' ? selectedProduct.offer_price.toFixed(2) : selectedProduct.offer_price}
                  </p>
                ) : selectedProduct.price ? (
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      £{typeof selectedProduct.price === 'number' ? selectedProduct.price.toFixed(2) : selectedProduct.price}
                    </p>
                    {selectedProduct.compare_at_price && selectedProduct.compare_at_price > selectedProduct.price && (
                      <p className="text-2xl sm:text-3xl text-white font-bold" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '2px' }}>
                        £{typeof selectedProduct.compare_at_price === 'number' ? selectedProduct.compare_at_price.toFixed(2) : selectedProduct.compare_at_price}
                      </p>
                    )}
                  </div>
                ) : null
              )}
              {selectedProduct.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-pink-200 mb-1">Description</h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    {selectedProduct.description}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {selectedProduct.category && (
                  <div>
                    <span className="text-pink-200">Category:</span>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                )}
                {selectedProduct.size && (
                  <div>
                    <span className="text-pink-200">Size:</span>
                    <p className="font-medium">{selectedProduct.size}</p>
                  </div>
                )}
                {selectedProduct.strength && (
                  <div>
                    <span className="text-pink-200">Strength:</span>
                    <p className="font-medium">{selectedProduct.strength}</p>
                  </div>
                )}
                {selectedProduct.flavor && (
                  <div>
                    <span className="text-pink-200">Flavour:</span>
                    <p className="font-medium">{selectedProduct.flavor}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-6 w-full bg-white text-[#660033] py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakWinesApp;
