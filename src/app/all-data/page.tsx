"use client";

import { useState, useEffect } from "react";
import { searchDatasets } from "@/utils/api";
import { Dataset } from "@/utils/types";

export default function AllData() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchDatasets({
          page: 1,
          size: 2,
          sort: "recent",
          order: "desc",
        });
        setDatasets(response.results);
      } catch (err) {
        setError("Failed to fetch datasets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      <div className="space-y-4">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="border p-4 rounded">
            <h3 className="font-semibold">{dataset.title}</h3>
            <p className="text-gray-600">{dataset.description}</p>
            <p className="text-sm text-gray-500">
              Organization: {dataset.organization.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
