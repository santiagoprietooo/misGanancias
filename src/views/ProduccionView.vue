<script setup>
import { ref } from 'vue';
import '../assets/css/produccionView.css';
import Produccion from '@/models/Produccion';

const produccionExistente = ref(JSON.parse(localStorage.getItem('misGanancias - Producción')) || {
    nombre: '',
    gustos: [],
    ingredientes: []
});
const produccion = ref(new Produccion(produccionExistente.value));
const abrirCrear = ref(false);
const abrirEditar = ref(false);
const nuevaProduccion = ref({
    nombre: '',
    gustos: [''],
    ingredientes: [{
        nombre: '',
        unidades: 1
    }]
});
const editandoProduccion = ref(null);

function crearProduccion() {
    produccion.value.agregarNombre(nuevaProduccion.value.nombre);

    nuevaProduccion.value.gustos.forEach((gusto) => {
        produccion.value.agregarGusto(gusto);
    });
    nuevaProduccion.value.ingredientes.forEach((ingrediente) => {
        produccion.value.agregarIngrediente(ingrediente);
    });

    localStorage.setItem('misGanancias - Producción', JSON.stringify(produccion.value));

    abrirCrear.value = false;
}

function abrirEdicion() {
    editandoProduccion.value = JSON.parse(localStorage.getItem('misGanancias - Producción'));
    abrirEditar.value = true;
}

function editarProduccion() {
    localStorage.setItem('misGanancias - Producción', JSON.stringify(editandoProduccion.value));

    produccion.value = JSON.parse(localStorage.getItem('misGanancias - Producción'));
    abrirEditar.value = false;
}

function borrarProduccion() {
    localStorage.removeItem('misGanancias - Producción');
    window.location.reload();
}
</script>

<template>
    <template v-if="abrirCrear">
        <section class="agregar-produccion">
            <header>
                <button type="button" @click="abrirCrear = false">
                    < Volver
                </button>

                <h2>Agregar producción</h2>
            </header>

            <form @submit.prevent="crearProduccion">
                <div>
                    <label for="nombre">Nombre</label>
                    <br>
                    <input
                        name="nombre"
                        id="nombre"
                        type="text"
                        class="nombre-input"
                        autocomplete="off"
                        v-model.trim="nuevaProduccion.nombre"
                    />
                </div>

                <div v-for="(gusto, index) in nuevaProduccion.gustos" :key="index">
                    <label :for="`gusto-${index}`">
                        Agregar {{ index > 0 ? 'otro' : '' }} gusto
                    </label>

                    <div class="agregar-borrar-contenedor">
                        <input
                            :name="`gusto-${index}`"
                            :id="`gusto-${index}`"
                            type="text"
                            class="gusto-input"
                            autocomplete="off"
                            v-model.trim="nuevaProduccion.gustos[index]"
                        />

                        <button
                            v-if="index > 0"
                            type="button"
                            @click="nuevaProduccion.gustos.splice(index, 1)"
                            class="agregar-borrar-btn"
                        >
                            -
                        </button>
                        <button
                            type="button"
                            @click="nuevaProduccion.gustos.push('')"
                            class="agregar-borrar-btn"
                        >
                            +
                        </button>
                    </div>

                </div>

                <div v-for="(ingrediente, index) in nuevaProduccion.ingredientes" :key="index">
                    <label :for="`ingrediente-${index}`">
                        Agregar {{ index > 0 ? 'otro' : '' }} ingrediente
                    </label>

                    <div class="agregar-borrar-contenedor">
                        <div class="unidad-ingrediente-contenedor">
                            <input
                                :name="`unidad-${index}`"
                                :id="`unidad-${index}`"
                                type="number"
                                v-model.number="ingrediente.unidades"
                                class="unidad-input"
                                autocomplete="off"
                            />

                            <input
                                :name="`ingrediente-${index}`"
                                :id="`ingrediente-${index}`"
                                type="text"
                                v-model.trim="ingrediente.nombre"
                                autocomplete="off"
                            />
                        </div>

                        <button
                            v-if="index > 0"
                            type="button"
                            @click="nuevaProduccion.ingredientes.splice(index, 1)"
                            class="agregar-borrar-btn"
                        >
                            -
                        </button>
                        <button
                            type="button"
                            @click="nuevaProduccion.ingredientes.push({ nombre: '', unidades: 1 })"
                            class="agregar-borrar-btn"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button type="submit" class="produccion-detalles-btn" :disabled="!nuevaProduccion.nombre">Guardar</button>
            </form>
        </section>
    </template>

    <template v-else-if="abrirEditar">
        <section class="agregar-produccion">
            <header>
                <button type="button" @click="abrirEditar = false">
                    < Volver
                </button>

                <h2>Editar producción</h2>
            </header>

            <form @submit.prevent="editarProduccion">
                <div>
                    <label for="nombre">Nombre</label>
                    <br>
                    <input
                        name="nombre"
                        id="nombre"
                        type="text"
                        class="nombre-input"
                        v-model.trim="editandoProduccion.nombre"
                        autocomplete="off"
                    />
                </div>

                <div v-for="(gusto, index) in editandoProduccion.gustos" :key="index">
                    <label :for="`gusto-${index}`">
                        Editar gusto
                    </label>

                    <div class="agregar-borrar-contenedor">
                        <input
                            :name="`gusto-${index}`"
                            :id="`gusto-${index}`"
                            type="text"
                            class="gusto-input"
                            v-model.trim="editandoProduccion.gustos[index]"
                            autocomplete="off"
                        />

                        <button
                            v-if="index > 0"
                            type="button"
                            @click="editandoProduccion.gustos.splice(index, 1)"
                            class="agregar-borrar-btn"
                        >
                            -
                        </button>
                        <button
                            type="button"
                            @click="editandoProduccion.gustos.push('')"
                            class="agregar-borrar-btn"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div v-for="(ingrediente, index) in editandoProduccion.ingredientes" :key="index">
                    <label :for="`ingrediente-${index}`">
                        Editar ingrediente
                    </label>

                    <div class="agregar-borrar-contenedor">
                        <div class="unidad-ingrediente-contenedor">
                            <input
                                :name="`unidad-${index}`"
                                :id="`unidad-${index}`"
                                type="number"
                                v-model.number="ingrediente.unidades"
                                class="unidad-input"
                                autocomplete="off"
                            />

                            <input
                                :name="`ingrediente-${index}`"
                                :id="`ingrediente-${index}`"
                                type="text"
                                v-model.trim="ingrediente.nombre"
                                autocomplete="off"
                            />

                            <button
                                v-if="index > 0"
                                type="button"
                                @click="editandoProduccion.ingredientes.splice(index, 1)"
                                class="agregar-borrar-btn"
                            >
                                -
                            </button>
                            <button
                                type="button"
                                @click="editandoProduccion.ingredientes.push({ nombre: '', unidades: 1 })"
                                class="agregar-borrar-btn"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <button type="submit" class="produccion-detalles-btn" :disabled="!editandoProduccion.nombre">Guardar</button>
            </form>
        </section>
    </template>

    <template v-else>
        <div v-if="!produccion.nombre || !produccion.gustos || !produccion.ingredientes" class="no-produccion">
            <p>No agregaste ninguna producción todavía.</p>

            <button type="button" @click="abrirCrear = true" class="produccion-detalles-btn">
                Agregar una producción
            </button>
        </div>

        <article v-else class="produccion-detalles">
            <h2>{{ produccion.nombre }}</h2>

            <div v-if="!produccion.gustos.includes('')">
                <h3>Gustos</h3>

                <ul>
                    <li v-for="(gusto, index) in produccion.gustos" :key="index">
                        {{ gusto }}
                    </li>
                </ul>
            </div>

            <div v-if="!produccion.ingredientes.find((i) => i.nombre === '')">
                <h3>Ingredientes</h3>

                <ul>
                    <li v-for="(ingrediente, index) in produccion.ingredientes" :key="index">
                        <span>x{{ ingrediente.unidades }}</span> <span>{{ ingrediente.nombre }}</span>
                    </li>
                </ul>
            </div>

            <div class="btn-contenedor">
                <button type="button" @click="abrirEdicion()" class="produccion-detalles-btn">
                    Editar producción
                </button>

                <button type="button" @click="borrarProduccion()" class="produccion-borrar-btn">
                    Borrar producción
                </button>
            </div>
        </article>
    </template>
</template>