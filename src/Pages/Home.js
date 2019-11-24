import React from "react";
import api from "../API/pokeApi";
import CardItem from "../components/CardItem";
import Pagify from '../components/pager';
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputBase from '@material-ui/core/InputBase';
import Select from "@material-ui/core/Select";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
      searchComplete: [],
      isLoading: false,
      snackOpen: false,
      snackMsg: "",
      pageOfItems: []
    };

    this.originalPokemonList = [];
    this.commonPokemonList = [];
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleMoveChange = this.handleMoveChange.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.colors = ['rgba(103,58,183,.4)', 'rgba(230,81,0,.4)', 'rgba(0,145,234,.4)', 'rgba(0,121,107,.4)'];
  }

  firstLetterMaj(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  _loadPokemons() {
    this.setState({ isLoading: true });
      api.getSimple("type").then(data => {
        this.setState({ types: data.results });
      });
      api.getSimple("move").then(data => {
        this.setState({ moves: data.results });
        console.log("moves are", data.results);
      }); 
      api.getAllPokemons().then(data => {
        this.originalPokemonList = data.results;
        this.setState({ pokemons: data.results, isLoading: false });
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
      this.setState({ pokemons: this.originalPokemonList });
    } else {
      api.getPokemonByXId("move",event.target.value).then(data => {
        //var arrangedData = data.pokemon.map(function (el) { return el.pokemon; });
        //this.setState({ type: data.id, pokemons: arrangedData });
      });
    }
    setTimeout( function () { this.setState({ isLoading: false }); }.bind(this), 500 );
  }

  handleSearchByName(event) {
    let val = event.target.value;
    let matches = [];
    let matchesName = [];
    if (val === "")
      this.setState({ pokemons: this.originalPokemonList});
    else {
      this.state.pokemons.map((pokemon, i) => { 
        if (pokemon.name.startsWith(val)) {
          matches.push(pokemon)
          matchesName.push(pokemon.name);
        }
      });
      if (matches.length == 0)
        this.setState({snackOpen: true, snackMsg: "No matches for search!"})
      else
        this.setState({ pokemons: matches, searchComplete: matchesName });
    }
  }

  handleClose(event, reason) {
    if (reason === 'clickaway')
      return;
    this.setState({snackOpen: false});
  };

  onChangePage(pageOfItems) {
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const useStyles = {
      container: {
        display: "flex",
        flexWrap: "wrap",
        overflow: "scroll",
        justifyContent: "center",
        alignItems: "center",
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
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.snackOpen}
            autoHideDuration={1800}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackMsg}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <InputBase
              placeholder="Search…"
              // classes={{ root: classes.inputRoot, input: classes.inputInput, }}
              onChange={this.handleSearchByName}
              inputProps={{ 'aria-label': 'search' }}
            />
            <FormControl // className={classes.formControl}
          >
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.type}
            onChange={this.handleTypeChange}
          >
            <MenuItem value={0}>No type</MenuItem>
            {this.state.types.map((type, i) => { return <MenuItem value={i + 1} key={i}>{this.firstLetterMaj(type.name)}</MenuItem> })} 
          </Select>
          </FormControl>
          {/* OFF: cf rocket.
          <FormControl>
          <InputLabel id="demo-simple-select-label">Move</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.move}
            onChange={this.handleMoveChange}
          >
            <MenuItem value={-1}>No move</MenuItem>
            {this.state.moves.map((move, i) => { return <MenuItem value={i} key={i}>{this.firstLetterMaj(move.name)}</MenuItem> })} 
          </Select>
          </FormControl>
          */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "space-Between",
              alignItems: "center",
              flexWrap: "wrap",
              overflow: "scroll",
            }}
          >


            {this.state.pageOfItems.map((item, i) => {
              let urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/"
              let url_array = item.url.split("/");
              let id = url_array[url_array.length - 2];
              return (
                <div
                  style={{
                    height: "auto",
                    width: "auto",
                    display: "flex",
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: '#d6d7da',
                    margin: 20,
                    boxShadow: '0 3px 15px 2px ' + this.colors[i % this.colors.length],
                  }}
                  key={i}
                >
                  {
                    <CardItem
                      pokemon={item}
                      img={`${urlImg}${id}.png?raw=true`}
                      id={id}
                      toDetail={this._toDetail}
                      changeType={this.TypeChange}
                    />
                  }
                </div>
              );
            })}
          </div>

          <Pagify items={this.state.pokemons} onChangePage={this.onChangePage} />
        </div>
      );
    }
  }
}
