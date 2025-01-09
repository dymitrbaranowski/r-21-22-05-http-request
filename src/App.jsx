import { Component } from 'react';
//import { ToastContainer } from 'react-toastify';
// import PokemonForm from './components/PokemonForm';
// import PokemonInfo from './components/PokemonInfo';

export default class App extends Component {
  state = {
    pokemon: {},
  };
  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
      .then(res => res.json())
      .then(console.log);
  }
  render() {
    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        {this.state.pokemon && (
          <div>Тут будет покемон после фетча и когда в стейт запишем</div>
        )}
      </div>
    );
  }
}
