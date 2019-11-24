import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function TypeCard(props) {
  const classes = useStyles();
  if (props.moves) {
    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.title}
        </Typography>
        {props.moves ? props.moves.map((move) =>      
        <Chip
          variant="outlined"
          size="small"
          // avatar={<Avatar>M</Avatar>}
          label={move.move.name}
          clickable
          color="primary"
          // onDelete={handleDelete}
          deleteIcon={<DoneIcon />}
        />) : "pas de move"}
  
       
      </Paper>
    );
  } else if (props.types) {
      return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {props.title}
      </Typography>
      {props.types ? props.types.map((type) =>      
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar>M</Avatar>}
        label={type.type.name}
        clickable
        color="secondary"
        // onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />) : "pas de move"}

     
    </Paper>
  );
  } else {
      return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {props.title}
      </Typography>    
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar>M</Avatar>}
        label="???"
        clickable
        color="primary"
        // onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />

     
    </Paper>
  );
  }
}