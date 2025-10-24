document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

  // Open mobile menu
  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('open');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100');
    menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close mobile menu
  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('open');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Toggle menu on button click
  menuBtn.addEventListener("click", function() {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking overlay
  overlay.addEventListener("click", closeMenu);

  // Close menu when clicking a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Navbar scroll effect - transparent to glass morphism
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("glass-effect");
    } else {
      navbar.classList.remove("glass-effect");
    }
  }

  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial scroll check
  handleScroll();

  // Highlight active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-menu-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === './' + currentPage || linkHref === currentPage) {
      link.classList.add('active-page');
    }
  });
});






document.addEventListener("DOMContentLoaded", function() {
  const images = [
    "./assets/images for makeup/download (12).jpeg",
    "./assets/imags for hair and logos/wigtwo.jpeg",
    "./assets/images for nails/download.jpeg"
  ];

  const words = [
    "Professional Makeup for Every Occasion",
    "Beautiful Hair Styling & Braiding",
    "Expert Nail Care & Stunning Manicures"
  ];

  let currentIndex = 0;
  let isAnimating = false;
  let autoplayInterval;

  const img = document.getElementById("animated-img");
  const text = document.getElementById("animated-text");
  const dots = document.querySelectorAll(".progress-dot");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  // Animate hero content
  function animateHero(direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    // Determine animation direction
    const slideOutX = direction === 'next' ? '-100%' : '100%';
    const slideInX = direction === 'next' ? '100%' : '-100%';

    // Fade out current content
    img.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    text.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    
    img.style.transform = `translateX(${slideOutX})`;
    img.style.opacity = "0";
    text.style.transform = `translateX(${slideOutX})`;
    text.style.opacity = "0";

    // Update content after fade out
    setTimeout(() => {
      img.src = images[currentIndex];
      text.textContent = words[currentIndex];
      
      // Reset position for slide in
      img.style.transition = "none";
      text.style.transition = "none";
      img.style.transform = `translateX(${slideInX})`;
      text.style.transform = `translateX(${slideInX})`;

      // Trigger slide in animation
      setTimeout(() => {
        img.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        text.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        img.style.transform = "translateX(0) scale(1)";
        img.style.opacity = "1";
        text.style.transform = "translateX(0)";
        text.style.opacity = "1";
        
        // Add zoom animation class
        img.classList.add('zoom-animation');
        setTimeout(() => img.classList.remove('zoom-animation'), 1000);
        
        isAnimating = false;
      }, 50);

      // Update progress dots
      updateDots();
    }, 600);
  }

  // Update active dot
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index === currentIndex || isAnimating) return;
    
    const direction = index > currentIndex ? 'next' : 'prev';
    currentIndex = index;
    animateHero(direction);
    resetAutoplay();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    animateHero('next');
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    animateHero('prev');
  }

  // Reset autoplay timer
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  // Event listeners for navigation
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  // Pause on hover (optional)
  const heroSection = document.querySelector('section');
  heroSection.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  heroSection.addEventListener('mouseleave', () => resetAutoplay());

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
      resetAutoplay();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
      resetAutoplay();
    }
  }

  // Initialize first slide
  setTimeout(() => {
    img.style.opacity = "1";
    img.style.transform = "translateX(0)";
    text.style.opacity = "1";
    text.style.transform = "translateX(0)";
  }, 100);

  // Start autoplay
  autoplayInterval = setInterval(nextSlide, 5000);
});







document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observe all service cards
  const cards = document.querySelectorAll('.fade-in-card');
  cards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });

  // Add click event for service cards (optional - navigate to service detail)
  cards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      // Prevent navigation if clicking the card itself (not a link)
      if (e.target.tagName !== 'A') {
        // You can add navigation logic here if needed
        // window.location.href = './service-detail.html?id=' + (index + 1);
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});






// Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all team cards
  document.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => observer.observe(card));
  });

  // Add click animation to buttons
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      from {
        transform: scale(0);
        opacity: 1;
      }
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Parallax effect on mouse move for cards
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });





  // Add sparkles around the image
  function generateLuminescentParticles() {
    const particleContainer = document.querySelector('.luminescent-particles-repository');
    const particleQuantity = 12;
    
    for (let particleIndex = 0; particleIndex < particleQuantity; particleIndex++) {
      const particleElement = document.createElement('div');
      particleElement.className = 'ethereal-luminosity-fragment';
      
      // Random position around the image
      const angularPosition = (360 / particleQuantity) * particleIndex;
      const radialDistance = 150 + Math.random() * 100;
      const horizontalOffset = Math.cos(angularPosition * Math.PI / 180) * radialDistance;
      const verticalOffset = Math.sin(angularPosition * Math.PI / 180) * radialDistance;
      
      particleElement.style.left = `calc(50% + ${horizontalOffset}px)`;
      particleElement.style.top = `calc(50% + ${verticalOffset}px)`;
      particleElement.style.animationDelay = `${Math.random() * 2}s`;
      
      particleContainer.appendChild(particleElement);
    }
  }

  // Parallax effect on scroll
  function orchestrateDepthPerceptionAnimation() {
    const verticalScrollDisplacement = window.pageYOffset;
    const primaryVisualAsset = document.getElementById('protagonistVisualElement');
    const decorativeGeometricElements = document.querySelectorAll('.ornamental-geometric-entity');
    
    if (primaryVisualAsset) {
      primaryVisualAsset.style.transform = `translateY(${verticalScrollDisplacement * 0.3}px)`;
    }
    
    decorativeGeometricElements.forEach((geometricShape, sequentialIndex) => {
      geometricShape.style.transform = `translateY(${verticalScrollDisplacement * (0.1 * (sequentialIndex + 1))}px) scale(${1 + verticalScrollDisplacement * 0.0002})`;
    });
  }

  // Button ripple effect
  document.querySelectorAll('.interactive-conversion-trigger').forEach(interactiveElement => {
    interactiveElement.addEventListener('click', function(interactionEvent) {
      const expansionWaveElement = document.createElement('span');
      const elementBoundaries = this.getBoundingClientRect();
      const maximumDimension = Math.max(elementBoundaries.width, elementBoundaries.height);
      const horizontalCoordinate = interactionEvent.clientX - elementBoundaries.left - maximumDimension / 2;
      const verticalCoordinate = interactionEvent.clientY - elementBoundaries.top - maximumDimension / 2;
      
      expansionWaveElement.style.cssText = `
        position: absolute;
        width: ${maximumDimension}px;
        height: ${maximumDimension}px;
        left: ${horizontalCoordinate}px;
        top: ${verticalCoordinate}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 5;
        animation: radial-expansion-dissipation 0.8s ease-out;
      `;
      
      this.appendChild(expansionWaveElement);
      setTimeout(() => expansionWaveElement.remove(), 800);
    });
  });

  // Add ripple animation
  const dynamicStylesheet = document.createElement('style');
  dynamicStylesheet.textContent = `
    @keyframes radial-expansion-dissipation {
      from {
        transform: scale(0);
        opacity: 1;
      }
      to {
        transform: scale(3);
        opacity: 0;
      }
    }
    
    .credibility-metric-display {
      transition: transform 0.3s ease;
    }
    
    .credibility-metric-display:hover {
      transform: translateY(-5px);
    }
  `;
  document.head.appendChild(dynamicStylesheet);

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    generateLuminescentParticles();
    
    // Add scroll listener with throttle
    let animationFramePending = false;
    window.addEventListener('scroll', () => {
      if (!animationFramePending) {
        window.requestAnimationFrame(() => {
          orchestrateDepthPerceptionAnimation();
          animationFramePending = false;
        });
        animationFramePending = true;
      }
    });
  });

  // Image hover tilt effect
  const primaryVisualAsset = document.getElementById('protagonistVisualElement');
  const encapsulatingSection = primaryVisualAsset.closest('section');
  
  encapsulatingSection.addEventListener('mousemove', (cursorMotionEvent) => {
    if (window.innerWidth > 1024) { // Only on desktop
      const assetBoundingRectangle = primaryVisualAsset.getBoundingClientRect();
      const relativeHorizontalPosition = cursorMotionEvent.clientX - assetBoundingRectangle.left - assetBoundingRectangle.width / 2;
      const relativeVerticalPosition = cursorMotionEvent.clientY - assetBoundingRectangle.top - assetBoundingRectangle.height / 2;
      
      const horizontalAxisRotation = (relativeVerticalPosition / assetBoundingRectangle.height) * 10;
      const verticalAxisRotation = -(relativeHorizontalPosition / assetBoundingRectangle.width) * 10;
      
      primaryVisualAsset.style.transform = `perspective(1000px) rotateX(${horizontalAxisRotation}deg) rotateY(${verticalAxisRotation}deg)`;
    }
  });
  
  encapsulatingSection.addEventListener('mouseleave', () => {
    primaryVisualAsset.style.transform = '';
  });



// Before/After Slider Functionality
  class TransformationSliderController {
    constructor(containerElement) {
      this.containerElement = containerElement;
      this.anteriorLayer = containerElement.querySelector('.anterior-temporal-state');
      this.demarcatorElement = containerElement.querySelector('.temporal-transition-demarcator');
      this.isEngaged = false;
      this.initializeInteractionHandlers();
    }

    initializeInteractionHandlers() {
      // Mouse events
      this.demarcatorElement.addEventListener('mousedown', this.engageSlider.bind(this));
      document.addEventListener('mousemove', this.executeSliderMotion.bind(this));
      document.addEventListener('mouseup', this.disengageSlider.bind(this));

      // Touch events for mobile
      this.demarcatorElement.addEventListener('touchstart', this.engageSlider.bind(this));
      document.addEventListener('touchmove', this.executeSliderMotion.bind(this));
      document.addEventListener('touchend', this.disengageSlider.bind(this));
    }

    engageSlider(interactionEvent) {
      this.isEngaged = true;
      interactionEvent.preventDefault();
    }

    disengageSlider() {
      this.isEngaged = false;
    }

    executeSliderMotion(interactionEvent) {
      if (!this.isEngaged) return;

      const boundaryRectangle = this.containerElement.getBoundingClientRect();
      const horizontalCoordinate = interactionEvent.type.includes('touch') 
        ? interactionEvent.touches[0].clientX 
        : interactionEvent.clientX;
      
      let relativePosition = horizontalCoordinate - boundaryRectangle.left;
      relativePosition = Math.max(0, Math.min(relativePosition, boundaryRectangle.width));
      
      const percentagePosition = (relativePosition / boundaryRectangle.width) * 100;
      
      this.demarcatorElement.style.left = percentagePosition + '%';
      this.anteriorLayer.style.clipPath = `inset(0 ${100 - percentagePosition}% 0 0)`;
    }
  }

  // Category Filter Functionality
  class CategoryFilterOrchestrator {
    constructor() {
      this.filterButtons = document.querySelectorAll('.categorical-filter-mechanism');
      this.transformationCards = document.querySelectorAll('.metamorphosis-exhibition-card');
      this.initializeFilterHandlers();
    }

    initializeFilterHandlers() {
      this.filterButtons.forEach(filterButton => {
        filterButton.addEventListener('click', () => {
          const selectedCategory = filterButton.getAttribute('data-category');
          this.executeCategoryFiltration(selectedCategory, filterButton);
        });
      });
    }

    executeCategoryFiltration(categoryIdentifier, activeButton) {
      // Update button states
      this.filterButtons.forEach(btn => btn.classList.remove('activated-state'));
      activeButton.classList.add('activated-state');

      // Filter cards with animation
      this.transformationCards.forEach((card, sequentialIndex) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (categoryIdentifier === 'all' || cardCategory === categoryIdentifier) {
          setTimeout(() => {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('manifestation-active'), 50);
          }, sequentialIndex * 100);
        } else {
          card.classList.remove('manifestation-active');
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    }
  }

  // Scroll Animation Observer
  class ScrollAnimationOrchestrator {
    constructor() {
      this.observerConfiguration = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      this.initializeObservation();
    }

    initializeObservation() {
      const intersectionObserver = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('manifestation-active');
          }
        });
      }, this.observerConfiguration);

      document.querySelectorAll('.metamorphosis-exhibition-card').forEach(card => {
        intersectionObserver.observe(card);
      });
    }
  }

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sliders
    document.querySelectorAll('.metamorphosis-comparison-container').forEach(container => {
      new TransformationSliderController(container);
    });

    // Initialize category filter
    new CategoryFilterOrchestrator();

    // Initialize scroll animations
    new ScrollAnimationOrchestrator();

    // Initial animation for cards
    setTimeout(() => {
      document.querySelectorAll('.metamorphosis-exhibition-card').forEach(card => {
        card.classList.add('manifestation-active');
      });
    }, 200);
  });









class InquirySubmissionOrchestrator {
    constructor() {
      this.formElement = document.getElementById('inquirySubmissionMechanism');
      this.nameField = document.getElementById('clientIdentificationDesignator');
      this.phoneField = document.getElementById('telecommunicationContactVector');
      this.emailField = document.getElementById('electronicCorrespondenceIdentifier');
      this.messageField = document.getElementById('communicationContentPayload');
      this.submitButton = document.getElementById('messageDispatchInitiator');
      this.successNotification = document.getElementById('successNotificationDisplay');
      this.whatsappContactNumber = '2348134260378';
      
      this.initializeFormHandlers();
      this.initializeFieldValidation();
    }

    initializeFormHandlers() {
      this.formElement.addEventListener('submit', (submissionEvent) => {
        submissionEvent.preventDefault();
        this.processFormSubmission();
      });
    }

    initializeFieldValidation() {
      const allInputFields = [this.nameField, this.phoneField, this.emailField, this.messageField];
      
      allInputFields.forEach(inputElement => {
        inputElement.addEventListener('blur', () => {
          this.validateIndividualField(inputElement);
        });
        
        inputElement.addEventListener('input', () => {
          inputElement.classList.remove('invalid-state');
        });
      });
    }

    validateIndividualField(fieldElement) {
      const fieldValue = fieldElement.value.trim();
      
      if (!fieldValue) {
        fieldElement.classList.add('invalid-state');
        fieldElement.classList.remove('valid-state');
        return false;
      }
      
      if (fieldElement.type === 'email' && !this.validateEmailFormat(fieldValue)) {
        fieldElement.classList.add('invalid-state');
        fieldElement.classList.remove('valid-state');
        return false;
      }
      
      if (fieldElement.type === 'tel' && !this.validatePhoneFormat(fieldValue)) {
        fieldElement.classList.add('invalid-state');
        fieldElement.classList.remove('valid-state');
        return false;
      }
      
      fieldElement.classList.remove('invalid-state');
      fieldElement.classList.add('valid-state');
      return true;
    }

    validateEmailFormat(emailString) {
      const emailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailValidationPattern.test(emailString);
    }

    validatePhoneFormat(phoneString) {
      const phoneValidationPattern = /^[\d\s\-\+\(\)]{10,}$/;
      return phoneValidationPattern.test(phoneString);
    }

    processFormSubmission() {
      const clientName = this.nameField.value.trim();
      const clientPhone = this.phoneField.value.trim();
      const clientEmail = this.emailField.value.trim();
      const clientMessage = this.messageField.value.trim();

      // Validate all fields
      const isNameValid = this.validateIndividualField(this.nameField);
      const isPhoneValid = this.validateIndividualField(this.phoneField);
      const isEmailValid = this.validateIndividualField(this.emailField);
      const isMessageValid = this.validateIndividualField(this.messageField);

      if (!isNameValid || !isPhoneValid || !isEmailValid || !isMessageValid) {
        this.displayNotification('⚠️ Please fill in all fields correctly!', 'error');
        return;
      }

      // Show loading state
      this.activateLoadingState();

      // Construct WhatsApp message
      const whatsappMessagePayload = this.constructWhatsAppMessage(
        clientName, 
        clientPhone, 
        clientEmail, 
        clientMessage
      );

      // Show success notification
      setTimeout(() => {
        this.successNotification.classList.remove('hidden');
        this.successNotification.classList.add('success-notification');
        
        // Redirect to WhatsApp after a brief delay
        setTimeout(() => {
          this.initiateWhatsAppCommunication(whatsappMessagePayload);
          this.resetFormState();
        }, 1500);
      }, 800);
    }

    constructWhatsAppMessage(name, phone, email, message) {
      const formattedMessage = 
        `✨ *New Beauty Consultation Request* ✨%0A%0A` +
        `👤 *Name:* ${name}%0A` +
        `📞 *Phone:* ${phone}%0A` +
        `📧 *Email:* ${email}%0A%0A` +
        `💬 *Message:*%0A${message}%0A%0A` +
        `_Sent from Beauty Salon Website_`;
      
      return formattedMessage;
    }

    initiateWhatsAppCommunication(encodedMessage) {
      const whatsappURL = `https://wa.me/${this.whatsappContactNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
    }

    activateLoadingState() {
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = `
        <span class="relative z-10">Sending</span>
        <div class="loading-spinner"></div>
      `;
    }

    resetFormState() {
      this.formElement.reset();
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = `
        <span class="relative z-10">Send Message</span>
        <svg class="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      `;
      
      setTimeout(() => {
        this.successNotification.classList.add('hidden');
      }, 3000);
      
      // Remove validation states
      [this.nameField, this.phoneField, this.emailField, this.messageField].forEach(field => {
        field.classList.remove('valid-state', 'invalid-state');
      });
    }

    displayNotification(message, type) {
      // Create custom notification
      const notificationElement = document.createElement('div');
      notificationElement.className = `fixed top-4 right-4 z-50 ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-4 rounded-xl shadow-2xl transition-all transform translate-x-full`;
      notificationElement.textContent = message;
      
      document.body.appendChild(notificationElement);
      
      setTimeout(() => {
        notificationElement.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        notificationElement.style.transform = 'translateX(150%)';
        setTimeout(() => notificationElement.remove(), 300);
      }, 3000);
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new InquirySubmissionOrchestrator();
  });


   // Enhanced smooth scroll for buttons
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 100);
      });
    });

    // Add parallax effect on mouse move (desktop only)
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.feature-card').forEach((card, index) => {
          card.style.transform = `translate(${moveX * (index + 1) * 0.2}px, ${moveY * (index + 1) * 0.2}px)`;
        });
      });
    }