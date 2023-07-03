const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('form');
const input = document.querySelector('input');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonAtual = 35;

async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    
    const response = await fetch(url);
    const data = await response.json();
    return data;

}

async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);
    if(data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        pokemonAtual = data.id;
    }

    else {
        pokemonImage.computedStyleMap.display = 'none';
        pokemon.innerText = 'Não encontrado : (';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let pokemon = input.value;
    renderPokemon(pokemon);
})

btnPrev.addEventListener('click', () => {
    if(pokemonAtual > 1) {
        pokemonAtual--;
        renderPokemon(pokemonAtual);
    }
})

btnNext.addEventListener('click', () => {
    if(pokemonAtual > 1) {
        pokemonAtual++;
        renderPokemon(pokemonAtual);
    }
})

renderPokemon(pokemonAtual);

