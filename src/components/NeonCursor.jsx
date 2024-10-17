import React, { useEffect, useRef } from 'react';
import './NeonCursor.css'; // Import the CSS file for styling

const NeonCursor = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  
  const speedFactor = 0.1; // Slow the speed by reducing this factor (0.1 makes it very slow)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) {
      console.error("Canvas or context is not available.");
      return;
    }

    // Get CSS variables (colors and blur)
    const styles = getComputedStyle(document.documentElement);
    const trailColor = styles.getPropertyValue('--trail-color');
    const shadowColor = styles.getPropertyValue('--shadow-color');
    const shadowBlur = parseInt(styles.getPropertyValue('--shadow-blur'));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: undefined,
      y: undefined,
    };

    // Particle object definition
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1; // Smaller particles
      this.speedX = (Math.random() * 1 - 0.5) * speedFactor; // Reduced horizontal movement by speedFactor
      this.speedY = (Math.random() * 1 - 0.5) * speedFactor; // Reduced vertical movement by speedFactor
      this.color = trailColor;
      this.life = 50;
    }

    Particle.prototype.update = function () {
      this.x += this.speedX; // Move slightly horizontally (slowly)
      this.y += this.speedY; // Move slightly vertically (slowly)
      this.life -= 1;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowColor = shadowColor;
      ctx.fill();
    };

    function createParticles() {
      // Create particles very close to the mouse, with a slight offset
      const offsetX = (Math.random() - 0.5) * 10; // Slight horizontal offset
      const offsetY = (Math.random() - 0.5) * 10; // Slight vertical offset
      particles.current.push(new Particle(mouse.x + offsetX, mouse.y + offsetY));
    }

    function handleParticles() {
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        particles.current[i].draw();

        if (particles.current[i].life <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
    }

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      createParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="neon-trail-canvas"></canvas>;
};

export default NeonCursor;
