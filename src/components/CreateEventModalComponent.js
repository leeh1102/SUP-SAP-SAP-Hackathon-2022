import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import styles from './create_event_modal_component.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from "react";
import { AddCircleOutline } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const amenities = [
    {
        value: 'PingPong',
        label: 'PingPong',
    },
    {
        value: 'BBQ',
        label: 'BBQ',
    },
    {
        value: 'Gym',
        label: 'Gym',
    },
    {
        value: 'Puzzle',
        label: 'Puzzle',
    },
    {
        value: 'D-Shop',
        label: 'D-Shop',
    },
];

const deliveryTypes = [
    {
        value: 'In-office',
        label: 'In-office',
    },
    {
        value: 'Virtual',
        label: 'Virtual',
    },
    {
        value: 'Out-of-office',
        label: 'Out-of-office',
    },
];

const CreateEventModalComponent = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [values, setValues] = React.useState({
        title: 'Join 3D Printing Workshop hosted by D-shop!',
        description: 'Learn and experience 3D printing with our 3D printing experts!',
        eventDate: '12/04/2022',
        startTime: '15:00',
        deliveryType: 'In-office',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        handleClose();
    }

    return (
        <>
            <div className={styles.create_btn}>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    size="large"
                    color="primary"
                    sx={{ backgroundColor: "#006fbb", m: 2, mt: 4, p: 2, pr: 3, pl: 3, borderRadius: 20 }}
                >
                    <AddCircleOutline sx={{ mr: 1 }} />
                    Create Your Own
                </Button>
                <Dialog open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogTitle>Optional sizes</DialogTitle>
                    <DialogContent >
                        <TextField
                            name="title"
                            required
                            fullWidth
                            id="title-input"
                            label="Event Title"
                            placeholder="Event Title"
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            name="description"
                            required
                            fullWidth
                            id="description-input"
                            label="Description"
                            placeholder="Description"
                            sx={{ mt: 1 }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <DesktopDatePicker
                                    fullWidth
                                    inputFormat="MM/DD/YYYY"
                                    value={values.date}
                                    onChange={(newValue) => {
                                        setValues({ ...values, date: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{ mt: 1 }}
                                    />}
                                />
                                <TimePicker
                                    fullWidth
                                    label="Time"
                                    inputFormat="hh:mm"
                                    onChange={(newValue) => {
                                        setValues({ ...values, time: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{ mt: 1 }} />}
                                />
                            </div>

                        </LocalizationProvider>
                        <TextField
                            name="deliveryType"
                            fullWidth
                            sx={{ mt: 1 }}
                            id="select-delivery-types"
                            label="Delivery Type">
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            onChange={(newValue) => {
                                setValues({ ...values, amenities: newValue });
                            }}
                            id="select-amenities"
                            sx={{ mt: 1 }}
                            label="Amenities">
                            {amenities.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, padding: 1.5, borderRadius: 10 }}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}


export default CreateEventModalComponent;


