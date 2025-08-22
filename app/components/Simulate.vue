<template>
    <button @click="isRunning ? stopSimulation() : runSimulation()">{{ isRunning ? 'Stop' : 'Simulate' }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDiceStore } from '~/stores/dice'

const store = useDiceStore()

const iterations = ref(1000)
const bet = ref(10)
const isRunning = ref(false)

async function runSimulation() {
    isRunning.value = true
    store.updateBet(bet.value)

    const batchSize = 10
    const totalBatches = Math.ceil(iterations.value / batchSize)
    
    for (let batch = 0; batch < totalBatches; batch++) {
        if (!isRunning.value) {
            return
        }
        
        const currentBatchSize = Math.min(batchSize, iterations.value - batch * batchSize)
        
        for (let i = 0; i < currentBatchSize; i++) {
            store.rollDiceSync()
        }
        
        await new Promise(resolve => setTimeout(resolve, 1))
    }

    isRunning.value = false
    console.log('RTP:', Math.round(store.rtp) + '%')
}

function stopSimulation() {
    isRunning.value = false
}
</script>

<style scoped>
</style>