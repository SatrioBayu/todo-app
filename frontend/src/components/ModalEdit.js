import { useState } from "react";

const ModalEdit = (props) => {
  const [title, setTitle] = useState(props.data.title);

  const handleEdit = (id) => {
    props.onEditSave(id, title);
  };

  return (
    <div class="modal fade" id={`exampleModal-${props.data.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" placeholder="Exercise" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={(e) => handleEdit(e.target.value)} value={props.data.id} type="button" class="btn btn-success" data-bs-dismiss="modal">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
