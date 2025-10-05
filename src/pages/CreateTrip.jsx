
import React, { useState } from "react";
import { createTrip } from "../api";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    activities: [],
  });
  const [newActivity, setNewActivity] = useState({ title: "", time: "" });

  const addActivity = () => {
    if (!newActivity.title.trim()) return;
    setTrip((prev) => ({
      ...prev,
      activities: [...prev.activities, { ...newActivity, id: uuidv4() }],
    }));
    setNewActivity({ title: "", time: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      activities: trip.activities.map((a) => ({
        title: a.title,
        time: a.time,
      })),
    };
    const res = await createTrip(payload);
    navigate(`/trip/${res.trip.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-10">
      
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
          🧭 Plan Your Next Trip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Details */}
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Name
              </label>
              <input
                type="text"
                value={trip.name}
                onChange={(e) => setTrip({ ...trip, name: e.target.value })}
                required
                placeholder="e.g. Summer Vacation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                value={trip.destination}
                onChange={(e) =>
                  setTrip({ ...trip, destination: e.target.value })
                }
                required
                placeholder="e.g. Paris, Tokyo, Bali"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={trip.startDate}
                  onChange={(e) =>
                    setTrip({ ...trip, startDate: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={trip.endDate}
                  onChange={(e) =>
                    setTrip({ ...trip, endDate: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Activities <span className="text-gray-500 text-sm">(optional)</span>
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <input
                type="text"
                placeholder="Activity title"
                value={newActivity.title}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, title: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Time (optional)"
                value={newActivity.time}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, time: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addActivity}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-all self-stretch sm:self-auto"
              >
                Add
              </button>
            </div>

            {trip.activities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {trip.activities.map((a) => (
                  <span
                    key={a.id}
                    className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full"
                  >
                    {a.title}{" "}
                    {a.time && (
                      <span className="text-gray-500 text-xs">({a.time})</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02]"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
