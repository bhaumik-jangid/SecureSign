import React from 'react';
import './globals.css';
interface HomePageProps {
  data: object;
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
// async function getServerSideProps() {
//   try {
//     const res = await fetch('https://api.example.com/data');  // Replace with your API URL
//     const data = await res.json();

//     // If the API call fails, return a default value or handle the error
//     if (!res.ok) {
//       return {
//         props: {
//           data: { message: 'Failed to fetch data' }
//         }
//       };
//     }

//     return {
//       props: {
//         data
//       }
//     };
//   } catch (error) {
//     return {
//       props: {
//         data: { message: 'Error fetching data' }
//       }
//     };
//   }
// }
export default HomePage;
