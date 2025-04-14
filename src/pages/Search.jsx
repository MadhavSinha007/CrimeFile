import { useState, useEffect } from 'react';
import CrimeCard from '../components/CrimeCard';

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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        let crimesData = data;
        if (!Array.isArray(data)) {
          const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
          crimesData = possibleArrays.length ? possibleArrays[0] : Object.values(data);
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
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    const field = searchType === 'severity' ? 'severity_level' : searchType;
    const fieldValue = crime[field]?.toString().toLowerCase() || '';
    return fieldValue.includes(term);
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold uppercase mb-8 border-b border-white/10 pb-2">
          Search Crimes
        </h1>

        <div className="bg-neutral-900 border border-white/10 p-6 rounded-xl mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <option value="description">Description</option>
              <option value="type">Type</option>
              <option value="severity_level">Severity Level</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-10 flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Loading crimes data...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : filteredCrimes.length > 0 ? (
            filteredCrimes.map(crime => (
              <CrimeCard key={crime.crime_id} crime={crime} />
            ))
          ) : searchTerm.trim() ? (
            <div className="text-center py-10 border border-white/10 rounded-lg bg-neutral-900">
              <p>
                No crimes found matching{' '}
                <span className="italic">"{searchTerm}"</span> in{' '}
                <b>{searchType}</b>.
              </p>
              {crimes.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  {crimes.length} crimes exist, but none match your query.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-10 border border-white/10 rounded-lg bg-neutral-900">
              {crimes.length === 0
                ? 'No crimes available.'
                : `${crimes.length} crimes loaded. Start searching above.`}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
