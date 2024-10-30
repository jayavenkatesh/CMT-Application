// SubmissionForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitPaper, updatePaper, getUserSubmission } from './api';

const SubmissionForm = ({ userEmail }) => {
  const { conferenceId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [abstractContent, setAbstractContent] = useState('');
  const [file, setFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check if there's an existing submission for editing
    const fetchSubmission = async () => {
      try {
        const existingSubmission = await getUserSubmission(conferenceId, userEmail);
        if (existingSubmission) {
          setIsEditMode(true);
          setTitle(existingSubmission.title);
          setAbstractContent(existingSubmission.abstract);
        }
      } catch (error) {
        console.error('Error loading submission:', error);
      }
    };
    fetchSubmission();
  }, [conferenceId, userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updatePaper(conferenceId, title, abstractContent, file);
        alert('Paper updated successfully');
      } else {
        await submitPaper(conferenceId, title, abstractContent, file);
        alert('Paper submitted successfully');
      }
      navigate(`/conference/${conferenceId}`);
    } catch (error) {
      console.error('Error submitting paper:', error);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Edit' : 'Submit'} Paper</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Abstract"
          value={abstractContent}
          onChange={(e) => setAbstractContent(e.target.value)}
          required
        ></textarea>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">{isEditMode ? 'Update' : 'Submit'} Paper</button>
      </form>
    </div>
  );
};

export default SubmissionForm;
