import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CrimeCard({ crime }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  // Get severity level indicator
  const getSeverityIndicator = () => {
    const level = parseInt(crime.severity_level || 0);
    
    if (level >= 8) {
      return { label: 'HIGH', indicator: 'before:bg-red-500' };
    } else if (level >= 5) {
      return { label: 'MED', indicator: 'before:bg-orange-500' };
    } else {
      return { label: 'LOW', indicator: 'before:bg-green-500' };
    }
  };
  
  const severity = getSeverityIndicator();

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer group relative bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ease-out shadow-md"
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Top accent line with status color */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card Content */}
      <div className="relative p-6">
        {/* Crime ID badge - top right */}
        {crime.crime_id && (
          <div className="absolute top-4 right-4 bg-white/5 rounded-full px-2 py-1 text-xs font-mono text-white/40 tracking-wide">
            #{crime.crime_id}
          </div>
        )}
        
        {/* Header - Crime Type with Professional Typography */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold tracking-wide text-white flex items-center gap-1">
            {crime.type || 'Unknown Type'}
            {crime.severity_level && (
              <span className={`ml-2 text-xs px-2 py-1 rounded font-medium uppercase ${statusStyle.textColor} ${statusStyle.bgColor} transition-all duration-300 opacity-80 group-hover:opacity-100`}>
                {severity.label}
              </span>
            )}
          </h2>
          
          {/* Subtle divider line */}
          <div className="mt-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        
        {/* Description with professional styling */}
        <div className="mb-5">
          <blockquote className="relative pl-3 border-l-2 border-white/20">
            <p className="text-white/75 text-sm leading-relaxed italic font-light">
              {crime.description || 'No description available'}
            </p>
          </blockquote>
        </div>
        
        {/* Footer with metadata and action */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          {/* Status Badge */}
          <span 
            className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle.bgColor} ${statusStyle.textColor} ${statusStyle.borderColor} transition-all duration-300`}
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {crime.status || 'Unknown Status'}
          </span>
          
          {/* View button with arrow */}
          <div 
            className={`flex items-center gap-1 text-xs font-medium text-white/60 transition-all duration-300 ${isHovered ? 'text-white' : ''}`}
          >
            VIEW DETAILS
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-3.5 w-3.5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
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