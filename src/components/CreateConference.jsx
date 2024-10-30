import React, { useState } from 'react';
import { createConference } from './api';

const CreateConference = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    await createConference({ name, description, date });
    alert('Conference created successfully');
  };

  return (
    <form onSubmit={handleCreate}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Conference Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Create Conference</button>
    </form>
  );
};

export default CreateConference;
