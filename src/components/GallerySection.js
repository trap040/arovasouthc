'use client';

import { useState } from 'react';
import Image from 'next/image';

const GalleryPage = () => {
  // Category state for filtering
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Gallery categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'dining', name: 'Dining' },
    { id: 'exterior', name: 'Exterior' }
  ];
  
  // Gallery items with categories
  const galleryItems = [
    { 
      src: '/images/gallery-1.png', 
      title: 'VIP Room', 
      category: 'rooms',
      description: 'Experience luxury in our exclusive VIP suite'
    },
    { 
      src: '/images/gallery-2.png', 
      title: 'Sitting Area', 
      category: 'amenities',
      description: 'Relax in our comfortable lounge areas'
    },

    { 
      src: '/images/gallery-3.png', 
      title: 'Premium Amenities', 
      category: 'amenities',
      description: 'Every detail carefully selected for your comfort'
    },
    { 
      src: '/images/gallery-4.png', 
      title: 'Keyless Doors', 
      category: 'amenities',
      description: 'Modern security with convenient access'
    },
    { 
      src: '/images/outside.jpg', 
      title: 'Friendly Reception', 
      category: 'exterior',
      description: 'Our staff is ready to welcome you'
    },
    { 
      src: '/images/gallery-5.png', 
      title: '24/7 Reception', 
      category: 'exterior',
      description: 'Service available around the clock'
    },
    { 
      src: '/images/gallery.jpg', 
      title: 'Fine Dining', 
      category: 'dining',
      description: 'Exquisite culinary experiences await'
    },
    { 
      src: '/images/luxury.jpg', 
      title: 'Luxury Suite', 
      category: 'rooms',
      description: 'Spacious accommodations for ultimate comfort'
    },
    { 
      src: '/images/breakfast.jpg', 
      title: 'Breakfast Service', 
      category: 'dining',
      description: 'Start your day with our gourmet breakfast'
    },
  ];
  
  // Filter gallery items based on active category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Handle opening an image
  const openModal = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(index);
    setModalOpen(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  };
  
  // Navigate to previous image
  const prevImage = () => {
    setIsLoading(true);
    const newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };
  
  // Navigate to next image
  const nextImage = () => {
    setIsLoading(true);
    const newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentIndex]);
  
  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(false);
  }, [selectedImage]);
  
  // Handle click outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <Image 
          src="/images/gallery-hero.jpg" 
          alt="Arova Hotel Gallery" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-gilda text-4xl md:text-5xl lg:text-6xl text-white mb-6">Our Gallery</h1>
            <div className="w-20 h-1 bg-lion mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Explore Our Hotel</h2>
            <div className="w-16 h-1 bg-lion mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Take a visual journey through our hotel's elegant spaces, luxurious rooms, and premium amenities. 
              Each image captures the essence of the exceptional experience that awaits you at Arova Hotel.
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-lion text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 hover:shadow-xl"
                onClick={() => openModal(item, index)}
              >
                <div className="aspect-[4/3] relative">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-gilda text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </div>
                
                <div className="absolute top-4 right-4">
                  <span className="bg-lion text-white text-xs uppercase tracking-wider py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {categories.find(cat => cat.id === item.category)?.name}
                  </span>
                </div>
                
                {/* Expand icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-lion bg-opacity-80 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state when no images match filter */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No images found in this category.</p>
              <button 
                className="mt-4 px-6 py-2 bg-lion text-white rounded-full hover:bg-lion-dark transition-colors"
                onClick={() => setActiveCategory('all')}
              >
                View All Images
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Image Showcase Experience */}
      <section className="bg-gray-50 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-gilda text-3xl mb-6 text-eerie-black">Experience Arova Hotel</h2>
              <div className="w-16 h-1 bg-lion mb-8"></div>
              <p className="text-gray-600 mb-6">
                Our gallery offers just a glimpse of what awaits you at Arova Hotel. Each space has been 
                thoughtfully designed to create an atmosphere of elegance and comfort.
              </p>
              <p className="text-gray-600 mb-6">
                From our meticulously appointed rooms to our world-class amenities, we've created 
                an environment where luxury meets functionality, ensuring your stay is nothing short 
                of exceptional.
              </p>
              <p className="text-gray-600">
                We invite you to explore our hotel in person and discover all the experiences that 
                await beyond what can be captured in images.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/images/experience-1.jpg" 
                  alt="Hotel Experience" 
                  fill
                  className="object-cover" 
                />
              </div>
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg mt-8">
                <Image 
                  src="/images/experience-2.jpg" 
                  alt="Hotel Experience" 
                  fill
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Image Modal */}
      {modalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="max-w-5xl w-full relative bg-white shadow-2xl rounded-lg overflow-hidden">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image container */}
            <div className="relative aspect-[16/9] bg-black">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-lion border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                fill
                className="object-contain" 
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
            
            {/* Navigation arrows */}
            <button 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              onClick={nextImage}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image info */}
            <div className="bg-white p-6">
              <h3 className="font-gilda text-2xl mb-2 text-eerie-black">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
              
              {/* Navigation counter */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  <span className="text-lion font-bold">{currentIndex + 1}</span> of {filteredItems.length}
                </span>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {categories.find(cat => cat.id === selectedImage.category)?.name}
                  </span>
                  
                  <button 
                    className="text-sm text-gray-600 hover:text-lion transition-colors flex items-center gap-1"
                    onClick={closeModal}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close
                  </button>
                </div>
              </div>
            </div>
            
            {/* Keyboard navigation hint */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
              Use arrow keys to navigate
            </div>
          </div>
        </div>
      )}
    </div>
  );
};