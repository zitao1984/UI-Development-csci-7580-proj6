import { useSelector } from "react-redux"; // Automatically passes the store to all child components
import "../styles/styles.css";
import LandingPage from "../components/LandingPage";
import Registration from "../components/Registration.js";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import "antd/dist/antd.css";
import Conversation from "../components/Conversation";
import "../styles/conversation.css";
import "../styles/chatWindow.css";
import SidePreview from "../components/SidePreview";
import {getChats, getFiles, getMessages, getUsers} from "../redux/actions";
import OnboardingSlides from "../components/OnboardingSlides";


const App = () => {
  const usersState = useSelector((state) => state.users);
  const chatState = useSelector((state) => state.chats)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('calling from app')
    dispatch(getUsers());
    dispatch(getChats());

  },[])
  
  return (
    
    <Router>
      {/* {console.log('all chats', chatState)} */}
      <Switch>
        <Route path="/signup">
          <Registration />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        {/* Temporary route to chat for testing*/}
        <Route path={["/onboarding"]}>
          <OnboardingSlides/>
        </Route>
        <Route path={["/:cid"]}>
          <SidePreview />
        </Route> 
        <Route path={["/chats"]}>
          <SidePreview />
        </Route>
         <Route path="/side">
          <SidePreview />
        </Route>
        <Route path={["/", "/home"]}>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
