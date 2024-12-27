"use client";
import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const [response, setResponse] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    setResponse('Logging in...');
    e.preventDefault();
    try {
      setLoading(true);
      const res = await  axios.post('/api/user/login', user);
      setResponse(res.data.message);
      setTimeout(() => router.push('/profile'), 1000);
    } catch (error) {
      console.log('login failed', error);
      setResponse('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
      
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={onLogin} className="form">
        <div className="form-header">
          <h1>Login Form</h1>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            required
          />
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
        <div>
          <p className='response'>{response}</p>
        </div>
        <div className="form-footer">
          <Link href='/signin'>Visi signin page</Link>
        </div>
      </form>
    </div>
  );
}