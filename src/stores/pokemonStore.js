import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemons = ref([]);

  const loadPokemons = async () => {
    const ids = [1, 4, 7, 25]; 
    const data = await Promise.all(
      ids.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
      )
    );
    pokemons.value = data;
  };
  loadPokemons();

  return { pokemons };
});