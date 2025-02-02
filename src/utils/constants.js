export const Logo =  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const ProfileLogo1 = "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdFu41cMXRWNK1EkDj_yH1bxeh9a0udswBpkyBNBYFsgcCEANkojvc63RsB56mXTPWhSqhDnWfJQOH9V7BymHd5Jj8XGwUJ-eQ.png?r=e6e";
export const ProfileLogo2 = "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABddMq7xZ5RCXKBrzlYb35ImMzwG0qDPaWxUl2emWyDVj_gyTk7JBYUtQny7wZNbhyyinSSWPTYOSP48IG6DmpJYB2ISj9ZvdcQ.png?r=e6c";
export const LoginPageBgImage = "https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/3417bf9a-0323-4480-84ee-e1cb2ff0966b/IN-en-20240408-popsignuptwoweeks-perspective_alpha_website_large.jpg";
export const LinkedInProfile = "https://www.linkedin.com/in/rishab-gupta-9b0972178/";
export const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY;

export const POSTER_CDN_URL = "https://image.tmdb.org/t/p/w400";

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  }
};

export const SUPPORTED_LANGUAGE = [
  {
    identifier: "en",
    name: "English"
  },
  {
    identifier: "hi",
    name: "Hindi"
  },
  { 
    identifier: "ma", 
    name: "Marathi" 
  },
  {
    identifier: "fr",
    name: "French"
  },
  {
    identifier: "sp",
    name: "Spanish"
  },
  { 
    identifier: "ge", 
    name: "German" 
  },
  {
    identifier: "jp",
    name: "Japanese"
  },
  { 
    identifier: "chn", 
    name: "Chinese" 
  },
  { 
    identifier: "snk", 
    name: "Sanskrit"
  }
]