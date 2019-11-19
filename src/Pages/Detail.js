import React from "react";
import CardSwiper from "../components/CardSwiper";
import { withRouter } from "react-router-dom";
import api from "../API/pokeApi";
import LinearProgress from "@material-ui/core/LinearProgress";


const styles = {
    container: {
        border: 'solid',
        display: 'flex',
        width: '100%',
        height: '100%',
        borderColor: 'red'
    }
}
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprites: {},
            isLoading: false,
        }
    }
    componentDidMount() {
        this.setState({isLoading: true})
        this._loadSpecs(this.props.match.params.id)
    }
    _loadSpecs(id) {
        api.getPokemonById(id).then(data => {
            // console.log(data)
            this.setState({sprites: data.sprites, isLoading: false});
        });
      }
    render() {
        if (!this.state.isLoading) {
            return (
                <div style={styles.container}>
                    <CardSwiper sprites={this.state.sprites}/>
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

export default Detail