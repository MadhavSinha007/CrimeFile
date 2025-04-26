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
  const [partialError, setPartialError] = useState(null);

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

  // Severity colors matching CrimeCard (unchanged)
  const getSeverityStyle = (severity) => {
    if (!severity) return {
      bgColor: 'bg-gray-500/20',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/40',
      accentColor: 'from-gray-500/20'
    };
    
    const severityLower = severity?.toLowerCase();
    
    if (severityLower?.includes('high')) {
      return {
        bgColor: 'bg-red-500/20',
        textColor: 'text-red-400',
        borderColor: 'border-red-500/40',
        accentColor: 'from-red-500/20'
      };
    } else if (severityLower?.includes('med') || severityLower?.includes('medium')) {
      return {
        bgColor: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        borderColor: 'border-orange-500/40',
        accentColor: 'from-orange-500/20'
      };
    } else if (severityLower?.includes('low')) {
      return {
        bgColor: 'bg-green-500/20',
        textColor: 'text-green-400',
        borderColor: 'border-green-500/40',
        accentColor: 'from-green-500/20'
      };
    }
    
    return {
      bgColor: 'bg-gray-500/20',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/40',
      accentColor: 'from-gray-500/20'
    };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        setPartialError(null);
        
        // Fetch crime details first
        const crimeRes = await fetch(`http://localhost:5000/crimes/${id}`);
        if (!crimeRes.ok) throw new Error('Failed to fetch crime details');
        const crimeData = await crimeRes.json();
        setCrime(crimeData.crime || null);

        // Then fetch other data in parallel
        const [officersRes, victimsRes, suspectsRes] = await Promise.all([
          fetch(`http://localhost:5000/officers/crime/${id}`)
            .then(res => res.ok ? res.json() : { officers: [] })
            .catch(() => ({ officers: [] })),
          fetch(`http://localhost:5000/victims/crime/${id}`)
            .then(res => res.ok ? res.json() : { victims: [] })
            .catch(() => ({ victims: [] })),
          fetch(`http://localhost:5000/suspects/crime/${id}`)
            .then(res => res.ok ? res.json() : { suspects: [] })
            .catch(() => ({ suspects: [] }))
        ]);

        setOfficers(officersRes.officers || []);
        setVictims(victimsRes.victims || []);
        setSuspects(suspectsRes.suspects || []);

        // Check if any secondary requests failed
        const errors = [];
        if (!officersRes.officers) errors.push('officers');
        if (!victimsRes.victims) errors.push('victims');
        if (!suspectsRes.suspects) errors.push('suspects');
        
        if (errors.length > 0) {
          setPartialError(`Could not load: ${errors.join(', ')}`);
        }
        
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
  const severityStyle = getSeverityStyle(crime.severity_level);

  // Helper function to display data or "Not Available"
  const displayData = (data) => data || 'Not Available';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-950 text-white p-8">
      {/* Partial error notification */}
      {partialError && (
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-lg text-yellow-400">
          <p>{partialError}</p>
        </div>
      )}

      {/* Header */}
      <h1 className="text-4xl font-bold tracking-wider text-white mb-8 relative group inline-block">
        Crime Case Details
        <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${severityStyle.accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </h1>

      {/* Crime Overview Section */}
      <div className={`group bg-gradient-to-b from-neutral-900 to-black border ${severityStyle.borderColor} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:bg-neutral-800/50 hover:border-white/50 hover:shadow-2xl mb-8`}>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${severityStyle.accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-white/60 mb-2 font-mono">
                Case ID: <span className={`text-white ${severityStyle.bgColor} px-2 py-1 rounded transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:scale-105 group-hover:-translate-y-1`}>#{displayData(id)}</span>
              </p>
              <h2 className="text-2xl font-bold tracking-wider text-white group-hover:text-white/90">{displayData(crime.type)}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm mb-2">
                <span className="text-white/60 group-hover:text-white/80">Severity:</span>
                <span className={`ml-2 text-xs px-3 py-1 rounded-full font-medium uppercase ${severityStyle.textColor} ${severityStyle.bgColor} ${severityStyle.borderColor} transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1`}>
                  {displayData(crime.severity_level)}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-white/60 group-hover:text-white/80">Status:</span>
                <span className={`ml-2 text-xs px-3 py-1 rounded-full font-medium uppercase ${statusStyle.textColor} ${statusStyle.bgColor} ${statusStyle.borderColor} transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:border-white group-hover:scale-105 group-hover:-translate-y-1`}>
                  {displayData(crime.status)}
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
            <blockquote className={`relative pl-4 border-l-4 ${severityStyle.borderColor} ${severityStyle.bgColor} rounded-lg p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-lg`}>
              <p className="text-white/80 text-sm leading-relaxed italic font-light group-hover:text-white/90">
                {displayData(crime.description)}
              </p>
            </blockquote>
          </div>

          {/* Additional Crime Details */}
          <div className="mt-6 pt-4 border-t border-white/20 group-hover:border-white/40">
            <p className="text-sm text-white/60 group-hover:text-white/80">
              <span className="text-white">Date Reported:</span> <span className="transition-all duration-300 group-hover:text-white group-hover:scale-105 group-hover:-translate-y-1">
                {crime.date ? new Date(crime.date).toLocaleDateString() : 'Not Available'}
              </span>
            </p>
            <p className="text-sm text-white/60 mt-2 group-hover:text-white/80">
              <span className="text-white">Location:</span> <span className="transition-all duration-300 group-hover:text-white group-hover:scale-105 group-hover:-translate-y-1">
                {displayData(crime.location)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Full Case Details Section */}
      {crime.about && (
        <div className={`group bg-gradient-to-b from-neutral-900 to-black border ${severityStyle.borderColor} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:bg-neutral-800/50 hover:border-white/50 hover:shadow-2xl mb-8`}>
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${severityStyle.accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-wider text-white mb-4 group inline-block relative">
              Full Case Details
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className={`text-white/80 leading-relaxed text-sm ${severityStyle.bgColor} p-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white/90`}>
                {displayData(crime.about)}
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
          emptyMessage="No officers information available"
          severityStyle={severityStyle}
        />
        <InfoCard 
          title="Victims" 
          items={victims} 
          emptyMessage="No victims information available"
          severityStyle={severityStyle}
        />
        <InfoCard 
          title="Suspects" 
          items={suspects} 
          emptyMessage="No suspects information available"
          severityStyle={severityStyle}
        />
      </div>
    </div>
  );
}

function InfoCard({ title, items, emptyMessage = "Not Available", severityStyle }) {
  return (
    <div className={`group bg-gradient-to-b from-neutral-900 to-black border ${severityStyle.borderColor} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:bg-neutral-800/50 hover:border-white/50 hover:shadow-2xl`}>
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${severityStyle.accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4 tracking-wider group inline-block relative">
          {title}
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </h3>
        {items && items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className={`p-3 border ${severityStyle.borderColor} rounded-lg ${severityStyle.bgColor} transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-lg`}>
                <p className="text-white font-semibold tracking-wider mb-1 group-hover:text-white/90">
                  <span className="transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                    {item.name || 'Name Not Available'}
                  </span>
                </p>
                {item.age !== undefined && (
                  <p className="text-sm text-white/60 group-hover:text-white/80">
                    Age: <span className="transition-all duration-300 group-hover:text-white">
                      {item.age ?? 'Not Available'}
                    </span>
                  </p>
                )}
                {item.gender !== undefined && (
                  <p className="text-sm text-white/60 group-hover:text-white/80">
                    Gender: <span className="transition-all duration-300 group-hover:text-white">
                      {item.gender ?? 'Not Available'}
                    </span>
                  </p>
                )}
                {item.rank !== undefined && (
                  <p className="text-sm text-white/60 group-hover:text-white/80">
                    Rank: <span className="transition-all duration-300 group-hover:text-white">
                      {item.rank ?? 'Not Available'}
                    </span>
                  </p>
                )}
                {item.relation !== undefined && (
                  <p className="text-sm text-white/60 group-hover:text-white/80">
                    Relation: <span className="transition-all duration-300 group-hover:text-white">
                      {item.relation ?? 'Not Available'}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm italic group-hover:text-white/60">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}