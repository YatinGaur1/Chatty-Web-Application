import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"


export const ChatContainer = () => {
  const {messages,getMessages,selectedUser,isMessagesLoading}=useChatStore();
  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

  if(isMessagesLoading) return <div>Loading...</div>
  
  return (
    <div>ChatContainer</div>
  )
}
