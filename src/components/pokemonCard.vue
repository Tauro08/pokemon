<template>
  <div class="card">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />

    <h2 class="name">
      {{ pokemon.name.toUpperCase() }}
    </h2>

    <p class="type">
      Tipo: <strong>{{ pokemon.types[0].type.name }}</strong>
    </p>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card {
  width: 160px;
  padding: 15px;
  background: #f7f7f7;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100px;
  height: 100px;
}

.name {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.type {
  margin-top: 6px;
  font-size: 14px;
}
</style>
