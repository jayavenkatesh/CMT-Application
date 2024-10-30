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
import { getUserSubmission, deleteSubmission } from './api';

const ConferenceDetails = ({ userEmail }) => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  // Fetch user submission for the specific conference
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const result = await getUserSubmission(conferenceId, userEmail);
        setSubmission(result);
        // Check if the deadline has passed
        if (result && new Date(result.deadline) < new Date()) {
          setDeadlinePassed(true);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };
    fetchSubmission();
  }, [conferenceId, userEmail]);

  const handleDelete = async () => {
    try {
      await deleteSubmission(submission.id);
      setSubmission(null);
      alert('Submission deleted successfully');
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  return (
    <div>
      <h2>Conference Details</h2>
      {submission ? (
        <div>
          <h3>Your Submission</h3>
          <p>Title: {submission.title}</p>
          <p>Abstract: {submission.abstract}</p>
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
