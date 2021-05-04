import Message from "./Message";
import "../styles/conversation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  getMessages,
  getFiles,
  getUsernameByUserId,
  addMessages,
  populateMessagesById,
  getMessagesById,
  deleteChat,
  getFileByChatId,
  populateMessages
} from "../redux/actions";
import {
  faPaperPlane,
  faUpload,
  faCheck,
  faTimes,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../fbConfig";
import { PageHeader, Tooltip, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addFile } from "../redux/actions";
import Gallery from "./Gallery";
import { Link, useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Conversation = (props) => {
  // STATES FROM REDUX
  const fileState = useSelector((state) => state.files);
  const chatState = useSelector((state) => state.chats);
  const userState = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.login.user);
  const messageState = useSelector((state) => state.messages);

  // LOCAL STATES
  const [usernames, setUsernames] = useState([]);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [filePicked, setFilePicked] = useState(false);
  const [message, setMessage] = useState("");
  const [galleryToggle, setGalleryToggle] = useState(false);
  const [filesForChat, setFilesForChat] = useState([]);
  const [allMessagesForChat, setMessagesForChat] = useState([]);
  const [messageLength, setMessageLength] = useState(
    messageState.messages.length
  );
  const user = useSelector((state) => state.login.user);

  const params = useParams();
  const chatId = params.cid;
  const storage = firebase.storage();
  const dispatch = useDispatch();
  //  console.log("test")

  const getListOfUsername = (participantsIds) => {
    let usernames = [];

    participantsIds.map((participantId) => {
      const user = getUsernameByUserId(participantId, userState.users);
      usernames.push(user);
    });
    setUsernames(usernames);
  };

  const getFilesForChat = (chatId) => {
    
    const files = [];
    messageState.messages.map((file) => {
      if (file.chatId === chatId) {
        if (file.fileUrl.length !== 0) {
          files.push(file);
        }
      }
    });
    console.log("FILES", files)
    setFilesForChat(files);
  };

  const sendMessage = (e) => {
    if (file !== "") {
      // dispatch(
      //   addMessages(
      //     chatId,
      //     message,
      //     file.name,
      //     fileUrl,
      //     usernames,
      //     currentUser.id,
      //     new Date().getTime(),
      //     file.type
      //   )
      // );
      dispatch(
        addFile(
          chatId,
          message,
          file.name,
          fileUrl,
          usernames,
          currentUser.id,
          new Date().getTime(),
          file.type
        )
      );
    } else {
      dispatch(
        addMessages(
          chatId,
          message,
          "",
          "",
          usernames,
          currentUser.id,
          new Date().getTime(),
          ""
        )
      );
    }
    e.preventDefault();
    clearForm();
  };

  const getMessageForChatById = (chatId) => {
    const messages = messageState.messages.filter(
      (message) => message.chatId === chatId
    );
    setMessagesForChat(messages);

    // replace to get by param later
  };

  const pickFile = (files) => {
    setFile(files);
    setMessageLength(file.name)
    setFilePicked(true);
  };
  const uploadFile = () => {
    let url = "";
    const uploadFile = storage.ref(`/files/${file.name}`).put(file);
    uploadFile.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setFileUrl(fireBaseUrl);
          });
      }
    );

    {
      console.log(url);
    }
  };

  useEffect(() => {
    // dispatch(getMessages(chatId))
    // dispatch(getFileByChatId(chatId))

    getFilesForChat(chatId);
    // dispatch(getMessagesById(chatId, messageState.messages))
    setGalleryToggle(false);
  }, [chatId, messageState.messages]);

  useEffect(() => {
    const database = firebase.firestore()
    const unsubscribe = database
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.size > 0) {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          dispatch(populateMessages(messages));
        }
      });
    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const scrollToBottom = () => {
    const messageWindow = document.getElementById("messageWindow")
    if (messageWindow) {
      const bottom = messageWindow?.scrollHeight - messageWindow?.clientHeight
      messageWindow.scrollTo(0, bottom)
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [messageState.messages]);


  const clearForm = () => {
    setFile("");
    setFilePicked("");
    setFileUrl("");
    setMessage("");
  };

  return (
    <div>
      {props.currentChat && (
        <div>
          <div>
            <div className="message-header mt-2">
              <PageHeader
                className="site-page-header bg-white"
                title={
                  props.currentChat.chatName !== ""
                    ? props.currentChat.chatName
                    : props.usernames.join(", ")
                }
                extra={[
                  <div className="message-header">
                    <h4> Chat Code: {props.currentChat.id}</h4>
                    {galleryToggle ? (
                      <Tooltip title="Hide Gallery">
                        <button
                          className="btn btn-primary float-end"
                          onClick={() => setGalleryToggle(!galleryToggle)}
                        >
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Show Gallery">
                        <button
                          className="btn btn-primary float-end"
                          onClick={() => setGalleryToggle(!galleryToggle)}
                        >
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                      </Tooltip>
                    )}
                  </div>,
                ]}
              />
            </div>

            <div className="px-3 py-5 chat-box bg-white" >
              {!galleryToggle ? (
                <div className="messageWindow" id={"messageWindow"}>
                  {messageState.messages
                    .filter((message) => message.chatId === chatId)
                    .sort((a, b) => {
                      return new Date(a.timestamp) - new Date(b.timestamp);
                    })
                    .map((item) => {
                      return <Message message={item} />;
                    })}
                </div>
              ) : (
                <div className="messageWindow">
                  {console.log("GALLERY", filesForChat)}
                  <Gallery files={filesForChat} />
                </div>
              )}

              {/* INPUT FORM  */}
              <form></form>
              <form action="#" className="bg-light">
                <div>
                  <div className="upload">
                    <span>
                    <Tooltip title="Click check to confirm upload after choosing a file or x to cancel">
                      <label htmlFor="fileupload">
                        <FontAwesomeIcon icon={faUpload} />
                        <span id="file-name">{file.name}</span>
                      </label>
                      </Tooltip>
                      <input
                        type="file"
                        id="fileupload"
                        // onChange={e => setFile(e.target.files[0])}
                        onChange={(e) => pickFile(e.target.files[0])}
                        onClick={(e) => (e.target.value = null)}
                      />
                    </span>
                    <span className="upload">
                      {filePicked ? (
                        <div>
                          <FontAwesomeIcon
                            className="fa-sm upload-btn upload-check"
                            icon={faCheck}
                            onClick={() => {
                              uploadFile();
                              setFilePicked(false);
                              setMessage(file.name);
                            }}
                          />
                          <FontAwesomeIcon
                            className="fa-sm upload-btn upload-cancel"
                            icon={faTimes}
                            onClick={() => {
                              setFile("");
                              setFilePicked(false);
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Type a message"
                    aria-describedby="button-addon2"
                    class="form-control rounded-0 border-0 py-4 bg-light"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      disabled={filePicked}
                      id="button-addon2"
                      type="submit"
                      className="btn btn-link"
                      onClick={(e) => sendMessage(e)}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
