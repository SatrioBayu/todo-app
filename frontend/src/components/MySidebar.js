import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faRightFromBracket, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, fetchAllList, addList, logout } from "../redux";

const MySideBar = () => {
  // Local State
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  // Access State From React-redux
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser(localStorage.getItem("token")));
    dispatch(fetchAllList(localStorage.getItem("token")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title,
    };
    try {
      await dispatch(addList(localStorage.getItem("token"), data));
      setLoading(false);
      setTitle("");
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logout(null));
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {state.user.user && state.lists.lists && (
        <Sidebar breakPoint="sm" backgroundColor="rgba(218, 223, 225)">
          <Menu>
            <a href="/">
              <MenuItem>
                <FontAwesomeIcon icon={faUser} />
                &nbsp; {state.user.user.data.data.noIdentifier}
              </MenuItem>
            </a>
            {state.lists.lists.data.data.map((data) => (
              <a href={`/list/${data.id}`} key={data.id}>
                <MenuItem>
                  <FontAwesomeIcon icon={faList} />
                  &nbsp; {data.title}
                </MenuItem>
              </a>
            ))}
            <MenuItem>
              <form onSubmit={handleSubmit}>
                <div class="input-group">
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    class="form-control"
                    placeholder="New List"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  {loading ? (
                    <button disabled class="input-group-text">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                  ) : (
                    <button type="submit" class="input-group-text">
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                  )}
                </div>
              </form>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} className="fa-rotate-180" />
              &nbsp; Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </>
  );
};

export default MySideBar;
