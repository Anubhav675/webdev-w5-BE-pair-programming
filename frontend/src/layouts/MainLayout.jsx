import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import JobPage from "../pages/JobPage";
import JobPageType from "../pages/JobsByType"
const MainLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <JobPageType/>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

