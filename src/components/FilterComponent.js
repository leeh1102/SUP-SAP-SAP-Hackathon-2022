import React from 'react';
import Stack from '@mui/material/Stack';
import { FormControl, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const FilterComponent = () => {
    const [deliveryType, setDeliveryType] = React.useState("");
    const [date, setDate] = React.useState(new Date());

    const handleChangeDeliveryType = (event) => {
        setDeliveryType(event.target.value);
    };

    const handleChangeDate = (event) => {
        setDate(event.target.value);
    }

    const theme = createTheme({
        components: {
            MuiSelect: {
                styleOverrides: {
                    select: {
                        '&:focus': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: '#006fbb',
                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: '#006fbb',
                    }
                }
            }
        }
    })

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid #006fbb',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(2, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch',
                '&:focus': {
                    width: '30ch',
                },
            },
        },
    }));

    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ padding: 2 }}
            >
                <ThemeProvider theme={theme}>
                    <FormControl sx={{ minWidth: 200, }} >
                        <InputLabel id="select-delivery-type-label">Types of Delivery</InputLabel>
                        <Select
                            labelId="select-delivery-type-label-id"
                            id="select-delivery-type"
                            value={deliveryType}
                            onChange={handleChangeDeliveryType}
                            label="Types of Delivery"
                        >
                            <MenuItem value="in-office">In Office</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                            <MenuItem value="out-of-office">Out-of-office</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search By Keyword"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Stack>
        </>
    );
}

export default FilterComponent;