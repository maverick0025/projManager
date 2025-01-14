import React, { useEffect } from 'react'
import ProjectList from '../ProjectList/ProjectList'
import { useParams, useSearchParams } from 'react-router-dom';

const Home = () => {

  const baseurl = "http://www.localhost:5173/api/projects/accept_invitation"
  
  /*
  useEffect(() => {

    const [params, setParams]  = useSearchParams();
    if(params.get("token") != null){
      const jwt = localStorage.getItem('token');
      acceptInvitation(jwt, params.get("token"));
    }
    console.log("-------")
    console.log(params)

  },[]);

  const acceptInvitation= async(jwt, token)=>{

    try {
      const response = await axios.post(baseUrl, {
        token: token
      },{
        headers:{
          'Authorization': jwt
        },
      });
      console.log(response.data)
      toast("Invitation accepted!")
      navigate("/", {replace:true});
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast("Failed to accept the invitation. Too bad, you don't know why!")
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast(error.response.data["message"]);
      }
    }

  };*/

  

  return (
    <div>
        <ProjectList></ProjectList>
    </div>
  )
}

export default Home