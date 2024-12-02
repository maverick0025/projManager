import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

const CreateCommentForm = ({issueId}) => {
  
        const form = useForm({
          defaultValues: {
            content: "",
          },
        });
      
        const onSubmit = (data) => {
          console.log("create project data: ", data);
        };
  
    return (

    <div >

    <Form {...form}>
        
        <form className="flex gap-2 items-center"  onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem >
                <div className="flex gap-2">
                <div>
                <Avatar>
                    <AvatarFallback>
                        B
                    </AvatarFallback>
                </Avatar>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-[20rem]"
                    placeholder="Add a comment..."
                  />
                </FormControl>

                </div>
                
                <FormMessage />
              </FormItem>
            )}
          />
            
              <Button type="submit" className="w-full">
                Save
              </Button>
            
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm