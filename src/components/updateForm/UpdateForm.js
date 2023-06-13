// import React, { useState } from "react";
// import { Redirect, withRouter } from "react-router-dom";
// import { Form, Button, Alert } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// function UpdateForm() {
//   const { username } = useParams();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     bio: "",
//   });

//   const handleChange = (event) => {
//     const { id, value } = event.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${username}`, {
//         method: "PUT", // Use PUT method for update
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.status < 200 || response.status > 299) {
//         throw Error(response.statusText);
//       }
//       setSuccess(true);

//       const data = await response.json();
//       console.log("user updated:", data);
//     } catch (error) {
//       console.error(error.message);
//       setErrorMessage("Update failed!");
//     }
//   };

//   if (success) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div className="UpdateForm container">
//       {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

//       <h2 className="text-center">Update {username}</h2>
//       <Form >

//         <Form.Group controlId="fullName">
//           <Form.Label>Full Name</Form.Label>
//           <Form.Control
//             onChange={handleChange}
//             value={formData.fullName}
//             type="text"
//             placeholder="Enter your full name"
//           />
//         </Form.Group>

//         <Form.Group controlId="bio">
//           <Form.Label>Bio</Form.Label>
//           <Form.Control
//             onChange={handleChange}
//             value={formData.bio}
//             type="text"
//             placeholder="Why aren't you telling me anything"
//           />
//         </Form.Group>

//         <Button onClick={handleSubmit} variant="primary" type="submit">
//           Update
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default withRouter(UpdateForm);

// *******************************************************
import React, { useState } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

function UpdateForm() {
  const history = useHistory();
  const { username } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${username}`, {
        method: "PUT", // Use PUT method for update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      }

      // Redirect back to the profile page
      history.push(`/profile/${username}`);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Update failed!");
    }

    console.log("buttlog")

  };

  return (
    <div className="UpdateForm container">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <h2 className="Luckyguy">Update{username}</h2>
      <Form className="Luckyguy">
        <Form.Group  controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.fullName}
            type="text"
            placeholder="Enter your full name"
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.bio}
            type="text"
            placeholder="Why aren't you telling me anything"
          />
        </Form.Group>

        <Button   onClick={handleSubmit}  style={{ color: "black" }} variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(UpdateForm);
