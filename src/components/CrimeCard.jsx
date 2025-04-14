import { useNavigate } from 'react-router-dom';

export default function CrimeCard({ crime }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/crime/${crime.crime_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group bg-neutral-900 border border-white/10 rounded-2xl p-6 transition-transform duration-300 ease-in-out hover:scale-[1.015] hover:border-white/20 shadow-lg hover:shadow-white/5"
    >
      {/* Gradient Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-wide uppercase text-white">
            {crime.type}
          </h2>
          <span className={`text-xs font-medium px-3 py-1 rounded-full border shadow-sm
            ${crime.status === 'Open'
              ? 'bg-red-500/10 text-red-400 border-red-500/30'
              : 'bg-green-500/10 text-green-400 border-green-500/30'
            }`}
          >
            {crime.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-base text-white/90 leading-relaxed text-pretty line-clamp-4">
          “{crime.description}”
        </p>
      </div>
    </div>
  );
}
