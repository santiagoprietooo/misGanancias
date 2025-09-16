<script setup>
import { ref } from 'vue';
import '../assets/css/formGananciaGasto.css';

const nuevoGasto = defineModel({
    type: Object,
    required: true
});

const emit = defineEmits(['crearGasto', 'cerrarFormulario']);

defineProps({
    tipo: {
        type: String,
        required: true
    },
    abrirEditar: {
        type: Object,
        required: true
    }
});

const error = ref({
    mostrar: false,
    mensaje: ''
});
</script>

<template>
    <div class="formulario-ganancia">
        <header>
            <button type="button" @click="emit('cerrarFormulario')">
                < Volver
            </button>

            <h2>{{ tipo === 'agregar' ? 'Agregar una ganancia' : 'Agregar un gasto' }}</h2>
        </header>

        <form @submit.prevent="emit('crearGasto')">
            <div>
                <label :for="tipo === 'agregar' ? 'ganancia' : 'gasto'">
                    {{ tipo === 'agregar' ? 'Ganancia' : 'Gasto' }}
                </label>
                <input
                    type="text"
                    :name="tipo === 'agregar' ? 'ganancia' : 'gasto'"
                    :id="tipo === 'agregar' ? 'ganancia' : 'gasto'"
                    :placeholder="tipo === 'agregar' ? 'Venta de budín' : 'Compra de ingredientes'"
                    autocomplete="off"
                    :class="error.mostrar && error.mensaje === 'El campo no puede estar vacío.' ? 'formulario-ganancia-input-error' : ''"
                    v-model.trim="nuevoGasto.titulo"
                    @input="nuevoGasto.titulo.length > 0 ? error = { mostrar: false, mensaje: '' } : error = { mostrar: true, mensaje: 'El campo no puede estar vacío.' }"
                >
                <p v-if="error.mostrar && error.mensaje === 'El campo no puede estar vacío.'" class="formulario-ganancia-error">
                    {{ error.mensaje }}
                </p>
            </div>

            <div>
                <label :for="tipo === 'agregar' ? 'agregar-monto' : 'restar-monto'">
                    Monto
                </label>

                <div class="formulario-ganancia-monto">
                    <span :class="error.mostrar && error.mensaje === 'Debe ingresar un monto.' ? 'formulario-ganancia-input-error' : ''">$</span>
                    <input
                        type="number"
                        :name="tipo === 'agregar' ? 'agregar-monto' : 'restar-monto'"
                        :id="tipo === 'agregar' ? 'agregar-monto' : 'restar-monto'"
                        autocomplete="off"
                        :class="error.mostrar && error.mensaje === 'Debe ingresar un monto.' ? 'formulario-ganancia-input-error' : ''"
                        v-model.number="nuevoGasto.monto"
                        @input="nuevoGasto.monto > 0 ? error = { mostrar: false, mensaje: '' } : error = { mostrar: true, mensaje: 'Debe ingresar un monto.' }"
                    >
                </div>

                <p v-if="error.mostrar && error.mensaje === 'Debe ingresar un monto.'" class="formulario-ganancia-error">
                    {{ error.mensaje }}
                </p>
            </div>

            <button type="submit" :disabled="!nuevoGasto.titulo || !nuevoGasto.monto">
                {{ tipo === 'agregar' ? 'Agregar ganancia' : 'Agregar gasto' }}
            </button>
        </form>
    </div>
</template>