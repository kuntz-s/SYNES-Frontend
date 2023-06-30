import "./init";
import React,{useEffect} from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

var stompClient = null;
const Test = () => {
  
  const connect = () => {
    const socket = new SockJS('http://localhost:8080/stomp-endpoint');
    // Create a STOMP client
   stompClient = Stomp.over(socket);
    // Set up STOMP client
    stompClient.connect({},onConnected,onError);
  }

  const onConnected = () => {
    
  }

  const onError = () => {
    console.log("il y'a une erreur")
  }
 

 
  return (
    <div>
      <button className="py-2 px-4" onClick={connect}>Connecter</button>
    </div>
  )
}

export default Test