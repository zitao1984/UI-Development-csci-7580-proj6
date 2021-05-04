import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../redux/actions";
import { LOGIN_STATE } from "../redux/stateConstants";
import { PageHeader } from "antd";
import { useHistory, Link } from "react-router-dom";


let editingBegun = false;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginState = useSelector((state) => state.login);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(validateUser(username, password));
    clearForm();
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleLogin();
    }
  };

  const clearForm = () => {
    editingBegun = false;
    setUsername("");
    setPassword("");
  };

  useEffect(()=> {
    if (loginState.status == LOGIN_STATE.LOGGED_IN) {
      history.push("/")
    }
  })

  return (
    <>
      <div id="bg-login">
        <PageHeader
          ghost={false}
          onBack={() => history.push("/")}
          subTitle="Back to Homepage"
        />
        <div className="outer-box-login">
          <h1 className="welcome-title">Welcome Back,</h1>
          
          <div className="row">
            <div className="col-12 col-sm-2 ">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
            </div>
            <div className="col-9">
              <input
                type="text"
                id="username"
                name="username"
                className="form-control "
                value={username}
                onChange={(e) => {
                  editingBegun = true;
                  setUsername(e.target.value);
                }}
                onKeyUp={(e) => handleKeyPress(e)}
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-12 col-sm-2">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
            </div>
            <div className="col-9">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  editingBegun = true;
                  setPassword(e.target.value);
                }}
                onKeyUp={(e) => handleKeyPress(e)}
              />
            </div>
          </div>
          {!editingBegun && loginState.status === LOGIN_STATE.INVALID_LOGIN && (
            <div className="alert alert-danger">
              Invalid username / password! Please try again.
            </div>
          )}
          {!editingBegun && loginState.status === LOGIN_STATE.NETWORK_ERROR && (
            <div className="alert alert-danger">
              Unable to connect to the server. Please check your internet
              connection.
            </div>
          )}
          <div className="row">
            <div className="col">
              <button className="play-btn" onClick={handleLogin}>
                <strong>Login</strong>
              </button>
            </div>
          </div>
          <p className="register-sign" style={{ color: "grey" }}>
            Don't have an account? <Link to="/signup">Register now </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
