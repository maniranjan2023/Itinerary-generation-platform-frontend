
import React, { useEffect, useState } from "react";
import { fetchTrips } from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips().then((data) => setTrips(data.trips));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">🌍 All Trips</h2>
          <Link
            to="/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-transform transform hover:scale-[1.02]"
          >
            + Create Trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <p className="text-lg">
              No trips found.{" "}
              <Link
                to="/create"
                className="text-indigo-600 hover:underline font-medium"
              >
                Create one
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {trips.map((t) => (
              <li
                key={t.id}
                className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg p-4 flex justify-between items-center transition-all"
              >
                <div>
                  <Link
                    to={`/trip/${t.id}`}
                    className="text-lg font-semibold text-indigo-700 hover:underline"
                  >
                    {t.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    Destination: <span className="font-medium">{t.destination}</span> • Activities:{" "}
                    <span className="font-medium">{t._count.activities}</span>
                  </p>
                </div>
                <Link
                  to={`/trip/${t.id}`}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View Details →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
