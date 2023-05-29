import React from "react";
import {
  MDBFooter,
  MDBContainer,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#0a4275" }}
    >
      <MDBContainer className="p-4 pb-0">
        <section className="">
          <p className="d-flex justify-content-center align-items-center">
            <span className="me-3">Nuwin Godakanda Arachchi  |  2019443  |  W1761350</span>
          </p>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023: Fibro-QuanNet
      </div>
    </MDBFooter>
  );
}

export default Footer;
