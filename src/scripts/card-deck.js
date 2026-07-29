const deck = document.querySelector('[data-deck]');
if (deck) {
  const cards = Array.from(deck.querySelectorAll('[data-card]'));
  const prevBtn = document.querySelector('[data-deck-prev]');
  const nextBtn = document.querySelector('[data-deck-next]');
  const trackTitle = document.querySelector('[data-player-track]');
  
  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let startTime = 0;

  const DISMISS_THRESHOLD = 100;
  const VELOCITY_THRESHOLD = 0.11;

  // Rotation offsets for the loose stack look
  const stackRotations = [0, 2, -1.5, 3];

  function updateStack() {
    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;
      card.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
      
      if (offset === 0) {
        card.style.transform = 'translateX(0) rotate(0deg)';
        card.style.opacity = '1';
        card.style.zIndex = String(cards.length);
      } else if (offset === 1) {
        card.style.transform = `scale(0.96) translateY(10px) rotate(${stackRotations[1]}deg)`;
        card.style.opacity = '0.75';
        card.style.zIndex = String(cards.length - 1);
      } else if (offset === 2) {
        card.style.transform = `scale(0.92) translateY(20px) rotate(${stackRotations[2]}deg)`;
        card.style.opacity = '0.55';
        card.style.zIndex = String(cards.length - 2);
      } else {
        card.style.transform = `scale(0.88) translateY(30px) rotate(${stackRotations[3]}deg)`;
        card.style.opacity = '0.35';
        card.style.zIndex = String(cards.length - 3);
      }
    });

    // Update track title
    if (trackTitle) {
      const activeCard = cards[currentIndex];
      const title = activeCard.querySelector('.deck-card-title');
      if (title) trackTitle.textContent = title.textContent;
    }

    // Dispatch custom event so audio player knows track changed
    window.dispatchEvent(new CustomEvent('trackchange', {
      detail: { trackId: cards[currentIndex].dataset.trackId }
    }));
  }

  function advance(direction = 1) {
    const currentCard = cards[currentIndex];
    const translateX = direction > 0 ? '120%' : '-120%';
    const rotate = direction > 0 ? '15deg' : '-15deg';
    
    currentCard.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    currentCard.style.transform = `translateX(${translateX}) rotate(${rotate})`;
    currentCard.style.opacity = '0';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateStack();
    }, 300);
  }

  function retreat() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateStack();
  }

  // Pointer events for swipe
  function onPointerDown(e) {
    if (isDragging) return;
    const card = cards[currentIndex];
    if (!card.contains(e.target)) return;

    isDragging = true;
    startX = e.clientX;
    currentX = 0;
    startTime = Date.now();
    card.setPointerCapture(e.pointerId);
    card.style.transition = 'none';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    const card = cards[currentIndex];
    const rotation = currentX * 0.05;
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;

    const elapsed = Date.now() - startTime;
    const velocity = Math.abs(currentX) / elapsed;
    const card = cards[currentIndex];

    if (Math.abs(currentX) > DISMISS_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      const direction = currentX > 0 ? 1 : -1;
      advance(direction);
    } else {
      // Snap back
      card.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'translateX(0) rotate(0deg)';
    }
  }

  deck.addEventListener('pointerdown', onPointerDown);
  deck.addEventListener('pointermove', onPointerMove);
  deck.addEventListener('pointerup', onPointerUp);
  deck.addEventListener('pointercancel', onPointerUp);

  // Desktop arrow buttons
  if (nextBtn) nextBtn.addEventListener('click', () => advance(1));
  if (prevBtn) prevBtn.addEventListener('click', retreat);

  // Initialize
  updateStack();
}
