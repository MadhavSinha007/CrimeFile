import { useState } from 'react';
import { mockCrimes } from './constants.js';
import CrimeCard from '../components/CrimeCard';

export default function AdminDashboard() {
  const [crimes, setCrimes] = useState(mockCrimes);
  const [isAdding, setIsAdding] = useState(false);
  const [newCrime, setNewCrime] = useState({
    description: '',
    severity_level: 'Medium',
    type: '',
    status: 'Open',
    suspects: [{ name: '', age: '', gender: 'Male' }],
    victims: [{ name: '', age: '', gender: '' }],
    officers: [{ name: '' }]
  });

  const handleAddCrime = () => {
    const crimeId = Math.max(...crimes.map(c => c.crime_id)) + 1;
    const crimeToAdd = {
      ...newCrime,
      crime_id: crimeId,
      suspects: newCrime.suspects.filter(s => s.name),
      victims: newCrime.victims.filter(v => v.name),
      officers: newCrime.officers.filter(o => o.name)
    };
    
    setCrimes([...crimes, crimeToAdd]);
    setIsAdding(false);
    setNewCrime({
      description: '',
      severity_level: 'Medium',
      type: '',
      status: 'Open',
      suspects: [{ name: '', age: '', gender: 'Male' }],
      victims: [{ name: '', age: '', gender: '' }],
      officers: [{ name: '' }]
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition"
        >
          {isAdding ? 'Cancel' : 'Add New Crime'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-dark-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Crime</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                value={newCrime.description}
                onChange={(e) => setNewCrime({...newCrime, description: e.target.value})}
                className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="3"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Type</label>
                <input
                  type="text"
                  value={newCrime.type}
                  onChange={(e) => setNewCrime({...newCrime, type: e.target.value})}
                  className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block mb-2">Severity Level</label>
                <select
                  value={newCrime.severity_level}
                  onChange={(e) => setNewCrime({...newCrime, severity_level: e.target.value})}
                  className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Status</label>
                <select
                  value={newCrime.status}
                  onChange={(e) => setNewCrime({...newCrime, status: e.target.value})}
                  className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block mb-2">Suspects</label>
              {newCrime.suspects.map((suspect, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={suspect.name}
                    onChange={(e) => {
                      const updatedSuspects = [...newCrime.suspects];
                      updatedSuspects[index] = {...updatedSuspects[index], name: e.target.value};
                      setNewCrime({...newCrime, suspects: updatedSuspects});
                    }}
                    className="p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={suspect.age}
                    onChange={(e) => {
                      const updatedSuspects = [...newCrime.suspects];
                      updatedSuspects[index] = {...updatedSuspects[index], age: e.target.value};
                      setNewCrime({...newCrime, suspects: updatedSuspects});
                    }}
                    className="p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={suspect.gender}
                    onChange={(e) => {
                      const updatedSuspects = [...newCrime.suspects];
                      updatedSuspects[index] = {...updatedSuspects[index], gender: e.target.value};
                      setNewCrime({...newCrime, suspects: updatedSuspects});
                    }}
                    className="p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setNewCrime({...newCrime, suspects: [...newCrime.suspects, { name: '', age: '', gender: 'Male' }]})}
                className="text-primary-500 hover:text-primary-400 text-sm"
              >
                + Add Another Suspect
              </button>
            </div>
            
            {/* Similar sections for Victims and Officers would go here */}
            
            <button
              type="button"
              onClick={handleAddCrime}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition"
            >
              Add Crime
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {crimes.map(crime => (
          <CrimeCard key={crime.crime_id} crime={crime} />
        ))}
      </div>
    </div>
  );
}