import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemon } from '../../store/ducks/pokemonDuck';
import ReactWordcloud from 'react-wordcloud';
import { colorFromType } from '../../common/constants';

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);
  const types = useSelector(state => state.types);
  const search = useSelector(state => state.search);

  let words = [];
  const colorDict = {};

  useEffect(() => {
    dispatch(fetchAllPokemon(types, search));
  }, [types, search]);

  function onWordClick() {
    return function(word) {
      console.log(word);
    };
  }

  if (pokemon) {
    for (let x = 0; x < pokemon.length; x++)
      colorDict[pokemon[x].name] = colorFromType[pokemon[x].types[0]];
    words = pokemon.map(pokemon => {
      return {
        text: pokemon.name,
        value: pokemon.views
      };
    });
  }

  return (
    <div style={{ backgroundColor: '#EEEEEE' }}>
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
        words={words}
      />
    </div>
  );
}
