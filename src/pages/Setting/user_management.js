// import React from 'react'

// import API from './../../services/apiRoot';

// class Test_User_Manage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedFile: null
//     }
//   }
   
//   // On file select (from the pop up) 
//   onChangeHandler = event => {
//     this.setState({ 
//       selectedFile: event.target.files[0],
//       loaded: 0,
//     }); 
//   }; 
   
//   // On file upload (click the upload button) 
//   onClickHandler = () => { 
//     const data = new FormData(); 
//     data.append( 
//       "myFile", 
//       this.state.selectedFile, 
//       this.state.selectedFile.name 
//     ); 
//     API.post("api/testmanagement", data, {
//     }).then(res => {
//       console.log(res.statusText)
//     })
//   }; 
   
//   // File content to be displayed after 
//   // file upload is complete 
//   fileData = () => { 
   
//     if (this.state.selectedFile) { 
        
//       return ( 
//         <div> 
//           <h2>File Details:</h2> 
//           <p>File Name: {this.state.selectedFile.name}</p> 
//           <p>File Type: {this.state.selectedFile.type}</p> 
//           <p> 
//             Last Modified:{" "} 
//             {this.state.selectedFile.lastModifiedDate.toDateString()} 
//           </p> 
//         </div> 
//       ); 
//     } else { 
//       return ( 
//         <div> 
//           <br /> 
//           <h4>Choose before Pressing the Upload button</h4> 
//         </div> 
//       ); 
//     } 
//   }; 
   
//   render() { 
   
//     return ( 
//       <div> 
//           <h1> 
//             GeeksforGeeks 
//           </h1> 
//           <h3> 
//             File Upload using React! 
//           </h3> 
//           <div> 
//               <input type="file" onChange={this.onChangeHandler} /> 
//               <button onClick={this.onClickHandler}> 
//                 Upload! 
//               </button> 
//           </div> 
//         {this.fileData()} 
//       </div> 
//     ); 
//   } 
// } 
// export default Test_User_Manage;

