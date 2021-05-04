import { Link } from "react-router-dom";
import { LOGIN_STATE } from "../redux/stateConstants";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Button, message, Space, Avatar } from "antd";
import {logout, resetOnboarding} from "../redux/actions";
import { getUsers } from "../redux/actions";
import JoinByCode from "./JoinByCode";
import { useState } from "react";
import OnboardingSlides from "./OnboardingSlides";

const LandingPage = () => {
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const onboarding = useSelector((state) => state.login.user.onboardingStatus);
  const usersState = useSelector((state) => state.users);
  const [modalShow, setModalShow] = useState(false);
  console.log("STATE", onboarding);

  const logOut = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        Hello {loginState.user && loginState.user.username}!
      </Menu.Item>
      <Menu.Item key="2" onClick={logOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Space wrap>
      {/* {console.log("user in landing page", loginState.user)}
      {console.log("state in landing page", loginState.status)} */}
      {/* {console.log('all users', usersState.users)} */}

      <div className="hero-image">
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <a className="navbar-brand " href="#">
                <p className="display-6 ">Chat App |</p>
              </a>
              <div id="navbarNav">
                <ul className="navbar-nav">
                  {loginState.status === LOGIN_STATE.LOGGED_IN && (
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        href="#"
                        tabIndex="-2"
                        aria-disabled="true"
                      >
                        <button
                          className="btn btn-warning"
                          type="submit"
                          onClick={() => setModalShow(true)}
                        >
                          Join Group by Code
                        </button>
                        <JoinByCode
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </a>
                    </li>
                  )}
                  {loginState.status === LOGIN_STATE.LOGGED_IN ? (
                    <Dropdown overlay={menu}>
                      <div className="avatar-home">
                        <Avatar
                          style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                          }}
                          size="large"
                        >
                          {loginState.user &&
                            loginState.user.username[0].toUpperCase()}
                        </Avatar>
                      </div>
                    </Dropdown>
                  ) : (
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        href="#"
                        tabIndex="-1"
                        aria-disabled="true"
                      >
                        <Link
                          to="/signin"
                          className="btn btn-outline-dark"
                          style={{ color: "white" }}
                        >
                          Login
                        </Link>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-text">
          <h1 className="fw-bold display-1">Welcome to the chat app</h1>
          <p>Connect with your friends and family</p>

           {loginState.status === LOGIN_STATE.LOGGED_IN && (<>
              {onboarding ?
            <Link to="/chats" className="btn btn-light">
              Go to My Chat
            </Link>
               : <>
                    <Link to="/chats" className="btn btn-light mx-4">
                    Go to My Chat
                  </Link>
                    <Link to="/onboarding" className="btn btn-light mx-4">
                      Visit The Tutorial
                    </Link>
                  </>

              }</>
          )}
        </div>
      </div>
    </Space>
  );
};
export default LandingPage;
