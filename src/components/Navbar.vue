<script setup>
import '../assets/css/nav.css';
</script>

<template>
    <nav class="navbar">
        <ul>
            <li>
                <RouterLink to="/" class="navbar-link" active-class="navbar-link-active">
                    Ganancias
                </RouterLink>
            </li>

            <li>
                <RouterLink to="/produccion" class="navbar-link" active-class="navbar-link-active">
                    Producción
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>