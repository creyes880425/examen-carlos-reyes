import React from 'react'
import { Container, Row } from 'reactstrap'
import LoginForm from './login'
import RegisterForm from './register'

export const Auth = () => {
    return (
        <Container className="mt-5">
            <Row>
                <RegisterForm />
                <LoginForm />
            </Row>
        </Container>
    )
}
