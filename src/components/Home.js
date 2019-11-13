import React from "react";
import api from "../API/pokeApi";
import CardItem from "./CardItem";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Home extends React.Component {
  _loadPokemons() {
    this.setState({ isLoading: true });
    for (let i = this.state.start; i <= this.state.end; i++) {
      api.getPokemonById(i).then(data => {
        this.setState(
          { pokemons: this.state.pokemons.concat(data), isLoading: false },
        );
      });
    }
  }
  _loadSpecs(url) {
    api.getPokemonSpecs(url).then(data => {
      return data;
    });
  }
  componentDidMount() {
    this._loadPokemons();
    // this.setState({ isLoading: true });
  }
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      start: 1,
      end: 20,
      isLoading: false
    };
  }

  render() {
    const useStyles = {
      container: {
        display: "flex",
        flexWrap: "wrap",
        overflow: "scroll",
        justifyContent: "center",
        alignItems: "center",
        border: "solid"
      },
      gridList: {
        width: 300,
        height: 200
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    };
    return (
      <div style={useStyles.container}>
        <div
          style={{
            display: "flex",
            border: "solid",
            borderColor: "red",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            overflow: 'scroll'
          }}
        >
          {this.state.pokemons.map((pokemon, i) => (
            <div key={i}>{<CardItem pokemon={pokemon} />}</div>
          ))}
          {this.state.isLoading ? (
            <div
              style={{
                height: "auto",
                width: "auto",
                display: "flex",
                border: "solid",
                borderColor: 'yellow'
              }}
            >
              <CircularProgress size={100} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}