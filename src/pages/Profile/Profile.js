// import React, { useState } from "react";
// import Header from "../../components/header/Header";
// import { Container, Row, Col, Image, Button } from "react-bootstrap";

// const Profile = ({props}) => {
//   const gravatarUrl = props.gravatarUrlProp;
//   console.log(gravatarUrl)

//   return (
//     <>
//       <Header />

//       <div className="d-flex justify-content-center">
//         <Container className="mt-3" style={{ textAlign: "center" }}>
//           <Row>
//             <Col md={4}>
//               <Image
//               src= {(props.gravatarUrlProp)} roundedCircle
//                 // src="https://via.placeholder.com/250" roundedCircle fluid
//                 />
//             </Col>
//             <Col md={8}>
//               {/* <h2>{props.thoughtshit.username}</h2> */}
//               <p>This is a bio paaaage</p>
//               <Button variant="primary">Edit Profile</Button>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Profile;

// // get the users gravatar pic to show up in this profile.js component.

import React from "react";
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const Profile = ({ username, gravatarUrlProp }) => {
  console.log(username)


  return (
    <>
      <Header />

      <div className="d-flex justify-content-center">
        <Container className="mt-3" style={{ textAlign: "center" }}>
          <Row>
            <Col md={4}>
              <Image src={gravatarUrlProp} roundedCircle fluid />
            </Col>
            <Col md={8}>
              <h2>{username}</h2>
              <p>This is a bio paaaaage</p>
              <Button variant="primary">Edit Profile</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
