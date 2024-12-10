import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProjectDetails = () => {
  const handleProjectInvitation = () => {};
  const [projdet, setProjdet] = useState(null);
  const location = useLocation();

  const baseUrl = "http://www.localhost:5454/api/projects/";

  useEffect(()=>{
    const currentProjectId = location.state.id;
    const token = localStorage.getItem('token');
    fetchCurrentProjectDetails(currentProjectId, token);
  })

  const fetchCurrentProjectDetails= async (projId, token)=>{
      try{
        const response = await axios.get(`${baseUrl}+${projId}`,{
          headers:{
            'Authorization': token
          },
        });
        console.log(response);
        setProjdet(response["data"]);
      }catch(error){
        console.log(error)
      }
  }

  return (
    <>
      <div className="mt-5 lg:px-10 ">
        <div className="lg:flex gap-5 justify-between pb-4">
          
          <ScrollArea className="h-screen lg:w-[65%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                {projdet ? projdet.name : "project name"}
                
              </h1>
              <div className="space-y-5 pb-5 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-xl ">
                  {projdet ? projdet.description : "description..."}
                </p>

                <div className="flex">
                  <p className="w-36"> Project Lead: </p>
                  <p>{projdet ? projdet.owner.fullName : "owner name..."} </p>
                </div>

                <div className="flex">
                  <p className="w-36">Members:</p>
                  <div className="flex gap-2 items-center">
                    {projdet? projdet.team.map((item) => (
                      <Avatar className="cursor-pointer ">
                        <AvatarFallback>{(item.fullName[0] ? item.fullName[0].toUpperCase() : "S")}</AvatarFallback>
                      </Avatar>
                    )) : [1,1].map((item)=>{
                      {item}
                    })}
                    <div>
                      <Dialog>
                        <DialogTrigger>
                          <DialogClose>
                            <Button
                              variant="outline"
                              className="ml-2"
                              size="sm"
                              onClick={handleProjectInvitation}
                            >
                              <span>Invite</span>
                              <PlusIcon className="w-3 h-3" />
                            </Button>
                          </DialogClose>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>Invite User</DialogHeader>
                          <InviteUserForm></InviteUserForm>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <p className="w-36">Category:</p>
                  <p>
                    {projdet? projdet.category : "Fullstack"}
                  </p>
                </div>

                <div className="flex">
                  <p className="w-36">Status</p>
                  <Badge className=" bg-yellow-600">In Progress</Badge>
                </div>
              </div>

              <section>
                    <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                    <div className="lg:flex md:flex gap-3 justify-between py-5">
                        <IssueList status="pending" title="Todo List"/>
                        <IssueList status="in_progress" title="In Progress"/>
                        <IssueList status="done" title="Done"/>

                    </div>
              </section>

            </div>
          </ScrollArea>
            <div className="lg:w-[35%] rounded-md sticky r-5 top-10">
            <ChatBox />
            </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
