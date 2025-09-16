<script setup>
import { ref, watchEffect } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Navbar from './components/Navbar.vue';

const title = ref('');
const route = useRoute();

watchEffect(() => {
  const path = route.path;

  switch (path) {
    case '/':
      return title.value = 'misGanancias';

    case '/produccion':
      return title.value = 'miProducción';

    default:
      return title.value = 'misGanancias';
  }
});

watchEffect(() => {
  const path = route.path;

  switch (path) {
    case '/':
      return document.title = 'misGanancias - Ganancias';

    case '/produccion':
      return document.title = 'misGanancias - Producción';

    default:
      return document.title = 'misGanancias - Ganancias';
  }
});
</script>

<template>
  <Header :titulo="title"/>
  <Navbar />
  <RouterView />
</template>