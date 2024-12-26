"use client";
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import Notification from '@/components/Notification/Notification';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      <Notification
        toastertype="loading"
        msg="Signing up..."
        position="top-center"
        duration='4000'
        className="loading-toast"
      />
      const response = await  axios.post('/api/user/login', user)
      console.log("login Sucessful");
      <Notification
        toastertype="success"
        msg="signup succesf"
        className="success-toast"
      />
      setTimeout(() => router.push('/profile'), 1000);

    } catch (error) {
      console.log('login failed', error);
      <Notification
        toastertype="error"
        msg="login failed"
        className="error-toast"
      />
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.password.length < 8) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

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
        <Link href='/signin'>Visi signin page</Link>
      </form>
    </div>
  );
}

export default Page;
