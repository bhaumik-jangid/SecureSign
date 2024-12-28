"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Link from 'next/link';

export default function Page() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const verifyemail = async () => {
        try {
            await axios.post('/api/user/verifyemail', {token})
            setVerified(true)
            setStatusMessage("Email Verified");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // const errorMessage = error.response?.data?.message || "An error occurred.";
                setError(true)

                if (error.response?.status == 401) {
                    setStatusMessage("Verification link has expired. Please request a new one.");
                } else if (error.response?.status == 400) {
                    setStatusMessage("Invalid verification link. Please check your email or request a new one.");
                } else {
                    setStatusMessage("An unexpected error occurred. Please try again later.");
                }
                console.log(error.response?.data);
            } else {
                setStatusMessage("An unexpected error occurred. Please try again later.");
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    // Trigger email verification if token is present
    useEffect(() => {
        if (token) {
            verifyemail();
        }
    }, [token]);

    return (
    <div>
        <div>
            <h1>Verify Email</h1>
        </div>
        <div>
            <h2>
                {token ? `${token}` : "no token recieved"}
            </h2>
        </div>
        {!verified && !error ? (
            <div>
                <h2>Waiting for email verification...</h2>
            </div>
        ) : null}
        {verified && (
            <div>
                <h2>{statusMessage}</h2>
                <Link href="/login">Go to login</Link>
            </div>
        )}
        {error && (
            <div>
                <h2>{statusMessage}</h2>
            </div>
        )}
    </div>
  )
}