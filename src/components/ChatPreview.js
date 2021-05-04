const ChatPreview = (props) => {

  const peopleName = (list) => {
    
    const nameList = [];
    for (let i = 0; i < list.length; i++) {
      let user = props.users.filter(obj => {
        return obj.id === list[i]
      })
      if (user && user[0]) {
      nameList.push(user[0].username);

      }
    }
    return nameList;
  };

  const name = peopleName(props.chat.participants.slice(0, 2));

  return (

    <div
      className="card card-preview"
      key={props.id}
    >
      {console.log('users from props', props.users)}
     {console.log('2', props.chat.participants)} 
      <a className=" stretched-link " href>
        <h6 className="card-header ">Name: {props.chat.chatName}</h6>
        <div>
          <p className="card-title text-secondary text-center">
            {name.toString()} in the chat
          </p>
        </div>
      </a>
    </div>
  ); 
};
export default ChatPreview;
