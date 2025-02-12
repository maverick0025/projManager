import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAsyncError, useNavigate } from "react-router-dom";

const ChatBox = ({ projId, ownerId, chats }) => {
  const baseUrl = "http://www.localhost:5454/api/messages/";
  const baseUrlProfile="http://www.localhost:5454/api/users/profile"

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [authtoken, setAuthtoken] = useState("");
  const [loggedmail, setLoggedmail] = useState("");
  const [sendrid, setSendrid] = useState(0);

  useEffect(() => {
    setLoggedmail(localStorage.getItem('userEmail'));
    setAuthtoken(localStorage.getItem("token"));
    fetchLoggedInUserId(localStorage.getItem("token"));
  }, []);

  const fetchLoggedInUserId = ( async (token)=>{
    try {
      const response = await fetch(baseUrlProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSendrid(data.id);
      } else {
        console.error('Failed to fetch user details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  })

  const handleSendMessage = async () => {
    // console.log(authtoken);
    try {
      const response = await axios.post(
        `${baseUrl}send`,
        {
          senderId: sendrid ,
          projectId: projId,
          content: message,
        },
        {
          headers: {
            Authorization: authtoken,
          },
        }
      );
      // window.location.reload();
    } catch (error) {
      // console.log(error);
      toast(error.response.data);
    }
    // console.log("sending message : " + message);
    setMessage("");
    window.location.reload()
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>

        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          { chats ? chats.map((item) =>
            ((item.sender?.email) !== (loggedmail)) ? (
              <div
                key={item.id}
                className="flex gap-2 mb-2 justify-start items-center"
              >
                <Avatar> 
                  <AvatarFallback>{item.sender.fullName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                  <p>{item.sender.fullName}</p>
                  <p className="text-gray-300"> {item.content}</p>
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className="flex gap-2 mb-2 justify-end items-center"
              > 
                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                  <p>{item.sender.fullName}</p>
                  <p className="text-gray-300"> {item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            )
          ): "No chats"}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            value={message}
            onChange={handleMessageChange}
            placeholder="Type message..."
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
