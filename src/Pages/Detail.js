import React from "react";
import CardSwiper from "../components/CardSwiper";
import { withRouter } from "react-router-dom";
import api from "../API/pokeApi";
import LinearProgress from "@material-ui/core/LinearProgress";
import TypeCard from "../components/TypeCard";
import DescCard from "../components/DescCard";
import CardItem from "../components/CardItem";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "0 auto",
    width: "70%"
  },
  spriteContainer: {
    width: "20%",
    height: "100%",
    borderColor: "yellow",
    borderRadius: 4
  },
  descContainer: {
    width: "80%",
    height: "100%",
    borderColor: "yellow",
    borderRadius: 4
  },
  TypeCardContainer: {
    width: "100%",
    height: "100%",
    border: "solid",
    borderColor: "green"
  },
  TypeContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    border: "solid 6px",
    borderColor: "blue"
  },
  evolContainer: {
    display: "flex",
    flexWrap: "wrap-reverse",
    width: "100%",
    height: "100%",
    // border: "solid 6px",
    // borderColor: "black",
    justifyContent: 'center'
  }
};
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprites: {},
            isLoading: false,
            moves: [],
            types: [],
            name: "",
            id: null,
            desc: "",
            url_evol: "",
            evol1: {
                id: null,
                name: "",
                url: ""
            },
            evol2: {
                id: null,
                name: "",
                url: ""
            },
            evol3: {
                id: null,
                name: "",
                url: ""
            }
        };
    }
    componentDidMount() {
    this.setState({ isLoading: true });
    this._loadSpecs(this.props.match.params.id);
    this._getEvolution(this.props.match.params.id);
  }

  _getEvolution(id) {
    api.getPokemonDesc(id).then(data => {
      this.setState({ url_evol: data.evolution_chain.url }, () => {
        api.getEvolution(this.state.url_evol).then(data => {
          let name1 = data.chain.species.name ? data.chain.species.name : "";
          let name2 = data.chain.evolves_to[0]
            ? data.chain.evolves_to[0].species.name
            : "";
          let name3 = data.chain.evolves_to[0].evolves_to[0]
            ? data.chain.evolves_to[0].evolves_to[0].species.name
            : "";
            let url1 = data.chain.species.url ? data.chain.species.url.replace("pokemon-species", "pokemon") : '';
            let url2 = data.chain.evolves_to[0] ? data.chain.evolves_to[0].species.url.replace("pokemon-species", "pokemon") : '';
            let url3 = data.chain.evolves_to[0].evolves_to[0] ? data.chain.evolves_to[0].evolves_to[0].species.url.replace("pokemon-species", "pokemon") : '';
            let url_array1 = url1.split("/");
            let id1 = url_array1[url_array1.length - 2];
            let url_array2 = url2.split("/");
            let id2 = url_array2[url_array2.length - 2];
            let url_array3 = url3.split("/");
            let id3 = url_array3[url_array3.length - 2];
            let v1 = {id: id1, name: name1, url :url1}

            let v2 = {id: id2, name: name2, url: url2}

            let v3 = {id: id3, name: name3, url: url3}
            console.log(id1)
          this.setState({ evol1: v1, evol2: v2, evol3: v3}, () => {
            console.log(this.state);
          });
          // console.log(data.chain.species.name, data.chain.evolves_to[0].species.name, data.chain.evolves_to[0].evolves_to[0].species.name)
        });
      });
    });
  }
  _loadSpecs(id) {
    api.getPokemonById(id).then(data => {
      this.setState({
        sprites: data.sprites,
        types: data.types,
        moves: data.moves,
        name: data.name,
        id: data.id,
        isLoading: false
      });
    });
  }
  render() {
    if (!this.state.isLoading) {
      return (
        <div style={styles.container}>
          <div style={styles.spriteContainer}>
            <CardSwiper sprites={this.state.sprites} />
          </div>
          <div style={styles.descContainer}>
            <DescCard
              types={this.state.types}
              moves={this.state.moves}
              name={this.state.name}
              id={this.state.id}
              desc={this.props.location.state}
            />
          </div>
          <div style={styles.evolContainer}>
          <CardItem
              pokemon={this.state.evol1}
              img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${this.state.evol1.id}.png?raw=true`}
              id={this.state.evol1.id}
            /> 
          <CardItem
              pokemon={this.state.evol2}
              img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${this.state.evol2.id}.png?raw=true`}
              id={this.state.evol2.id}
            /> 
            <CardItem
              pokemon={this.state.evol3}
              img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${this.state.evol3.id}.png?raw=true`}
              id={this.state.evol3.id}
            /> 
          </div>
        </div>
      );
    } else {
      return (
        <div style={styles.container}>
          <LinearProgress />
        </div>
      );
    }
  }
}

export default withRouter(Detail);
