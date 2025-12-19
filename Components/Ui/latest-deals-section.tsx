// // Add this to your imports at the top of your home page file
// import { useState, useRef, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// // Add this deals data (or move to a separate file)
// const deals = [
//   { id: 1, title: "Spirit Of The Month", price: "£15.99", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=300&fit=crop", badge: "HOT" },
//   { id: 2, title: "Wine Of The Month", price: "2 for £13", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=300&fit=crop", badge: "NEW" },
//   { id: 3, title: "Beer Of The Month", price: "4 for £11", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=300&fit=crop", badge: null },
//   { id: 4, title: "Cocktail Special", price: "2 for £15", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop", badge: "SAVE" },
//   { id: 5, title: "Premium Whisky", price: "Only £19.99", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=300&h=300&fit=crop", badge: null },
//   { id: 6, title: "Champagne Deal", price: "2 for £25", image: "https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=300&h=300&fit=crop", badge: "LUXURY" },
//   { id: 7, title: "Ready To Drink", price: "3 for £6.75", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=300&fit=crop", badge: null },
//   { id: 8, title: "Festive Favourites", price: "From £9.99", image: "https://images.unsplash.com/photo-1482012792084-a0c3725f289f?w=300&h=300&fit=crop", badge: "XMAS" },
// ];

// // ============================================
// // PASTE THIS SECTION IN YOUR HOME PAGE JSX
// // (Place it above or below your "Shop By Category" section)
// // ============================================

// {/* Latest Deals Section */}
// <div className="bg-linear-to-b from-red-900 via-red-800 to-red-900 py-12 relative overflow-hidden">
//   {/* Background Pattern */}
//   <div className="absolute inset-0 opacity-10">
//     <div className="absolute inset-0" style={{
//       backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
//       backgroundSize: '32px 32px'
//     }}/>
//   </div>

//   <div className="max-w-7xl mx-auto px-4 relative">
//     {/* Header */}
//     <div className="flex items-center justify-between mb-8">
//       <div>
//         <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
//           <span className="inline-block animate-pulse">🔥</span>
//           Latest Deals
//         </h2>
//         <p className="text-red-200 mt-2">Don't miss out on these amazing offers!</p>
//       </div>
//       <button
//         onClick={() => setCurrentPage("deals")}
//         className="hidden md:flex items-center gap-2 bg-white text-red-700 px-6 py-3 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 hover:scale-105 shadow-lg"
//       >
//         View All Deals
//         <ChevronRight size={18} />
//       </button>
//     </div>

//     {/* Carousel */}
//     <div className="relative group">
//       {/* Left Arrow */}
//       <button
//         onClick={() => {
//           const el = document.getElementById('deals-scroll');
//           el?.scrollBy({ left: -320, behavior: 'smooth' });
//         }}
//         className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-red-700 p-3 rounded-full shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 hover:scale-110"
//       >
//         <ChevronLeft size={28} strokeWidth={3} />
//       </button>

//       {/* Right Arrow */}
//       <button
//         onClick={() => {
//           const el = document.getElementById('deals-scroll');
//           el?.scrollBy({ left: 320, behavior: 'smooth' });
//         }}
//         className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-red-700 p-3 rounded-full shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 hover:scale-110"
//       >
//         <ChevronRight size={28} strokeWidth={3} />
//       </button>

//       {/* Gradient Edges */}
//       <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-red-900 to-transparent z-10 pointer-events-none" />
//       <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-red-900 to-transparent z-10 pointer-events-none" />

//       {/* Scrollable Cards */}
//       <div
//         id="deals-scroll"
//         className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {deals.map((deal) => (
//           <div
//             key={deal.id}
//             onClick={() => setCurrentPage("products")}
//             className="flex-shrink-0 w-64 group/card cursor-pointer"
//           >
//             <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
//               {/* Image Container */}
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={deal.image}
//                   alt={deal.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

//                 {/* Badge */}
//                 {deal.badge && (
//                   <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
//                     {deal.badge}
//                   </span>
//                 )}

//                 {/* Quick View Button */}
//                 <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-red-700 px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/card:translate-y-0 hover:bg-red-50">
//                   View Deal
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-4 text-center">
//                 <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover/card:text-red-700 transition-colors duration-300">
//                   {deal.title}
//                 </h3>
//                 <div className="inline-block bg-red-100 text-red-700 font-bold px-4 py-2 rounded-full text-lg">
//                   {deal.price}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Mobile View All Button */}
//     <div className="mt-6 md:hidden text-center">
//       <button
//         onClick={() => setCurrentPage("deals")}
//         className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg"
//       >
//         View All Deals
//       </button>
//     </div>
//   </div>
// </div>

// {/* Your existing Shop By Category Section */}
// <div className="bg-gray-50 py-12">
//   <div className="max-w-7xl mx-auto px-4">
//     <h2 className="text-3xl font-bold mb-8 text-center text-red-700">
//       Shop By Category
//     </h2>
//     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-red-700">
//       {categories.map((category) => (
//         <button
//           key={category.name}
//           onClick={() => setCurrentPage("products")}
//           className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center font-semibold hover:bg-red-50"
//         >
//           {category.name}
//         </button>
//       ))}
//     </div>
//   </div>
// </div>

// {/* Add this CSS to hide scrollbar (in your global CSS or style tag) */}
// <style>{`
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
// `}</style>
// function setCurrentPage(arg0: string): void {
//   throw new Error('Function not implemented.');
// }
