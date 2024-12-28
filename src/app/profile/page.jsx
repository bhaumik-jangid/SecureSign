'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

export default function ProfilePage() {
    const router = useRouter();
    const [response, setResponse] = useState({ status: 999, message: "Empty" });
    const [data, setData] = useState("Nothing");

    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/user/profile');
            setData(res.data.data._id);
        } catch (error) {
            if (
              error.response?.status === 400
            ) {
              document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              console.log("User does not exist. Redirecting to login...");
              router.push('/login');
            } else {
              console.error(error.message);
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post('/api/user/logout');
            router.push('/login');
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteUser = async () => {
        try {
          if (!data) {
            setResponse({ status: 400, message: "Invalid user ID" });
            return;
          }
      
          const id = { id: data };
      
          const res = await axios.post("/api/user/deleteUser", id, {
            validateStatus: (status) => status < 500,
          });
      
          if (res.status === 404) {
            setResponse({ message: "User not found", status: 404 });
          } else if (res.status === 200) {
            setResponse({ message: "User deleted successfully", status: 200 });
            setTimeout(() => router.push("/login"), 2000);
          }
        } catch (error) {
          console.error("Unexpected Error:", error);
          
          if (axios.isAxiosError(error) && error.response) {
            // Extract error message from API response
            setResponse({
              message: error.response.data.error || "An error occurred. Please try again.",
              status: error.response.status,
            });
          } else {
            // Handle unexpected errors
            setResponse({
              message: "Server error",
              status: 500,
            });
          }
        }
    };

  return (
    <>
        <div>
            <div>
                <h1>Profile Page</h1>
                {data === "Nothing" ? <p>Nothing</p> : <Link href={`/profile/${data}`}>{data}</Link>}
            </div>
            <div>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <button onClick={getUserDetails}>getUserDetails</button>
            </div>
            <div>
                <button onClick={deleteUser}>Delete User</button>
                {response.status !== 999 && (
                    <div>
                    <h2>{response.message}</h2>
                    {response.status === 200 && <h3>Redirecting to login page...</h3>}
                    </div>
                )}
            </div>
        </div>
    </>
  )
}