"use client";
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import Notification from '@/components/Notification/Notification';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })
  const [loading, setLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await  axios.post('/api/user/signup', user)
      setTimeout(() => router.push('/login'), 2000);

    } catch (error) {
      console.log('signup failed', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={onSignup} className="form">
        <div className="form-header">
          <h1>Register Form</h1>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            className="form-input"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            required
          />
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
            {loading ? 'Loading...' : 'Register'}
          </button>
        </div>
        <Link href='/login'>Visi login page</Link>
      </form>
    </div>
  );
}

export default Page;
