import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/Login.module.css";
import style from "../assets/css/Form.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!identifier) {
      setInvalid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      identifier,
    };
    try {
      await dispatch(login(data));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={`${styles["wrapper"]} ${styles["bg"]}`}>
      <div className={`${styles["isi"]} px-3 py-5`}>
        <h3 className={`fw-bold`}>Todo App</h3>
        <p className={`${styles["secondary"]}`}>Login</p>
        {/* <p>{state}</p> */}
        {/* {invalid && (
          <div class="alert alert-danger" role="alert">
            {invalid}
          </div>
        )} */}
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              required
              type="text"
              className={`form-control`}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setInvalid(false);
              }}
              placeholder="Identifier"
              aria-label="Identifier"
              aria-describedby="basic-addon1"
            />
          </div>
          {invalid && <p className={`${style["invalid-text"]}`}>Identifier wajib diisi</p>}
          {loading ? (
            <button disabled className={`btn ${styles["btn-login"]} px-4`}>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Login ...
            </button>
          ) : (
            <button onClick={handleLogin} className={`btn ${styles["btn-login"]} px-4`}>
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
