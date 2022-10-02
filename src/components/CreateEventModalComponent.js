import * as React from 'react';
import Box from '@mui/material/Box';
// import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from './create_event_modal_component.css';


import { Stepper, Step } from "react-form-stepper";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const CreateEventModalComponent = () => {
    const [goSteps, setGoSteps] = useState(0);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [amenity, setAmenity] = useState("");

    const getTitle = () => {
        const title = document.getElementById("amenities");
    }

    return (
        <>
            <div>
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                <div>
                                    <Stepper activeStep={goSteps}>
                                        <Step onClick={() => setGoSteps(0)} label="LOCATION" />
                                        <Step onClick={() => setGoSteps(1)} label="DELIVERY" />
                                        <Step onClick={() => setGoSteps(2)} label="ORDER SUMMERY" />
                                    </Stepper>
                                    {goSteps === 0 && (
                                        <div>
                                            <div>
                                                <h3>Location</h3>
                                                <p>What is the location? Select one.</p>
                                                <select className={styles.input_tag} placeholder="Locations">
                                                    <option value="montreal">Montreal</option>


                                                    {/* <option value="vacouver">Vancouver</option>
                                                    <option value="montreal">Montreal</option>
                                                    <option value="Calgary">Calgary</option>
                                                    <option value="ottawa">Ottawa</option>
                                                    <option value="waterloo">Waterloo</option>
                                                    <option value="toronto">Toronto</option> */}

                                                </select>
                                                <h4>If in-office, select the amenity to use:</h4>
                                                <select className={styles.input_tag} onChange={getTitle} placeholder="Amenities" id="amenities">
                                                    <option value="PingPong">Ping Pong</option>
                                                    <option value="BBQ">BBQ</option>
                                                    <option value="Gym">Gym</option>
                                                    <option value="Puzzle">Puzzle</option>
                                                    <option value="DShop">D-Shop</option>

                                                </select>
                                            </div>
                                            <button className="btn" onClick={() => setGoSteps(1)}>
                                                Next
                                            </button>
                                        </div>
                                    )}
                                    {goSteps === 1 && (
                                        <div>
                                            Addreess
                                            <button onClick={() => setGoSteps(2)}>Next</button>
                                        </div>
                                    )}
                                    {goSteps === 2 && (
                                        <div>
                                            Payment
                                            <button onClick={() => setGoSteps(3)}>Submit</button>
                                        </div>
                                    )}
                                </div>                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}


export default CreateEventModalComponent;


