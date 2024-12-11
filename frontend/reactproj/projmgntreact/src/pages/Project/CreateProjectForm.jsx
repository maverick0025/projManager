import { Dialog, DialogClose } from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../../components/ui/select";
import { tags } from "../ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const CreateProjectForm = () => {
    const baseUrl = "http://www.localhost:5454/api/projects";

    // const toastId = useRef(null);
    const handleTagsChange=(newValue)=>{
        const currentTags=form.getValues("tags");
        const updatedTags= currentTags.includes(newValue)?
        currentTags.filter(tag=>tag!==newValue):[...currentTags, newValue];

        form.setValue("tags", updatedTags)
    }

    const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: ["javascript", "react"],
    },
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const onSubmit =  async (data) => {
    // console.log("create project data: ", data);

    try {
      const response = await axios.post(baseUrl, {
        name: data.name,
        description: data.description,
        category: data.category,
        tags:data.tags
      },{
        headers:{
          'Authorization': token
        },
      });
      console.log(response.data)
      toast("New project created!")
      navigate("/", {replace:true});
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast(error.response.data["message"]);
      }
    }


  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="project name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="project description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue="fullstack"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    type="text"
                    // className="border w-full border-gray-700 py-5 px-5"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack"> Full Stack</SelectItem>
                      <SelectItem value="frontend"> Frontend</SelectItem>
                      <SelectItem value="backend"> Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    // value={field.value}
                    onValueChange={(value) => {
                        handleTagsChange(value);
                    }}
                    type="text"
                    // className="border w-full border-gray-700 py-5 px-5"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                  {field.value.map((item) => (
                    <div key={item}
                      onClick={() => handleTagsChange(item)}
                      className="cursor-pointer flex rounded-full items-center  
                                    border gap-2 py-1 px-4">
                      <span className="text-sm">{item}</span>
                      <Cross1Icon className="h-3 w-3" />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            {false ? (
              <div>
                <p>
                  You can create only 3 projects with the free plan. Please
                  upgrade your plan to create more projects.
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full mt-5">Create</Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
