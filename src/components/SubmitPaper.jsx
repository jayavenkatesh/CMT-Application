import React, { useState } from 'react';
import { submitPaper } from './api.jsx';
//import './SubmitPaper.css'; // Import the CSS file

const SubmitPaper = ({ conferenceId }) => {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paper = { title, abstract, file };
        try {
            await submitPaper(paper, conferenceId);
            alert('Paper submitted successfully!');
            // Reset form or perform additional actions here
        } catch (error) {
            console.error("Error submitting paper:", error);
            alert('Submission failed. Please try again.');
        }
    };

    return (
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
                <button type="submit" className="submit-paper-button">Submit</button>
            </form>
        </div>
    );
};

export default SubmitPaper;
