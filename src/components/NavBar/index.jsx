import React, { useContext } from 'react';
import { Navbar, Image, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';
import logo from '@assets/logo/Logo_585x166.svg';
import SearchBar from './SearchBar';
import AuthContext from '../Auth/AuthContext';
import GuestButton from './GuestButton';
import UserMenu from './UserMenu';

function NavBarComponent() {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>
              <Image src={logo} alt="Vstay" height="50px" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-block d-lg-flex w-100 align-items-center">
              <div className="flex-grow-1 d-block mt-2 mb-2">
                <SearchBar />
              </div>
              {isAuth && (
                <div className="d-block ">
                  <UserMenu />
                </div>
              )}
              {!isAuth && (
                <div className="d-flex justify-content-end">
                  <GuestButton />
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarComponent;
