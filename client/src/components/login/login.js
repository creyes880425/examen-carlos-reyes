import { useContext, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, } from "reactstrap";
import UserContext from "../../context/user-context";

const initialState = {
    username: '',
    password: ''
}

const LoginForm = (props) => {


    const [inputs, setInputs] = useState(initialState);
    const context = useContext(UserContext);

    const formUpdate = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        context.login(inputs);
        setInputs(initialState);
    }

    return (
        <Col>
            <h1>Login</h1>

            <Form onSubmit={formSubmit}>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="username" value={inputs.username} onChange={formUpdate} required maxLength={50} />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6} />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </Col>
    );
}

export default LoginForm;
