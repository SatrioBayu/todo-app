import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, fetchList, addList, deleteList, editList } from "../redux";
import { useState } from "react";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");

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

  const handleEdit = async (id) => {
    const data = {
      title: editTitle,
    };
    dispatch(editList(id, localStorage.getItem("token"), data));
  };

  const handleDelete = async (id) => {
    dispatch(deleteList(id, localStorage.getItem("token")));
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
            <h2 className="text-center">Todo List</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">
                  List
                </label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" placeholder="Exercise" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <button type="submit" class="btn btn-primary">
                Add
              </button>
            </form>
            <br />
            <div class="row row-cols-1 row-cols-md-2 g-4">
              {state.list.list.data.data.length > 0 &&
                state.list.list.data.data.map((list) => (
                  <div class="col" key={list.id}>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{list.title}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div class="d-flex flex-column gap-2">
                          <button value={list.id} data-bs-toggle="modal" data-bs-target={`#exampleModal-${list.id}`} className="btn btn-warning">
                            Update
                          </button>
                          <button onClick={(e) => handleDelete(e.target.value)} value={list.id} className="btn btn-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="modal fade" id={`exampleModal-${list.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <form>
                            <div class="modal-header">
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="mb-3">
                                <label htmlFor="exampleInputEmail1" class="form-label">
                                  New List Title
                                </label>
                                <input
                                  required
                                  type="text"
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  class="form-control"
                                  placeholder="Exercise"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                              </button>
                              <button onClick={(e) => handleEdit(e.target.value)} value={list.id} type="button" class="btn btn-success" data-bs-dismiss="modal">
                                Save changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
