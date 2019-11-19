import React from "react";
import api from "../API/pokeApi";
import CardItem from "../components/CardItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      types: [],
      filteredPokemons: [],
      start: 1,
      end: 20,
      type: -1,
      isLoading: false
    };
    this.originalPokemonList = [];
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  firstLetterMaj(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  _loadPokemons() {
    this.setState({ isLoading: true });
      api.getPokemons().then(data => {
        this.setState(
          { pokemons: data.results, isLoading: false }
        );
        this.originalPokemonList = this.state.pokemons;
      });
      api.getTypes().then(data => {
        this.setState(
          { types: data.results, isLoading: false }
        );
      });
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


  _toDetail(id) {
    this.props.history.push(`/Detail/${id}`);
  }


  handleTypeChange(event) {
    if (event.target.value == -1) {
      console.log("-1");
      this.setState({ isLoading: true, pokemons: this.originalPokemonList });
    } else {
      this.setState({isLoading: true}); // TODO : FIXME
      api.getPokemonByTypeId(event.target.value).then(data => {
        this.setState({ isLoading: true }); // TODO : OR FIXME HERE
        this.forceUpdate();
        var arrangedData = data.pokemon.map(function (el) { return el.pokemon; });
        this.setState({ type: data.id, pokemons: arrangedData });
      });
    }
    setTimeout( function () { this.setState({ isLoading: false }); }.bind(this), 3000 ); // 
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
        <FormControl // className={classes.formControl} // TODO: FIXME besoin de faire du css ou alors remove formcontrol
      >
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={this.state.type}
        onChange={this.handleTypeChange}
      >
        <MenuItem value={-1}>No type</MenuItem>
        {this.state.types.map((type, i) => { return <MenuItem value={i}>{this.firstLetterMaj(type.name) + " " + i}</MenuItem> })} 
        {
          // TODO: sur une ligne c'est ptet 1 peu trop?
        } 
      </Select>
      </FormControl>
        <input type="text" placeholder="Search by type" onChange={this.filterByType}/>
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
            overflow: 'scroll'
          }}
        >
          {this.state.pokemons.map((pokemon, i) => {
                let urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" // other-sprites/official-artwork/"; TODO: potential fix?
                let url_array = pokemon.url.split('/')
                let id = url_array[url_array.length - 2]
            return <div               style={{
              height: "auto",
              width: "auto",
              display: "flex",
              border: "solid",
              borderColor: 'purple',
              margin: 20
            }} key={i}>{<CardItem pokemon={pokemon} // img={`${urlImg}${id}.png?raw=true`} // TODO : decommenter si pas dans un environnement ou on se fout de notre gueule car on bosse avec des pokemon zebi
            id={id} toDetail={this._toDetail}/>}</div>
          })}
        </div>
          {this.state.isLoading ? (
            <div
              style={{
                height: "auto",
                width: "auto",
                display: "flex",
                border: "solid",
                borderColor: 'yellow',
              }}
              onClick={e => console.log("Clicked")}
            >
              <CircularProgress size={100} />
            </div>
          ) : null}
      </div>
    );
  }
}