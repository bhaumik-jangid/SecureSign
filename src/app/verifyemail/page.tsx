"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Link from 'next/link';

function page() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const verifyemail = async () => {
        try {
            const response = await axios.post('/api/user/verifyemail', {token})
            setVerified(true)
            setStatusMessage("Email Verified");
        } catch (error1: any) {
            const errorMessage = error1.response?.data?.message || "An error occurred.";
            setError(true)

            if (error1.response.status == 401) {
                setStatusMessage("Verification link has expired. Please request a new one.");
            } else if (error1.response.status == 400) {
                setStatusMessage("Invalid verification link. Please check your email or request a new one.");
            } else {
                setStatusMessage("An unexpected error occurred. Please try again later.");
            }
            console.log(error1.response.data);
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyemail();
        }
    }, [token])

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

export default page