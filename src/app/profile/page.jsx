'use client';
import React , {useEffect, useState} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("Nothing");

    const getUserDetails = async () => {
        try {
            console.log("Getting user details");
            const res = await axios.post('/api/user/profile');
            setData(res.data.data._id);
        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = async () => {
        try {
            await axios.post('/api/user/logout');
            console.log('Logged out');
            router.push('/login');
        } catch (error) {
            console.error(error.message);
        }
    }

  return (
    <>
        <div>
            <div>fbdb
                <h1>Profile Page</h1>
                {data === "Nothing" ? <p>NOthing</p> : <Link href={`/profile/${data}`}>{data}</Link>}
            </div>
            <div>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <button onClick={getUserDetails}>getUserDetails</button>
            </div>
        </div>
    </>
  )
}