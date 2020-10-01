import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import {Container, Alert} from './../../../components';
import { login  } from '../../../api';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login(){
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [dataValidation, setDataValidation] = useState({
        email: false,
        password: false,
    });

    const [valid, setValid] = useState(false);
    const [alertData, setAlertData] = useState({open: false, handleClose: () => setAlertData({...alertData, open: false}), title: "Success", message: "User Added"});

    const store = async () => {

        if(data.email && data.password){
            const res = await login(data);
            if(res.status === "success"){
                setAlertData({...alertData, open: true, title: "Success", message: res.message});
                localStorage.setItem('token', res.data.token);
                history.push("/admin/home");
            }else{
                setAlertData({...alertData, open: true, title: "Error", message: res.message});
            }
        }
    }

    useEffect( () => {

        if(!data.email || !data.password){
            setValid(false);
        }else{
            setValid(true);
        }

    }, [data]);

    if(localStorage.getItem('token')){
        history.push("/admin/home");

        return null;
    }

    return(
        <Container>
            <div className="login-container">
                <div className="login-form">
                    <Typography variant="h6" style={{margin: "8px"}} align="center"> Login </Typography>
                    <div className="input-container">
                        <TextField
                            required
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            label="Email"
                            variant="outlined"
                            onBlur={() => setDataValidation({...dataValidation, email: data.email === ""})}
                            error={dataValidation.email}
                            helperText={dataValidation.email ? "This field is required" : ""}
                        />
                    </div>
                    <div className="input-container">
                        <TextField
                            required
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({...data, password: e.target.value})}
                            label="Password"
                            variant="outlined"
                            onBlur={() => setDataValidation({...dataValidation, password: data.password === ""})}
                            error={dataValidation.password}
                            helperText={dataValidation.password ? "This field is required" : ""}
                        />
                    </div>
                    <Button disabled={!valid} onClick={() => store()} variant="contained" color="primary" style={{marginTop: 16}}> Login </Button>
                </div>
            </div>
            <Alert {...alertData} />
        </Container>
    )
}