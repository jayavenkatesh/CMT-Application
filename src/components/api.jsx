import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Update to your backend URL

export const login = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

// export const getAllConferences = async () => {
//     const response = await axios.get(`${API_URL}/allConferences`);
//     return response.data;
// };
// export const getAllConferences = async () => {
//     return axios.get(`${API_URL}/allConferences`);
//   };

export const getUserConferences = async (userEmail) => {
    const response = await axios.get(`${API_URL}/MyConferences?userEmail=${userEmail}`); // Pass actual email
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

export const createConference = async (conference) => {
    const response = await axios.post(`${API_URL}/createConference`, conference);
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
  const response = await axios.get(`${API_URL}/MyConferences`, { params: { userEmail: email } });
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
export const getUserSubmission = async (conferenceId, userEmail) => {
  const response = await axios.get(`${API_URL}/submission`, {
    params: { conferenceId, userEmail },
  });
  return response.data;
};

// Submit a new paper
export const submitPaper = async (conferenceId, title, abstractContent, file) => {
  const formData = new FormData();
  formData.append('conferenceId', conferenceId);
  formData.append('title', title);
  formData.append('abstractContent', abstractContent);
  if (file) formData.append('file', file);

  await axios.post(`${API_URL}/submission`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
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

// Delete a paper submission
export const deleteSubmission = async (submissionId) => {
  await axios.delete(`${API_URL}/submission/${submissionId}`);
};
