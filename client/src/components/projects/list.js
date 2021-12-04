import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, CardHeader, CardText, CardTitle } from 'reactstrap';
import Moment from 'moment';

const ProjectList = (props) => {

    const navigate = useNavigate();

    const eliminar = (e, id) => {
        e.stopPropagation();
        if (id) {
            props.eliminar(id);
        }
    }

    const moveToProgress = (e, data) => {
        e.stopPropagation();
        data.status = 'inprogress';
        props.accion(data);
    }

    const moveToComplete = (e, data) => {
        e.stopPropagation();
        data.status = 'completed';
        props.accion(data);
    }

    const newProject = (e, id) => {
        e.stopPropagation();
        navigate('/projects/new')
    }

    return (
        <>
            <CardGroup>
                <Card>
                    <CardHeader>Backlog</CardHeader>
                    <CardBody className='scroll'>
                        {props.list && props.list.filter((project) => project.status === 'backlog')
                        .sort((a, b) => {
                            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
                        }).map((elem, i) => <>
                            <Card key={elem._id}>
                                <CardBody>
                                    <CardTitle tag="h5">{elem.project}</CardTitle>
                                    {Moment() > Moment(elem.due_date) &&
                                        <CardText style={{color: 'red'}}>Due: {Moment(elem.due_date).format('DD/MM/YYYY')}</CardText>
                                    }
                                    {Moment() < Moment(elem.due_date) &&
                                        <CardText>Due: {Moment(elem.due_date).format('DD/MM/YYYY')}</CardText>
                                    }
                                    <Button onClick={e => moveToProgress(e, elem)}>Start Project</Button>
                                </CardBody>
                            </Card>
                            <br />
                        </>)}
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>In Progress</CardHeader>
                    <CardBody className='scroll'>
                        {props.list && props.list.filter((project) => project.status === 'inprogress')
                        .sort((a, b) => {
                            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
                        }).map((elem, i) => <>
                            <Card key={elem._id}>
                                <CardBody>
                                    <CardTitle tag="h5">{elem.project}</CardTitle>
                                    {Moment() > Moment(elem.due_date) &&
                                        <CardText style={{color: 'red'}}>Due: {Moment(elem.due_date).format('DD/MM/YYYY')}</CardText>
                                    }
                                    {Moment() < Moment(elem.due_date) &&
                                        <CardText>Due: {Moment(elem.due_date).format('DD/MM/YYYY')}</CardText>
                                    }
                                    <Button onClick={e => moveToComplete(e, elem)}>Move to Completed</Button>
                                </CardBody>
                            </Card>
                            <br />
                        </>)}
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>Completed</CardHeader>
                    <CardBody className='scroll'>
                        {props.list && props.list.filter((project) => project.status === 'completed')
                        .sort((a, b) => {
                            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
                        }).map((elem, i) => <>
                            <Card key={elem._id}>
                                <CardBody>
                                    <CardTitle tag="h5">{elem.project}</CardTitle>
                                    {Moment() > Moment(elem.due_date) &&
                                        <CardText style={{color: 'red'}}>Due: {Moment(elem.due_date).format('DD/MM/YYYY')}</CardText>
                                    }
                                    {Moment() < Moment(elem.due_date) &&
                                        <CardText>Due: {Moment(elem.due_date).format('DD/MM/YYYY')}</CardText>
                                    }
                                    <Button onClick={e => eliminar(e, elem._id)}>Remove Project</Button>
                                </CardBody>
                            </Card>
                            <br />
                        </>)}
                    </CardBody>
                </Card>
            </CardGroup>
            <br/>
            <Button onClick={newProject}>Add new Project</Button>
        </>
    );
}

export default ProjectList;