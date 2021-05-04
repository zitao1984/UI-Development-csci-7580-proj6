import {
  COMPLETE_ONBOARDING,
  LOGIN_SUCCESS,
  INVALID_LOGIN,
  LOGOUT,
  LOGIN_NETWORK_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  POPULATE_USERS,
  POPULATE_CHATS,
  POPULATE_MESSAGES,
  STORE_FILES,
  LOADING,
  LOADING_SUCCESS,
  POPULATE_FILES,
  REGISTER_EXISTED,
  DELETE_CHATS,
  ADD_PEOPLE_TO_CHAT,
  POPULATE_MESSAGES_BY_ID,
  DELETE_PEOPLE_FROM_CHAT
} from "./actionConstants";
import store from "./store";
import firebase from "../fbConfig";

const database = firebase.firestore();

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
  },
});

export const loginFail = () => ({
  type: INVALID_LOGIN,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFail = () => ({
  type: REGISTER_FAIL,
});

export const registerExistedUser = () => ({
  type: REGISTER_EXISTED,
});

export const loginNetworkError = () => ({
  type: LOGIN_NETWORK_ERROR,
});

export const logout = () => ({
  type: LOGOUT,
  payload: {
    user: {
      onboardingStatus: false,
    },
  },
});

export const storeFiles = (files) => ({
  type: STORE_FILES,
  payload: {
    files,
  },
});
// USERS
export const validateUser = (username, password) => {
  return (dispatch) => {
    database
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
          const user = {
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            username: doc.data().username,
            onboardingStatus: doc.data().onboardingStatus,
          };
          {
            console.log("user that logged in ", user);
          }
          dispatch(loginSuccess(user));
          console.log("yay logged in success", store.getState());
        } else {
          console.log("login was not successful");
          dispatch(loginFail());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginNetworkError());
      });
  };
};

const checkUser = (username) => {
  return checkIfUsernameExist(username);
};
export const registerUser = (username, password) => {
  return async (dispatch) => {
    let result;

    result = await checkUser(username);

    if (!result) {
      console.log("2");
      database
        .collection("users")
        .add({
          // id: makeid(5),
          onboardingStatus: false,
          username: username,
          password: password,
        })
        .then((doc) => {
          let id = doc.id;
          dispatch(getUserById(id));
          dispatch(registerSuccess());
        })
        .catch((e) => {
          console.log("Unable to register new user");
          dispatch(registerFail());
        });
    } else {
      console.log("This username has already existed");
      dispatch(registerExistedUser());
    }
  };
};


export const checkIfUsernameExist = (username) => {
  return database
    .collection("users")
    .get()
    .then((querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const result = users.find((user) => user.username === username);
      return result;
    });
};
export const getUserById = (userId) => {
  return (dispatch) => {
    database
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const user = {
            id: doc.id,
            ...doc.data()}
          console.log("Document data:", user);
          dispatch(loginSuccess(user));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return null;
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        return null;
      });
  };
};

export const completeOnboarding = () => {
  // Gets the current user from the store. Note the store import above.
  const userToChange = store.getState().login.user;
  // console.log(userId)
  // userCompletedOnboarding(userId);
  return {
    type: COMPLETE_ONBOARDING,
    payload: {
      user: {
        firstname: userToChange.firstname,
        id: userToChange.id,
        lastname: userToChange.lastname,
        onboardingStatus: true,
        username: userToChange.username,
      },
    },
  };
};
export const resetOnboarding = () => {
  // Gets the current user from the store. Note the store import above.
  const userToChange = store.getState().login.user;
  // console.log(userId)
  // userCompletedOnboarding(userId);
  return {
    type: COMPLETE_ONBOARDING,
    payload: {
      user: {
        firstname: userToChange.firstname,
        id: userToChange.id,
        lastname: userToChange.lastname,
        onboardingStatus: false,
        username: userToChange.username,
      },
    },
  };
};
export const userCompletedOnboarding = () => {
  const userId = store.getState().login.user.id;
  console.log(userId);
  return async (dispatch) => {
    const docRef = database.collection("users").doc(userId);
    console.log("DOC REF", docRef);
    await docRef.update({ onboardingStatus: true });
    dispatch(completeOnboarding());
  };
};

export const populateUsers = (users) => ({
  type: POPULATE_USERS,
  payload: {
    users,
  },
});

export const getUsers = () => {
  return (dispatch) => {
    database
      .collection("users")
      .limit(25)

      .get()
      .then((querySnapshot) => {
        let users = [];

        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(populateUsers(users));
      })
      .catch((error) => console.log(error));
  };
};

export const getUsernameByUserId = (userId, users) => {
  const result = users.find((user) => user.id === userId);
  if (result) {
    return result.username;
  }
};

// CHATS
export const populateChats = (chats) => ({
  type: POPULATE_CHATS,
  payload: {
    chats,
  },
});

export const getChats = () => {
  return (dispatch) => {
    database
      .collection("chats")
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let chats = [];
        querySnapshot.forEach((doc) => {
          chats.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(populateChats(chats));
      })
      .catch((error) => console.log(error));
  };
};


// MESSAGES

export const populateMessages = (messages) => ({
  type: POPULATE_MESSAGES,
  payload: {
    messages,
  },
});

export const populateMessagesById = (messages) => ({
  type: POPULATE_MESSAGES_BY_ID,
  payload: {
    currentMessages: messages
  },
});


export const getMessages = (chatID) => {
  console.log("ACTIONS GET MESSAGES")
  return (dispatch) => {
    database
      .collection("chats")
        .doc(chatID)
        .collection("messages")
        .onSnapshot((querySnapshot) => {
            if (querySnapshot.size > 0) {
              let messages = [];
              querySnapshot.forEach(doc => {
                messages.push({
                  id: doc.id,
                  ...doc.data(),
                })  ;

              });

                dispatch(populateMessages(messages));
            }
                })

}};




export const getMessagesById = (chatId, messages) => {
  return (dispatch) => {
    const res = messages.filter(message => message.chatId === chatId)
    console.log("before", res)
  dispatch(populateMessagesById(res))
  
  }
};


export const addMessages = (
  chatId,
  content,
  fileName,
  fileUrl,
  participants,
  sender,
  timestamp,
  type
) => {
  return (dispatch) => {
    const messages = store.getState().messages;
    database
      .collection("chats")
        .doc(chatId).collection("messages")
      .add({
        chatId: chatId,
        content: content,
        fileName: fileName,
        fileUrl: fileUrl,
        participants: participants,
        sender: sender,
        timestamp: timestamp,
        type: type,
      })
      .then((newDoc) => {
        console.log(messages);
        let newMessage = messages.messages.concat([
          {
            id: newDoc.id,
            chatId: chatId,
            content: content,
            fileName: fileName,
            fileUrl: fileUrl,
            participants: participants,
            sender: sender,
            timestamp: timestamp,
            type: type,
          },
        ]);
        dispatch(populateMessages(newMessage));
      })
      .catch((error) => {
        console.log("Could not add the message");
      });
  };
};

// FILES
export const addFile =   (chatId,
    content,
    fileName,
    fileUrl,
    participants,
    sender,
    timestamp,
    type )=> {
  const files = store.getState().files;
  return (dispatch) => {
    database
        .collection("chats")
        .doc(chatId).collection("messages")
      .add({
        chatId: chatId,
        content: content,
        fileName: fileName,
        fileUrl: fileUrl,
        participants: participants,
        sender: sender,
        timestamp: timestamp,
        type: type,
      })
      .then((newDoc) => {
        let newFile = files.files.concat([
          {
            chatId: chatId,
            content: content,
            fileName: fileName,
            fileUrl: fileUrl,
            participants: participants,
            sender: sender,
            timestamp: timestamp,
            type: type,
          },
        ]);

        dispatch(storeFiles(newFile));
      })
      .catch((error) => {
        console.log("Error adding file:", error);
      });
  };
};

// LOADING
export const setLoading = () => ({
  type: LOADING,
});

export const setLoadingSuccess = () => ({
  type: LOADING_SUCCESS,
});

export const getFileByChatId =(chatId)=> {
  return (dispatch) => {
    let messages = store.getState().messages.messages
    let files = []
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].fileName != "" ||  messages[i].fileURl != "") {
        files.push(messages[i])
      }
    }
    dispatch(populateFiles(files))
  }
}



export const populateFiles = (files) => {
  let temp = files.sort((a, b) => b.publication - a.publication);
  files = temp;
  console.log(files);

  return {
    type: POPULATE_FILES,
    payload: {
      files: files,
    },
  };
};

export const addChat = (chat, chatID) => {
  const chats = store.getState().chats.chats;
  return (dispatch) => {
    database
      .collection("chats")
      .doc(chatID)
      .set({
        chatName: chat.chatName,
        participants: chat.participants,
        timestamp: chat.timestamp,
      })
      .then((chat) => {
        chats.push({
          id: chatID,
          chatName: chat.chatName,
          participants: chat.participants,
          timestamp: chat.timestamp,
        });
        
        dispatch(populateChats(chats));
      })
      .catch((error) => console.log(error));
  };
};

export const addPeopleToChat = (chats) => {
  return {
    type: ADD_PEOPLE_TO_CHAT,
    payload: {
      chats: chats,
    },
  };
};

export const addUserToChat = (chatID, participants) => {
  const chats = store.getState().chats.chats;
  return (dispatch) => {
    database
      .collection("chats")
      .doc(chatID)
      .update({
        participants: participants,
      })
      .then(() => {
        const chatsIndex = chats.findIndex((obj) => obj.id === chatID);
        chats[chatsIndex].participants = participants;
        dispatch(addPeopleToChat(chats));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        return null;
      });
  };
};

export const deleteChatsFromLocal = (chats) => ({
  type: DELETE_CHATS,
  payload: {
    chats,
  },
});

export const deleteChat = (chatId) => {
  let chats = store.getState().chats.chats;
  console.log("here");
  return (dispatch) => {
    database
      .collection("chats")
      .doc(chatId)
      .delete()
      .then(() => {
        chats = chats.filter((obj) => {
          return obj.id !== chatId;
        });
        dispatch(deleteChatsFromLocal(chats));
      })
      .catch((error) => console.log(error));
  };
};

export const removePeopleFromChat = (chats) => {
  return {
    type: DELETE_PEOPLE_FROM_CHAT,
    payload: {
      chats: chats,
    },
  };
};

export const deletePeopleFromChat = (chatID, participants) => {
  const chats = store.getState().chats.chats;
  return (dispatch) => {
    database
        .collection("chats")
        .doc(chatID)
        .update({
          participants: participants,
        })
        .then(() => {
          const chatsIndex = chats.findIndex((obj) => obj.id === chatID);
          chats[chatsIndex].participants = participants;
          dispatch(removePeopleFromChat(chats));
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          return null;
        });
  };
};
