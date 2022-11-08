import CardList from "../components/CardList";
import MySideBar from "./MySidebar";
import { useProSidebar } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { toggleSidebar } = useProSidebar();

  return (
    <div className="main">
      <MySideBar />
      <div class="container">
        <button className="btn" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faListAlt} size="2xl" />
        </button>
        <h2 className="text-center mb-4">Todo List</h2>
        <CardList />
      </div>
    </div>
  );
};

export default Home;
