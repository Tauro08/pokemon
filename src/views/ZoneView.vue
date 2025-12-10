<template>
  <div class="zone">
    <h1 class="title">{{ zoneName }} <small v-if="zoneId">(#{{ zoneId }})</small></h1>

    <div class="actions">
      <button @click="handleRouteOrAlert('missions')">Misiones de la zona</button>
      <button @click="handleRouteOrAlert('pvp')">Ir a PVP</button>
      <button @click="startCapture">Iniciar captura</button>
    </div>

    <section class="npcs">
      <h2>NPCs</h2>
      <ul>
        <li v-for="npc in npcs" :key="npc.id">
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
      <ul>
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { zonas } from '@/data/zones'

const route = useRoute()
const router = useRouter()

const zoneId = computed(() => {
  const p = route.params.id
  return p ? Number(p) : null
})

const zone = computed(() => zonas.find(z => z.id === zoneId.value) || null)
const zoneName = computed(() => zone.value ? zone.value.nombre : 'Zona desconocida')

// Constantes temporales para NPCs y entrenadores
const npcs = [
  { id: 1, name: 'Aldo', role: 'Guía del Bosque' },
  { id: 2, name: 'Mariela', role: 'Comerciante' }
]

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

function startCapture() {
  // No existe ruta de captura por ahora => aviso
  alert('Módulo en desarrollo')
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

</style>