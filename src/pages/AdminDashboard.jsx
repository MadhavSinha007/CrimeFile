import { useState } from 'react';
import { mockCrimes } from './constants.js';
import CrimeCard from '../components/CrimeCard';

export default function AdminDashboard() {
  const [crimes, setCrimes] = useState(mockCrimes);
  const [isAdding, setIsAdding] = useState(false);
  const [newCrime, setNewCrime] = useState({
    description: '',
    about: '',
    severity_level: 'Medium',
    type: '',
    status: 'Open',
    suspects: [{ name: '', age: '', gender: 'Male' }],  
    victims: [{ name: '' , age: '', gender: 'Male'}],   
    officers: [{ name: '' }]   
  });

  const handleAddCrime = async () => {
    try {
      const crimeToAdd = {
        description: newCrime.description,
        about: newCrime.about,
        severity_level: newCrime.severity_level,
        type: newCrime.type,
        status: newCrime.status,
      };
  
      // 1. Create the crime
      const crimeRes = await fetch('http://localhost:5000/crimes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crimeToAdd)
      });
  
      if (!crimeRes.ok) throw new Error('Failed to add crime');
      const crimeData = await crimeRes.json();
      const crimeId = crimeData.crime_id;
  
      // 2. Append crime_id to suspects, victims, officers
      const updatedSuspects = newCrime.suspects
        .filter(s => s.name.trim() !== '')
        .map(s => ({ ...s, crime_id: crimeId }));
  
      const updatedVictims = newCrime.victims
        .filter(v => v.name.trim() !== '')
        .map(v => ({ ...v, crime_id: crimeId }));
  
      const updatedOfficers = newCrime.officers
        .filter(o => o.name.trim() !== '')
        .map(o => ({ ...o, crime_id: crimeId }));
  
      // 3. Helper function to post related entities
      const postEntities = async (endpoint, entities) => {
        for (const entity of entities) {
          await fetch(`http://localhost:5000/${endpoint}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
          });
        }
      };
  
      // 4. Post suspects, victims, and officers
      await Promise.all([
        postEntities('suspects', updatedSuspects),
        postEntities('victims', updatedVictims),
        postEntities('officers', updatedOfficers)
      ]);
  
      // 5. Update local state
      setCrimes([...crimes, {
        ...crimeToAdd,
        crime_id: crimeId,
        suspects: updatedSuspects,
        victims: updatedVictims,
        officers: updatedOfficers
      }]);
  
      // 6. Reset form
      setIsAdding(false);
      setNewCrime({
        description: '',
        about: '',
        severity_level: 'Medium',
        type: '',
        status: 'Open',
        suspects: [{ name: '', age: '', gender: 'Male' }],
        victims: [{ name: '', age: '', gender: 'Female' }],
        officers: [{ name: '' }]
      });
  
    } catch (error) {
      console.error("Error adding crime:", error);
      alert("There was an error submitting the crime. Please try again.");
    }
  };
  
  // Helper function to handle array field updates
  const handleArrayFieldChange = (field, index, key, value) => {
    const updated = [...newCrime[field]];
    updated[index][key] = value;
    setNewCrime({ ...newCrime, [field]: updated });
  };
  

  // Helper function to add new array field item
  const addArrayFieldItem = (field) => {
    setNewCrime({ 
      ...newCrime, 
      [field]: [...newCrime[field], { name: '' }] 
    });
  };

  // Helper function to remove array field item
  const removeArrayFieldItem = (field, index) => {
    const updated = newCrime[field].filter((_, i) => i !== index);
    setNewCrime({ ...newCrime, [field]: updated });
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold uppercase">Admin Dashboard</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          {isAdding ? 'Cancel' : 'Add Crime'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-6">Add New Crime</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                value={newCrime.description}
                onChange={(e) => setNewCrime({ ...newCrime, description: e.target.value })}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">About</label>
              <textarea
                value={newCrime.about}
                onChange={(e) => setNewCrime({ ...newCrime, about: e.target.value })}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                rows="3"
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Type</label>
                <input
                  type="text"
                  value={newCrime.type}
                  onChange={(e) => setNewCrime({ ...newCrime, type: e.target.value })}
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label className="block mb-2">Severity</label>
                <select
                  value={newCrime.severity_level}
                  onChange={(e) => setNewCrime({ ...newCrime, severity_level: e.target.value })}
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
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
                  onChange={(e) => setNewCrime({ ...newCrime, status: e.target.value })}
                  className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block mb-2">Officers</label>
              {newCrime.officers.map((officer, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Officer name"
                    value={officer.name}
                    onChange={(e) => handleArrayFieldChange('officers', index, 'name', e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-neutral-800 border border-white/10"
                  />
                  {newCrime.officers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayFieldItem('officers', index)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayFieldItem('officers')}
                className="text-primary-400 hover:text-primary-300 text-sm"
              >
                + Add officer
              </button>
            </div>


            {/* Render array fields (suspects, victims, officers) */}
            {['suspects', 'victims'].map((field) => (
              <div key={field} className="space-y-2">
              <label className="block mb-2 capitalize">{field}</label>
              {newCrime[field].map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={item.name}
                    onChange={(e) => handleArrayFieldChange(field, index, 'name', e.target.value)}
                    className="p-3 rounded-lg bg-neutral-800 border border-white/10"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={item.age}
                    onChange={(e) => handleArrayFieldChange(field, index, 'age', e.target.value)}
                    className="p-3 rounded-lg bg-neutral-800 border border-white/10"
                  />
                  <select
                    value={item.gender}
                    onChange={(e) => handleArrayFieldChange(field, index, 'gender', e.target.value)}
                    className="p-3 rounded-lg bg-neutral-800 border border-white/10"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setNewCrime({
                    ...newCrime,
                    [field]: [
                      ...newCrime[field],
                      { name: '', age: '', gender: field === 'victims' ? 'Female' : 'Male' }
                    ]
                  })
                }
                className="text-primary-400 hover:text-primary-300 text-sm"
              >
                + Add {field.slice(0, -1)}
              </button>
              </div>
              ))}


            <button
              type="button"
              onClick={handleAddCrime}
              className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition mt-4"
            >
              Add Crime
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {crimes.map(crime => (
          <CrimeCard key={crime.crime_id} crime={crime} />
        ))}
      </div>
    </div>
  );
}