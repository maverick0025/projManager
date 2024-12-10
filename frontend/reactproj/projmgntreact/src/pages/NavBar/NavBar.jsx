import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import React from "react";
import { Button } from "../../components/ui/button";
import CreateProjectForm from "../Project/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/context/AuthContext";

const NavBar = () => {
    
    const navigate=useNavigate()
    const {logout} = useAuth();

    const logoutfunction= async()=>{
      console.log("loggin out");
      logout();
    }

    return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p onClick={()=>navigate("/")} className="cursor-pointer"> Project Management</p>

        <Dialog>
          <DialogTrigger>
            <Button variant="ghost">New Project</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>Create New Project</DialogHeader>

            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button variant="ghost" onClick={()=>navigate("/upgrade_plan")}> Upgrade</Button>
      </div>
      <div className="items-center flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-gray-500"
            >
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={()=>logoutfunction()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p> Bleh! </p>
      </div>
    </div>
  );
};

export default NavBar;
