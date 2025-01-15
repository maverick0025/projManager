import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import React, { useEffect, useState } from "react";
import IssueCard from "./IssueCard";
import { Button } from "../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import axios from "axios";
import { toast } from "react-hot-toast";

const IssueList = ({ status, title, projId, issues, token }) => {
  const baseUrl = "http://www.localhost:5454/api/issues/project/";

  useEffect(() => {
    // console.log(issues);
  }, []);

  const fetchIssueByProjectId = async () => {
    try {
      console.log("fetching issues");
      const response = await axios.get(`${baseUrl}${projId}`, {
        headers: {
          Authorization: token,
        },
      });
      setIssues(response.data);
      console.log("current project issues");
      console.log(">>>");
      console.log(issues);
    } catch (error) {
      toast("Error in fetching issues");
    }
  };

  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {issues
                ? issues
                    .filter((item) => item.status === status)
                    .map((item) => <IssueCard key={item} issue={item} />)
                : "No issues"}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger>
              <Button
                variant="outline"
                className="w-fullflex items-center gap-2"
              >
                Create Issue
                <PlusIcon />
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
