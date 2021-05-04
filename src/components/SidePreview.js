import Search from "./Search";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronRight,
  faChevronLeft,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import ChatPreview from "./ChatPreview";
import Conversation from "./Conversation";
import "../styles/conversation.css";
import { Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import CreateNewChat from "./CreateNewChat";
import { LOGIN_STATE } from "../redux/stateConstants";
import firebase from "../fbConfig";
import { populateChats, getUsers } from "../redux/actions.js";

const SidePreview = () => {
  const [search, setSearch] = useState("");
  const [addByCode, setAddByCode] = useState(false);
  const chatState = useSelector((state) => state.chats);
  const messageState = useSelector((state) => state.messages);
  const loginState = useSelector((state) => state.login);
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.login.user);
  const myChat = chatState.chats;
  const [currentChat, setCurrentChat] = useState();
  const [usernames, setUsernames] = useState([]);
  const [displaySide, setDisplaySide] = useState(true);

  let param = useParams();

  const dispatch = useDispatch();

  let currentUserChat = myChat.filter((obj) => {
    return obj.participants.includes(currentUser.id);
  });

  // const [selectedChat, setSelectedChat] = useState(currentUserChat[0]);
  // Returns current chat Object by Id
  const getChatByChatId = (chatId) => {
    const chat = chatState.chats.find((chat) => chat.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const searchName = (text) => {
    if (text.length > 0) {
      const selectedChat = currentUserChat.filter((obj) => {
        return obj.chatName === text;
      });
      return selectedChat;
    } else {
      return currentUserChat;
    }
  };

  useEffect(() => {
    let chatId = param.cid;
    getChatByChatId(chatId);
  }, [param]);

  useEffect(() => {
    console.log('trying to add new chat')
    dispatch(getUsers())
    const database = firebase.firestore();
    const unsubscribe = database
      .collection("chats")
      .onSnapshot((querySnapshot) => {
        let chats = [];
        querySnapshot.forEach((doc) => {
          chats.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(populateChats(chats));
      });
    return () => {
      unsubscribe();
    };
  }, [chatState.chats.length]);

  return (
    <>
      {loginState.status === LOGIN_STATE.LOGGED_IN ? (
        <div className="container-fluid">
          <div className="row">
            {displaySide ? (
              <div className="col-md-2 col-xl-2 px-sm-2 bg-light">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 container-chat sidebar">

                  <Link to="/" >

                    <button className="btn btn-primary home-button">
                      <FontAwesomeIcon icon={faHome} /></button>
                  </Link>

                  <button
                    onClick={() => setDisplaySide(!displaySide)}
                    className="btn btn-primary m-2 d-xs-block"
                  >
                    <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <p  className="d-block d-sm-block d-md-none">Go to Messages</p>
                    </span>
                  </button>


                  <a className=" d-flex align-items-center pb-3 text-dark text-decoration-none p-0">
                    <span className="fs-5 ">Hello {currentUser.username}!</span>
                  </a>

                  <div className="search-container">
                    <Search
                      placeholder="Search chat name"
                      submitSearch={setSearch}
                    />
                  </div>
                  <div className="preview-window">
                    <h5 className={"text-left"}>Your chats</h5>
                    <Space direction="vertical">
                      {searchName(search).map((chat, id) => {
                        return (
                          <Link to={`${chat.id}`}>
                            <ChatPreview
                              chat={chat}
                              id={id}
                              users={users}
                            // selected={setSelectedChat}
                            />
                          </Link>
                        );
                      })}
                    </Space>
                  </div>

                  <div className="d-flex flex-row-reverse">
                    <div className="p-3">
                      <Button
                        variant="primary"
                        onClick={() => setAddByCode(true)}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </Button>
                      <CreateNewChat show={addByCode} onHide={setAddByCode} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-sm-1 align-items-left align-items-sm-start px-3 pt-2 text-white ">
                <Link to="/" >
                  <button className="btn btn-primary m-2 home-button">
                    <FontAwesomeIcon icon={faHome} /></button>
                </Link>
                <button
                  onClick={() => setDisplaySide(!displaySide)}
                  className="btn btn-primary m-2 "
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>

              </div>

            )}
            {displaySide ? (
              // <div className="col-10 d-none d-md-block">
              <div className="col-10 d-none d-md-block d-xl-block">
                {currentUserChat.length === 0 ? (
                  ""
                ) : (
                  <Conversation
                    currentUser={currentUser}
                    // allMessagesForChat={allMessagesForChat}
                    currentChat={currentChat}
                    usernames={usernames}
                  />
                )}
              </div>
            ) : (
              <div className="col-10">
                {currentUserChat.length === 0 ? (
                  ""
                ) : (
                  <Conversation
                    currentUser={currentUser}
                    // allMessagesForChat={allMessagesForChat}
                    currentChat={currentChat}
                    usernames={usernames}
                  />
                )}
              </div>
            )}
            {/* </div> */}
          </div>
        </div>
      ) : (
        (window.location.href = "/")
      )}
    </>
  );
};

export default SidePreview;
