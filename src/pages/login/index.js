import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux'
import {
    useHistory
} from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    const dispatch = useDispatch()
    const login = () => {
        if (username && password) {
            dispatch({ type: "SET_USER", username })
            history.push("/Home");
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Card style={{ width: '40%', maxWidth: 450, display: 'flex', alignItems: 'center', padding: 20, flexDirection: 'row', justifyContent: 'center' }}>
                <div>
                    <div>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User" />
                        </span>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <span className="p-input-icon-left">
                            <i className="pi pi-lock" />
                            <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" feedback={false} />
                        </span>
                    </div>
                    <div style={{ marginTop: 20 }}><Button label="Login" style={{ width: '100%' }} onClick={login}></Button></div>
                </div>
            </Card>
        </div>
    )
}

export default Login