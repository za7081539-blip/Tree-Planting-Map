"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ref, onValue, push } from "firebase/database";
import { db } from "../lib/firebase";
import TreeForm from "../components/TreeFrom";

const Map = dynamic(
  () => import("../components/Map"),
  { ssr: false }
);

export default function Home() {
  const [trees, setTrees] = useState([]);
  const [location, setLocation] = useState(null);

  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  // Realtime Database se data fetch aur real-time listener
  useEffect(() => {
    const treesRef = ref(db, "trees");

    const unsubscribe = onValue(treesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTrees = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTrees(loadedTrees);
      } else {
        setTrees([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMapClick = (location) => {
    setLocation(location);
  };

  // Naya tree Realtime Database mein save karna
  const handleSaveTree = async () => {
    if (!location) {
      alert("Please select a location on the map first!");
      return;
    }

    if (!formData.userName || !formData.treeName) {
      alert("Please enter both User Name and Tree Name.");
      return;
    }

    try {
      const newTree = {
        userName: formData.userName,
        treeName: formData.treeName,
        lat: location.lat,
        lng: location.lng,
        date: new Date().toLocaleDateString(),
      };

      const treesRef = ref(db, "trees");
      await push(treesRef, newTree);

      alert("Tree planted successfully! 🌳");

      // Form reset aur temporary location map se hatana
      setFormData({
        userName: "",
        treeName: "",
      });
      setLocation(null);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Failed to plant tree: " + error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-green-700">
          🌳 Tree Planting Application
        </h1>

        <p className="mb-6 text-gray-600">
          Click on the map, select a location and plant your tree.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Map
              trees={trees}
              onMapClick={handleMapClick}
              selectedLocation={location}
            />
          </div>

          {/* Form & Counter Section */}
          <div>
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
            />

            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
              <h2 className="font-semibold text-gray-800">Total Trees</h2>
              <p className="mt-1 text-3xl font-bold text-green-600">
                {trees.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}