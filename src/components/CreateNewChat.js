import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addChat, getChats, getUsers } from "../redux/actions";

const CreateNewChat = (props) => {
  const currentUser = useSelector((state) => state.login.user);
  const userList = useSelector((state) => state.users.users);
  const currentChat = useSelector((state) => state.chats.chats);
  const [chatName, setChatName] = useState("");
  const [potentialName, setPotentialName] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [wrongSpelling, checkWrongSpelling] = useState(false);
  const uniqueChatCode = [...new Set(currentChat.map((item) => item.id))];

  const dispatch = useDispatch();

  const makeID = (length) => {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  };

  const makeUniqueID = (length) => {
    const result = makeID(length);
    if (!uniqueChatCode.includes(result)) {
      return result;
    } else {
      return makeUniqueID(length);
    }
  };

  useEffect(() => {
    checkWrongSpelling(checkParticipant(participants));
  }, [participants]);

  const onParticipantsInputChange = (event) => {
    setParticipants(event.target.value);
    // console.log(checkParticipant(participants))
  };

  const checkParticipant = (text) => {
    if (text.length > 0) {
      let list = text.split(",");
    //   console.log(list);
      for (let i = 0; i < list.length; i++) {
        const inviteUser = userList.filter((obj) => {
          return obj.username === list[i];
        });
        // console.log(inviteUser);
        if (inviteUser.length === 0) {
          return false;
        }
      }
      return true;
    }
    return true;
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const addParticipant = () => {
    // setTimeout(() => {
    //   // dispatch(getUsers())
    // }, 1000);
    console.log('currentUser', currentUser)
    console.log('userList', userList)

    const myUser = userList.filter(user=>user.username === currentUser.username)
    console.log('myUser', myUser)
    let result = [myUser[0].id];
    let nameList = [currentUser.username];
    if (participants.length > 0) {
      let list = participants.split(",");
    
      for (let i = 0; i < list.length; i++) {

        const inviteUser = userList.filter((obj) => {
          return obj.username === list[i];
        });
        result.push(inviteUser[0].id);
        nameList.push(list[i]);
      }
    }
    result = result.filter(onlyUnique);
    nameList = nameList.filter(onlyUnique);
    return [result, nameList];
  };

  const onSubmit = () => {
    const result = addParticipant();
    const chatID = makeUniqueID(6);
    let newChat = {};

    if (chatName.length === 0) {
      newChat = {
        chatName: result[1].slice(0, 5).toString(),
        participants: result[0],
        timestamp: new Date().getTime(),
      };
    } else {
      newChat = {
        chatName: chatName,
        participants: result[0],
        timestamp: new Date().getTime(),
      };
    }
    console.log('new chat', newChat)
    dispatch(addChat(newChat, chatID));
    clearForm();
    props.onHide(false);
  };

  const clearForm = () => {
    setChatName("");
    setParticipants([]);
    setPotentialName([]);
    checkWrongSpelling(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Chat name</Form.Label>
            <Form.Control
              type="text"
              valuse={chatName}
              onChange={(e) => setChatName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="user">
            <Form.Label>
              Add users by username (Multiple users should be separated by
              commas)
            </Form.Label>
            <Form.Control
              type="user"
              value={participants}
              onChange={(e) => onParticipantsInputChange(e)}
            />
            <div
              className="invalid-feedback"
              style={wrongSpelling ? { display: "none" } : { display: "block" }}
            >
              Cannot find this last person, try to check spelling{" "}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-primary"
          type="submit"
          disabled={!wrongSpelling}
          onClick={onSubmit}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateNewChat;
