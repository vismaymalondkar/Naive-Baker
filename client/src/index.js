import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// function App2() {
//     return (
//       <div>
//         <h1>React Autocomplete Demo</h1>
//         <h2>Start typing and experience the autocomplete wizardry!</h2>
//         <Autocomplete
//           suggestions={[
//             "Alligator",
//             "Bask",
//             "Crocodilian",
//             "Death Roll",
//             "Eggs",
//             "Jaws",
//             "Reptile",
//             "Solitary",
//             "Tail",
//             "Wetlands"
//           ]}
//         />
//       </div>
//     );
//   }
  
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<App />, document.getElementById('root'));
