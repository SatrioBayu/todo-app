import { useSelector, useDispatch } from "react-redux";
import { deleteList, editList } from "../redux";
import ModalEdit from "./ModalEdit";

const CardList = () => {
  const lists = useSelector((state) => state.list.list.data.data);
  const dispatch = useDispatch();

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
    <div class="row row-cols-1 row-cols-md-2 g-4">
      {lists &&
        lists.map((list) => (
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
            <ModalEdit data={list} onEditSave={handleEdit} />
          </div>
        ))}
    </div>
  );
};

export default CardList;
