import React from "react";
import CardSwiper from "../components/CardSwiper";
import { withRouter } from "react-router-dom";
import api from "../API/pokeApi";
import LinearProgress from "@material-ui/core/LinearProgress";
import TypeCard from "../components/TypeCard";
import DescCard from "../components/DescCard";
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
            // console.log(data)
            this.setState({sprites: data.sprites, types: data.types, moves: data.moves,name: data.name,id: data.id, isLoading: false}, () => {console.log("je suis la",this.state)});
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
                    <DescCard types={this.state.types} moves={this.state.moves} name={this.state.name} id={this.state.id} desc={this.props.location.state}/>
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