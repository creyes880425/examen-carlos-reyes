import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import UserContext from "../../context/user-context";
import MascotaAdmin from '../projects/admin';
import axios from "axios";
import Swal from "sweetalert2";
import { Auth } from "../login/auth";


const Home = (props) => {

    const SESSION_USER = 'SESSION_USER';

    const [user, setUser] = useState(null);

    const login = (inputs) => {
        axios.post('/api/login', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    setUser(resp.data.data);
                    sessionStorage.setItem(SESSION_USER, JSON.stringify(resp.data.data));
                    navigate('/');
                } else {
                    Swal.fire('Login', resp.data.message, 'error');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const logout = () => {
        setUser(null);
        sessionStorage.clear();
        navigate('/sign_in');
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_USER)) {
            setUser(JSON.parse(sessionStorage.getItem(SESSION_USER)));
            navigate('/');
        } else {
            navigate('/sign_in');
        }

    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            <Routes>
                <Route path="/sign_in" element={<Auth />} />
                <Route path="/*" element={<MascotaAdmin />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default Home;