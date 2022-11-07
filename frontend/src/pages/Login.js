import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/Login.module.css";
// import style from "../assets/css/Form.module.css";

const Login = () => {
  return (
    <div className={`${styles["wrapper"]} ${styles["bg"]}`}>
      <div className={`${styles["isi"]} px-3 py-5`}>
        <h3 className={`fw-bold`}>Todo App</h3>
        <p className={`${styles["secondary"]}`}>Login</p>
        {/* {invalid && (
          <div class="alert alert-danger" role="alert">
            {invalid}
          </div>
        )} */}
        <form>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              required
              type="email"
              class={`form-control`}
              //   onChange={(e) => {
              //     setEmail(e.target.value);
              //     setError(false);
              //   }}
              placeholder="Identifier"
              aria-label="Identifier"
              aria-describedby="basic-addon1"
            />
          </div>
          {/* {error === "Email" && <p className={`${style["invalid-text"]}`}>Email wajib diisi</p>}
          {loading ? (
            <button className={`btn ${styles["btn-login"]} px-4`} type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <button onClick={handleLogin} className={`btn ${styles["btn-login"]} px-4`}>
              Login
            </button>
          )} */}
          <button className={`btn ${styles["btn-login"]} px-4`}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
