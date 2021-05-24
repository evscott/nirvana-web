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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        content: {
            marginTop: 30,
        },
        formControl: {
            minWidth: 500,
        },
    };
});

/**
 * This is the contact us page.
 * */
function ContactUsPage() {
    const classes = useStyles();

    const [category, setCategory] = React.useState('');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const [body, setBody] = React.useState('');
    const handleBodyChange = (event) => {
        setBody(event.target.value)
    };

    const [snackbarVisible, setSnackbarVisible] = React.useState(false);

    const handleSubmit = () => {
        console.log(category)
        console.log(body)
        setSnackbarVisible(true)
        setCategory('')
        setBody('')
    }

    return (
        <div>
            <NavBar/>
            <Container className={classes.content}>
                <Grid
                    container
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                    spacing={1}
                >
                    <Grid item>
                        <Typography variant={'h5'}>
                            Contact us
                        </Typography>
                    </Grid>
                    <Grid item/>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value={'order'}>Order support</MenuItem>
                                <MenuItem value={'payment'}>Payment support</MenuItem>
                                <MenuItem value={'shipping'}>Shipping support</MenuItem>
                                <MenuItem value={'general'}>General inquiry</MenuItem>
                            </Select>
                            <FormHelperText>We're available 24/7 to help with order, payment, and shipping issues</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item/>
                    <Grid item>
                        <form className={classes.formControl} noValidate>
                            <TextField
                                id="outlined-multiline-static"
                                label="Tell us about the issue"
                                multiline
                                rows={17}
                                placeholder="Provide a detailed description of the issue"
                                variant="outlined"
                                fullWidth
                                value={body}
                                onChange={handleBodyChange}
                                required
                            />
                        </form>
                    </Grid>
                    <Grid item/>
                    <Grid container item direction={'row'} alignItems={'flex-end'} justify={'flex-end'} style={{width: 500}}>
                        <Grid item>
                            <Button variant={'contained'} color={'primary'} size={'large'} onClick={handleSubmit}>
                                Submit inquiry
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Snackbar open={snackbarVisible} autoHideDuration={2500} onClose={() => setSnackbarVisible(false)}>
                            <MuiAlert onClose={() => setSnackbarVisible(false)} severity="success">
                                Message sent! We'll get back to you shortly.
                            </MuiAlert>
                        </Snackbar>
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