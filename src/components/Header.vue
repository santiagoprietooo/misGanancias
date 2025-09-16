<script setup>
import '../assets/css/header.css';

defineProps({
    titulo: {
        type: String,
        required: true
    }
});
</script>

<template>
    <header class="header">
        <h1 class="header-title">{{ titulo }}</h1>
    </header>
</template>