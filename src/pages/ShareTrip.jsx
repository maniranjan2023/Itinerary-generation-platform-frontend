
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSharedTrip } from "../api";

export default function ShareTrip() {
  const { token } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetchSharedTrip(token).then((data) => setTrip(data.trip));
  }, [token]);

  if (!trip)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading shared trip...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Trip Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {trip.name} <span className="text-blue-600">({trip.destination})</span>
        </h2>
        <p className="text-gray-600 mt-2">
          {new Date(trip.startDate).toLocaleDateString()} →{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>
      </div>

      {/* Trip Days */}
      <div className="space-y-6">
        {trip.days.map((day) => (
          <div
            key={day.day}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Day {day.day} <span className="text-gray-600">- {day.date}</span>
            </h3>

            {day.weather && (
              <p className="text-gray-500 mb-3">
                ☀️ <span className="font-medium">Weather:</span>{" "}
                {day.weather.temp !== null ? `${day.weather.temp}°C` : "N/A"} —{" "}
                {day.weather.description || ""}
              </p>
            )}

            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {day.activities.length > 0 ? (
                day.activities.map((a) => (
                  <li key={a.id} className="flex items-center justify-between">
                    <span>
                      {a.title}{" "}
                      {a.time && (
                        <span className="text-gray-500 text-sm">({a.time})</span>
                      )}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-400 italic">No activities for this day.</p>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-8">
        🌍 Shared with you via <span className="font-medium text-blue-600">Trip Planner</span>
      </p>
    </div>
  );
}
