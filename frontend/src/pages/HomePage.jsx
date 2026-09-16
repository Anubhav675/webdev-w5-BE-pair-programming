import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        console.log(data);

        setJobs(data)



      }

      catch (error) {
        console.error("fail to fetch jobs: ", error);
      }
    };

    fetchData();
    console.log(jobs);
  });

  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};



export default Home;

