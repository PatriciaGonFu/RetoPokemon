const getRandomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async(id) => {
    try{
        const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json();

        console.log(data);

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat,
        }
        pintarCard(pokemon);
    }catch (error){
        console.log(error);
    }
}

const pintarCard = (pokemon) => {
    console.log(pokemon);
    
    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src',pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + 'K';

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}

const buscarPokemonName = async () => {
    const inputPokemon = document.getElementById('pokemonName');
    const pokemonName = inputPokemon.value.toLowerCase();

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await res.json();

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat,
        }
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
        alert('¡No se encontró un Pokémon con ese nombre!');
    }
}

const buscarPokemonId = async () => {
    const inputId = document.getElementById('pokemonId');
    const idValue = parseInt(inputId.value);

    if (isNaN(idValue) || idValue <=0){
        alert('Indique un id válido');
        return;
    }
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idValue}`);

        const data = await res.json();

        if (data.id === undefined){
            alert('No hay ningún Pokémon con ese Id');
            return;
        }

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat,
        }
        pintarCard(pokemon);
    }catch (error){
        console.log(error);
        alert('Hubo algún problema al buscar al Pokémon');
    }
}
