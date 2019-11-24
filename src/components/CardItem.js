import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import api from "../API/pokeApi";
import LinearProgress from "@material-ui/core/LinearProgress";

import { withRouter } from "react-router-dom";

class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: '',
      isLoading: false,
      // name: '',
    };
  }

  findLanguageHelper(lang, arr) {
    var matches = null;
    arr.forEach(function(e) {
      if (e.language.name === lang) {
        matches = e.flavor_text
      }
    });
    return matches;
  }

  firstLetterMaj(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    api.getPokemonDesc(this.props.id).then(data => {
      let text = null
      if (data == null || data.flavor_text_entries == null || data.flavor_text_entries[1] == null) {
        text = "No description available."
        } else {
        text = this.findLanguageHelper("en", data.flavor_text_entries)
      }
      this.setState({ desc: text, isLoading: false });
    });
   
  }

  render() {
    let formattedName = this.firstLetterMaj(this.props.pokemon.name);
    return (
      <Card
        style={{ maxWidth: 300 }}
      >
        {this.state.isLoading ? (
          <LinearProgress />
        ) : (
          <div>
            {" "}
            <CardActionArea
              onClick={() => {
                this.props.history.push(
                  `/Detail/${this.props.id}/${this.props.pokemon.name}`, this.state.desc);
              }}>
              <CardMedia
                component="img"
                alt={formattedName}
                height="250"
                image={this.props.img}
                title={formattedName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {formattedName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {this.state.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            <Typography color="primary" variant="body2" component="p">
                  Id : {this.props.id}
                </Typography>
                <Typography color="primary" variant="body2" component="p">
                  Type: {this.props.pokemon.name}
                </Typography>
            </CardActions>
          </div>
        )}
      </Card>
    );
  }
}

export default withRouter(CardItem);
