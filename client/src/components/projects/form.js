import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const initialState = {
    project: '',
    due_date: '',
    status: ''
}

const ProjectForm = (props) => {

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();

    const actualizarValor = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const volver = e => {
        e.stopPropagation();
        navigate('../')
    }

    const guardar = (e) => {
        e.preventDefault();
        const data = { ...inputs };
        data.status = 'backlog';
        axios.post('/api/projects', data)
            .then(resp => {
                if (resp.data.error) {
                    const errorArr = [];
                    for (const key of Object.keys(resp.data.error.errors)) {
                        errorArr.push(resp.data.error.errors[key].message)
                    }
                    var errors = errorArr.join(',');
                    Swal.fire('Error al crear el proyecto', errors, 'error')
                } else {
                    props.setList([
                        ...props.list,
                        resp.data.data
                    ]);
                    navigate('/');
                }

            }).catch(error => {
                console.log(error);
                Swal.fire('Error al crear el proyecto', error?.message, 'error')
            });
    }

    return <>
        <br />
        <Col md={{ offset: 3, size: 6 }} sm="12">
            <Row>
                <h4>Plan a new project</h4>
            </Row>
            <Row>
                <Form onSubmit={guardar}>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Label htmlFor="project">Project:</Label>
                                <Input id="project" type="text" minLength={3} required name="project" value={inputs.project} onChange={actualizarValor} />
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <Label htmlFor="due_date">Due Date:</Label>
                                <Input id="due_date" name="due_date" type="date" required value={inputs.due_date} onChange={actualizarValor} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>

                        <Col xs={3}>
                            <Button type="submit">Guardar</Button>
                        </Col>
                        <Col xs={3}>
                            <Button type="button" onClick={volver}>Volver</Button>
                        </Col>

                    </Row>
                </Form>
            </Row>
        </Col>
    </>
}

export default ProjectForm;