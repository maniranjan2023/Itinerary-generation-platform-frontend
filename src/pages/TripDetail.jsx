import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchTripById,
  createActivity,
  updateActivity,
  deleteActivity,
  regenerateTrip,
} from "../api";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [newActivity, setNewActivity] = useState({
    title: "",
    time: "",
    dayIndex: 1,
    date: "",
  });

  const loadTrip = () => {
    fetchTripById(id).then((data) => setTrip(data.trip));
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  const handleAdd = async () => {
    if (!newActivity.title || !newActivity.date || !newActivity.dayIndex) return;
    await createActivity({ ...newActivity, tripId: trip.id });
    setNewActivity({ title: "", time: "", dayIndex: 1, date: "" });
    loadTrip();
  };

  const handleDelete = async (activityId) => {
    await deleteActivity(activityId);
    loadTrip();
  };

  const handleRegenerate = async () => {
    await regenerateTrip(id);
    loadTrip();
  };

  const handleShare = () => {
    const shareURL = `${window.location.origin}/share/${trip.shareToken}`;
    navigator.clipboard
      .writeText(shareURL)
      .then(() => alert("Trip link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  if (!trip)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading trip...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700">
            {trip.name}
          </h2>
          <p className="text-gray-600 text-lg">
            Destination: <span className="font-medium">{trip.destination}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(trip.startDate).toLocaleDateString()} →{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleRegenerate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-transform transform hover:scale-[1.02]"
          >
            🔁 Regenerate Itinerary (AI)
          </button>
          <button
            onClick={handleShare}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-transform transform hover:scale-[1.02]"
          >
            🔗 Share Trip
          </button>
        </div>

        {/* Days & Activities */}
        <div className="space-y-6 mb-8">
          {trip.days.map((day) => (
            <div
              key={day.day}
              className="border border-gray-200 rounded-lg shadow-sm p-5 bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-indigo-700">
                  Day {day.day} -{" "}
                  <span className="text-gray-600">{day.date}</span>
                </h3>
                {day.weather && (
                  <p className="text-sm text-gray-500">
                    🌤️{" "}
                    {day.weather.temp !== null
                      ? `${day.weather.temp}°C`
                      : "N/A"}{" "}
                    - {day.weather.description || ""}
                  </p>
                )}
              </div>

              {day.activities.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  No activities added yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {day.activities.map((a) => (
                    <li
                      key={a.id}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div>
                        <span className="font-medium text-gray-800">
                          {a.title}
                        </span>{" "}
                        {a.time && (
                          <span className="text-sm text-gray-500">
                            ({a.time})
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Add Activity Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">
            ➕ Add New Activity
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              placeholder="Title"
              value={newActivity.title}
              onChange={(e) =>
                setNewActivity({ ...newActivity, title: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              placeholder="Time"
              value={newActivity.time}
              onChange={(e) =>
                setNewActivity({ ...newActivity, time: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="number"
              placeholder="Day"
              value={newActivity.dayIndex}
              min="1"
              max={trip.days.length}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  dayIndex: parseInt(e.target.value),
                })
              }
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="date"
              value={newActivity.date}
              onChange={(e) =>
                setNewActivity({ ...newActivity, date: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={handleAdd}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-transform transform hover:scale-[1.02]"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
