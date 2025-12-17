// Self-contained slot machine effect - no CSS changes needed
(function() {
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const counter = document.getElementById('steps-counter');
    if (!counter) return;
    
    const finalValue = '540.000';
    
    // Get the actual font size from your CSS to match perfectly
    const computedStyle = window.getComputedStyle(counter);
    const fontSize = parseInt(computedStyle.fontSize);
    
    // Create slot effect while preserving your original styling
    createSlotEffect(counter, finalValue, fontSize);
  }

  function createSlotEffect(element, finalValue, digitHeight) {
    // Temporarily hide during setup
    element.style.opacity = '0';
    
    // Clear the "0"
    element.innerHTML = '';
    
    // Use inline flex to arrange digits (doesn't affect your CSS file)
    element.style.display = 'inline-flex';
    element.style.alignItems = 'center';
    
    // Build each digit
    finalValue.split('').forEach((char, index) => {
      // Handle decimal separator
      if (char === '.') {
        const sep = document.createElement('span');
        sep.textContent = '.';
        sep.style.margin = '0 5px';
        element.appendChild(sep);
        return;
      }
      
      // Create digit container (mechanical styling only)
      const container = document.createElement('div');
      container.style.cssText = `
        display: inline-block;
        position: relative;
        height: ${digitHeight}px;
        width: ${digitHeight * 0.6}px;
        overflow: hidden;
        margin: 0 1px;
      `;
      
      // Create scrolling strip
      const strip = document.createElement('div');
      strip.style.cssText = `
        position: absolute;
        width: 100%;
        text-align: center;
        transform: translateY(0);
        transition: transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
      
      // Build number sequence (cycles 0-9)
      const cycles = 4;
      const targetDigit = parseInt(char);
      let html = '';
      
      for (let cycle = 0; cycle < cycles; cycle++) {
        for (let d = 0; d < 10; d++) {
          // Inherit your original font styles
          html += `<span style="display: block; height: ${digitHeight}px; line-height: ${digitHeight}px; font-size: inherit; font-weight: inherit; font-family: inherit;">${d}</span>`;
        }
      }
      
      // Add final digits for smooth landing
      for (let d = 0; d <= targetDigit; d++) {
        html += `<span style="display: block; height: ${digitHeight}px; line-height: ${digitHeight}px; font-size: inherit; font-weight: inherit; font-family: inherit;">${d}</span>`;
      }
      
      strip.innerHTML = html;
      container.appendChild(strip);
      element.appendChild(container);
      
      // Animate with staggered delay
      setTimeout(() => {
        const totalDigits = cycles * 10 + targetDigit + 1;
        const finalPosition = -((totalDigits - 1) * digitHeight);
        strip.style.transform = `translateY(${finalPosition}px)`;
      }, index * 200);
    });
    
    // Fade in after setup
    setTimeout(() => {
      element.style.opacity = '1';
    }, 100);
  }
})();