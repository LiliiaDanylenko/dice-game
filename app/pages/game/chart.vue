<template>
    <div class="chart-container">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { useDiceStore } from '~/stores/dice'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const diceStore = useDiceStore()

const chartData = computed(() => {
    const results = diceStore.results
    
    if (results.length === 0) {
        return {
            labels: ['No games yet'],
            datasets: [{
                label: 'Balance',
                data: [100],
            }]
        }
    }
    
    const balanceData = results.map(result => result.balance)
    
    return {
        labels: Array.from({ length: balanceData.length + 1 }, (_, i) => ''),
        datasets: [{
            label: 'Balance',
            data: [100, ...balanceData],
            borderColor: '#4CAF50',
        }]
    }
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
</style>