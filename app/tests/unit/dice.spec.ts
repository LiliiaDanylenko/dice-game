import { describe, it, beforeEach, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDiceStore } from '~/stores/dice';
import { simulateGames } from '~/utils/gameSimulator';
import { GAME_COEFFICIENTS } from '~/utils/constants';

describe('Game Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('simulates multiple games to calculate RTP', () => {
    const store = useDiceStore();
    const iterations = 10000;
    const bet = 10;
    
    store.updateBet(bet);

    simulateGames(iterations, () => {
      store.rollDiceSync();
    });

    console.log('Store RTP:', Math.round(store.rtp) + '%');
  });

  it('simulates games to find coefficients for RTP ~95%', () => {
    const store = useDiceStore();
    const targetRTP = 95;
    const tolerance = 1;
    let coeffs: Record<string, number> = { ...GAME_COEFFICIENTS };

    function calculateRTP(coeffs: Record<string, number>) {
      store.results.splice(0);
      store.updateBet(10);
      store.updateBalance(100);
    
      simulateGames(10000, () => {
        store.rollDiceSync(coeffs);
      });
    
      return store.rtp;
    }

    let currentRTP = calculateRTP(coeffs);

    let iterations = 0;
    const maxIterations = 20;

    while (Math.abs(currentRTP - targetRTP) > tolerance && iterations < maxIterations) {
      const factor = targetRTP / currentRTP;
      
      const clampedFactor = Math.max(0.5, Math.min(2.0, factor));

      Object.keys(coeffs).forEach((key) => {
        coeffs[key] = Math.round(Number(coeffs[key]) * clampedFactor * 100) / 100;
      });

      currentRTP = calculateRTP(coeffs);
      iterations++;
    }

    console.log(`Final RTP: ${Math.round(currentRTP * 100) / 100}% with coeffs`, coeffs);

    expect(currentRTP).toBeGreaterThanOrEqual(targetRTP - tolerance);
    expect(currentRTP).toBeLessThanOrEqual(targetRTP + tolerance);
  });
});
