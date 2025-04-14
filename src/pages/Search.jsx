import { useState, useEffect } from 'react';
import CrimeCard from '../components/CrimeCard'; // Ensure this path is correct

// CrimeCard component directly included to ensure it works


export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('description');
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/crimes/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched crimes data:', data);
        
        // Check if data is an array or if it has a specific property containing the array
        let crimesData = data;
        if (!Array.isArray(data) && typeof data === 'object') {
          // Try to find an array in the response
          const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
          if (possibleArrays.length > 0) {
            crimesData = possibleArrays[0];
          } else {
            // If we can't find an array, convert the object to an array if it has numeric keys
            crimesData = Object.entries(data)
              .filter(([key]) => !isNaN(Number(key)))
              .map(([_, value]) => value);
          }
        }
        
        setCrimes(Array.isArray(crimesData) ? crimesData : []);
      } catch (err) {
        console.error('Error fetching crimes:', err);
        setError(err.message);
        setCrimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const filteredCrimes = crimes.filter(crime => {
    if (!searchTerm.trim()) return true; // Show all if search term is empty or whitespace
    
    const term = searchTerm.toLowerCase().trim();
    const field = searchType === 'severity' ? 'severity_level' : searchType;
    const fieldValue = crime[field]?.toString().toLowerCase() || '';
    
    return fieldValue.includes(term);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Crimes</h1>
      
      <div className="mb-8 bg-dark-800 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            className="flex-grow p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search crimes"
          />
          <select
            className="p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            aria-label="Select search type"
          >
            <option value="description">Description</option>
            <option value="type">Type</option>
            <option value="severity_level">Severity Level</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-8">Loading crimes data...</p>
        ) : error ? (
          <p className="text-center py-8 text-red-500">Error: {error}</p>
        ) : filteredCrimes.length > 0 ? (
          filteredCrimes.map(crime => (
            <CrimeCard key={crime.crime_id} crime={crime} />
          ))
        ) : searchTerm.trim() ? (
          <p className="text-center py-8 bg-dark-800 rounded-lg">
            No crimes found matching "{searchTerm}" in {searchType}.
            {crimes.length > 0 && (
              <span className="block mt-2 text-sm text-gray-400">
                {crimes.length} crimes available but none match your search.
              </span>
            )}
          </p>
        ) : (
          <p className="text-center py-8 bg-dark-800 rounded-lg">
            {crimes.length === 0 ? 'No crimes available.' : `${crimes.length} crimes available. Enter a search term.`}
          </p>
        )}
      </div>
    </div>
  );
}