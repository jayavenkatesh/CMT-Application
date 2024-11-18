import React, { useState } from 'react';
import { createConference } from './api';
import { useRecoilValue } from 'recoil';
import { newemail } from '../States';
import { useNavigate } from 'react-router-dom';
import './CreateConference.css';
import Navbar from './Navbar';

const CreateConference = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const userEmail=useRecoilValue(newemail)
  const Navigate=useNavigate()
  const handleCreate = async (e) => {
    e.preventDefault();
    await createConference({ name:name, startDate:startDate,endDate:endDate,description:description,email:userEmail });
    //alert('Conference created successfully');
    Navigate('/home')
  };

  return (
    <><Navbar /><form onSubmit={handleCreate}>

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Conference Name" required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Create Conference</button>

    </form></>
  );
};

export default CreateConference;
