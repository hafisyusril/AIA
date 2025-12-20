// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const manlook = document.querySelector('.manlook');
  const frame = document.querySelector('.frame');
  
  // Create floating particles effect
  function createParticle() {
    const particle = document.createElement('div');
    particle.innerHTML = '•';
    particle.style.position = 'absolute';
    particle.style.color = 'rgba(255, 255, 255, 0.4)';
    particle.style.fontSize = '8px';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'particleFloat 8s linear infinite';
    particle.style.left = Math.random() * 390 + 'px';
    particle.style.top = '700px';
    particle.style.zIndex = '1';
    return particle;
  }
  
  // Add particle animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-700px) translateX(${Math.random() * 40 - 20}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Create particles periodically
  setInterval(() => {
    const particle = createParticle();
    frame.appendChild(particle);
    setTimeout(() => particle.remove(), 8000);
  }, 2000);
  
  // Click interaction for manlook
  manlook.addEventListener('click', function(e) {
    // Create alert pulse effect
    manlook.style.animation = 'manFloat 0.3s ease-in-out, alertPulse 0.6s ease-in-out';
    
    setTimeout(() => {
      manlook.style.animation = 'fadeIn 1s ease-out, manFloat 4s ease-in-out infinite';
      manlook.style.animationDelay = '0s, 0s';
      manlook.style.animationFillMode = 'forwards';
    }, 600);
  });
  
  // Add alertPulse keyframes dynamically
  const alertStyle = document.createElement('style');
  alertStyle.textContent = `
    @keyframes alertPulse {
      0%, 100% {
        filter: brightness(1);
      }
      25% {
        filter: brightness(1.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
      }
      50% {
        filter: brightness(1.2);
      }
      75% {
        filter: brightness(1.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
      }
    }
  `;
  document.head.appendChild(alertStyle);
  
  // Add subtle parallax effect on mouse move
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    const topContent = document.querySelector('.top-content');
    const bottomContent = document.querySelector('.bottom-content');
    
    topContent.style.transform = `translateX(${mouseX * 8}px)`;
    bottomContent.style.transform = `translateX(${mouseX * -5}px)`;
  });
  
  // Add scanning line effect
  const scanLine = document.createElement('div');
  scanLine.style.position = 'absolute';
  scanLine.style.top = '0';
  scanLine.style.left = '0';
  scanLine.style.width = '100%';
  scanLine.style.height = '2px';
  scanLine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)';
  scanLine.style.animation = 'scanMove 3s linear infinite';
  scanLine.style.zIndex = '10';
  frame.appendChild(scanLine);
  
  const scanStyle = document.createElement('style');
  scanStyle.textContent = `
    @keyframes scanMove {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(700px);
      }
    }
  `;
  document.head.appendChild(scanStyle);
});