// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Auth from './components/Auth';
// import ConferenceList from './components/ConferenceList';
// import MyConferences from './components/MyConferences';
// import CreateConference from './components/CreateConference.jsx';
// import SubmitPaper from './components/SubmitPaper';
// import Home from './components/Home';


// function App() {
//   const [role, setRole] = useState(null);
//   const [userEmail, setUserEmail] = useState('');

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/login" element={<Auth /*setRole={setRole}*/ setter={userEmail}/>} />
//           <Route path="/all-conferences" element={<ConferenceList />} />
//           <Route path='/home' element={<Home userEmail={userEmail}/>} />
//           <Route path={`/MyConferences?userEmail=${userEmail}`} element={<MyConferences userEmail={userEmail} />} />
//           {role === 'chairPerson' && (
//             <Route path="/createConference" element={<CreateConference userEmail={userEmail} />} />
//           )}
//           <Route path="/submitPaper" element={<SubmitPaper />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






// App.jsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Auth';
// import Home from './components/Home';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState('');

//   const handleLogin = (email) => {
//     setIsLoggedIn(true);
//     setUserEmail(email);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
//         <Route path="/home" element={isLoggedIn ? <Home userEmail={userEmail} /> : <Navigate to="/login" />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;












// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth';
import Home from './components/Home';
import ConferenceDetails from './components/ConferenceDetails';
import SubmissionForm from './components/SubmissionForm';
import { RecoilRoot, useRecoilState } from 'recoil';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedIn);
  const [userEmail, setUserEmail] = useRecoilState(userEmail);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  return (
    <RecoilRoot>
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/home" element={isLoggedIn ? <Home userEmail={userEmail} /> : <Navigate to="/login" />} />
        <Route
          path="/conference/:conferenceId"
          element={isLoggedIn ? <ConferenceDetails userEmail={userEmail} /> : <Navigate to="/login" />}
        />
        <Route
          path="/submit/:conferenceId"
          element={isLoggedIn ? <SubmissionForm userEmail={userEmail} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </RecoilRoot>
  );
}

export default App;
