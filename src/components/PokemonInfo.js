import { Component } from 'react';
// import PokemonDataView from './PokemonDataView';
import PokemonErrorView from './PokemonErrorView';
// import PokemonPendingView from './PokemonPendingView';
// import pokemonAPI from '../services/pokemon-api';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,

    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(
              new Error(`Нет покемона с именем ${nextName}`)
            );
          })

          .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  render() {
    const { pokemon, error, status } = this.state;

    if (status === 'idle') {
      return <div>Введите имя покемона!</div>;
    }

    if (status === 'pending') {
      return <div>Загружаем...</div>;
    }

    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div>
          <p>{pokemon.name}</p>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            width="240"
            alt={pokemon.name}
          />
        </div>
      );
    }
  }
}
