import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "../../components/ui/button";
import "./Auth.css";

const Auth = () => {
  const [active, setActive] = useState(true);

  return (
    <>
      <div className="loginContainer">
        <div className="box h-[35rem] w-[29rem]">
          <div className="min Container login">
            <div className="loginBox w-full px-10 space-y-5">
              {active ? <Signup /> : <Login />}

              <div className="flex-col items-center justify-between px-10 w-full">
                <span>
                  {" "}
                  {active ? "Have an account? " : "First time here?"}
                </span>
                <Button
                  onClick={() => setActive(!active)}
                  variant="ghost"
                  className="border ml-3 items-center"
                >
                  {active ? "Sign in" : "Sign up"}
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
