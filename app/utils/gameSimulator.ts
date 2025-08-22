import { GAME_COEFFICIENTS } from '~/utils/constants'

export function generateDiceRoll(): number[] {
  const diceValues = []
  for (let i = 0; i < 5; i++) {
    diceValues[i] = Math.floor(Math.random() * 6) + 1
  }
  return diceValues
}

export function checkDiceCombination(diceValues: number[], coefficients: Record<string, number> = GAME_COEFFICIENTS): { combination: string; coefficient: number } {
  const isBalut = new Set(diceValues).size === 1

  if (isBalut) {
    return {
      combination: 'Balut',
      coefficient: coefficients.balut ?? 0
    }
  }

  const sortValues = [...diceValues].sort((a, b) => a - b)

  if (sortValues[0] === sortValues[1] && sortValues[2] === sortValues[3] && sortValues[3] === sortValues[4] ||
      sortValues[0] === sortValues[1] && sortValues[1] === sortValues[2] && sortValues[3] === sortValues[4]) {
    return {
      combination: 'Full House',
      coefficient: coefficients.fullHouse ?? 0
    }
  }

  if (new Set(sortValues).size === 5 && sortValues[4] && sortValues[0] && (sortValues[4] - sortValues[0]) === 4) {
    return {
      combination: 'Straight',
      coefficient: coefficients.straight ?? 0
    }
  }

  for (let i = 0; i < sortValues.length - 1; i++) {
    if (sortValues[i] === sortValues[i + 1]) {
      return {
        combination: 'Pair',
        coefficient: coefficients.pair ?? 0
      }
    }
  }

  return {
    combination: 'Others',
    coefficient: coefficients.others ?? 0
  }
}

// Ітератор який приймає функцію для виконання гри
export function simulateGames(
  iterations: number,
  gameAction: () => void
): void {
  for (let i = 0; i < iterations; i++) {
    gameAction()
  }
}
