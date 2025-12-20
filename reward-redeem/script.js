// Wait for page to be activated before running
(function() {
  const frame = document.querySelector('.frame-reward');
  if (!frame) return;
  
  let isInitialized = false;
  
  // Listen for page activation
  const pageElement = frame.closest('.page');
  if (!pageElement) return;
  
  pageElement.addEventListener('pageActivated', function() {
    if (isInitialized) return; // Only initialize once
    isInitialized = true;
    
    const coin = document.querySelector('.coin');
    
    // Create sparkle element
    function createSparkle(x, y) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'absolute';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.fontSize = '20px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.animation = 'sparkle 1s ease-out forwards';
      sparkle.style.zIndex = '100';
      return sparkle;
    }
    
    // Add sparkle animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(0) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5) rotate(180deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Coin click interaction
    if (coin) {
      coin.addEventListener('click', function(e) {
        // Create multiple sparkles
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            const rect = coin.getBoundingClientRect();
            const frameRect = frame.getBoundingClientRect();
            const x = rect.left - frameRect.left + Math.random() * rect.width;
            const y = rect.top - frameRect.top + Math.random() * rect.height;
            
            const sparkle = createSparkle(x, y);
            frame.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => sparkle.remove(), 1000);
          }, i * 50);
        }
        
        // Temporarily increase animation speed
        coin.style.animationDuration = '1s, 0.5s';
        setTimeout(() => {
          coin.style.animationDuration = '4s, 3s';
        }, 1000);
      });
    }
    
    // Add subtle parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      const woman = document.querySelector('.woman');
      const topContent = document.querySelector('.top-content-reward');
      
      if (woman) woman.style.transform = `translate(${mouseX * 10}px, ${mouseY * -10 - 10}px) scale(1.01)`;
      if (topContent) topContent.style.transform = `translateX(${mouseX * 5}px)`;
    });
    
    // Add number counting animation to the reward amount
    function animateNumber() {
      const h1 = document.querySelector('.top-content-reward h1');
      if (!h1) return;
      
      const finalValue = 3650000;
      const duration = 2000;
      const startTime = Date.now();
      
      function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(progress * finalValue);
        h1.textContent = currentValue.toLocaleString('id-ID');
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      
      update();
    }
    
    // Start number animation after initial load
    setTimeout(animateNumber, 500);
  });
})();