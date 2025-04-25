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

  // Status colors mapping matching CrimeCard
  const getStatusStyle = (status) => {
    if (!status) return {
      bgColor: 'bg-gray-500/10',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/30'
    };
    
    const statusLower = status.toLowerCase();
    
    if (statusLower === 'open' || 
        statusLower.includes('unsolved') || 
        statusLower.includes('active')) {
      return {
        bgColor: 'bg-red-500/10',
        textColor: 'text-red-400',
        borderColor: 'border-red-500/30'
      };
    }
    
    if (statusLower === 'closed' || 
        statusLower.includes('solved') || 
        statusLower.includes('resolved')) {
      return {
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-400',
        borderColor: 'border-green-500/30'
      };
    }
    
    if (statusLower.includes('cold') || 
        statusLower.includes('inactive')) {
      return {
        bgColor: 'bg-blue-500/10',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/30'
      };
    }
    
    if (statusLower.includes('progress') || 
        statusLower.includes('investigating')) {
      return {
        bgColor: 'bg-purple-500/10',
        textColor: 'text-purple-400',
        borderColor: 'border-purple-500/30'
      };
    }
    
    if (statusLower.includes('urgent') || 
        statusLower.includes('priority')) {
      return {
        bgColor: 'bg-orange-500/10', 
        textColor: 'text-orange-400',
        borderColor: 'border-orange-500/30'
      };
    }
    
    return {
      bgColor: 'bg-gray-500/10',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/30'
    };
  };

  // Severity colors reverted to original string-based mapping
  const severityColors = {
    'high': 'text-red-400 bg-red-500/20 border-red-500/40 shadow-red-500/30',
    'medium': 'text-orange-400 bg-orange-500/20 border-orange-500/40 shadow-orange-500/30',
    'low': 'text-green-400 bg-green-500/20 border-green-500/40 shadow-green-500/30',
  };

  const getSeverityColor = (severity) => {
    const normalizedSeverity = severity?.toLowerCase();
    return severityColors[normalizedSeverity] || 'text-gray-400 bg-gray-500/20 border-gray-500/40 shadow-gray-500/30';
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
      <div className="min-h-screen bg-gradient-to-br from-black to-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 shadow-lg shadow-white/20"></div>
          <p className="text-lg text-white font-medium tracking-wider animate-pulse">Loading crime details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-neutral-950 flex items-center justify-center">
        <p className="text-lg text-red-400 bg-red-500/20 px-6 py-4 rounded-xl border border-red-500/40 font-medium tracking-wider shadow-lg shadow-red-500/20">Error: {error}</p>
      </div>
    );
  }

  if (!crime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-neutral-950 flex items-center justify-center">
        <p className="text-lg text-white bg-white/10 px-6 py-4 rounded-xl border border-white/30 font-medium tracking-wider shadow-lg shadow-white/20">Crime not found.</p>
      </div>
    );
  }

  const statusStyle = getStatusStyle(crime.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-950 text-white p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-wider text-white mb-8 relative group inline-block">
        Crime Case Details
        <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </h1>

      {/* Crime Overview Section */}
      <div className="group bg-gradient-to-b from-neutral-900 to-black border border-white/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/50 mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-white/60 mb-2 font-mono">
                Case ID: <span className="text-white bg-white/20 px-2 py-1 rounded transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">#{id}</span>
              </p>
              <h2 className="text-2xl font-bold tracking-wider text-white">{crime.type || 'Unknown Type'}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm mb-2">
                <span className="text-white/60">Severity:</span>
                <span className={`ml-2 text-xs px-3 py-1 rounded-full font-medium uppercase ${getSeverityColor(crime.severity_level)} transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 hover:shadow-lg`}>
                  {crime.severity_level || 'Unknown'}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-white/60">Status:</span>
                <span className={`ml-2 text-xs px-3 py-1 rounded-full font-medium uppercase ${statusStyle.textColor} ${statusStyle.bgColor} ${statusStyle.borderColor} transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 hover:shadow-lg`}>
                  {crime.status || 'Unknown'}
                </span>
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2 tracking-wider group inline-block relative">
              Case Description
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <blockquote className="relative pl-4 border-l-4 border-white/50 bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-white/20">
              <p className="text-white/80 text-sm leading-relaxed italic font-light">
                {crime.description || 'No description available'}
              </p>
            </blockquote>
          </div>

          {/* Additional Crime Details */}
          <div className="mt-6 pt-4 border-t border-white/20">
            {crime.date && (
              <p className="text-sm text-white/60">
                <span className="text-white">Date Reported:</span> <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{new Date(crime.date).toLocaleDateString()}</span>
              </p>
            )}
            {crime.location && (
              <p className="text-sm text-white/60 mt-2">
                <span className="text-white">Location:</span> <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{crime.location}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Full Case Details Section */}
      {crime.about && (
        <div className="group bg-gradient-to-b from-neutral-900 to-black border border-white/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/50 mb-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-wider text-white mb-4 group inline-block relative">
              Full Case Details
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed text-sm">
                {crime.about}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* People Involved Section */}
      <h2 className="text-2xl font-bold tracking-wider text-white mb-6 group inline-block relative">
        People Involved
        <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
      </h2>
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
    <div className="group bg-gradient-to-b from-neutral-900 to-black border border-white/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/50">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 tracking-wider group inline-block relative">
          {title}
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </h3>
        {items && items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="p-3 border border-white/30 rounded-lg bg-white/10 transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/20">
                <p className="text-white font-semibold tracking-wider mb-1">
                  <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{item.name || 'Unknown'}</span>
                </p>
                {item.age && <p className="text-sm text-white/60">
                  Age: <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{item.age}</span>
                </p>}
                {item.gender && <p className="text-sm text-white/60">
                  Gender: <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{item.gender}</span>
                </p>}
                {item.rank && <p className="text-sm text-white/60">
                  Rank: <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{item.rank}</span>
                </p>}
                {item.relation && <p className="text-sm text-white/60">
                  Relation: <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">{item.relation}</span>
                </p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm italic">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}