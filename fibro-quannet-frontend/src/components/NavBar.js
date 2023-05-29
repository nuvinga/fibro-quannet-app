import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBTypography
} from "mdb-react-ui-kit";

const NavBar = () => {
  const [showNavColorThird, setShowNavColorThird] = useState(true);

  return (
    <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/predict">
          <MDBTypography tag="div" className="display-6">
            Fibro-QuanNet
          </MDBTypography>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColorThird(!showNavColorThird)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColorThird} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
              <MDBNavbarLink aria-current="page" href="predict">
                Predict
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="docs">Documentation</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar;
