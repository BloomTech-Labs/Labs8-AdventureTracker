// import React, { Component } from 'react';
// import Mutation from 'react-apollo';
// import gql from 'graphql-tag';
// import Router from 'next/router';

// const CREATE_TRIP_MUTATION = gql`
//   mutation CREATE_TRIP_MUTATION($title: String!, $description: String, $markers: [Marker!]!) {
//     createTrip(title: $title, description: $description, markers: $markers) {
//       id
//     }
//   }
// `;

// class CreateTrip extends Component {
//   state = {
//     title: '',
//     description: '',
//     markers: []
//   };

//   handleChange = e => {
//     const { name, type, value } = e.target;
//     const val = type === 'number' ? parseFloat(value) : value;
//     this.setState({ [name]: value });
//   };
//   render() {
//     return (
//       <div>Testing</div>
//         <Mutation
//           mutation={CREATE_TRIP_MUTATION}
//           variables={this.state}
//           {...(createTrip, { loading, error, called, data }) => (
//             <Form
//               onSubmit={async e => {
//                 // Stop the form from submitting
//                 e.preventDefault();
//                 // call the mutation
//                 const res = await createTrip();
//                 // change them to the single trip page
//                 console.log(res);
//                 Router.push({
//                   pathname: '/triplist',
//                   query: { id: res.data.createTrip.id }
//                 });
//               }}
//             >
//               <fieldset>
//                 <label htmlfor="title">
//                   Title
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     placeholder="Title"
//                     required
//                     value={this.state.title}
//                     onChange={this.handleChange}
//                   />
//                 </label>
//                 <label htmlfor="description">
//                   Description
//                   <textarea
//                     id="description"
//                     name="description"
//                     placeholder="Enter A Description"
//                     required
//                     value={this.state.description}
//                     onChange={this.handleChange}
//                   />
//                 </label>
//                 <button type="submit">Submit</button>
//               </fieldset>
//             </Form>
//           )}
//         />
//     );
//   }
// }

// export default CreateTrip;
// // export { CREATE_TRIP_MUTATION };
