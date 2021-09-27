import { userConstants } from "./constants";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
  addDoc,
  getDocs,
  orderBy,
} from "firebase/firestore";

export const getRealTimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST });
    const db = getFirestore();

    const q = query(collection(db, "users"), where("uid", "!=", uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      console.log("Current users in CA: ", users.join(", "));

      dispatch({
        type: userConstants.GET_REALTIME_USERS_SUCCESS,
        payload: { users: users },
      });
    });

    return unsubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    const db = getFirestore();

    addDoc(collection(db, "conversations"), {
      ...msgObj,
      isView: false,
      createdAt: new Date(),
    })
      .then((data) => {
        console.log("data", data);
        // dispatch({type:userConstants.GET_REALTIME_MESSAGES__SUCCESS});
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    const db = getFirestore();
    
    console.log("ids",user); 

    const q = query(
      collection(db, "conversations"),
      orderBy("createdAt",'asc'),  
      where("user_uid_1", "in", [user.uid_1, user.uid_2]),
    );

    const querySnapshot = await getDocs(q);
      const conversations = []
    querySnapshot.forEach((doc) => {
       
       if(
         (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2) 
         || (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1) 
       ){
            
         conversations.push(doc.data());
       } 
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      if(conversations.length > 0){
          dispatch({
            type:userConstants.GET_REALTIME_MESSAGES,
            payload: {conversations}
          });
      }else{
          dispatch({
            type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE` ,
            payload:{ conversations }, 
          })
      }

      console.log(conversations); 
    });

  };
};
