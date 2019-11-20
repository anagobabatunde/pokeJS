import React from "react";
import CardSwiper from "../components/CardSwiper";
import { withRouter } from "react-router-dom";
import api from "../API/pokeApi";
import LinearProgress from "@material-ui/core/LinearProgress";
import TypeCard from "../components/TypeCard";

const styles = {
    container: {
        border: 'solid',
        display: 'flex',
        width: '100%',
        height: '100%',
        borderColor: 'red'
    },
    spriteContainer: {
        width: '100%',
        height: '100%',
        border: 'solid',
        borderColor: 'yellow'
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
            types: []
        }
    }
    componentDidMount() {
        this.setState({isLoading: true})
        this._loadSpecs(this.props.match.params.id)
    }
    _loadSpecs(id) {
        api.getPokemonById(id).then(data => {
            // console.log(data)
            this.setState({sprites: data.sprites, types: data.types, moves: data.moves, isLoading: false}, () => {console.log("je suis la",this.state)});
        });
      }
    render() {
        console.log("change type",this.props)
        if (!this.state.isLoading) {
            return (
                <div style={styles.container}>
                    <div style={styles.spriteContainer}>
                        <CardSwiper sprites={this.state.sprites}/>
                    </div>
                    <div style={styles.TypeContainer}>
                        <div style={styles.TypeCardContainer}>
                            <TypeCard title={"Type of Pokemon"} types={this.state.types}/>
                        </div>
                        <div style={styles.TypeCardContainer}>
                            <TypeCard title={"Moves"} moves={this.state.moves}/>
                        </div>
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