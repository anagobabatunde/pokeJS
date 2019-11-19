import React from "react";
import api from "../API/pokeApi";
import CardItem from "../components/CardItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

export default class Home extends React.Component {
  _loadPokemons() {
    this.setState({ isLoading: true });
    api.getPokemons().then(data => {
      this.setState({ pokemons: data.results, isLoading: false });
    });
  }
  
  componentDidMount() {
    this._loadPokemons();
    // this.setState({ isLoading: true });@
  }

  _toDetail(id) {
    this.props.history.push(`/Detail/${id}`);
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
        {this.state.isLoading ? (
          <div
            style={{
              height: "auto",
              width: "auto",
              display: "flex",
              border: "solid",
              borderColor: "yellow"
            }}
            onClick={e => console.log("Clicked")}
          >
            <CircularProgress size={100} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              border: "solid",
              borderColor: "red",
              width: "100%",
              height: "100%",
              justifyContent: "space-Between",
              alignItems: "center",
              flexWrap: "wrap",
              overflow: "scroll"
            }}
          >
            {this.state.pokemons.map((pokemon, i) => {
              let urlImg =
                "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other-sprites/official-artwork/";
              let url_array = pokemon.url.split("/");
              let id = url_array[url_array.length - 2];
              return (
                <div
                  style={{
                    height: "auto",
                    width: "auto",
                    display: "flex",
                    border: "solid",
                    borderColor: "purple",
                    margin: 20
                  }}
                  key={i}
                >
                  {
                    <CardItem
                      pokemon={pokemon}
                      img={`${urlImg}${id}.png?raw=true`}
                      id={id}
                      toDetail={this._toDetail}
                    />
                  }
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
