import { useContext } from "react";
import { Button, Col, Row } from "reactstrap";
import UserContext from "../../context/user-context";

const Header = (props) => {
    const context = useContext(UserContext);

    const logout = e => {
        context.logout();
    }

    return (
        <>
            <Row>
                <Col xs={10}>
                    <h6>Welcome {context.user?.name}</h6>
                </Col>
                <Col xs={2}>
                    <Button onClick={logout}>LogOut</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{ textAlign: 'center' }}>
                    <h1>Project Manager</h1>
                </Col>
            </Row>
        </>
    );
}

export default Header;