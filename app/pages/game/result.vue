<template>
    <div class="result-container">
        <table>
            <thead>
                <tr>
                    <th>ALL_USER_WINS</th>
                    <th>ALL_USER_BETS</th>
                    <th>RTP</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ diceStore.totalWins }}</td>
                    <td>{{ diceStore.totalBets }}</td>
                    <td>{{ Math.round(diceStore.rtp) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { useDiceStore } from '~/stores/dice'

const diceStore = useDiceStore()
</script>

<style scoped>
.result-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
}

table {
    border-collapse: collapse;
    border: 1px solid #000;
}

thead {
    background-color: #f0f0f0;
}

th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #000;
}
</style>