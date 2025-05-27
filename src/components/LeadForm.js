import React, { useState } from 'react';
import axios from 'axios';
import './LeadForm.css';

function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      return setStatus('Name and Email are required.');
    }

    try {
      await axios.post(process.env.REACT_APP_API_URL, form);
      setStatus('Lead submitted successfully!');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setStatus('Error submitting lead.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Lead Generation Form</h2>

      <input
        className="input"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name *"
        required
      />

      <input
        className="input"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email *"
        required
      />

      <input
        className="input"
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company (optional)"
      />

      <textarea
        className="textarea"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message (optional)"
        rows="4"
      />

      <button className="button" type="submit">Submit</button>
      <p className={`status ${status.includes('Error') ? 'error' : ''}`}>
        {status}
      </p>
    </form>
  );
}

export default LeadForm;
