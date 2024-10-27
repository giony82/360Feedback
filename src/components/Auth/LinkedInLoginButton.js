import React from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useAuth } from '../../context/AuthContext';

function LinkedInLoginButton() {
  const { login } = useAuth();
  
  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      login('linkedin', code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <button 
      onClick={linkedInLogin} 
      className="flex items-center justify-center w-full px-4 py-2 text-white bg-[#0A66C2] rounded-md hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" data-supported-dps="21x21" width="21" height="21" focusable="false">
        <g transform="scale(.4375)" fill="none" fillRule="evenodd">
          <rect className="bug-text-color" fill="#FFF" x="1" y="1" width="46" height="46" rx="4"></rect>
          <path d="M0 4.01A4.01 4.01 0 014.01 0h39.98A4.01 4.01 0 0148 4.01v39.98A4.01 4.01 0 0143.99 48H4.01A4.01 4.01 0 010 43.99V4.01zM19 18.3h6.5v3.266C26.437 19.688 28.838 18 32.445 18 39.359 18 41 21.738 41 28.597V41.3h-7V30.159c0-3.906-.937-6.109-3.32-6.109-3.305 0-4.68 2.375-4.68 6.109V41.3h-7v-23zM7 41h7V18H7v23zm8-30.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" className="background" fill="#0077B5"></path>
        </g>
      </svg>
      <span className="ml-2">Sign in with LinkedIn</span>
    </button>
  );
}

export default LinkedInLoginButton;