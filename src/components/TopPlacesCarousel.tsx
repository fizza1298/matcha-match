import React, { useState, useEffect } from 'react';
import { Star, MapPin, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockMatchaPlaces } from '@/data/mockMatcha';

interface TopPlace {
  id: string;
  place_id: string;
  name: string;
  address: string;
  rating: number;
  price_level: string;
  distance: number;
  photos?: string[];
  lat?: number;
  lng?: number;
}

const TopPlacesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [topPlaces, setTopPlaces] = useState<TopPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const fallbackImages = mockMatchaPlaces.map((place) => place.image).filter(Boolean);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got user location:', position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to a default location (Sydney)
          console.log('Using fallback location: Sydney');
          setUserLocation({ lat: -33.8688, lng: 151.2093 });
        }
      );
    } else {
      console.log('Geolocation not supported, using fallback location: Sydney');
      // Fallback to a default location (Sydney)
      setUserLocation({ lat: -33.8688, lng: 151.2093 });
    }
  }, []);

  // Fetch real top places from your API
  useEffect(() => {
    if (!userLocation) return;

    const fetchTopPlaces = async () => {
      try {
        console.log('Fetching places for location:', userLocation);
        const response = await fetch(`http://localhost:8000/api/places/?lat=${userLocation.lat}&lng=${userLocation.lng}`);
        console.log('API response status:', response.status);
        
        if (response.ok) {
          const places = await response.json();
          console.log('Got places from API:', places.length);
          console.log('First place data:', places[0]);
          
          // Take top 6 places by rating for better carousel experience
          const topRated = places
            .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 6)
            .map((place: any, index: number) => {
              console.log('Processing place:', place.name, 'Photos:', place.photos);
              const fallbackImage = fallbackImages[index % Math.max(1, fallbackImages.length)];
              return {
                id: place.id || place.place_id,
                place_id: place.place_id || place.id,
                name: place.name,
                address: place.vicinity || 'Address not available',
                rating: place.rating || 0,
                price_level: place.price_range || '$$',
                distance: place.distance || 0,
                photos: (place.photos && place.photos.length > 0)
                  ? place.photos
                  : (fallbackImage ? [fallbackImage] : []),
                lat: place.lat,
                lng: place.lng
              };
            });
          
          console.log('Processed top places:', topRated);
          setTopPlaces(topRated);
        } else {
          console.error('API returned error:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Error response:', errorText);
        }
      } catch (error) {
        console.error('Error fetching top places:', error);
        // Fallback to sample data if API fails
        const fallback = mockMatchaPlaces.slice(0, 6).map((place) => ({
          id: place.id,
          place_id: place.id,
          name: place.name,
          address: place.address,
          rating: place.rating,
          price_level: place.priceRange,
          distance: place.distance,
          photos: place.image ? [place.image] : [],
          lat: place.lat,
          lng: place.lng,
        }));
        setTopPlaces(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlaces();
  }, [userLocation]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || topPlaces.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, topPlaces.length - 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, topPlaces.length]);

  const nextPlace = () => {
    const maxIndex = Math.max(0, topPlaces.length - 3);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevPlace = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const openInGoogleMaps = (place: TopPlace) => {
    try {
      // Priority 1: Use place_id if available (shows full business profile)
      if (place.place_id && place.place_id.startsWith('ChIJ')) {
        const url = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
        window.open(url, '_blank');
        return;
      }
      
      // Priority 2: Search by name + address (better than coordinates)
      if (place.name && place.address) {
        const searchQuery = encodeURIComponent(`${place.name} ${place.address}`);
        const url = `https://www.google.com/maps/search/${searchQuery}`;
        window.open(url, '_blank');
        return;
      }
      
      // Priority 3: Use coordinates if available
      if (place.lat && place.lng) {
        const url = `https://www.google.com/maps?q=${place.lat},${place.lng}`;
        window.open(url, '_blank');
        return;
      }
      
      // Fallback: open Google Maps
      window.open('https://www.google.com/maps', '_blank');
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      window.open('https://www.google.com/maps', '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading top places...</p>
          {userLocation && (
            <p className="text-xs text-gray-500 mt-2">
              Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (topPlaces.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No places available at the moment.</p>
        {userLocation && (
          <p className="text-xs text-gray-500 mt-2">
            Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
      </div>
    );
  }

  // Show 3 places at a time
  const visiblePlaces = topPlaces.slice(currentIndex, currentIndex + 3);
  const canGoNext = currentIndex < topPlaces.length - 3;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative w-full px-4">
      {/* Location Info */}
      {userLocation && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            📍 Showing places near your location
          </p>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mb-6">
        {Array.from({ length: Math.max(1, topPlaces.length - 2) }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-appaccent w-8' : 'bg-appprimary'
            }`}
          />
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Navigation Arrows - Only show if there are more than 3 places */}
        {topPlaces.length > 3 && (
          <>
            <button
              onClick={prevPlace}
              disabled={!canGoPrev}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-card/95 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all hover:scale-110 ${
                canGoPrev ? 'hover:bg-card cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-appaccent" />
            </button>
            <button
              onClick={nextPlace}
              disabled={!canGoNext}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-card/95 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all hover:scale-110 ${
                canGoNext ? 'hover:bg-card cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-appaccent" />
            </button>
          </>
        )}

        {/* Places Grid - 3 columns with much bigger cards */}
        <div className="grid grid-cols-3 gap-8">
          {visiblePlaces.map((place, index) => (
            <div
              key={place.id}
              className="bg-card rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 h-[600px] flex flex-col"
              onClick={() => openInGoogleMaps(place)}
            >
              {/* Photo Section - Much bigger height */}
              <div className="relative h-80 w-full overflow-hidden">
                {place.photos && place.photos.length > 0 ? (
                  <img
                    src={place.photos[0]}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `http://localhost:8000/api/ai/placeholder/400/200/`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-appprimary to-appaccent flex items-center justify-center">
                    <div className="text-center">
                      <Coffee className="w-24 h-24 text-appaccent mx-auto mb-4" />
                      <p className="text-2xl font-semibold text-foreground">{place.name}</p>
                      <p className="text-base text-appprimary mt-2">No photo available</p>
                    </div>
                  </div>
                )}
                
                {/* Price Badge - Top Right */}
                <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <span className="text-base font-semibold text-appprimary">{place.price_level}</span>
                </div>
                
                {/* Rating Badge - Top Left */}
                <div className="absolute top-4 left-4 bg-appaccent/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-appprimary fill-current" />
                    <span className="text-base font-semibold text-white">{place.rating}</span>
                  </div>
                </div>
              </div>
              
              {/* Content Section - Bigger padding and text */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 line-clamp-2">{place.name}</h3>
                  <div className="flex items-center space-x-3 text-foreground mb-4">
                    <MapPin className="w-5 h-5 text-appaccent flex-shrink-0" />
                    <span className="text-base line-clamp-2">{place.address}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base text-foreground bg-appprimary/40 px-4 py-2 rounded-full">
                      {place.distance} km away
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-base text-appaccent font-medium bg-card px-4 py-2 rounded-full">
                      Click to open in Google Maps →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlacesCarousel;
