
import {useState,useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import {useDispatch, useSelector} from "react-redux";
import { addUserToChat} from "../redux/actions";
import { Link, useParams } from "react-router-dom";

const JoinByCode = props =>{
    const currentUser = useSelector(state=>state.login.user)
    const currentChat =useSelector(state=>state.chats.chats)
    const[chatID,setChatID] = useState(
        {
            chatID:"",
            isValid:undefined
        })
    const dispatch = useDispatch()

    const uniqueChatCode = [...new Set(currentChat.map(item => item.id))];


    const updateChatID = event =>{
        setChatID({
            chatID: event.target.value,
            isValid: uniqueChatCode.includes(event.target.value)
        })
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    const onSubmit = () => {
        const joinedChat = currentChat.filter(obj => {
            return obj.id === chatID.chatID
        })
        joinedChat[0].participants.push(currentUser.id)
        const participants = joinedChat[0].participants.filter(onlyUnique)
        dispatch(addUserToChat(joinedChat[0].id,participants));
        clearForm();
        props.onHide(false)
    }

    const clearForm = () => {
        setChatID({
            chatID: "",
            isValid: undefined
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add to chat by code
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                                    type={"string"}
                                    valuse={chatID}
                                    onChange={e=>updateChatID(e)}
                                    required/>
                        <div className="invalid-feedback" style={chatID.isValid? {display: "none"}:{display:"block"} }>Cannot find this chat, try to check code  </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Link to={`${chatID.chatID}`}>
                <Button className="btn btn-primary" type="submit" disabled={!chatID.isValid}
                        onClick={onSubmit}>Join</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default JoinByCode