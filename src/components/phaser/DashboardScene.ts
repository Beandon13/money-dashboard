import * as Phaser from "phaser";

export class DashboardScene extends Phaser.Scene {
  private particles!: Phaser.GameObjects.Particles.ParticleEmitter;
  private floatingCards: Phaser.GameObjects.Container[] = [];
  private cardValues: { value: number; speed: number; opacity: number }[] = [];

  constructor() {
    super({ key: "DashboardScene" });
  }

  preload() {
    // Generate textures programmatically
    this.generateTextures();
  }

  generateTextures() {
    // Card background texture
    const cardGraphics = this.add.graphics();
    cardGraphics.fillStyle(0x18181b, 0.9);
    cardGraphics.fillRoundedRect(0, 0, 120, 80, 8);
    cardGraphics.lineStyle(1, 0x27272a, 1);
    cardGraphics.strokeRoundedRect(0, 0, 120, 80, 8);
    cardGraphics.generateTexture("card_bg", 120, 80);
    cardGraphics.destroy();

    // Glow particle
    const glowGraphics = this.add.graphics();
    glowGraphics.fillStyle(0x8b5cf6, 0.3);
    glowGraphics.fillCircle(16, 16, 16);
    glowGraphics.generateTexture("glow", 32, 32);
    glowGraphics.destroy();

    // Coin texture
    const coinGraphics = this.add.graphics();
    coinGraphics.fillStyle(0xfbbf24, 1);
    coinGraphics.fillCircle(12, 12, 12);
    coinGraphics.generateTexture("coin", 24, 24);
    coinGraphics.destroy();
  }

  create() {
    const { width, height } = this.scale;

    // Animated gradient background
    this.createAnimatedBackground();

    // Particle field
    this.createParticleField(width, height);

    // Floating cards representing data
    this.createFloatingCards(width, height);

    // Counters/tickers
    this.createTickers(width);
  }

  createAnimatedBackground() {
    const { width, height } = this.scale;
    const graphics = this.add.graphics();

    // Dark base
    graphics.fillStyle(0x0a0a0b, 1);
    graphics.fillRect(0, 0, width, height);

    // Pulsing gradient overlay
    const pulse = this.add.graphics();

    this.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => {
        const alpha = 0.02 + Math.abs(Math.sin(this.time.now / 2000)) * 0.03;
        pulse.clear();
        pulse.fillStyle(0x8b5cf6, alpha);
        pulse.fillRect(0, 0, width, height);
      },
    });
  }

  createParticleField(width: number, height: number) {
    const particles = this.add.particles(0, 0, "glow", {
      x: { min: 0, max: width },
      y: { min: 0, max: height },
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.4, end: 0 },
      speed: { min: 10, max: 30 },
      angle: { min: 260, max: 280 },
      lifespan: 4000,
      frequency: 200,
      blendMode: "ADD",
    });

    this.particles = particles;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createFloatingCards(width: number, height: number) {
    const symbols = ["SOL", "ETH", "BTC", "GOAT", "PNUT", "VIRTUAL"];
    const values = [84.5, 2233, 71479, 0.017, 0.044, 0.68];

    for (let i = 0; i < 6; i++) {
      const x = 100 + (i % 3) * (width / 3);
      const y = 150 + Math.floor(i / 3) * 200;
      const card = this.createDataCard(x, y, symbols[i], values[i]);
      this.floatingCards.push(card);
      this.cardValues.push({ value: values[i], speed: 0.5 + Math.random() * 0.5, opacity: 0.7 + Math.random() * 0.3 });
    }
  }

  createDataCard(x: number, y: number, symbol: string, value: number) {
    const container = this.add.container(x, y);

    const bg = this.add.image(0, 0, "card_bg");
    container.add(bg);

    const symbolText = this.add.text(0, -15, symbol, {
      fontSize: "14px",
      fontFamily: "JetBrains Mono, monospace",
      color: "#a1a1aa",
    });
    symbolText.setOrigin(0.5);
    container.add(symbolText);

    const valueText = this.add.text(0, 10, this.formatValue(value), {
      fontSize: "18px",
      fontFamily: "Inter, sans-serif",
      color: "#22c55e",
      fontStyle: "bold",
    });
    valueText.setOrigin(0.5);
    container.add(valueText);

    // Subtle floating animation
    this.tweens.add({
      targets: container,
      y: y - 10,
      duration: 2000 + Math.random() * 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // Pulse on value change
    this.time.addEvent({
      delay: 3000 + Math.random() * 2000,
      callback: () => {
        const newValue = value * (1 + (Math.random() - 0.5) * 0.01);
        this.tweens.add({
          targets: valueText,
          alpha: 0.3,
          duration: 100,
          yoyo: true,
          onUpdate: () => {
            valueText.setText(this.formatValue(newValue));
          },
        });
      },
      loop: true,
    });

    return container;
  }

  createTickers(width: number) {
    const tickers = [
      { label: "PnL", value: "+$0.84", color: "#22c55e" },
      { label: "Balance", value: "$100,000.84", color: "#fafafa" },
      { label: "Trades", value: "128", color: "#3b82f6" },
      { label: "Win Rate", value: "53.2%", color: "#8b5cf6" },
    ];

    tickers.forEach((ticker, i) => {
      const x = width - 150;
      const y = 50 + i * 35;

      const labelText = this.add.text(0, 0, ticker.label, {
        fontSize: "12px",
        fontFamily: "Inter, sans-serif",
        color: "#71717a",
      });
      labelText.setOrigin(1, 0.5);
      labelText.setPosition(x, y);

      const valueText = this.add.text(0, 0, ticker.value, {
        fontSize: "14px",
        fontFamily: "JetBrains Mono, monospace",
        color: ticker.color,
        fontStyle: "bold",
      });
      valueText.setOrigin(1, 0.5);
      valueText.setPosition(x - 80, y);

      // Tick animation
      this.time.addEvent({
        delay: 1000 + i * 200,
        callback: () => {
          this.tweens.add({
            targets: valueText,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 100,
            yoyo: true,
          });
        },
        loop: true,
      });
    });
  }

  formatValue(val: number): string {
    if (val >= 1000) return val.toFixed(2);
    if (val >= 1) return val.toFixed(4);
    return val.toFixed(6);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateCounter(index: number, newValue: string, color: string) {
    // Counter update logic placeholder - used for live updates from React
    console.log("Counter update:", index, newValue, color);
  }
}

export const phaserConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#0a0a0b",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [DashboardScene],
};
