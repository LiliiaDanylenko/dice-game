<template>
    <div class="game-board">
        <div class="dice-section card">
            <h3>Dice</h3>
            <div class="dice-container">
                <div v-for="(value, index) in diceStore.diceValues" :key="index" class="dice-item" :class="{ 'loading': diceStore.isLoading }">
                    {{ value ? value : '?' }}
                </div>
            </div>
        </div>
        <div class="game-controls">
            <div class="combinations card">
                <h3>Prices</h3>
                <ul v-for="price in prices" :key="price.name">
                    <li :class="price.name === diceStore.currentCombination && 'active'">{{ price.name }}<strong>x{{ price.coefficient }}</strong></li>
                </ul>
            </div>
            <div class="controls-right">
                <div class="bet-section card">
                    <h3>Bet</h3>
                    <div class="bet-controls">
                        <input 
                            type="number"
                            class="bet-input"
                            placeholder="Enter your bet" 
                            :value="diceStore.bet"
                            @input="diceStore.updateBet(Number(($event.target as HTMLInputElement).value))"
                            :disabled="diceStore.isLoading"
                            min="0"
                            :max="diceStore.balance"
                        />
                        <button 
                            type="button" 
                            class="roll-button" 
                            @click="diceStore.rollDice" 
                            :disabled="diceStore.isLoading || diceStore.bet <= 0 || diceStore.bet > diceStore.balance"
                            :title="diceStore.bet <= 0 ? 'Please enter your bet first' : diceStore.bet > diceStore.balance ? 'Bet cannot exceed your balance' : ''"
                        >
                            ROLL
                        </button>
                    </div>
                </div>
                <div class="balance card">
                    <h3>Balance</h3>
                    <p class="balance-value">{{ diceStore.balance }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDiceStore } from '~/stores/dice'
import { GAME_COEFFICIENTS } from '~/utils/constants'

const diceStore = useDiceStore()

const prices = [
    { name: 'Pair', coefficient: GAME_COEFFICIENTS.pair },
    { name: 'Full House', coefficient: GAME_COEFFICIENTS.fullHouse },
    { name: 'Balut', coefficient: GAME_COEFFICIENTS.balut },
    { name: 'Straight', coefficient: GAME_COEFFICIENTS.straight },
    { name: 'Others', coefficient: GAME_COEFFICIENTS.others }
]
</script>

<style scoped>
h3 {
    margin: 0;
    padding: 10px;
    text-align: center;
}

.game-board {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: #fff;
    padding: 24px;
}

.dice-section {
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.dice-container {
    display: flex;
    gap: 8px;
}

.dice-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.5rem;
    font-weight: bold;
}

.loading {
    background-color: #f0f0f0;
    color: #999;
    animation: shake 0.5s infinite;
    transform-origin: center;
}

.game-controls {
    display: flex;
    gap: 16px;
}

.controls-right {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 16px;
}

.combinations {
    width: 50%;
}

.combinations ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.combinations li {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-radius: 5px;
}

.active {
    background-color: #dff0d8;
}

.bet-controls {
    display: flex;
    gap: 8px;
}

.bet-input {
    width: 50%;
    padding: 16px;
    border-radius: 5px;
    font-size: 24px;
}

.roll-button {
    width: 50%;
    background-color: #dc3545;
    border: none;
    border-radius: 5px;
    padding: 16px 0;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.roll-button:hover:not(:disabled) {
    background-color: #c82333;
}

.roll-button:disabled {
    background-color: #666;
    cursor: default;
}

.balance-value {
    text-align: center;
    margin: 0;
}

.card {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 8px;
}

@keyframes shake {
    0%, 100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-5deg);
    }
    75% {
        transform: rotate(5deg);
    }
}
</style>