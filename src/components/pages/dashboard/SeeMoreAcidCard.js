import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function SeeMoreAcidCard() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Link underline='none' component={RouterLink} to={"/acid"}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image="/images/confused-mushroom-4-md.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Acid Tabs
                        </Typography>
                        <Typography color="textSecondary" component="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={3} direction={'row-reverse'}>
                            <Grid item>
                                <Button size="medium" color="primary" onClick={() => history.push('/acid')}>
                                    See More
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Link>
    );
}