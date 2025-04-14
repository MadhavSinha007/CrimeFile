export default function CrimeCard({ crime }) {
  return (
    <div className="bg-dark-800 p-6 rounded-lg shadow-lg border-l-4 border-primary-500">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{crime.type}</h2>
        <span className={`px-3 py-1 rounded-full text-sm ${
          crime.status === 'Open' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
        }`}>
          {crime.status}
        </span>
      </div>
      
      <p className="mb-4 text-gray-300">{crime.description}</p>
      

    </div>
  );
}