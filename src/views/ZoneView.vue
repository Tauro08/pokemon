<template>
  <div class="zone">
    <h1 class="title">{{ zoneName }} <small v-if="zoneId">(#{{ zoneId }})</small></h1>

    <div class="actions">
      <button @click="handleRouteOrAlert('missions')">Misiones de la zona</button>
      <button @click="handleRouteOrAlert('pvp')">Ir a PVP</button>
      <button @click="startCapture" :disabled="capturando">Iniciar captura</button>
    </div>
    <div v-if="capturando" class="capture-status">Buscando Pokémon salvaje…</div>
    <div v-if="pokemonCapturado" class="capture-result">
      ¡Se encontró un <strong>{{ pokemonCapturado }}</strong> salvaje!
    </div>

    <section class="npcs">
      <h2>NPCs</h2>
      <div style="margin-bottom: 12px;">
        <button @click="agregarNpcVisitante" style="padding: 8px 12px; border-radius: 8px; background: #10b981; color: white; border: none; cursor: pointer;">Agregar NPC visitante</button>
      </div>
      <ul>
        <li v-for="npc in npcsList" :key="npc.id">
          <div class="npc-info">
            <strong>{{ npc.name }}</strong>
            <p class="npc-role">{{ npc.role }}</p>
          </div>
          <div class="npc-actions">
            <button @click="talkToNpc(npc)">Hablar</button>
          </div>
        </li>
      </ul>
    </section>

    <section class="trainers">
      <h2>Entrenadores online</h2>
      <label class="switch-container">
        <input type="checkbox" v-model="showOnline" />
        <span class="switch-label">Mostrar entrenadores</span>
      </label>
      <ul v-if="showOnline">
        <li v-for="t in trainers" :key="t.id">
          <div class="trainer-info">
            <strong>{{ t.name }}</strong>
            <span class="level">Nivel {{ t.level }}</span>
          </div>
          <div class="trainer-actions">
            <button @click="viewTrainer(t)">Ver</button>
            <button @click="challengeTrainer(t)">Desafiar</button>
          </div>
        </li>
      </ul>
    </section>
    
    <section class="zone-pokemons">
      <h2>Pokémon de la zona</h2>
      <div class="pokemoncard">
        <PokemonCard
          v-for="p in store.pokemons"
          :key="p.id"
          :pokemon="p"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { zonas } from '@/data/zones'
import { zonePokemonMap } from '@/data/zonePokemonMap'
import { pokemonsPorZona } from '@/data/pokemonsPorZona'
import { usePokemonStore } from '@/stores/pokemonStore.js'
import PokemonCard from '@/components/pokemonCard.vue'

const route = useRoute()
const router = useRouter()

const zoneId = computed(() => {
  const p = route.params.id
  return p ? Number(p) : null
})

const zone = computed(() => zonas.find(z => z.id === zoneId.value) || null)
const zoneName = computed(() => zone.value ? zone.value.nombre : 'Zona desconocida')

const store = usePokemonStore()

// Cargar pokemons permitidos para la zona actual
watch(zoneId, async (val) => {
  if (!val) return
  const pid = zonePokemonMap[val]
  if (pid) {
    await store.loadPokemons([pid])
  }
}, { immediate: true })

// === Estados internos ===

// 1. Lista reactiva de NPCs
const npcsList = reactive([
  { id: 1, name: 'Aldo', role: 'Guía del Bosque' },
  { id: 2, name: 'Mariela', role: 'Comerciante' }
])
let nextNpcId = 3

function agregarNpcVisitante() {
  npcsList.push({
    id: nextNpcId++,
    name: `NPC visitante ${nextNpcId - 2}`,
    role: 'Visitante'
  })
}

// 2. Switch ON/OFF para entrenadores online
const showOnline = ref(true)

// 3. Captura Pokémon activada
const capturando = ref(false)
const pokemonCapturado = ref(null)

function startCapture() {
  if (capturando.value) return
  
  capturando.value = true
  pokemonCapturado.value = null
  
  // Simular búsqueda por 2 segundos
  setTimeout(() => {
    const pokemons = pokemonsPorZona[zoneId.value]
    if (pokemons && pokemons.length > 0) {
      // Seleccionar uno al azar
      const randomIndex = Math.floor(Math.random() * pokemons.length)
      pokemonCapturado.value = pokemons[randomIndex]
    }
    capturando.value = false
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      pokemonCapturado.value = null
    }, 3000)
  }, 2000)
}

// Constantes temporales para NPCs y entrenadores
const trainers = [
  { id: 1, name: 'RivalJoe', level: 12 },
  { id: 2, name: 'Sara', level: 8 }
]

function handleRouteOrAlert(routeName) {
  if (router.hasRoute(routeName)) {
    router.push({ name: routeName })
  } else {
    alert('Módulo en desarrollo')
  }
}

function talkToNpc(npc) {
  alert(`${npc.name}: "Hola, viajero. ¿Necesitas ayuda en ${zoneName.value}?"`)
}

function viewTrainer(t) {
  alert(`Perfil de ${t.name} (simulado).`)
}

function challengeTrainer(t) {
  // si hay ruta pvp, navegar, si no, avisar
  if (router.hasRoute('pvp')) {
    router.push({ name: 'pvp' })
  } else {
    alert('Módulo en desarrollo')
  }
}
</script>

<style scoped>
.zone {
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
  color: #212121;
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 18px;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.title small {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.actions button {
  padding: 10px 14px;
  border-radius: 10px;
  background: linear-gradient(180deg,#1e88e5,#1565c0);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(21,101,192,0.12);
  transition: transform .12s ease, box-shadow .12s ease, opacity .12s;
}

.actions button:hover { transform: translateY(-2px); }

.actions button.secondary {
  background: linear-gradient(180deg,#fff,#f2f4f7);
  color: #1f2937;
  border: 1px solid #e6e9ef;
  box-shadow: none;
}

section {
  margin-top: 18px;
}

section h2 {
  margin: 0 0 12px;
  font-size: 18px;
  color: #263238;
}

/* listas como tarjetas */
ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr; gap: 10px; }
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 6px 18px rgba(14,30,37,0.04);
  border: 1px solid rgba(15,23,42,0.04);
}

.item-left { display:flex; align-items:center; gap:12px; }
.avatar {
  width:48px; height:48px; border-radius:50%; background:linear-gradient(180deg,#f5f7fb,#e9eef8); display:flex; align-items:center; justify-content:center; color:#1e293b; font-weight:700;
  box-shadow: 0 4px 10px rgba(16,24,40,0.06);
}

.npc-info, .trainer-info { display:flex; flex-direction: column; }
.npc-role, .level { font-size: 12px; color: #58636a; }

.item-actions { display:flex; gap:8px; align-items:center; }
.item-actions button {
  padding: 8px 10px; border-radius:8px; border:1px solid #e0e6ef; background:white; cursor:pointer; transition:transform .12s;
}
.item-actions button:hover { transform: translateY(-2px); }

.trainer-actions button.primary {
  background: linear-gradient(180deg,#f97316,#ea580c); color:white; border:none;
}

/* responsive: dos columnas en pantallas grandes */
@media (min-width: 760px) {
  .npcs ul, .trainers ul { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1100px) {
  .npcs ul, .trainers ul { grid-template-columns: repeat(3, 1fr); }
  .actions { gap: 18px; }
}

/* Estilos para los nuevos estados */
.switch-container { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.switch-container input { width: 18px; height: 18px; cursor: pointer; }
.switch-label { font-weight: 600; color: #263238; }

.capture-status { 
  margin-top: 12px; 
  padding: 12px; 
  border-radius: 8px; 
  background: #fef3c7; 
  color: #92400e; 
  font-weight: 600; 
  animation: pulse 1s infinite;
}

.capture-result { 
  margin-top: 12px; 
  padding: 12px; 
  border-radius: 8px; 
  background: #d1fae5; 
  color: #065f46; 
  font-weight: 600; 
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

</style>