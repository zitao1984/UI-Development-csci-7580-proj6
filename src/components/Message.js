import { message } from "antd";
import { useSelector } from "react-redux";
import "../styles/message.css";

const Message = (props) => {
  const loginState = useSelector((state) => state.login);
  const userState = useSelector((state) => state.users);
  const date = new Date(props.message.timestamp).toDateString()


  return (
    //   MESSAGE FROM SOMEONE ELSE


    <div>
      {/* {console.log("AAAAA", props.message)} */}
      {loginState.user.id === props.message.sender ? (

        <div className="media w-50 mb-3" style={{ marginLeft: "auto" }}>
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              {props.message.fileUrl !== "" && props.message.type === "image/jpeg" || props.message.type === "image/png"  ?
              
                 <a href={props.message.fileUrl} target="_blank" rel="noopener noreferrer">
                <img src={props.message.fileUrl}
                  alt={"Image uploaded by " + props.message.sender + " on "+  date} />
                    </a>
                
                : props.message.fileUrl !== "" ?
                    <p className="text-small mb-0 text-muted">
                      <a href={props.message.fileUrl}>
                      {props.message.fileName}
                      </a>
                    </p>
                    :
                ""
              }
              <p className="text-small mb-0 text-white">
                {props.message.content}
              </p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <p className="small text-muted">{date}</p>
            </div>
          </div>
        </div>

      ) : (
        <div className="row">
          <div className="col-1">
            <img
              alt="user"
              width="50"
              src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
            />
          </div>
          <div className="media w-50 mb-3">
            <div className="media-body ml-3">
              <div className="bg-light rounded py-2 px-3 mb-2">
                {props.message.fileUrl !== "" && props.message.type === "image/jpeg" || props.message.type === "image/png" ?
                 <a href={props.message.fileUrl} target="_blank" rel="noopener noreferrer">
                  <img src={props.message.fileUrl} 
                    alt={"Image uploaded by " + props.message.sender + " on " + date} />
                      </a>
                  : props.message.fileUrl !== "" ?
                    <p className="text-small mb-0 text-muted">
                      <a href={props.message.fileUrl}>
                      {props.message.fileName}
                      </a>
                    </p>
                    :
                    ""
                }
                <p className="text-small mb-0 text-muted">
                  {props.message.content}
                </p>
              </div>
              {/* {console.log("USERS", userState.users.filter(
                    (user) => user.id === props.message.sender)[0].username)
                  
                  } */}
              <p class="small text-muted">
               {userState.users.filter(
                    (user) => user.id === props.message.sender)[0].username} | {new Date(props.message.timestamp).toLocaleTimeString('en-US')} | {new Date(props.message.timestamp).toDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
