import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CrimeDetail() {
  const { id } = useParams();
  const [crime, setCrime] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [victims, setVictims] = useState([]);
  const [suspects, setSuspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status colors mapping
  const statusColors = {
    'open': 'text-yellow-400',
    'closed': 'text-green-400',
    'pending': 'text-orange-400',
    'unsolved': 'text-red-400',
    'under investigation': 'text-purple-400',
  };

  // Severity level colors mapping
  const severityColors = {
    'high': 'text-red-500',
    'medium': 'text-orange-400',
    'low': 'text-green-400',
  };

  // Get appropriate color for status and severity
  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    return statusColors[normalizedStatus] || 'text-gray-300';
  };

  const getSeverityColor = (severity) => {
    const normalizedSeverity = severity?.toLowerCase();
    return severityColors[normalizedSeverity] || 'text-gray-300';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const [crimeRes, officersRes, victimsRes, suspectsRes] = await Promise.all([
          fetch(`http://localhost:5000/crimes/${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch crime details');
            return res.json();
          }),
          fetch(`http://localhost:5000/officers/crime/${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch officers');
            return res.json();
          }),
          fetch(`http://localhost:5000/victims/crime/${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch victims');
            return res.json();
          }),
          fetch(`http://localhost:5000/suspects/crime/${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch suspects');
            return res.json();
          })
        ]);

        setCrime(crimeRes.crime || null);
        setOfficers(officersRes.officers || []);
        setVictims(victimsRes.victims || []);
        setSuspects(suspectsRes.suspects || []);
        
      } catch (err) {
        console.error("Error fetching crime data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Loading crime details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg text-red-400 bg-red-900/20 px-6 py-4 rounded-lg border border-red-500/30">Error: {error}</p>
      </div>
    );
  }

  if (!crime) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg bg-gray-800/50 px-6 py-4 rounded-lg border border-gray-700">Crime not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-white relative inline-block">
        Crime Case Details
        <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h1>

      {/* Crime Overview Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg mb-8 transition-all duration-300 hover:shadow-cyan-900/20 hover:border-cyan-500/30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">
              Case ID: <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">{id}</span>
            </p>
            <h2 className="text-2xl font-semibold mb-2 text-cyan-400">{crime.type}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300 mb-1">
              <span className="text-cyan-400">Severity:</span> 
              <span className={`font-medium ${getSeverityColor(crime.severity_level)} ml-1`}>
                {crime.severity_level}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-cyan-400">Status:</span> 
              <span className={`font-medium ${getStatusColor(crime.status)} ml-1`}>
                {crime.status}
              </span>
            </p>
          </div>
        </div>

        {/* Dedicated Description Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">Case Description</h3>
          <div className="bg-black/20 p-4 rounded-lg border border-white/10 transition-colors duration-300 hover:bg-black/40">
            {crime.description ? (
              <p className="whitespace-pre-line">{crime.description}</p>
            ) : (
              <p className="text-gray-500 italic">No description provided for this case.</p>
            )}
          </div>
        </div>

        {/* Additional Crime Details */}
        {crime.date && (
          <div className="mt-4 text-sm text-gray-300">
            <span className="text-cyan-400">Date Reported:</span> {new Date(crime.date).toLocaleDateString()}
          </div>
        )}
        {crime.location && (
          <div className="mt-1 text-sm text-gray-300">
            <span className="text-cyan-400">Location:</span> {crime.location}
          </div>
        )}
      </div>

      {/* Detailed About Section */}
      {crime.about && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg mb-8 transition-all duration-300 hover:shadow-cyan-900/20 hover:border-cyan-500/30">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Full Case Details</h2>
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-line text-gray-300 leading-relaxed">
              {crime.about}
            </p>
          </div>
        </div>
      )}

      {/* People Involved Section */}
      <h2 className="text-2xl font-bold mb-6">People Involved</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard 
          title="Investigating Officers" 
          items={officers} 
          emptyMessage="No officers assigned"
        />
        <InfoCard 
          title="Victims" 
          items={victims} 
          emptyMessage="No victims listed"
        />
        <InfoCard 
          title="Suspects" 
          items={suspects} 
          emptyMessage="No suspects identified"
        />
      </div>
    </div>
  );
}

function InfoCard({ title, items, emptyMessage = "None listed" }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-full transition-all duration-300 hover:shadow-cyan-900/20 hover:border-cyan-500/30">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      {items && items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="group p-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <p className="text-cyan-300 font-semibold group-hover:text-white transition-colors duration-300 relative inline-block">
                {item.name || 'Unknown'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              {item.age && <p className="text-sm text-gray-300 group-hover:text-gray-200">Age: {item.age}</p>}
              {item.gender && <p className="text-sm text-gray-300 group-hover:text-gray-200">Gender: {item.gender}</p>}
              {item.rank && <p className="text-sm text-gray-300 group-hover:text-gray-200">Rank: {item.rank}</p>}
              {item.relation && <p className="text-sm text-gray-300 group-hover:text-gray-200">Relation: {item.relation}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">{emptyMessage}</p>
      )}
    </div>
  );
}