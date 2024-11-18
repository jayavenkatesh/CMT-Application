import axios from 'axios';
import { useUserEmail } from '../hooks/useUserEmail';
const API_URL = 'http://localhost:8080'; // Update to your backend URL

export const login = async ({email,password}) => {
    return await axios.post(`${API_URL}/login`, {email,password});
};
export const createUser = async (credentials) => {
    return await axios.post(`${API_URL}/register`, credentials);
};

// export const getAllConferences = async () => {
//     const response = await axios.get(`${API_URL}/allConferences`);
//     return response.data;
// };
// export const getAllConferences = async () => {
//     return axios.get(`${API_URL}/allConferences`);
//   };

export const getUserConferences = async (userEmail) => {
    const response = await axios.get(`${API_URL}/MyConferences`,{userEmail}); // Pass actual email
    return response.data;
};
export const validateEmail = async (email) => {
  const response = await axios.get(`${API_URL}/getUserByEmailBoolean?email=${email}`); // Pass actual email
  return response.data;
};

export const getConferenceById = async (id) => {
    const response = await axios.get(`${API_URL}/conference/${id}`);
    return response.data;
};

// export const submitPaper = async (paper, conferenceId) => {
//     const formData = new FormData();
//     formData.append('title', paper.title);
//     formData.append('abstract', paper.abstract);
//     formData.append('file', paper.file);
//     await axios.post(`${API_URL}/submitPaper/${conferenceId}`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
// };

export const createConference = async ({name, startDate,endDate,description,user}) => {
    const response = await axios.post(`${API_URL}/createConference`,{name, startDate,endDate,description,user});
    return response.data;
};

export const checkPaperSubmitted = async (conferenceId) => {
    const response = await axios.get(`${API_URL}/checkSubmission/${conferenceId}`); // Implement this API endpoint on your backend
    return response.data.submitted; // Adjust based on your API response structure
};

// Add more API methods as needed

// export const deletePaper = (id) => {
//     return axios.delete(`${API_URL}/Delete/${id}`);
//   };




  // api.jsx
// import axios from 'axios';

// const API_URL = 'http://localhost:8080';

// Fetch all conferences
// api.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8080'; // Replace with your backend URL

// Fetch user-specific conferences

export const fetchUserConferences = async (email) => {
  const response = await axios.get(`${API_URL}/MyConferences?userEmail=${email}`);
  return response.data;
};

// Fetch all conferences
export const getAllConferences = async () => {
  const response = await axios.get(`${API_URL}/allConferences`);
  return response.data;
};



// api.js
//import axios from 'axios';

//const API_URL = 'http://localhost:8080';

// Fetch a user's submission for a specific conference
export const getUserSubmission = async (conferenceId) => {
  
  const response = await axios.get(`${API_URL}/Submission`, {
    params: { conferenceId, useUserEmail },
  });
  return response.data;
};

// Submit a new paper
// export const submitPaper = async (title, abstractContent,collaborators, file,userEmail,confId) => {
//   const formData = new FormData();
  
  
//   formData.append('title', title);
//   formData.append('abstractContent', abstractContent);
//   if(collaborators)formData.append('collaborators', collaborators);
//   if (file) formData.append('file', file);
//   formData.append('userEmail', userEmail);
//   formData.append('confId', confId);

//   await axios.post(`${API_URL}/Submission`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
// };












// Submit a new paper
export const submitPaper = async (formData) => {
  try {
      const response = await axios.post(`${API_URL}/Submission`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data; // Return response if needed
  } catch (error) {
      console.error('Error in submitPaper API:', error);
      throw error;
  }
};


// Update an existing paper
export const updatePaper = async (conferenceId, title, abstractContent, file) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('abstractContent', abstractContent);
  if (file) formData.append('file', file);

  await axios.put(`${API_URL}/submission/${conferenceId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// // Delete a paper submission
// export const deleteSubmission = async (submissionId) => {
//   return await axios.delete(`${API_URL}/submission/${submissionId}`);
// };





export const deleteSubmission = async (submissionId) => {
  try {
    const response = await axios.delete(`${API_URL}/Delete/${submissionId}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteSubmission API:", error);
    throw error; // Propagate error to handle it in the component
  }
};

// Get paper by usermail within conference
export const getPaper = async (mail,confId) => {
  const paperDet= await axios.get(`${API_URL}/paperByMail?mail=${mail}&conId=${confId}`);
  const confDet=await axios.get(`${API_URL}/getConfById?id=${confId}`);
  return {paperDet:paperDet.data, confDet:confDet.data}; 
};
// Get user by usermail
export const getUserByMail = async (mail) => {
  return await axios.get(`${API_URL}/roleByEmail?email=${mail}`);
};
// export const changeEmail = async (mail) => {
//   return await axios.put(`${API_URL}/changeEmail?email=${mail}`);
// };
