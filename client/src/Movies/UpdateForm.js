// Part 1:
// Create a component with a form to update the chosen movie
// The form should make a PUT request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

// Movie object format:
//          {
//            id: 5,
//            title: 'Tombstone'
//            director: 'George P. Cosmatos',
//            metascore: 89,
//            stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//           }

import React from 'react';

const UpdateForm = () => {
  return (
    <div>
      <h1>Update Movie</h1>
    </div>
  );
};

export default UpdateForm;