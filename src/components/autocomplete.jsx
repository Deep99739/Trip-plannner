import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted suggestion

  const normalizeInput = (input) => {
    const trimmedInput = input.trim();
    if (trimmedInput.length < 2) return trimmedInput;

    return trimmedInput.endsWith(' ') ? trimmedInput : `${trimmedInput} `;
  };

  const fetchSuggestions = async (input) => {
    const normalizedInput = normalizeInput(input);
    console.log('Normalized input:', normalizedInput); 

    if (normalizedInput.length < 2) {
      console.log('Input too short, skipping API call'); 
      setSuggestions([]);
      return;
    }

    const apiUrl = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(normalizedInput)}&language=en&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

    console.log('API URL:', apiUrl);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('API Response:', data); 

      if (data.predictions && data.predictions.length > 0) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300); // 300ms delay

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setIsSuggestionSelected(false); // Reset the selection state when input changes
    setHighlightedIndex(-1); // Reset highlighted index
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.description);
    setSuggestions([]);
    setIsSuggestionSelected(true); // Mark that a suggestion has been selected
    onSelect(suggestion);
  };

  const handleKeyDown = (event) => {
    if (suggestions.length === 0) return; // No suggestions, do nothing

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault(); // Prevent default scrolling behavior
        setHighlightedIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        event.preventDefault(); // Prevent default scrolling behavior
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          const selectedSuggestion = suggestions[highlightedIndex];
          handleSuggestionClick(selectedSuggestion);
        }
        break;
      default:
        break;
    }
  };

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Handle keyboard events
          placeholder="Enter a location"
          className="w-full p-3 pl-12 text-lg bg-pink-50 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 placeholder-pink-400 transition-all shadow-md"
        />
        <svg
          className="absolute left-3 top-3.5 h-6 w-6 text-pink-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <ul className="mt-2 bg-white border border-pink-100 rounded-lg shadow-lg">
        {query.length < 2 ? (
          <li className="p-3 text-gray-500">Type at least 2 characters to see suggestions</li>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`p-3 cursor-pointer hover:bg-pink-50 transition-all ${
                highlightedIndex === index ? 'bg-pink-100' : ''
              }`}
            >
              {suggestion.description}
            </li>
          ))
        ) : !isSuggestionSelected ? ( // Only show "No results found" if no suggestion has been selected
          <li className="p-3 text-gray-500">No results found</li>
        ) : null}
      </ul>
    </div>
  );
};

export default Autocomplete;