import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TypeCard from "../components/TypeCard";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));
const styles = {
    TypeCardContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    TypeContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 3px 15px 2px rgba(103,58,183,.4)',
    }
}

function firstLetterMaj(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function DescCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {firstLetterMaj(props.name)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              ID: {props.id}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          {props.desc}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <div style={styles.TypeContainer}>
            <div style={styles.TypeCardContainer}>
                <TypeCard title={"Type of Pokemon"} types={props.types}/>
            </div>
            <Divider variant="middle" />
            <div style={styles.TypeCardContainer}>
                <TypeCard title={"Moves"} moves={props.moves}/>
            </div>
        </div>
      </div>
    </div>
  );
}