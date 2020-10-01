import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import {Container, Alert} from './../../../components';
import { userStore } from '../../../api';
import './Create.css';

export default function Create(){
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        ssn: "",
        address1: "",
        city: "",
        state: "",
        zipCode: ""
    });

    const [dataValidation, setDataValidation] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        ssn: false,
        address1: false,
        city: false,
        state: false,
        zipCode: false
    });

    const [valid, setValid] = useState(false);
    const [alertData, setAlertData] = useState({open: false, handleClose: () => setAlertData({...alertData, open: false}), title: "Success", message: "User Added"});

    const store = async () => {

        if(data.firstName && data.lastName && data.phoneNumber && data.ssn && data.address1 && data.city && data.state && data.zipCode){
            const res = await userStore(data);
            if(res.status === "success"){
                setAlertData({...alertData, open: true, title: "Success", message: res.message});
                setData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    ssn: "",
                    address1: "",
                    city: "",
                    state: "",
                    zipCode: ""
                });
            }else{
                setAlertData({...alertData, open: true, title: "Error", message: res.message});
            }
        }
    }

    useEffect( () => {

        if(!data.firstName || !data.lastName || !data.phoneNumber || !data.ssn || !data.address1 || !data.city || !data.state || !data.zipCode){
            setValid(false);
        }else{
            setValid(true);
        }

    }, [data]);

    return(
        <Container>
            <div className="container">
                <Typography variant="h4" style={{margin: "8px"}}> Create User Profile </Typography>
                <div className="user-information-container">
                    <Typography variant="h6" style={{margin: "8px"}} align="center"> Personal Information </Typography>
                    <div className="container-row">
                        <div className="input-container">
                            <TextField
                                required
                                value={data.firstName}
                                onChange={(e) => setData({...data, firstName: e.target.value})}
                                label="First Name"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, firstName: data.firstName === ""})}
                                error={dataValidation.firstName}
                                helperText={dataValidation.firstName ? "This field is required" : ""}
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                required
                                value={data.lastName}
                                onChange={(e) => setData({...data, lastName: e.target.value})}
                                label="Last Name"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, lastName: data.firstName === ""})}
                                error={dataValidation.lastName}
                                helperText={dataValidation.lastName ? "This field is required" : ""}
                            />
                        </div>
                    </div>
                    <div className="container-row">
                        <div className="input-container">
                            <TextField
                                required
                                value={data.phoneNumber}
                                onChange={(e) => setData({...data, phoneNumber: e.target.value})}
                                label="Phone Number"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, phoneNumber: data.phoneNumber === ""})}
                                error={dataValidation.phoneNumber}
                                helperText={dataValidation.phoneNumber ? "This field is required" : ""}
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                required
                                value={data.ssn}
                                onChange={(e) => setData({...data, ssn: e.target.value})}
                                label="SSN"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, ssn: data.ssn === ""})}
                                error={dataValidation.ssn}
                                helperText={dataValidation.ssn ? "This field is required" : ""}
                            />
                        </div>
                    </div>
                    <Typography variant="h6" style={{margin: "8px"}} align="center"> Address Information </Typography>
                    <div className="container-row">
                        <div className="input-container">
                            <TextField
                                required
                                value={data.address1}
                                onChange={(e) => setData({...data, address1: e.target.value})}
                                label="Address 1"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, address1: data.address1 === ""})}
                                error={dataValidation.address1}
                                helperText={dataValidation.address1 ? "This field is required" : ""}
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                value={data.address2}
                                onChange={(e) => setData({...data, address2: e.target.value})}
                                label="Address 2"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="container-row">
                        <div className="input-container">
                            <TextField
                                required
                                value={data.city}
                                onChange={(e) => setData({...data, city: e.target.value})}
                                label="City"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, city: data.city === ""})}
                                error={dataValidation.city}
                                helperText={dataValidation.city ? "This field is required" : ""}
                            />
                        </div>
                        <div className="input-container">
                            <TextField
                                required
                                value={data.state}
                                onChange={(e) => setData({...data, state: e.target.value})}
                                label="State"
                                variant="outlined"
                                onBlur={() => setDataValidation({...dataValidation, state: data.state === ""})}
                                error={dataValidation.state}
                                helperText={dataValidation.state ? "This field is required" : ""}
                            />
                        </div>
                    </div>
                    <div className="input-container">
                        <TextField
                            required
                            value={data.zipCode}
                            onChange={(e) => setData({...data, zipCode: e.target.value})}
                            label="Zip Code"
                            variant="outlined"
                            onBlur={() => setDataValidation({...dataValidation, zipCode: data.zipCode === ""})}
                            error={dataValidation.zipCode}
                            helperText={dataValidation.zipCode ? "This field is required" : ""}
                        />
                    </div>
                    <Button disabled={!valid} onClick={() => store()} variant="contained" color="primary" style={{marginTop: 16}}> Register! </Button>
                </div>
            </div>
            <Alert {...alertData} />
        </Container>
    )
}