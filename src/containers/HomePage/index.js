import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { TextareaAutosize, Button,IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {
  getRealtimeConversations,
  getRealTimeUsers,
  updateMessage,
} from "../../actions";

// !styling
import "./style.css";

const User = (props) => {
  const { onClick } = props;

  return (
    <div
      onClick={() => onClick(props.item)}
      key={props.item.uid}
      className="displayName"
    >
      <div className="displayPic">
        <img
          src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
          alt=""
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 10px",
          width: "calc(100% - 80px)",
        }}
      >
        <span
          style={{ fontWeight: 500 }}
          className="users-name"
        >{`${props.item.firstName} ${props.item.lastName}`}</span>
        <span
          className={props.item.isOnline ? "onlineStatus" : "onlineStatus off"}
        ></span>
      </div>
    </div>
  );
};




const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  let unsubscribe;


  useEffect(() => {

    unsubscribe = dispatch(getRealTimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe; 
      })
      .catch((error) => {
        console.log("error:- ", error);
      });
  }, []);


  // component will Unmount
  useEffect(() => {

    return () => {
      //cleanup
      unsubscribe
        .then((f) => f())
        .catch((error) => console.log("Error", error));
    };
  }, []);



  const initChat = (user) => {
    console.log("chat Started");
   
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);
    // console.log(user);
    setOpenSidebar(false); 
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };

    

  const submitMessage = (e) => {
    console.log("Clicked");

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {

      dispatch(updateMessage(msgObj)).then(() => {

        dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: userUid }));

        var msgSec = document.querySelector(".messageSections");
        // window.scrollTo(0,msgSec.scrollHeight);
        setMessage("");
      });
    }

    // setMessage("");


    // console.log(msgObj);
  };

  const toggleSideBar = () => {
    if (!openSidebar) {
      setOpenSidebar(true);
    } else {
      setOpenSidebar(false);
    }

    console.log(openSidebar);
  };



  return (
    <>
      <Layout toggleSideBar={toggleSideBar}>
        <section className="container m-0 p-0"  style={{margin:"0 auto",}}>
          <div className={openSidebar ? "listOfUsers active" : "listOfUsers"}>
            {user.users.length > 0
              ? user.users.map((item) => (
                  <>
                    <User item={item} onClick={initChat}  />
                  </>
                ))
              : null}
          </div>

          <div className={openSidebar ? "chatArea active" : "chatArea"  } >

            <div className="chatHeader">
              {chatStarted ? `${chatUser}` : " "}
            </div>

            <div className="messageSections">
              {chatStarted
                ? user.conversations.map((con) => (
                    <>
                      <div
                        style={{
                          textAlign:
                            con.user_uid_1 === auth.uid ? "right" : "left",
                        }}
                      >
                        <p
                          className="messageStyle"
                          style={{
                            background:
                              con.user_uid_1 === auth.uid ? "#ccc" : "skyblue",
                          }}
                        >
                          {con.message}
                        </p>
                      </div>
                    </>
                  ))
                : null}
                

            </div>

            {chatStarted ? (
              <div className="chatControls">
                {/* <textarea /> */}
                <TextareaAutosize
                  minRows={1}
                  className="text-area"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Message Here..."
                />
                <IconButton
                  
                  onClick={submitMessage}
                  style={{width:60,height:60,outline:"none",color:"#3f51b5"}}
                >
                 <SendIcon/>  
                </IconButton>
              </div>
            ) : null}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;
