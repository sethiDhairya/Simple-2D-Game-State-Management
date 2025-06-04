import { GameStateManager } from './../GameStateManager';

export class StateSerializer {
  constructor() {
    this.stateManager = new GameStateManager();
  }

  saveToLocalStorage(key = 'gameState') {
    const data = this.stateManager.saveState();
    localStorage.setItem(key, data);
    console.log('Game state saved to localStorage');
  }

  loadFromLocalStorage(key = 'gameState') {
    const data = localStorage.getItem(key);
    if (!data) throw new Error('No saved game found');
    this.stateManager.loadFromJSON(data);
    console.log('Game state loaded from localStorage');
  }

  saveToFile(filename = 'game_save.json') {
    const data = this.stateManager.saveState();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);

    console.log(`Game state saved to ${filename}`);
  }

  loadFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          this.stateManager.loadFromJSON(reader.result);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }
}