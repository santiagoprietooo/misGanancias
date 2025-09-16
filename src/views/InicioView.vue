<script setup>
import { ref } from 'vue';
import { DollarSign, Minus, MoreVertical, X } from 'lucide-vue-next';
import '../assets/css/inicioView.css';
import Ganancias from '@/models/Ganancias';
import formatoHora from '@/helpers/tiempo';
import formatearPrecio from '@/helpers/precio';
import FormGananciaGasto from '@/components/FormGananciaGasto.vue';

const valorTotal = ref(parseFloat(localStorage.getItem('misGanancias - Total')) || 0);
const ganancias = ref(new Ganancias(valorTotal.value));
const abrirEditar = ref({
    valor: false,
    abrir: ''
});
const nuevoGasto = ref({
    titulo: '',
    monto: '',
    fecha: null,
    tipo: ''
});
const abrirMenu = ref({
    abrir: false,
    id: null
});
const historial = ref(JSON.parse(localStorage.getItem('misGanancias - Historial')) || []);

function crearGasto() {
    if (abrirEditar.value.abrir === 'agregar') {
        ganancias.value.aumentarMonto(parseFloat(nuevoGasto.value.monto));

        nuevoGasto.value.tipo = 'ganancia';
    } else if (abrirEditar.value.abrir === 'restar') {
        ganancias.value.restarMonto(parseFloat(nuevoGasto.value.monto));

        nuevoGasto.value.tipo = 'gasto';
    }

    nuevoGasto.value.fecha = new Date().getTime();

    historial.value.push({...nuevoGasto.value});

    localStorage.setItem('misGanancias - Total', ganancias.value.obtenerTotal());
    localStorage.setItem('misGanancias - Historial', JSON.stringify(historial.value));

    reiniciarNuevoGasto();

    reiniciarAbrirEditar();
}

function abrirOpcionesDeMov(i) {
    abrirMenu.value = {
        abrir: true,
        id: i
    }
}

function reiniciarNuevoGasto() {
    nuevoGasto.value = {
        titulo: '',
        monto: '',
        fecha: null,
        tipo: ''
    }
}

function reiniciarAbrirEditar() {
    abrirEditar.value = {
        abrir: false,
        valor: ''
    }
}

function reiniciarAbrirMenu() {
    abrirMenu.value = {
        abrir: false,
        id: null
    }
}

function borrarGasto(i) {
    if (historial.value[i].tipo === 'ganancia') {
        ganancias.value.restarMonto(historial.value[i].monto);
    } else if (historial.value[i].tipo === 'gasto') {
        ganancias.value.aumentarMonto(historial.value[i].monto);
    }

    historial.value.splice(i, 1);

    localStorage.setItem('misGanancias - Total', ganancias.value.obtenerTotal());
    localStorage.setItem('misGanancias - Historial', JSON.stringify(historial.value));
}
</script>

<template>
    <main class="ganancia-contenedor">
        <div>
            <span class="ganancia-total">
                <h2>Ganancias totales</h2> 
                <strong>{{ formatearPrecio(ganancias.total) }}</strong>
            </span>

            <div class="ganancia-botones">
                <button
                    type="button"
                    @click="abrirEditar = { valor: true, abrir: 'agregar' }; reiniciarAbrirMenu()"
                >
                    <DollarSign />
                    <span class="sr-only">Ganancia</span>
                </button>

                <button
                    type="button"
                    @click="abrirEditar = { valor: true, abrir: 'restar' }, reiniciarAbrirMenu()"
                >
                    <Minus />
                    <span class="sr-only">Gasto</span>
                </button>
            </div>
        </div>
    </main>

    <template v-if="abrirEditar.valor && abrirEditar.abrir === 'agregar'">
        <FormGananciaGasto
            v-model="nuevoGasto"
            tipo="agregar"
            :abrir-editar="abrirEditar"
            @crear-gasto="crearGasto"
            @cerrar-formulario="reiniciarAbrirEditar(); reiniciarNuevoGasto()"
        />
    </template>

    <template v-else-if="abrirEditar.valor && abrirEditar.abrir === 'restar'">
        <FormGananciaGasto
            v-model="nuevoGasto"
            tipo="restar"
            :abrir-editar="abrirEditar"
            @crear-gasto="crearGasto"
            @cerrar-formulario="reiniciarAbrirEditar(); reiniciarNuevoGasto()"
        />
    </template>

    <section class="movimientos-contenedor">
        <h2>Movimientos</h2>

        <ul v-if="historial.length > 0" class="movimientos-lista">
            <li
                v-for="(h, index) in historial.sort((a, b) => b.fecha - a.fecha)"
                :key="index"
                :class="{
                    'fondo-blureado-gasto' : h.tipo === 'gasto' && abrirMenu.abrir && abrirMenu.id === index, 
                    'movimiento-tipo-gasto': h.tipo === 'gasto',
                    'fondo-blureado-ganancia' : h.tipo === 'ganancia' && abrirMenu.abrir && abrirMenu.id === index,
                    'movimiento-tipo-ganancia': h.tipo === 'ganancia',
                }"
            >
                <span class="movimientos-lista-encabezado">
                    <h3 class="movimientos-lista-titulo">{{ h.titulo }}</h3>

                    <button
                        type="button"
                        class="movimiento-lista-btn-abrir"
                        :class="{ 'movimiento-lista-btn-abrir-abierto' : abrirMenu.abrir && abrirMenu.id === index }"
                        @click="abrirMenu.abrir && abrirMenu.id === index ? abrirMenu = { abrir: false, id: null } : abrirOpcionesDeMov(index)"
                    >
                        <span class="sr-only">
                            Abrir opciones
                        </span>

                        <X v-if="abrirMenu.abrir && abrirMenu.id === index"/>
                        <MoreVertical v-else/>
                    </button>

                    <div
                        v-if="abrirMenu.abrir && abrirMenu.id === index"
                        class="movimiento-lista-opciones"
                        :class="{ 'movimiento-lista-opciones-gasto' : h.tipo === 'gasto' }"
                    >
                        <button type="button" @click="borrarGasto(index); abrirMenu = { abrir: false, id: null }" class="movimiento-lista-btn-borrar">
                            Borrar {{ h.tipo === 'gasto' ? 'gasto' : 'ganancia' }}
                        </button>
                    </div>
                </span>

                <span class="movimientos-lista-fecha">
                    <small>
                        <time :datetime="formatoHora(h.fecha)">
                            {{ formatoHora(h.fecha) }}
                        </time>
                    </small>
                </span>

                <span class="movimientos-lista-monto">
                    <strong>
                        <span>{{ h.tipo === 'gasto' ? ' - ' : ' + ' }}</span>
                        <span>{{ formatearPrecio(h.monto) }}</span>
                    </strong>
                </span>
            </li>
        </ul>

        <div v-else class="movimientos-historial-vacio">
            <p>No hay movimientos todavía.</p>
        </div>
    </section>
</template>