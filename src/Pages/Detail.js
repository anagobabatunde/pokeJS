import React from "react";
import CardSwiper from "../components/CardSwiper";
import { withRouter } from "react-router-dom";
import api from "../API/pokeApi";
import LinearProgress from "@material-ui/core/LinearProgress";
import TypeCard from "../components/TypeCard";
import DescCard from "../components/DescCard";

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        margin: "0 auto",
        width: "70%",
    },
    spriteContainer: {
        width: '20%',
        height: '100%',
        borderColor: 'yellow',
        borderRadius: 4,
    },
    descContainer: {
        width: '80%',
        height: '100%',
        borderColor: 'yellow',
        borderRadius: 4,
    },
    TypeCardContainer: {
        width: '100%',
        height: '100%',
        border: 'solid',
        borderColor: 'green',
    },
    TypeContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        border: 'solid 6px',
        borderColor: 'blue',
    }
}
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprites: {},
            isLoading: false,
            moves: [],
            types: [],
            name: '',
            id: null,
            desc: '',
        }
    }
    componentDidMount() {
        this.setState({isLoading: true})
        this._loadSpecs(this.props.match.params.id)
    }
    

    _loadSpecs(id) {
        api.getPokemonById(id).then(data => {
            this.setState({sprites: data.sprites, types: data.types, moves: data.moves,name: data.name,id: data.id, isLoading: false}, () => {console.log("je suis la",this.state)});
        });
      }
    render() {
        if (!this.state.isLoading) {
            return (
                <div style={styles.container}>
                    <div style={styles.spriteContainer}>
                        <CardSwiper sprites={this.state.sprites}/>
                    </div>
                    <div style={styles.descContainer}>
                        <DescCard types={this.state.types} moves={this.state.moves} name={this.state.name} id={this.state.id} desc={this.props.location.state}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={styles.container}>
                    <LinearProgress />
                </div>
            )
        }

    }
}

export default withRouter(Detail)