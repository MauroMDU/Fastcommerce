import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setPhoto } from '../redux/actions/auth.js';
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { LS } from '../utils/localStorageUtils.js';
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function alertSoon() {
  Swal.fire({
    text: 'We are having problems, this option is available soon!',
    width: 600,
    padding: '3em',
  });
}

export default function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputEmail = useRef('');
  const inputPassword = useRef('');

  const signin = async (event) => {
    event.preventDefault();
    const data = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    try {
      const response = await api.post(apiUrl + endpoints.login, data);
      console.log(response);
      if (response.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User signed in!',
          showConfirmButton: false,
          timer: 1500,
        });

        const { user, photo, token } = response.data.response;

        localStorage.setItem('token', JSON.stringify(response.data.response.token))
        localStorage.setItem('user', JSON.stringify(response.data.response.user))
        //dispatch(setUser(user));
        //dispatch(setPhoto(photo));

        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Authentication failed!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Authentication failed!',
      });
    }
  };

  let clientID = '379114387233-5q8uml6qbhosqgjg95n958ip163d09if.apps.googleusercontent.com'

  useEffect(() => {
    let start = () => {
      gapi.auth2.init({
        clientId: clientID
      })
    }

    gapi.load("client:auth2", start)
  }, [])

  const onSuccess = (response) => {
    console.log(response)
    const { email, googleId } = response.profileObj;

    let data = {
      email: email,
      password: googleId,
    }
    console.log(data)
    
    api.post("https://fastcommerce-back-production.up.railway.app/api/auth/login", data)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', JSON.stringify(res.data.response.token));
        localStorage.setItem('user', JSON.stringify(res.data.response.user));

        Swal.fire({
          icon: "success",
          title: "Logged In!",
        });
        navigate("/");

      })
      .catch(error => {
        // console.log(err)
        Swal.fire({
          icon: "error",
          title: error,
        });
      })

  }
  
  let onFailure = () => {
    console.log("something went wrong");
  }

  return (
    <div className="flex flex-wrap flex-col justify-center items-center w-[100%] max-h-screen bg-gray-200">
      {/*<img className='h-[250px]' src="/LogoFastCommerce.png" alt="" />*/}
      <p className="text-[#1F1F1F] text-center text-[32px] not-italic font-bold leading-[normal] tracking-[1.6px]">
        Welcome <span className="text-[#ff5757]">back!</span>
      </p>
      {/*<p className="w-[80%] md:w-[50%] text-black text-center text-2xl not-italic font-semibold leading-[normal] tracking-[0.6px] mt-3">
      To Your Best Store!
      </p>*/}
      <form onSubmit={signin} className="w-full">
        <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8 flex flex-col items-center">
          <div>
            <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal text-[21px] leading-[normal] tracking-[0.6px] text-[#ff5757]">
              Email
            </p>
            <input
              ref={inputEmail}
              placeholder="Insert Your Email"
              id="email"
              name="email"
              type="email"
              required
              className="border-[#ff5757] placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"
            />
          </div>
          <div>
            <p className="pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal text-[21px] leading-[normal] tracking-[0.6px] text-[#ff5757]">
              Password
            </p>
            <input
              ref={inputPassword}
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              required
              className="border-[#ff5757] placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"
            />
          </div>
          <button
            type="submit"
            className="flex w-[70vw] md:w-[30vw] h-12 flex-col items-center justify-center shrink-0 bg-[#ff5757] rounded-[10px]"
          >
            <Anchor className="text-[#FAFCFC] text-center text-[21px] not-italic font-bold leading-[normal] tracking-[0.7px]">
              Sign In
            </Anchor>
          </button>
          <GoogleLogin className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[10px] border-solid border-[#1F1F1F] bg-blue-500 flex justify-center items-center"
                clientId={clientID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_policy"}
            />
          <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Forgot your Password? <Anchor to={'/forgot-password'} className="text-[#ff5757]">Click Here</Anchor>
          </p>
          <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Don't have an account? <Anchor to={'/register'} className="text-[#ff5757]">Sign Up</Anchor>
          </p>
          <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Go back to <Anchor to={'/'} className="text-[#ff5757]">home page</Anchor>
          </p>
        </div>
      </form>
    </div>
  );
}
