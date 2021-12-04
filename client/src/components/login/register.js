import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, } from "reactstrap";
//import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const RegisterForm = (props) => {

    const [inputs, setInputs] = useState(initialState);

    const formUpdate = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/register', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    Swal.fire('Registro de Usuarios', resp.data.message, 'success');
                    setInputs(initialState);
                } else {
                    Swal.fire('Registro de Usuarios', resp.data.message, 'error');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Col>
            <h1>Register</h1>
            <Form onSubmit={formSubmit}>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input type="text" name="name" value={inputs.name} onChange={formUpdate} required maxLength={50} />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="email" value={inputs.email} onChange={formUpdate} required />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6} />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm:</Label>
                    <Input type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={formUpdate} required minLength={6} />
                </FormGroup>
                <Button type="submit">Register</Button>
            </Form>
        </Col>
    );
}

export default RegisterForm;