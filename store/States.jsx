import { atom } from "recoil";
const isLoggedIn = atom({

    key:'isLoggedIn', 
  
    default: false, // default value (aka initial value)
  
  });
  const userEmail = atom({

    key:'userEmail', 
  
    default: "", // default value (aka initial value)
  
  });