import React from "react";
import api from "../API/pokeApi";
import CardItem from "../components/CardItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputBase from '@material-ui/core/InputBase';
import Select from "@material-ui/core/Select";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      types: [],
      moves: [],
      filteredPokemons: [],
      start: 1,
      end: 20,
      type: 0,
      move: 0,
      isLoading: false
    };
    this.originalPokemonList = [];
    this.commonPokemonList = [];
    this.handleTypeChange = this.handleTypeChange.bind(this); // this for state or altro
    this.handleMoveChange = this.handleMoveChange.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);
    this.searchValue = null;
  }

  firstLetterMaj(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  _loadPokemons() {
    this.setState({ isLoading: true });
      api.getPokemons().then(data => {
        this.setState({ pokemons: data.results, isLoading: false });
        this.originalPokemonList = this.state.pokemons;
      });
      api.getSimple("type").then(data => {
        this.setState({ types: data.results });
      });
      api.getSimple("move").then(data => {
        this.setState({ moves: data.results });
        console.log("moves are", data.results);
        
      });
  }
  
    TypeChange = (id_type) => {
    this.setState({isLoading: true});
    api.getPokemonByXId("type", id_type).then(data => {
        var arrangedData = data.pokemon.map(function(el) {
          return el.pokemon;
        });
        this.setState({ type: data.id, pokemons: arrangedData });
      });
  
    setTimeout(
      function() {
        this.setState({ isLoading: false });
      }.bind(this),
      500
    );
  }

  componentDidMount() {
    this._loadPokemons();
    // this.setState({ isLoading: true });@
  }

  _toDetail(id) {
    this.props.history.push(`/Detail/${id}`);
  }

  handleTypeChange(event) {
    this.setState({isLoading: true});
    if (event.target.value == 0) {
      this.setState({ pokemons: this.originalPokemonList });
    } else {
      api.getPokemonByXId("type", event.target.value).then(data => {
        var arrangedData = data.pokemon.map(function(el) {
          return el.pokemon;
        });
        this.setState({ type: data.id, pokemons: arrangedData });
      });
    }
    setTimeout(
      function() {
        this.setState({ isLoading: false });
      }.bind(this),
      500
    );
  }

  handleMoveChange(event) {
    this.setState({isLoading: true});
    if (event.target.value === 0) {
      console.log("-1");
      this.setState({ pokemons: this.originalPokemonList });
    } else {
      api.getPokemonByXId("move",event.target.value).then(data => {
        console.log("cur data is ", data)
        // var arrangedData = data.pokemon.map(function (el) { return el.pokemon; });
        //this.setState({ type: data.id, pokemons: arrangedData });
      });
    }
    setTimeout( function () { this.setState({ isLoading: false }); }.bind(this), 500 );
    console.log("yes move");
  }

  handleSearchByName(event) {
    // TODO @andy : Maybe loader or not as it's live search
    let val = event.target.value;
    let matches = [];
    if (val === "") {
      console.info("search empty!");
      this.setState({ pokemons: this.originalPokemonList });
    } else {
      this.state.pokemons.map((pokemon, i) => { 
        if (pokemon.name.startsWith(event.target.value)) {
          matches.push(pokemon)
          this.setState({ pokemons: matches });
        }
      });
      if (matches.length == 0) {
        console.warn("No result!");
        // TODO : nakbar
      }
    }
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
    if (this.state.isLoading) {
      return (
        <div
          style={{
            height: "auto",
            width: "auto",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            border: "solid",
            borderColor: "yellow",
            position: 'absolute',
            left: window.innerWidth / 2.19,
            bottom: window.innerHeight / 2
          }}
          onClick={e => console.log("Clicked")}
        >
          <CircularProgress size={100} />
        </div>
      );
    } else {
      return (
        <div style={useStyles.container}>
          <InputBase
              placeholder="Search…"
              // classes={{ root: classes.inputRoot, input: classes.inputInput, }}
              // value={this.searchValue}
              onChange={this.handleSearchByName}
              inputProps={{ 'aria-label': 'search' }}
            />
            <FormControl // className={classes.formControl} // TODO: FIXME besoin de faire du css ou alors remove formcontrol
          >
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.type}
            onChange={this.handleTypeChange}
          >
            <MenuItem value={0}>No type</MenuItem>
            {this.state.types.map((type, i) => { return <MenuItem value={i + 1}>{this.firstLetterMaj(type.name)}</MenuItem> })} 
            {
              // TODO: sur une ligne c'est ptet 1 peu trop?
            } 
          </Select>
          </FormControl>
          <FormControl>
          <InputLabel id="demo-simple-select-label">Move</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.move}
            onChange={this.handleMoveChange}
          >
            <MenuItem value={-1}>No move</MenuItem>
            {this.state.moves.map((move, i) => { return <MenuItem value={i}>{this.firstLetterMaj(move.name) + " " + i}</MenuItem> })} 
            {
              // TODO: sur une ligne c'est ptet 1 peu trop?
            } 
          </Select>
          </FormControl>
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
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/"; //TODO: potential fix?
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
                      img={`${urlImg}${id}.png?raw=true`} // TODO : decommenter si pas dans un environnement ou on se fout de notre gueule car on bosse avec des pokemon zebi
                      id={id}
                      toDetail={this._toDetail}
                      changeType={this.TypeChange}
                    />
                  }
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
