<template>
  <div class="map">
    <h1>Mapa del Mundo</h1>

    <div class="zonas-list">
      <button
        v-for="z in zonas"
        :key="z.id"
        @click="irAZona(z.id)"
        :disabled="!z.desbloqueado"
      >
        {{ z.nombre }}
      </button>
    </div>
  </div>

  <div class="pokemoncard">
    <PokemonCard
      v-for="p in store.pokemons"
      :key="p.id"
      :pokemon="p"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { zonas } from "@/data/zones";
import {usePokemonStore} from "@/stores/pokemonStore.js"
import PokemonCard from "@/components/pokemonCard.vue";

const store = usePokemonStore();
const router = useRouter();

// El store ya carga los pokemons internamente al inicializarse

function irAZona(id) {
  router.push(`/zone/${id}`);
}
</script>

<style scoped>
.map {
  padding: 20px;
}

.zonas-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 44px;
  max-width: 320px;
}

.zonas-list::before {
  content: "";
  position: absolute;
  left: 22px;
  top: 16px;
  bottom: 16px;
  width: 4px;
  background: #e0e0e0;
  border-radius: 2px;
}

.zonas-list button {
  position: relative;
  padding: 10px 16px 10px 44px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 999px;
  text-align: left;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.zonas-list button::before {
  content: "";
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4caf50;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.zonas-list button:hover:not([disabled]) {
  transform: translateX(6px);
}

.zonas-list button[disabled] {
  background: #222;
  color: #9b9b9b;
  border-color: #2b2b2b;
  cursor: default;
  box-shadow: none;
}

.zonas-list button[disabled]::before {
  background: #555;
}

.pokemoncard {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 22px;
  align-items: flex-start;
}

</style>

