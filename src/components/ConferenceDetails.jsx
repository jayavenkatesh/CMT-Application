// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getConferenceById, checkPaperSubmitted } from './api';
// import SubmitPaper from './SubmitPaper';
// import { deletePaper } from './api.jsx';


// const ConferenceDetails = () => {
//     const { id } = useParams();
//     const [conference, setConference] = useState(null);
//     const [hasSubmitted, setHasSubmitted] = useState(false);

//     useEffect(() => {
//         const fetchConferenceDetails = async () => {
//             const data = await getConferenceById(id);
//             setConference(data);
//             const submitted = await checkPaperSubmitted(id); // Implement this API call
//             setHasSubmitted(submitted);
//         };
//         fetchConferenceDetails();
//     }, [id]);

//     return (
//         <div>
//             {conference ? (
//                 <>
//                     <h2>{conference.name}</h2>
//                     <p>{conference.description}</p>
//                     {hasSubmitted ? (
//                         <>
//                             <SubmitPaper conferenceId={id} /> {/* Reuse SubmitPaper for updates */}
//                             <button onClick={() => deletePaper(conference.id)}>Delete Paper</button> {/* Implement delete function */}
//                         </>
//                     ) : (
//                         <SubmitPaper conferenceId={id} />
//                     )}
//                 </>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default ConferenceDetails;






// ConferenceDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPaper, deleteSubmission } from './api';
import './ConferenceDetails.css';
import Navbar from './Navbar';
import { useUserEmail } from '../hooks/useUserEmail';

const ConferenceDetails = () => {
  const { conferenceId } = useParams();
 
  const navigate = useNavigate();
  const [submission, setSubmission] = useState();
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const userEmail=useUserEmail();
  // Fetch user submission for the specific conference
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // console.log(userEmail,conferenceId)
        const result = await getPaper(userEmail,conferenceId);
        // console.log(result)
        setSubmission(result.paperDet);
        // console.log(result.data);
        // Check if the deadline has passed
        // console.log(result.confDet)
        
        // console.log(new Date(result.confDet.endDate))
        // console.log(new Date())
        if (result && new Date(result.confDet.endDate) < new Date()) {
          setDeadlinePassed(true);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };
    fetchSubmission();
  }, [conferenceId, userEmail]);

  // const handleDelete = async () => {
  //   try {
  //     await deleteSubmission(submission.id);
  //     setSubmission(null);
  //     alert('Submission deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting submission:', error);
  //   }
  // };


  const handleDelete = async () => {
    if (!submission?.id) {
      alert("No submission ID found to delete!");
      return;
    }

    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete your submission? This action cannot be undone."
      );

      if (confirmed) {
        await deleteSubmission(submission.id); // API call to delete the submission
        setSubmission(null); // Update state to remove submission details
        alert("Submission deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission. Please try again.");
    }
  };


  return (
    <div>
      <Navbar />
      <h2>Submission Summary</h2>
      {/* {console.log(submission)} */}
      {submission ? (
        <div className='paper_edit'>
          {/* <h3>Your Submission</h3> */}
          <p>Title: {submission.title}</p>
          <p>Abstract: {submission.abstractContent}</p>
          {deadlinePassed ? (
            <p>Deadline has passed, you can no longer edit or delete this submission.</p>
          ) : (
            <div>
              <button onClick={() => navigate(`/submit/${conferenceId}`)}>Edit Submission</button>
              <button onClick={handleDelete}>Delete Submission</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>You have not submitted a paper for this conference.</p>
          <Link to={`/submit/${conferenceId}`}>
            <button>Submit a Paper</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConferenceDetails;
