import React, { useState } from 'react';
import './ChangeEmail.css';

const ChangeEmail = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Email</h2>
        <form>
          <div className="form-group">
            <label htmlFor="currentEmail">* Current Email</label>
            <input
              type="email"
              id="currentEmail"
              placeholder="Current Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newEmail">* New Email</label>
            <input
              type="email"
              id="newEmail"
              placeholder="New Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmEmail">* Confirm Email</label>
            <input
              type="email"
              id="confirmEmail"
              placeholder="Confirm Email"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="ok-button">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
