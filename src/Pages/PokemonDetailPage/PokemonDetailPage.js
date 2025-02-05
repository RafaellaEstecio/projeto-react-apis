import { PokemonDetailPageContainer } from "./PokemonDetailPage.styled";
import Header from "../../Components/Header/Header";
import bug from "../../assets/img/iconsHabilidades/bug.png"
import dark from "../../assets/img/iconsHabilidades/dark.png"
import dragon from "../../assets/img/iconsHabilidades/dragon.png"
import electric from "../../assets/img/iconsHabilidades/electric.png"
import fairy from "../../assets/img/iconsHabilidades/fairy.png"
import fighting from "../../assets/img/iconsHabilidades/fighting.png"
import fire from "../../assets/img/iconsHabilidades/fire.png"
import flying from "../../assets/img/iconsHabilidades/flying.png"
import ghost from "../../assets/img/iconsHabilidades/ghost.png"
import grass from "../../assets/img/iconsHabilidades/grass.svg"
import ground from "../../assets/img/iconsHabilidades/ground.png"
import ice from "../../assets/img/iconsHabilidades/ice.png"
import normal from "../../assets/img/iconsHabilidades/normal.png"
import poison from "../../assets/img/iconsHabilidades/poison.png"
import psychic from "../../assets/img/iconsHabilidades/psychic.png"
import rock from "../../assets/img/iconsHabilidades/rock.png"
import steel from "../../assets/img/iconsHabilidades/steel.png"
import water from "../../assets/img/iconsHabilidades/water.png"
import pokebolSymbol from "../../assets/img/cardDesign/simbolpokemoncard.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { capitalize, getPokedexFromStorage, nameFormatter, PAGES } from "../../utils";
import { useDisclosure } from "@chakra-ui/react";
import { CustomProgressBar } from "../../Components/Chakra/CustomProgress/CustomProgressBar";


function PokemonDetailPage(props) {

  const {
    id
  } = useParams();

  const [pokemon, setPokemon] = useState({});

  async function getPokemonDetails(pokemonId) {
    axios.create({
      baseURL: "https://pokeapi.co/api/v2/"
    }).get(`pokemon/${pokemonId}`)
      .then((resposta) => {
        let moves = [...resposta.data.moves]
        let stats = [...resposta.data.stats]
        let tipos = [...resposta.data.types];
        let pokemonMapeado = {
          name: resposta.data.name,
          img: resposta.data.sprites.other['official-artwork'].front_default,
          id: resposta.data.id,
          types: tipos.map((value, index) => { return value.type.name }),
          stats: stats.map((value) => { return { name: value.stat.name, base_stat: value.base_stat } }),
          moves: moves.map((value) => value.move.name),
          img_front: resposta.data.sprites.front_default,
          img_back: resposta.data.sprites.back_default,
        }
        setPokemon(pokemonMapeado)
        localStorage.setItem('pokemon',JSON.stringify(pokemonMapeado));
      }

      )
  }


  useEffect(() => {
    getPokemonDetails(id)
  }, [])


  function corFundo(types) {
    if (types) {
      let tipoPokemon = types[0]
      return typesButtons[tipoPokemon].background;
    }
  }

  const typesButtons = {
    'bug': {
      button: bug,
      background: '#437d4a'
    },
    'dark': {
      button: dark,
      background: '#352d3d'
    },
    'dragon': {
      button: dragon,
      background: '#097286'
    },
    'electric': {
      button: electric,
      background: '#deb504'
    },
    'fairy': {
      button: fairy,
      background: '#d151a1'
    },
    'fighting': {
      button: fighting,
      background: '#7f2841'
    },
    'fire': {
      button: fire,
      background: '#e9904e'
    },
    'flying': {
      button: flying,
      background: '#3b6786'
    },
    'ghost': {
      button: ghost,
      background: '#686f86'
    },
    'grass': {
      button: grass,
      background: '#729F92'
    },
    'ground': {
      button: ground,
      background: '#9e5129'
    },
    'ice': {
      button: ice,
      background: '#539a8f'
    },
    'normal': {
      button: normal,
      background: '#BF9762'
    },
    'poison': {
      button: poison,
      background: '#6d376e'
    },
    'psychic': {
      button: psychic,
      background: '#d88083'
    },
    'rock': {
      button: rock,
      background: '#706648'
    },
    'steel': {
      button: steel,
      background: '#817a7a'
    },
    'water': {
      button: water,
      background: '#257bba'
    }
  };
  return (
    <>
      <Header page={PAGES.POKEMON_DETAILS}></Header>

      <PokemonDetailPageContainer>

        <h1 className="h1-detail">Detalhes</h1>
        <div className="fundo-div">
          <img className="img-pokemon-detail" src={pokemon.img} alt="Pokemon perfil" />

          <div className="green-div-page">

            <img className="pokebol-symbol" width={675} src={pokebolSymbol} alt={props.nome}></img>

            <div className="div-test">
              <div className="pokemon-front-back">
                <div className="img-pokemon-front">
                  <img width={'250px'} src={pokemon.img_front} alt="Pokemon perfil" />
                </div>
                <div className="img-pokemon-back">
                  <img width={'250px'} src={pokemon.img_back} alt="Pokemon perfil" />
                </div>
              </div>
              <div className="base-stats-pokemon">
                <h2 className="h2-style">Base stats</h2>

                <div className="stats">
                  {
                    pokemon.stats &&
                    pokemon.stats.map((stat) => {
                      return <div key={stat.base_stat + Math.random()} className="stats-value">
                        <div className="stats-name">
                          <h3>{nameFormatter(stat.name)}</h3>
                        </div>
                        <h3>{stat.base_stat}</h3>
                        <CustomProgressBar progress={stat.base_stat} />
                      </div>
                    })
                  }

                  <div className="stats-value">
                    <div className="stats-name">
                      <h3>Total</h3>
                    </div>
                    <h3 style={{ fontWeight: 'bold' }} >{pokemon.stats && pokemon.stats.reduce((previous, current) => previous + current.base_stat, 0)}</h3>
                  </div>
                </div>

              </div>
              <div className="type-moves-pokemon">
                <div className="name-type-pokemon">
                  <h2 className="pokemon-id">#{pokemon.id}</h2>
                  <h2 className="pokemon-nome">{capitalize(pokemon.name)}</h2>
                  <div className="div-type">

                    {
                      pokemon.types &&
                      pokemon.types.map((tipo) => {
                        return <img key={pokemon.id + Math.random()}
                          className="icon-tipo"
                          src={typesButtons[tipo].button}
                          alt="img tipo"></img>
                      })
                    }
                  </div>
                </div>
                <div className="moves-pokemon">
                  {
                    pokemon.moves &&
                    pokemon.moves.slice(0, 7).map((move) => {
                      return <div className="move-item" key={pokemon.id + Math.random()}>{nameFormatter(move)}</div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

      </PokemonDetailPageContainer>
    </>
  )



}
export default PokemonDetailPage;