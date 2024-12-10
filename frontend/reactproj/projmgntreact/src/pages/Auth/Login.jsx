import { ToastContainer, toast, Slide } from "react-toastify";
import { useAuth } from "../../../src/context/AuthContext";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const baseUrl = "http://www.localhost:5454/auth/signin";

const Login = () => {

  const {login} = useAuth();
  const toastId = useRef(null);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(baseUrl, {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      // console.log(response.data["jwt"]);

      login(response.data["jwt"]);

      navigate("/");

    } catch (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast(error.response.data["message"]);
        ;
      }
    }
  };

  return (
    <div className="space-y-5">
        <h1 className="justify-center text-center font-serif text-xl">Login</h1>
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
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <Button type="submit" className="w-full mt-5">
              Sign in!
            </Button>
        </form>
      </Form>
      <ToastContainer
      autoClose={5000}
      transition={Slide}
      className="text-center justify-between"
      />
    </div>
  );
};

export default Login;

