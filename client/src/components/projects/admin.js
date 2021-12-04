import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import Header from '../home/header';
import ProjectForm from './form';
import ProjectList from './list';

const ProjectAdmin = (props) => {

    const [list, setList] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/projects')
            .then(resp => {
                setList(resp.data.data);
            })
            .catch(error =>
                swal.fire('Error', error.message, 'error'));
    }, [actualizar]);

    const editar = (data) => {
        axios.put(`/api/projects/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar el proyecto', error?.message, 'error'));
    }

    const eliminar = id => {
        if (id) {
            Swal.fire({
                title: 'Eliminar el proyecto',
                text: '¿Esta seguro que desea eliminar el proyecto',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(resp => {
                if (resp.isConfirmed) {
                    axios.delete(`/api/projects/${id}`)
                        .then(resp => {
                            const lista = [...list];
                            lista.splice(lista.findIndex(e => e._id === id), 1);
                            setList(lista);
                        }).catch(error => Swal.fire('Error al eliminar el proyecto', error?.message, 'error'));
                }
            })
        }
    }

    return <Container>
        <Header />
        <Routes>
            <Route index element={<ProjectList list={list} accion={editar} eliminar={eliminar} />} />
            <Route path="/projects/new" element={<ProjectForm setList={setList}  list={list}/>} />
        </Routes>
    </Container>;
}

export default ProjectAdmin;