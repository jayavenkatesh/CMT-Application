import React, { useState } from 'react';
import { login } from './api.jsx';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import logo from './vitlogo.png';


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // setter(email);
        e.preventDefault();
        try {
            await login({ email:email, password:password });
            onLogin(email)
            //alert('Login successful');
            navigate('/Home'); // Redirect to home on successful login
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="CMT Logo" className="login-logo" />
            <h2>Conference Management TolKit (CMT)</h2>
            {/* <h1>Login</h1> */}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="form-group">

                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                {/* {error && <div className="error-message">{error}</div>} */}
                <button type="submit">Login</button>
                
                
            </form>
            <div className="links">
        <a href="#">Forgot your password?</a>
        <a href="#">New to CMT? Register</a>
      </div>
        </div>

    );
};

export default Login;



// //Auth.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//      const handleLogin = async (e) => {
//         // setter(email);
//         e.preventDefault();
//         try {
//             await login({ email, password });
//             //alert('Login successful');
//             navigate('/home'); // Redirect to home on successful login
//         } catch (err) {
//             console.error(err);
//             alert('Login failed');
//         }
//     };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
       
//         <button type="submit">Login</button>
//       </form>
//       <div className="links">
//         <a href="#">Forgot your password?</a>
//       <Link to="/CreateForm">New to CMT? Register</Link>
//       </div>
//     </div>
//   );
// };

// export default Login;





// Login.jsx
// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }

//     const username = email.split('@')[0];
//     onLogin(username, email); // Pass both username and email to App
//     setError(''); // Clear any previous errors
//   };

//   return (
//     <div className="login-container">
//       <h2>Microsoft CMT</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         <button type="submit">Log In</button>
//       </form>
//       <div className="links">
//         <a href="#">Forgot your password?</a>
//         <a href="#">New to CMT? Register</a>
//       </div>
//     </div>
//   );
// };

// export default Login;
