# UI-Development-csci-7580-proj6  Chat APP

Note: Firebase doc is removed for secrurity reason

## User Handling

### Registration/Sign-In Process:
Users can click on the Sign In button of the app, which brings them to the sign-in page. If users had previously registered, they can just use the form to sign in. If they have not yet registered, a register link at the bottom of the sign-in form can be seen. Clicking on this link will bring the user to the Sign-Up page where they can create a new username and password.

### Onboarding Process:
Users are distinguished between users who have completed the tutorial for the app and those who have not.

## Features

### Chat Functionality
Chat groups can be created manually by clicking the add button in the left side bar or entering a chat code.
Manually adding a chat allows users to add other users to the group using their username.
Users have freedom to name their chat or not. If no chat name given, the app will use first 3 people’s usernames as chat name
For chat joining and chat creating related form filling, there is always a form control and verification before user submit
Clicking on each chat group displays the messages for each group. When user create a new chat, everyone who is invited can see the chat show up on their side bar.
Users can send text messages by typing on the text-area and clicking on the send (“plane”) button.
The user can search the chat by chat name

### Upload and Send Files
Users can also upload files image and doc files by clicking on the upload button above the message text box. They would have to confirm download by clicking on the check mark, or cancel it by clicking on the x mark. Files can be sent by sending a message once the filename appears on the text area.

### Gallery
Users are able to see image files contained in the group chat by clicking on the toggle button at the top right corner of the chat area. This will toggle the screen to chat screen or gallery screen.



## Limitations:

Users can only upload jpeg/png for images for the meantime.
Users cannot see other types of files in the gallery. The gallery is only used for image files in the group chat.
User cannot quit the chat
Users cannot recall the message

## Testing:

There are two accounts set up with some dummy data, ‘user1’ and ‘user0’, both with password ‘1234’.

## How to run?
run npm install to download the dependencies.

`run npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
