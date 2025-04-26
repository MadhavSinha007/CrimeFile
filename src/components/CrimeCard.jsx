import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CrimeCard({ crime }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [severity, setSeverity] = useState({
    value: 0,
    percentage: 0,
    label: 'LOW',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    glowColor: 'from-green-500/20',
    borderColor: 'border-green-500/30'
  });
  
  const handleClick = () => {
    navigate(`/crime/${crime.crime_id}`);
  };

  // Determine status style based on crime status
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

  const statusStyle = getStatusStyle(crime.status);
  
  // Calculate severity level from various formats
  useEffect(() => {
    const calculateSeverity = () => {
      // First check for text-based severity
      if (typeof crime.severity_level === 'string') {
        const severityText = crime.severity_level.toLowerCase();
        
        // Check for text-based values like "high", "medium", "low"
        if (severityText.includes('high')) {
          return {
            value: 9,
            percentage: 90,
            label: 'HIGH',
            bgColor: 'bg-red-500',
            textColor: 'text-red-500',
            glowColor: 'from-red-500/20',
            borderColor: 'border-red-500/50',
            pulseEffect: isHovered ? 'shadow-[0_0_15px_rgba(239,68,68,0.7)]' : 'shadow-[0_0_8px_rgba(239,68,68,0.4)]'
          };
        } else if (severityText.includes('med') || severityText.includes('medium')) {
          return {
            value: 6,
            percentage: 60,
            label: 'MED',
            bgColor: 'bg-orange-500',
            textColor: 'text-orange-500',
            glowColor: 'from-orange-500/20',
            borderColor: 'border-orange-500/40',
            pulseEffect: isHovered ? 'shadow-[0_0_12px_rgba(249,115,22,0.5)]' : 'shadow-[0_0_6px_rgba(249,115,22,0.3)]'
          };
        } else if (severityText.includes('low')) {
          return {
            value: 3,
            percentage: 30,
            label: 'LOW',
            bgColor: 'bg-green-500',
            textColor: 'text-green-500',
            glowColor: 'from-green-500/20',
            borderColor: 'border-green-500/30',
            pulseEffect: isHovered ? 'shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'shadow-[0_0_4px_rgba(34,197,94,0.2)]'
          };
        }
      }
      
      // Numeric processing for both string numbers and actual numbers
      let severityValue = 0;
      
      if (crime.severity_level !== undefined && crime.severity_level !== null) {
        // Handle both numeric and string numeric values
        severityValue = typeof crime.severity_level === 'number' 
          ? crime.severity_level 
          : parseFloat(crime.severity_level);
        
        // Handle NaN case
        if (isNaN(severityValue)) {
          severityValue = 0;
        }
        
        // Clamp between 0-10
        severityValue = Math.max(0, Math.min(10, severityValue));
      }
      
      // Calculate percentage for the progress bar
      const percentage = severityValue * 10;
      
      // Determine the severity category and colors
      let label, bgColor, textColor, glowColor, borderColor, pulseEffect;
      
      if (severityValue >= 8) {
        label = 'HIGH';
        bgColor = 'bg-red-500';
        textColor = 'text-red-500';
        glowColor = 'from-red-500/20';
        borderColor = 'border-red-500/50';
        pulseEffect = isHovered ? 'shadow-[0_0_15px_rgba(239,68,68,0.7)]' : 'shadow-[0_0_8px_rgba(239,68,68,0.4)]';
      } else if (severityValue >= 5) {
        label = 'MED';
        bgColor = 'bg-orange-500';
        textColor = 'text-orange-500';
        glowColor = 'from-orange-500/20';
        borderColor = 'border-orange-500/40';
        pulseEffect = isHovered ? 'shadow-[0_0_12px_rgba(249,115,22,0.5)]' : 'shadow-[0_0_6px_rgba(249,115,22,0.3)]';
      } else {
        label = 'LOW';
        bgColor = 'bg-green-500';
        textColor = 'text-green-500';
        glowColor = 'from-green-500/20';
        borderColor = 'border-green-500/30';
        pulseEffect = isHovered ? 'shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'shadow-[0_0_4px_rgba(34,197,94,0.2)]';
      }
      
      return {
        value: severityValue,
        percentage,
        label,
        bgColor,
        textColor,
        glowColor,
        borderColor,
        pulseEffect
      };
    };
    
    setSeverity(calculateSeverity());
  }, [crime.severity_level, isHovered]);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer group relative bg-gradient-to-b from-neutral-900 to-black border rounded-xl overflow-hidden transition-all duration-300 ease-out shadow-md h-full flex flex-col ${severity.borderColor} ${severity.pulseEffect}`}
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        background: isHovered ? 
          `linear-gradient(to bottom, rgba(9, 9, 11, 0.9), rgba(9, 9, 11, 1)), 
           radial-gradient(circle at center, var(--glow-color) 0%, transparent 70%)` : 
          'linear-gradient(to bottom, rgba(9, 9, 11, 1), rgba(9, 9, 11, 1))'
      }}
    >
      {/* Glow effect based on severity */}
      <div className={`absolute inset-0 bg-gradient-to-b ${severity.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      {/* Top accent line with severity color - animated */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${severity.bgColor} ${isHovered ? 'opacity-100' : 'opacity-80'} transition-opacity duration-300`} />
      
      {/* Card Content */}
      <div className="relative p-6 flex-1 flex flex-col z-10">
        {/* Crime ID badge - top left with actual crime ID */}
        {crime.crime_id && (
          <div className={`absolute top-4 left-4 ${severity.bgColor}/10 rounded-full px-3 py-1 text-xs font-bold ${severity.textColor} tracking-wide border ${severity.borderColor}`}>
            #{crime.crime_id}
          </div>
        )}
        
        {/* Header - Crime Type */}
        <div className="mb-4 pl-8"> {/* Added padding to account for ID badge */}
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
              {crime.type || 'Unknown Type'}
            </h2>
            <span className={`text-xs px-2 py-1 rounded font-medium uppercase ${statusStyle.textColor} ${statusStyle.bgColor} border ${statusStyle.borderColor}`}>
              {crime.status || 'Unknown Status'}
            </span>
          </div>
          
          {/* Date and Location */}
          <div className="flex items-center gap-3 mt-2 text-sm text-white/60 group-hover:text-white/70 transition-colors duration-300">
            {crime.date && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(crime.date).toLocaleDateString()}
              </span>
            )}
            {crime.location && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {crime.location}
              </span>
            )}
          </div>
        </div>
        
        {/* Severity indicator with animated bar */}
        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-xs font-medium text-white/60 mr-2 group-hover:text-white/80 transition-colors duration-300">Severity:</span>
            <div className="flex-1 flex items-center">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full ${severity.bgColor} transition-all duration-500 ease-out`}
                  style={{ 
                    width: `${severity.percentage}%`,
                    boxShadow: isHovered ? `0 0 8px ${severity.bgColor.replace('bg-', '')}` : 'none'
                  }}
                />
              </div>
              <span className={`ml-2 text-xs font-medium ${severity.textColor} group-hover:font-semibold transition-all duration-300`}>
                {severity.label}
              </span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-5 flex-1">
          <p className="text-white/75 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {crime.description || 'No description available'}
          </p>
        </div>
        
        {/* Footer with action - severity colored on hover */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className={`flex items-center justify-end gap-1 text-sm font-medium ${isHovered ? severity.textColor : 'text-white/60'} transition-all duration-300`}>
            View full details
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}