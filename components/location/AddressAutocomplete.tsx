'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/Button';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Loading Map...</div>
});

interface AddressSelection {
  addressLine: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

interface AddressAutocompleteProps {
  onSelect: (address: AddressSelection) => void;
  placeholder?: string;
}

export function AddressAutocomplete({ onSelect, placeholder = "Search for your location..." }: AddressAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchAddresses = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 10,
            countrycodes: 'in' // Restrict to India as per typical project context (Mumbai mentioned earlier)
          },
          headers: {
            'Accept-Language': 'en'
          }
        });
        setResults(response.data);
        setShowDropdown(true);
        setHasSearched(true);
      } catch (error) {
        console.error('Nominatim search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchAddresses, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (item: any) => {
    const addr = item.address;
    if (!addr) return;
    
    // Construct meaningful landmark
    // Priority: building -> house_number + road -> road -> suburb
    const building = addr.building || addr.office || addr.amenity || '';
    const houseNumber = addr.house_number || '';
    const road = addr.road || addr.pedestrian || addr.path || '';
    const suburb = addr.suburb || addr.neighbourhood || addr.residential || '';

    let landmarkParts = [];
    if (building) landmarkParts.push(building);
    if (houseNumber && road) landmarkParts.push(`${houseNumber} ${road}`);
    else if (road) landmarkParts.push(road);
    if (suburb) landmarkParts.push(suburb);

    const landmark = landmarkParts.join(', ') || '';

    onSelect({
      addressLine: item.display_name,
      landmark,
      city: addr.city || addr.town || addr.village || addr.municipality || addr.state_district || '',
      state: addr.state || '',
      pincode: addr.postcode || '',
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    });
    
    setQuery(item.display_name);
    setShowDropdown(false);
  };

  const detectLocation = (openMap: boolean = false) => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
              params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
                addressdetails: 1
              }
            });

            if (response.data) {
              if (!openMap) {
                handleSelect(response.data);
              } else {
                // If they opened map, we just center it and update results preview
                setResults([response.data]);
                setShowMap(true);
              }
            }
          } catch (error) {
            console.error('Location detection error:', error);
            if (openMap) setShowMap(true);
          } finally {
            setIsDetecting(false);
          }
        },
        () => {
          setIsDetecting(false);
          if (openMap) setShowMap(true); // Still show map even if detection fails
          else alert('Could not detect location. Please search manually.');
        }
      );
    } else {
      setIsDetecting(false);
      if (openMap) setShowMap(true);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleMapSelect = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
          addressdetails: 1
        }
      });

      if (response.data) {
        handleSelect(response.data);
        setShowMap(false);
      }
    } catch (error) {
      console.error('Map selection reverse geocoding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full space-y-4" ref={dropdownRef}>
      <div className="space-y-2">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length >= 3 && setShowDropdown(true)}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
              </div>
            )}
          </div>
          <Button 
            type="button" 
            variant="secondary" 
            size="sm" 
            className="shrink-0 h-[42px] w-[42px] p-0"
            onClick={() => detectLocation(false)}
            title="Auto-detect current location"
            disabled={isDetecting}
          >
            {isDetecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-[1px] flex-1 bg-gray-100"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
          <div className="h-[1px] flex-1 bg-gray-100"></div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-dashed text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
          onClick={() => {
            if (!showMap) {
               detectLocation(true);
            } else {
               setShowMap(false);
            }
          }}
        >
          <MapPin className="w-4 h-4 mr-2" />
          {showMap ? "Hide Map" : "Select Location on Map"}
        </Button>
      </div>

      {showDropdown && (results.length > 0 || hasSearched) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden py-2 animate-in fade-in slide-in-from-top-2">
          {results.length > 0 ? (
            results.map((item, index) => (
              <button
                key={index}
                type="button"
                className="w-full px-4 py-2.5 text-left hover:bg-purple-50 flex items-start gap-3 transition-colors group"
                onClick={() => handleSelect(item)}
              >
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 group-hover:text-purple-500 shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.display_name.split(',')[0]}</p>
                  <p className="text-xs text-gray-500 truncate">{item.display_name}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-center">
              <p className="text-sm text-gray-500">No addresses found matching your search.</p>
            </div>
          )}
        </div>
      )}

      {showMap && (
        <div className="pt-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Drag marker to precise location</span>
            <button 
              type="button" 
              onClick={() => setShowMap(false)}
              className="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              Close Map
            </button>
          </div>
          <LeafletMap 
            onLocationSelect={handleMapSelect} 
            defaultLocation={results.length > 0 ? { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) } : undefined}
          />
        </div>
      )}
    </div>
  );
}
