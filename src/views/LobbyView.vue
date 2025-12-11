<template>
  <div class="lobby">
    <h1>Lobby</h1>

    <section class="npcs">
      <h2>NPCs</h2>
      <div class="controls">
        <button @click="addNpc">Agregar NPC temporal</button>
      </div>
      <ul>
        <li v-for="npc in npcs" :key="npc.id">
          <div class="npc-item">
            <strong>{{ npc.name }}</strong>
            <small class="role">{{ npc.role }}</small>
          </div>
        </li>
      </ul>
    </section>

    <section class="online">
      <h2>Entrenadores online</h2>
      <label class="switch">
        <input type="checkbox" v-model="showOnline" />
        <span>Mostrar entrenadores online</span>
      </label>

      <ul v-if="showOnline" class="trainers">
        <li v-for="t in trainers" :key="t.id">{{ t.name }} — Nivel {{ t.level }}</li>
      </ul>
    </section>

    <section class="capture">
      <h2>Captura</h2>
      <button @click="startCapture" :disabled="capturando">Iniciar Captura</button>
      <p v-if="capturando" class="capturing">Buscando Pokémon salvaje…</p>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Lista reactiva de NPCs (reactive)
const npcs = reactive([
  { id: 1, name: 'Guillermo', role: 'Conserje' }
])

let nextNpcId = 2
function addNpc() {
  npcs.push({ id: nextNpcId++, name: `NPC temporal ${nextNpcId - 1}`, role: 'Temporal' })
}

// Estado booleano showOnline (ref)
const showOnline = ref(true)

const trainers = [
  { id: 1, name: 'OnlineJoe', level: 10 },
  { id: 2, name: 'Ana', level: 14 }
]

// Estado capturando (ref)
const capturando = ref(false)
function startCapture() {
  if (capturando.value) return
  capturando.value = true
  // Simular búsqueda
  setTimeout(() => {
    capturando.value = false
    alert('No se encontró ningún Pokémon (simulado)')
  }, 3000)
}
</script>

<style scoped>
.lobby { padding: 20px; max-width: 900px; }
.controls { margin-bottom: 8px; }
button { padding: 8px 12px; border-radius: 8px; background:#1976d2; color:white; border:none; cursor:pointer }
ul { list-style:none; padding:0; margin:0 0 12px 0 }
li { padding:8px 10px; border-radius:8px; background:#fff; margin-bottom:8px; border:1px solid #eee }
.switch { display:flex; align-items:center; gap:8px }
.capturing { color:#d97706; font-weight:600 }

</style>
