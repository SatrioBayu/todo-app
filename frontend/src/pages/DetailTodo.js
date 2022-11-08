import { useEffect } from "react";
import styles from "../assets/css/Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, fetchListById, addTodo, deleteTodo, editTodo } from "../redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalEditTodo from "../components/ModalEditTodo";

const DetailTodo = () => {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [step, setStep] = useState("");

  useEffect(() => {
    dispatch(fetchListById(id, localStorage.getItem("token")));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      listId: id,
      step,
    };
    try {
      dispatch(addTodo(localStorage.getItem("token"), data));
      setStep("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (todoId, step) => {
    const data = {
      listId: id,
      step,
    };
    try {
      dispatch(editTodo(todoId, localStorage.getItem("token"), data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId, id, localStorage.getItem("token")));
  };

  return (
    <div className="main">
      {list.list && (
        <div className="container mt-5">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/home">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {list.list.data.data.title}
              </li>
            </ol>
          </nav>
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
                  <input required type="text" value={step} onChange={(e) => setStep(e.target.value)} class="form-control" placeholder="Exercise" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <button type="submit" class="input-group-text">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailTodo;
