import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ projId, sendrId, chats }) => {
  const baseUrl = "http://www.localhost:5454/api/messages/";

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [authtoken, setAuthtoken] = useState("");

  useEffect(() => {
    setAuthtoken(localStorage.getItem("token"));
    console.log("logging from use effect!");
  }, []);



  const handleSendMessage = async () => {
    console.log(authtoken);
    try {
      // console.log(sendrId + ", " + projId + ", " + message);
      const response = await axios.post(
        `${baseUrl}send`,
        {
          senderId: sendrId,
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
      console.log(error);
      toast(error.response.data);
    }
    console.log("sending message : " + message);
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
          {[1, 12, 13].map((item, index) =>
            index % 2 == 0 ? (
              <div
                key={item}
                className="flex gap-2 mb-2 justify-start items-center"
              >
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                  <p>Ram</p>
                  <p className="text-gray-300"> How are ya!</p>
                </div>
              </div>
            ) : (
              <div
                key={item}
                className="flex gap-2 mb-2 justify-end items-center"
              >
                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                  <p>Ram</p>
                  <p className="text-gray-300"> How are ya!</p>
                </div>
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
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
