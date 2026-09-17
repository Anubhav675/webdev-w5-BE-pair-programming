// src/pages/JobsByType.jsx
import { useEffect, useState } from "react";
import JobListing from "../components/JobListing";

const JobsByLocation = () => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("Helsinki");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobsByLocation = async () => {
      if (!location) return;
      setLoading(true);
      setError("");
      try {
        // Encode for safety in case type has spaces (“Part-time”)
        const res = await fetch(`/api/jobs/location/${encodeURIComponent(location)}`);
        console.log("Encoded URI ==>",encodeURIComponent(location));
        
        if (!res.ok) throw new Error("Failed to fetch jobs by location");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByLocation();
  }, [location]);

  return (
    <div className="jobs-by-location">
      <h2>Jobs by Location</h2>

      <label>
        <span style={{ marginRight: 8 }}>Select job Location:</span>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Helsinki">Helsinki</option>
          <option value="Vaanta">Vaanta</option>
          <option value="Espoo">Espoo</option>
          <option value="Kauniainen">Kauniainen</option>
        </select>
      </label>

      <div className="job-list" style={{ marginTop: 16 }}>
        {loading && <p>Loading...</p>}
        {!loading && error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && jobs.length === 0 && <p>No jobs found</p>}
        {!loading &&
          !error &&
          jobs.length > 0 &&
          jobs.map((job) => (
            <JobListing key={job._id || job.id} {...job} />
          ))}
      </div>
    </div>
  );
};

export default JobsByLocation;