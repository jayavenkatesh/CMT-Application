// import React from 'react';
// import { Link } from 'react-router-dom';
// // import './Home.css'; // Optional: import CSS for styling

// const Home = (userEmail) => {
//     return (
//         <div className="home-container">
//             <h1>Welcome to the Conference Management Tool</h1>
//             <div className="tabs">
//                 <Link to={`/MyConferences?userEmail=${userEmail}`} className="tab">My Conferences</Link>
//                 <Link to="/all-conferences" className="tab">All Conferences</Link>
//             </div>
//         </div>
//     );
// };

// export default Home;





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';
// import { getAllConferences } from './api.jsx'; // Import the API function
// import './home.css';

// const MainPage = ({ username, userEmail }) => {
//   const [activeTab, setActiveTab] = useState('myConferences');
//   const [allConferences, setAllConferences] = useState([]);
//   const [myConferences, setMyConferences] = useState([]);

//   // Fetch conferences when "All Conferences" tab is clicked
//   useEffect(() => {
//     if (activeTab === 'allConferences') {
//       const fetchConferences = async () => {
//         try {
//           const response = await getAllConferences();
//           setAllConferences(response.data); // Set the response data to state
//         } catch (error) {
//           console.error('Error fetching conferences:', error);
//         }
//       };
//       fetchConferences();
//     }
//   }, [activeTab]);

//   // Filter "My Conferences" based on the userEmail
//   useEffect(() => {
//     setMyConferences(
//       allConferences.filter(conference => 
//         conference.registeredEmails && conference.registeredEmails.includes(userEmail)
//       )
//     );
//   }, [allConferences, userEmail]);

//   return (
//     <div>
//       <Navbar username={username} />
//       <div className="conference-list-container">
//         <h2>Conference List</h2>
//         <div className="tabs">
//           <button
//             className={activeTab === 'myConferences' ? 'active' : ''}
//             onClick={() => setActiveTab('myConferences')}
//           >
//             My Conferences ({myConferences.length})
//           </button>
//           <button
//             className={activeTab === 'allConferences' ? 'active' : ''}
//             onClick={() => setActiveTab('allConferences')}
//           >
//             All Conferences
//           </button>
//         </div>
//         <input type="text" placeholder="Type to filter…" className="filter-input" />
        
//         {/* Render the correct list based on the active tab */}
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Description</th>
//               {/* <th>Location</th>
//               <th>External URL</th>
//               <th>Contact</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {(activeTab === 'myConferences' ? myConferences : allConferences).map(conference => (
//               <tr key={conference.id}>
//                 <td>
//                   <Link to={`/conference/${conference.id}`}>{conference.name}</Link>
//                 </td>
//                 <td>{conference.startDate}</td>
//                 <td>{conference.endDate}</td>
//                 <td>{conference.description}</td>
//                 {/* <td><a href={conference.externalUrl} target="_blank" rel="noopener noreferrer">{conference.externalUrl}</a></td>
//                 <td>{conference.contact}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MainPage;



// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserConferences, getAllConferences, getUserByMail } from './api';
import './home.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = ({ userEmail }) => {
  const [activeTab, setActiveTab] = useState('myConferences');
  const [myConferences, setMyConferences] = useState([]);
  const [allConferences, setAllConferences] = useState([]);
  const [role,setRole]=useState("");
  const navigate=useNavigate();
  //const username="jaya";

  // Fetch "My Conferences"
  useEffect(() => {
    if (activeTab === 'myConferences') {
      const loadMyConferences = async () => {
        try {
          const conferences = await fetchUserConferences(userEmail);
          setMyConferences(conferences);
        } catch (error) {
          console.error('Error fetching user conferences:', error);
        }
      };
      loadMyConferences();
    }
  }, [activeTab, userEmail]);

  // Fetch "All Conferences"
  useEffect(() => {
    if (activeTab === 'allConferences') {
      const loadAllConferences = async () => {
        try {
          const conferences = await getAllConferences();
          setAllConferences(conferences);
        } catch (error) {
          console.error('Error fetching all conferences:', error);
        }
      };
      loadAllConferences();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'createConference') {
      navigate('/createConference')
    }
  }, [activeTab]);

  useEffect(()=>{
    const result=async()=> {const role= await getUserByMail(userEmail); setRole(role.data) }
    result();
  },[userEmail])
  const displayedConferences = activeTab === 'myConferences' ? myConferences : allConferences;

  return (
    <div>
      
      <Navbar />
      <h2>Welcome to the CMT</h2>
      <div className="conference-list-container">
        <div className="tabs">
          <button  className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('myConferences')} disabled={activeTab === 'myConferences'}  >
            My Conferences
          </button>
          <button  className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('allConferences')} disabled={activeTab === 'allConferences'}>
            All Conferences
          </button>
          
         {(role==="chairPerson") && <button  className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('createConference')} disabled={activeTab === 'createConference'}>
            Create Conference
          </button>}
        </div>
        
      </div>
      <div>
      <input type="text" placeholder="Type to filter…" className="filter-input" />
        <h3>{activeTab === 'myConferences' ? 'My Conferences' : 'All Conferences'}</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {displayedConferences.map((conf) => (
              <tr key={conf.id}>
                <td><Link to={`/conference/${conf.id}`}>{conf.name}</Link></td>
                {/* <td><Link to={`/submit/`}>{conf.name}</Link></td> */}
                <td>{conf.startDate}</td>
                <td>{conf.endDate}</td>
                <td>{conf.description}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;


