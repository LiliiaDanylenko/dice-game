<template>
    <div class="layout">
        <div class="game">
            <Dice />
            <div class="game-page">
                <nav class="nav" :class="{ 'active': $route.path.includes('/game/chart') || $route.path.includes('/game/result') }">
                    <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link" :class="{ 'active': $route.path === link.path }">{{ link.name }}</NuxtLink>
                </nav>
                <div :class="$route.path.includes('/game/chart') || $route.path.includes('/game/result') ? 'content' : ''">
                    <slot />
                </div>
            </div>
        </div>
        <Simulate />
    </div>
</template>

<script setup lang="ts">
const navLinks = [
    {
        name: 'Chart',
        path: '/game/chart',
    },
    {
        name: 'Result',
        path: '/game/result',
    },
]
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    gap: 16px;
}
.game {
    max-width: 1660px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 24px;
    padding: 24px;
    margin: 0 auto;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.nav.active {
    justify-content: flex-start;
}

.nav-link {
    padding: 10px 40px;
    font-size: 16px;
    background-color: blue;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    position: relative;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid blue;
}
</style>