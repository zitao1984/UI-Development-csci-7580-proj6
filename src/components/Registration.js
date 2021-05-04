import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";
import { LOGIN_STATE } from "../redux/stateConstants";

let editingBegun = false;

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginState = useSelector((state) => state.login);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(registerUser(username, password));
    clearForm();
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleRegister();
    }
  };

  const clearForm = () => {
    editingBegun = false;
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (loginState.status == LOGIN_STATE.LOGGED_IN) {
      history.push("/");
    }
  });

  return (
    <>
      <div id="bg-login">
        <div className="outer-box-login">
          <h1 className="welcome-title-signup">Create Account </h1>
          <p className="has-account" style={{ color: "grey" }}>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
          <div className="row">
            <div className="col-12 col-sm-1">
              <label htmlFor="username" className="form-label sr-only"></label>
            </div>
            <div className="col-9">
              <input
                type="text"
                id="username"
                name="username"
                className="form-control "
                value={username}
                placeholder="Username"
                onChange={(e) => {
                  editingBegun = true;
                  setUsername(e.target.value);
                }}
                onKeyUp={(e) => handleKeyPress(e)}
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-12 col-sm-1">
              <label htmlFor="password" className="form-label"></label>
            </div>
            <div className="col-9">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  editingBegun = true;
                  setPassword(e.target.value);
                }}
                onKeyUp={(e) => handleKeyPress(e)}
              />
            </div>
          </div>

          {!editingBegun && loginState.status === LOGIN_STATE.REGISTER_FAIL && (
            <div className="alert alert-danger">Something went wrong!</div>
          )}

          {!editingBegun && loginState.status === LOGIN_STATE.NETWORK_ERROR && (
            <div className="alert alert-danger">
              Unable to connect to the server. Please check your internet
              connection.
            </div>
          )}
          {!editingBegun && loginState.status === LOGIN_STATE.REGISTER_EXISTED && (
            <div className="alert alert-danger">
              This username is not availble, please pick another one!
            </div>
          )}
          <div className="row">
            <div className="col">
              <button className="play-btn" onClick={handleRegister}>
                <strong>Register</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registration;
