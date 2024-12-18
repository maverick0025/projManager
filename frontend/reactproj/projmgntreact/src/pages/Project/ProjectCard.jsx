import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Card } from "../../components/ui/card";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProjectCard = ({project}) => {
  const navigate = useNavigate()
  const baseUrl = "http://www.localhost:5454/api/projects/"
  const token = localStorage.getItem('token');

  const deleteProject = async ()=>{
      console.log("deleting proj")
    try {
      const response = await axios.delete(`${baseUrl}${project.id}`, {
        headers: {
          'Authorization': token
        },
      })
      console.log(response.data["message"]);
      toast(response.data["message"])
      navigate("/");
      window.location.reload();

      console.log("deleted proj id: "+ project.id)      
    } catch (error) {
      console.log(error);
    };
  
    
  }
  
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1 onClick={()=>navigate(`/project/${project.id}`,{state:{id:project.id}})} className="cursor-pointer font-bold text-lg"
              >
                {project.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400">{project.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem  >Update</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=> deleteProject()} >Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {(project.tags).map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
