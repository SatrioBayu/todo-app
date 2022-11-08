import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, fetchList, addList } from "../redux";
import { useState } from "react";
import CardList from "../components/CardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(fetchUser(localStorage.getItem("token")));
    dispatch(fetchList(localStorage.getItem("token")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
    };
    try {
      dispatch(addList(localStorage.getItem("token"), data));
      setTitle("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="main">
      <div class="container">
        {state.user.user && state.list.list && (
          <>
            <h1>Halo {state.user.user.data.data.noIdentifier}</h1>
            <h2 className="text-center mb-3">Todo List</h2>
            <CardList />
            <form onSubmit={handleSubmit}>
              <label htmlFor="exampleInputEmail1" class="form-label">
                New List
              </label>
              <div class="input-group mb-3">
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" placeholder="Exercise" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <button type="submit" class="input-group-text">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
            </form>
            <button onClick={handleLogout} className="btn btn-primary">
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
