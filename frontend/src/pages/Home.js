import CardList from "../components/CardList";
import MySideBar from "../components/MySidebar";
import { useProSidebar } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { toggleSidebar } = useProSidebar();

  return (
    <div className="main">
      <MySideBar />
      <div class="container">
        <button className="btn toggler" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faListAlt} size="2xl" />
        </button>
        <CardList />
      </div>
    </div>
  );
};

export default Home;
