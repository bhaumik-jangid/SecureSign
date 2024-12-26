// import Image from "next/image";
// import './globals.css'
// import Notification from "../components/Notification/Notification"

// export default function Home() {
//   return (
//     <>
//       <Notification
//   toastertype="success"
//   msg="Success notification message!"
//   duration={4000}
//   position="top-right"
//   style={{ background: 'green', color: 'white', fontSize: '1rem' }}
//   icon={<i className="fas fa-check-circle"></i>}
//   closeButton={false}
//   draggable={true}
//   pauseOnHover={false}
// />
// <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
// <h1 className="text-3xl underline">
//       Hello world!
//     </h1>
//     </>
//   );
// }


// pages/index.js

import React from 'react';

interface HomePageProps {
  data: any; // Replace 'any' with the appropriate type if known
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Fetch data on the server side using getServerSideProps
async function getServerSideProps() {
  try {
    const res = await fetch('https://api.example.com/data');  // Replace with your API URL
    const data = await res.json();

    // If the API call fails, return a default value or handle the error
    if (!res.ok) {
      return {
        props: {
          data: { message: 'Failed to fetch data' }
        }
      };
    }

    return {
      props: {
        data
      }
    };
  } catch (error) {
    return {
      props: {
        data: { message: 'Error fetching data' }
      }
    };
  }
}

export default HomePage;
