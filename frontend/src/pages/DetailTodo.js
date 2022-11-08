import { useEffect, useState } from "react";
import styles from "../assets/css/Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchListById, addTodo, deleteTodo, editTodo } from "../redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlusCircle, faListAlt } from "@fortawesome/free-solid-svg-icons";
import ModalEditTodo from "../components/ModalEditTodo";
import MySideBar from "../components/MySidebar";
import { useProSidebar } from "react-pro-sidebar";

const DetailTodo = () => {
  // Local State
  const [step, setStep] = useState("");
  const [loading, setLoading] = useState(false);
  // Id in URL
  const { id } = useParams();
  // Access State From React-redux
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const { toggleSidebar } = useProSidebar();

  useEffect(() => {
    dispatch(fetchListById(id, localStorage.getItem("token")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      listId: id,
      step,
    };
    try {
      await dispatch(addTodo(localStorage.getItem("token"), data));
      setStep("");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (todoId, step) => {
    const data = {
      listId: id,
      step,
    };
    try {
      await dispatch(editTodo(todoId, localStorage.getItem("token"), data));
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (todoId) => {
    await dispatch(deleteTodo(todoId, id, localStorage.getItem("token")));
  };

  return (
    <div className="main">
      <MySideBar />
      {list.loading ? (
        <div class="d-flex container flex-column align-items-center justify-content-center">
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {list.list && (
            <div className="container my-5">
              <button className="btn toggler" onClick={() => toggleSidebar()}>
                <FontAwesomeIcon icon={faListAlt} size="2xl" />
              </button>
              <div class="row">
                <div class="col">
                  <h3 className="text-center mb-4">{list.list.data.data.title}</h3>
                  {list.list.data.data && (
                    <div class="mb-3">
                      {list.list.data.data.Todos.length > 0 &&
                        list.list.data.data.Todos.map((todo) => (
                          <div class="input-group mb-3" key={todo.id}>
                            <input disabled type="text" value={todo.step} class="form-control" aria-describedby="emailHelp" />
                            <button data-bs-toggle="modal" data-bs-target={`#exampleModalTodo-${todo.id}`} class="input-group-text" id="basic-addon1">
                              <FontAwesomeIcon type="button" icon={faPenToSquare} />
                            </button>
                            <button onClick={() => handleDelete(todo.id)} class="input-group-text" id="basic-addon1">
                              <FontAwesomeIcon icon={faTrash} className={`${styles["trash"]}`} />
                            </button>
                            <ModalEditTodo data={todo} onEditSave={handleEdit} />
                          </div>
                        ))}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="exampleInputEmail1" class="form-label">
                      Todo Step
                    </label>
                    <div class="input-group mb-3">
                      <input
                        required
                        type="text"
                        value={step}
                        onChange={(e) => setStep(e.target.value)}
                        class="form-control"
                        placeholder="Exercise"
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
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailTodo;
