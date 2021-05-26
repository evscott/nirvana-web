import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import Grid from "@material-ui/core/Grid";
import {Container, Typography} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        content: {
            marginTop: 50,
        },
        formControl: {
            minWidth: 500,
            marginTop: 10,
        },
    };
});

/**
 * This is the contact us page.
 * */
function ContactUsPage() {
    const classes = useStyles();
    const [subject, setSubject] = React.useState('general');
    const handleChange = (event) => {
        setSubject(event.target.value);
    };

    return (
        <div>
            <NavBar/>
            <Container className={classes.content}>
                <Grid
                    container
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                    spacing={2}
                >
                    <Grid item>
                        <Typography variant={'h5'}>
                            Contact us
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Inquiry type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subject}
                                onChange={handleChange}
                            >
                                <MenuItem value={'order'}>Order support</MenuItem>
                                <MenuItem value={'payment'}>Payment support</MenuItem>
                                <MenuItem value={'shipping'}>Shipping support</MenuItem>
                                <MenuItem value={'general'}>General inquiry</MenuItem>
                            </Select>
                            <FormHelperText>We're available 24/7 to help with order, payment, and shipping issues</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Tell us about the issue"
                                multiline
                                rows={17}
                                placeholder="Provide a detailed description of the issue"
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item direction={'row'} alignItems={'flex-end'} justify={'flex-end'} style={{width: 500}}>
                        <Grid item>
                            <Button variant={'contained'} color={'primary'} size={'large'}>
                                Submit inquiry
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

// Gets props from the redux store
const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(ContactUsPage);