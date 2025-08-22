import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { INITIAL_BALANCE, GAME_COEFFICIENTS } from '~/utils/constants'
import { generateDiceRoll, checkDiceCombination } from '~/utils/gameSimulator'

interface GameResult {
  bet: number
  combination: string
  balance: number
  win: number
}

export const useDiceStore = defineStore('dice', () => {
  const balance = ref(INITIAL_BALANCE)
  const bet = ref(0)
  const diceValues = ref([0, 0, 0, 0, 0])
  const isLoading = ref(false)
  const currentCombination = ref<string | null>(null)
  const results = ref<GameResult[]>([])

  const totalWins = computed(() => 
    results.value.reduce((sum, result) => sum + result.win, 0)
  )
  
  const totalBets = computed(() => 
    results.value.reduce((sum, result) => sum + result.bet, 0)
  )
  
  const rtp = computed(() => 
    totalBets.value > 0 ? (totalWins.value / totalBets.value) * 100 : 0
  )

  function updateBalance(newBalance: number) {
    balance.value = newBalance
  }

  function updateBet(newBet: number) {
    bet.value = newBet
  }

  function addResult(result: GameResult) {
    results.value.push({
      ...result,
    })
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setCurrentCombination(combination: string | null) {
    currentCombination.value = combination
  }

  function setDiceValues(values: number[]) {
    diceValues.value = values
  }

  function rollDice() {
    if (bet.value <= 0 || bet.value > balance.value) {
        return;
    }

    const currentBet = bet.value
    setLoading(true)
    setDiceValues([0, 0, 0, 0, 0])
    setCurrentCombination(null)
    updateBalance(balance.value - currentBet)
    
    setTimeout(() => {
        const newDiceValues = generateDiceRoll()
        setDiceValues(newDiceValues)
        checkResult(currentBet)
        setLoading(false)
    }, 2000)
  }

  // Синхронна версія для симуляції
  function rollDiceSync(coefficients: Record<string, number> = GAME_COEFFICIENTS) {
    if (bet.value <= 0 || bet.value > balance.value) {
        return;
    }

    const currentBet = bet.value
    setCurrentCombination(null)
    updateBalance(balance.value - currentBet)
    
    const newDiceValues = generateDiceRoll()
    setDiceValues(newDiceValues)
    checkResult(currentBet, coefficients)
  }

  function checkResult(currentBet: number, coefficients: Record<string, number> = GAME_COEFFICIENTS) {
    const result = checkDiceCombination(diceValues.value, coefficients)
    const winAmount = currentBet * result.coefficient
    
    addResult({
      bet: currentBet,
      combination: result.combination,
      balance: balance.value + winAmount,
      win: winAmount,
    })
    
    setCurrentCombination(result.combination)
    updateBalance(balance.value + winAmount)
  }

  return {
    balance,
    bet,
    diceValues,
    isLoading,
    currentCombination,
    results,
    totalWins,
    totalBets,
    rtp,
    updateBalance,
    updateBet,
    addResult,
    setLoading,
    setCurrentCombination,
    setDiceValues,
    checkResult,
    rollDice,
    rollDiceSync,
  }
})
