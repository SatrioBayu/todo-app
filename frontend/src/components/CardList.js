import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteList, editList } from "../redux";
import ModalEdit from "./ModalEdit";
import { fetchAllList } from "../redux";

const CardList = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllList(localStorage.getItem("token")));
  }, []);

  const handleDelete = async (id) => {
    dispatch(deleteList(id, localStorage.getItem("token")));
  };

  const handleEdit = async (id, title) => {
    const data = {
      title,
    };
    dispatch(editList(id, localStorage.getItem("token"), data));
  };

  return (
    <div class="row row-cols-1 row-cols-md-4 g-4 mb-3">
      {state.lists.lists &&
        state.lists.lists.data.data.map((list) => (
          <div class="col" key={list.id}>
            <div class="card h-100">
              <div class="card-body d-flex">
                <a href={`/list/${list.id}`} className="me-auto">
                  <h5 class="card-title">{list.title}</h5>
                </a>
                <button onClick={(e) => handleDelete(e.target.value)} value={list.id} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="card-footer">
                <button value={list.id} data-bs-toggle="modal" data-bs-target={`#exampleModal-${list.id}`} className="btn btn-warning">
                  Update
                </button>
                {/* <button onClick={(e) => handleDelete(e.target.value)} value={list.id} className="btn btn-danger">
                    Delete
                  </button> */}
              </div>
            </div>
            <ModalEdit data={list} onEditSave={handleEdit} />
          </div>
        ))}
    </div>
  );
};

export default CardList;
