import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/ducks/modalDuck';
import ReactWordcloud from 'react-wordcloud';
import { colorFromType } from '../../common/constants';
import './PokemonWordCloud.css';

function PokemonWordCloud() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const colorDict = {};

  function onWordClick() {
    return function(word) {
      //finner pokemoninformasjon fra ordet som ble trykket og videresender til redux
      const selectedPokemon = pokemon.filter(
        pokemon => pokemon.name === word.text
      )[0];
      selectedPokemon.views++;
      word.value++;
      dispatch(
        openModal({
          id: selectedPokemon.id,
          stats: selectedPokemon.stats,
          name: selectedPokemon.name,
          types: selectedPokemon.types,
          views: selectedPokemon.views
        })
      );
    };
  }

  //itererer gjennom pokemon og legger ord og verdi inn i words-arrayen
  function getWords() {
    for (let x = 0; x < pokemon.length; x++)
      colorDict[pokemon[x].name] = colorFromType[pokemon[x].types[0]];
    return pokemon.map(pokemon => {
      return {
        text: pokemon.name,
        value: pokemon.views
      };
    });
  }

  return (
    <div className='wordCloud'>
      <ReactWordcloud
        options={{
          fontSizes: [15, 80]
        }}
        callbacks={{
          getWordColor: ({ text }) => {
            return colorDict[text];
          },
          getWordTooltip: ({ text, value }) => {
            return text + ' (views: ' + value + ')';
          },
          onWordClick: onWordClick()
        }}
        maxWords={151}
        size={[500, 500]}
        words={getWords()}
      />
    </div>
  );
}
export default React.memo(PokemonWordCloud);
