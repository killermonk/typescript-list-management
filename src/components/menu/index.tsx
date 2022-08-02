import * as React from "react";
import { defaultMenu as DefaultMenuConst } from "@constants/Menus";
import { Navbar, Nav, Container } from 'react-bootstrap';


const Menu = () => {
    return (
        <Container>
            <Navbar.Brand href="/"></Navbar.Brand>
            <Nav className="me-auto">
                { DefaultMenuConst.map((item, idx) => (
                    <Nav.Link key={idx} href={item.link}>
                        {item.title}
                    </Nav.Link>
                )) }
            </Nav>
        </Container>
    );
}

export default Menu;