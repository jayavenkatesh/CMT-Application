import React, { useState } from 'react';
import { submitPaper, validateEmail } from './api.jsx'; // Import the validateEmail function
import './SubmitPaper.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useUserEmail } from '../hooks/useUserEmail.jsx';

const SubmitPaper = () => {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [file, setFile] = useState(null);
    
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const userEmail=useUserEmail();
    const { conferenceId } = useParams();

    const handleAddCoAuthor = async () => {
        if (!email) {
            setErrorMessage('Email cannot be empty');
            return;
        }

        try {
            // Call the backend API to validate the email
            const isValid = await validateEmail(email); // `true` if the email exists in the database
            console.log(isValid)
            if (isValid) {
                if (!collaborators.includes(email)) {
                  setCollaborators([...collaborators, email]);
                    setEmail('');
                    setErrorMessage(''); // Clear any previous error message
                } else {
                    setErrorMessage('Email is already added');
                }
            } else {
                setErrorMessage('Invalid email. User not found.');
            }
        } catch (error) {
            console.error('Error validating email:', error);
            setErrorMessage('An error occurred while validating the email. Please try again.');
        }
    };

    const handleRemoveCoAuthor = (removeEmail) => {
      setCollaborators(collaborators.filter((collaborators) => collaborators !== removeEmail));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const strConfid=parseInt(conferenceId)
    //     const confId=strConfid;
    //     const abstractContent=abstract

    //     const paper = { title, abstractContent ,collaborators, file, userEmail,confId };
    //     console.log(paper)
    //     // try {
    //         const res=await submitPaper(paper);
    //         console.log(res)
    //         // alert('Paper submitted successfully!');
    //         // Reset form or perform additional actions here
    //     // } catch (error) {
    //     //     console.error('Error submitting paper:', error);
    //     //     alert('Submission failed. Please try again.');
    //     // }
    // };







    const handleSubmit = async (e) => {
        e.preventDefault();
        const confId = parseInt(conferenceId); // Convert `conferenceId` to an integer
        const abstractContent = abstract; // Align naming with backend
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('abstractContent', abstractContent);
        if (collaborators.length > 0) {
            collaborators.forEach((collaborator) => formData.append('collaborators', collaborator));
        }
        if (file) {
            formData.append('file', file);
        }
        formData.append('userEmail', userEmail);
        formData.append('confId', confId);
    
        try {
            const res = await submitPaper(formData); // Use the updated API function
            console.log(res);
            alert('Paper submitted successfully!');
        } catch (error) {
            console.error('Error submitting paper:', error);
            alert('Submission failed. Please try again.');
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="submit-paper-container">
                <h2>Submit Paper</h2>
                <form onSubmit={handleSubmit} className="submit-paper-form">
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Abstract:</label>
                        <textarea
                            value={abstract}
                            onChange={(e) => setAbstract(e.target.value)}
                            required
                            className="form-input"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Upload Paper:</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Co-Authors:</label>
                        <div className="co-author-input">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter co-author email"
                                className="form-input"
                            />
                            <button type="button" onClick={handleAddCoAuthor} className="add-coauthor-button">
                                Add
                            </button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <ul className="co-author-list">
                            {collaborators.map((collaborators, index) => (
                                <li key={index} className="co-author-item">
                                    {collaborators}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCoAuthor(collaborators)}
                                        className="remove-coauthor-button"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="submit-paper-button">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default SubmitPaper;
