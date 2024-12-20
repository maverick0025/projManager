import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";

const InviteUserForm = ({projId}) => {
  const baseUrl = "http://www.localhost:5454/api/projects/invite";

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("create invite user form data: ", data);
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        baseUrl,
        {
          email: data.email,
          projectId: projId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      toast("Invitation sent to their registered email!");
    } catch (error) {
      console.log(error);
      toast("Failed to send an invitation. Too bad, you don't know why!")
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter invitee's email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Send Invite
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
