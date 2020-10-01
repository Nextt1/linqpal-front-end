import React, { useEffect, useState } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {Container} from './../../../components';
import { adminHome } from '../../../api';
import './Home.css';

export default function Home(){
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect( () => {
        loadData();
    }, []);

    const loadData = async (page = 0) => {
        const res = await adminHome(page);
        if(res.status === 'unauthorize'){
            localStorage.clear();
            history.replace("/");
        }else{
            setData(res.data);
        }
    }

    const renderHeaders = () => (
        <div className="header-container">
            <div>
                <Typography></Typography>
            </div>
            <div style={{flex: 2}}>
                <Typography variant="h6" align="center">Name</Typography>
            </div>
            <div style={{flex: 2}}>
                <Typography variant="h6" align="center">Phone Number</Typography>
            </div>
            <div style={{flex: 3}}>
                <Typography variant="h6" align="center">Address</Typography>
            </div>
            <div style={{flex: 2}}>
                <Typography variant="h6" align="center">SSN</Typography>
            </div>
        </div>
    );

    return(
        <Container>
            <div className="home-container">
                {renderHeaders()}
                {data.map((eachUser, index) => (
                    <>
                        <div className="row-container">
                            <div>
                                <Typography>{index + 1}</Typography>
                            </div>
                            <div style={{flex: 2}}>
                                <Typography align="center">{eachUser.firstName} {eachUser.lastName}</Typography>
                            </div>
                            <div style={{flex: 2}}>
                                <Typography align="center">{eachUser.phoneNumber}</Typography>
                            </div>
                            <div style={{flex: 3}}>
                                <Typography align="center">{eachUser.address1} {eachUser.address2} {eachUser.city} {eachUser.zipCode} {eachUser.state}</Typography>
                            </div>
                            <div style={{flex: 2}}>
                                <Typography align="center">{eachUser.ssn}</Typography>
                            </div>
                        </div>
                        <Divider />
                    </>
                ))}
            </div>
        </Container>
    )
}