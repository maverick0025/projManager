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

      // Assuming the response contains user data and token
      // Adjust this based on your actual backend response structure
      const { token, user } = response.data;

      // Use login from AuthContext to set authentication state
      login(token);

      // Navigate to home page
      navigate("/");

    } catch (error) {
      console.error("API error:", error);
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast("Something horribly went wrong :(");
      }
    }
  };

  return (
    <div className="space-y-5">
        <h1>Register</h1>
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
      className="text-center"
      />
    </div>
  );
};

export default Login;
