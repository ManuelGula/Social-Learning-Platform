import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import {MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { MDBProgress } from 'mdbreact';

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';

export class SignUpFirst extends Component {
    continue = e =>{
        // e.preventDefault();
        this.props.nextStep();
    }
    
    
    render() {
        const { values, handleChange } = this.props;
        return (
          <MuiThemeProvider >
            <React.Fragment>
              <div style = {container}>
                
                <TextField
                  
                  placeholder="Enter Your First Name"
                  label="First Name"
                  onChange={handleChange('firstName')}
                  defaultValue={values.firstName}
                  margin="normal"
                                fullWidth="true"
                />
                <br />
        
                <TextField
                  placeholder="Enter Your Last Name"
                  label="Last Name"
                  onChange={handleChange('lastName')}
                  defaultValue={values.lastName}
                  margin="normal"
                                fullWidth="true"
                />
                <br />
                <TextField
                  placeholder="Enter Your Email"
                  label="Email"
                  onChange={handleChange('email')}
                  defaultValue={values.email}
                  margin="normal"
                                fullWidth="true"
                />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.continue}
                >Continue</Button>
                
                
              
                </div>
                
            
            </React.Fragment>
          </MuiThemeProvider>
        );
      }
    }
    
const container = {
    margin: '150px',
    border: '5px orange'

};
const footer = {
  flexShrink: "0",
  textAlign: "center",
  backgroundColor: "orange",
  color: "white"
}
export default SignUpFirst;