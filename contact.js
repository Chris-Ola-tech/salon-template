// Elements
    const navbar = document.getElementById('beautyContactNavbar');
    const menuBtn = document.getElementById('beautyContactMenuBtn');
    const mobileMenu = document.getElementById('beautyContactMobileMenu');
    const overlay = document.getElementById('beautyContactOverlay');

    // Scroll Effect for Navbar
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.beauty-contact-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Parallax effect on contact cards (desktop only)
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.beauty-contact-card').forEach((card, index) => {
          const depth = (index + 1) * 0.3;
          card.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
        });
      });
    }

    // Add ripple effect to contact cards
    document.querySelectorAll('.beauty-contact-card').forEach(card => {
      card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          top: ${y}px;
          left: ${x}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: beautyContactRipple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes beautyContactRipple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);










    class GeographicInteractionOrchestrator {
    constructor() {
      this.mapContainer = document.getElementById('mapVisualizationContainer');
      this.initializeMapInteractions();
      this.updateOperationalStatus();
    }

    initializeMapInteractions() {
      // Add loading indicator
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'absolute inset-0 flex items-center justify-center bg-white/90 z-20';
      loadingIndicator.innerHTML = `
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-[#FFD1DC] border-t-[#FF69B4] rounded-full animate-spin mb-4"></div>
          <p class="text-[#800080] font-semibold">Loading map...</p>
        </div>
      `;
      
      this.mapContainer.style.position = 'relative';
      this.mapContainer.appendChild(loadingIndicator);

      // Remove loading indicator when iframe loads
      const iframe = this.mapContainer.querySelector('iframe');
      iframe.addEventListener('load', () => {
        setTimeout(() => {
          loadingIndicator.style.opacity = '0';
          setTimeout(() => loadingIndicator.remove(), 300);
        }, 500);
      });
    }

    updateOperationalStatus() {
      const statusBadge = document.querySelector('.operational-status-indicator');
      if (!statusBadge) return;

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentDay = currentTime.getDay();

      // Check if open (Mon-Fri 9-19, Sat 10-18, Sun closed)
      let isOpen = false;
      
      if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
        isOpen = currentHour >= 9 && currentHour < 19;
      } else if (currentDay === 6) { // Saturday
        isOpen = currentHour >= 10 && currentHour < 18;
      }

      if (!isOpen) {
        statusBadge.textContent = 'Currently Closed';
        statusBadge.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      }
    }
  }

  // Smooth scroll to map when clicking "Find Location" from other sections
  class NavigationScrollOrchestrator {
    constructor() {
      this.initializeScrollBehavior();
    }

    initializeScrollBehavior() {
      // Listen for hash changes
      if (window.location.hash === '#location') {
        this.scrollToLocation();
      }

      // Add smooth scroll to all anchor links
      document.querySelectorAll('a[href="#location"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.scrollToLocation();
        });
      });
    }

    scrollToLocation() {
      const locationSection = document.getElementById('mapVisualizationContainer');
      if (locationSection) {
        locationSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new GeographicInteractionOrchestrator();
    new NavigationScrollOrchestrator();

    // Add parallax effect on scroll
    let lastScrollY = window.pageYOffset;
    window.addEventListener('scroll', () => {
      const mapContainer = document.getElementById('mapVisualizationContainer');
      const scrollY = window.pageYOffset;
      
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const parallaxOffset = (scrollY - lastScrollY) * 0.3;
          mapContainer.style.transform = `translateY(${parallaxOffset}px)`;
        }
      }
      
      lastScrollY = scrollY;
    });
  });










class CommunicationTransmissionOrchestrator {
    constructor() {
      this.formElement = document.getElementById('communicationTransmissionInterface');
      this.nameField = document.getElementById('clientIdentifierDesignation');
      this.emailField = document.getElementById('electronicMailIdentifier');
      this.phoneField = document.getElementById('telecommunicationIdentifier');
      this.subjectField = document.getElementById('communicationSubjectLine');
      this.messageField = document.getElementById('messageContentPayload');
      this.submitButton = document.getElementById('messageTransmissionTrigger');
      this.successPanel = document.getElementById('successNotificationPanel');
      this.characterCounter = document.getElementById('characterCountDisplay');
      this.whatsappContactNumber = '2348134260378';
      
      this.initializeFormHandlers();
      this.initializeFieldValidation();
      this.initializeCharacterCounter();
    }

    initializeFormHandlers() {
      this.formElement.addEventListener('submit', (submissionEvent) => {
        submissionEvent.preventDefault();
        this.processFormSubmission();
      });
    }

    initializeFieldValidation() {
      const allInputFields = [
        this.nameField, 
        this.emailField, 
        this.phoneField, 
        this.subjectField, 
        this.messageField
      ];
      
      allInputFields.forEach(inputElement => {
        // Validate on blur
        inputElement.addEventListener('blur', () => {
          this.validateIndividualField(inputElement);
        });
        
        // Remove error state on input
        inputElement.addEventListener('input', () => {
          inputElement.classList.remove('validation-failed');
        });

        // Live validation for better UX
        inputElement.addEventListener('input', () => {
          if (inputElement.value.trim()) {
            this.validateIndividualField(inputElement);
          }
        });
      });
    }

    initializeCharacterCounter() {
      this.messageField.addEventListener('input', () => {
        const currentLength = this.messageField.value.length;
        this.characterCounter.textContent = currentLength;
        
        if (currentLength > 450) {
          this.characterCounter.style.color = '#ef4444';
        } else {
          this.characterCounter.style.color = 'rgba(128, 0, 128, 0.6)';
        }
      });
    }

    validateIndividualField(fieldElement) {
      const fieldValue = fieldElement.value.trim();
      const isRequired = fieldElement.hasAttribute('required');
      
      // Check if required field is empty
      if (isRequired && !fieldValue) {
        fieldElement.classList.add('validation-failed');
        fieldElement.classList.remove('validated-successfully');
        return false;
      }
      
      // Email validation
      if (fieldElement.type === 'email' && fieldValue) {
        if (!this.validateEmailFormat(fieldValue)) {
          fieldElement.classList.add('validation-failed');
          fieldElement.classList.remove('validated-successfully');
          return false;
        }
      }
      
      // Phone validation
      if (fieldElement.type === 'tel' && fieldValue) {
        if (!this.validatePhoneFormat(fieldValue)) {
          fieldElement.classList.add('validation-failed');
          fieldElement.classList.remove('validated-successfully');
          return false;
        }
      }
      
      // Field is valid
      if (fieldValue) {
        fieldElement.classList.remove('validation-failed');
        fieldElement.classList.add('validated-successfully');
      }
      
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
      const clientEmail = this.emailField.value.trim();
      const clientPhone = this.phoneField.value.trim();
      const messageSubject = this.subjectField.value.trim() || 'General Inquiry';
      const messageContent = this.messageField.value.trim();

      // Validate all required fields
      const isNameValid = this.validateIndividualField(this.nameField);
      const isEmailValid = this.validateIndividualField(this.emailField);
      const isPhoneValid = this.validateIndividualField(this.phoneField);
      const isMessageValid = this.validateIndividualField(this.messageField);

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
        this.displayErrorNotification('⚠️ Please fill in all required fields correctly!');
        return;
      }

      // Activate loading state
      this.activateLoadingState();

      // Construct WhatsApp message
      const whatsappMessagePayload = this.constructWhatsAppMessage(
        clientName,
        clientEmail,
        clientPhone,
        messageSubject,
        messageContent
      );

      // Show success notification and redirect
      setTimeout(() => {
        this.displaySuccessNotification();
        
        setTimeout(() => {
          this.initiateWhatsAppCommunication(whatsappMessagePayload);
          this.resetFormState();
        }, 2000);
      }, 1000);
    }

    constructWhatsAppMessage(name, email, phone, subject, message) {
      const formattedMessage = 
        `🌸 *New Contact Form Submission* 🌸%0A%0A` +
        `*Subject:* ${subject}%0A%0A` +
        `👤 *Name:* ${name}%0A` +
        `📧 *Email:* ${email}%0A` +
        `📞 *Phone:* ${phone}%0A%0A` +
        `💬 *Message:*%0A${message}%0A%0A` +
        `_Sent from Beauty Salon Contact Form_`;
      
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
        <div class="rotation-indicator-element"></div>
      `;
    }

    displaySuccessNotification() {
      this.successPanel.classList.add('visible-state');
      
      setTimeout(() => {
        this.successPanel.classList.remove('visible-state');
      }, 5000);
    }

    displayErrorNotification(errorMessage) {
      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed top-8 right-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 transform translate-x-full transition-transform duration-500';
      
      errorNotification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="font-semibold">${errorMessage}</span>
      `;
      
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        errorNotification.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        errorNotification.style.transform = 'translateX(150%)';
        setTimeout(() => errorNotification.remove(), 500);
      }, 4000);
    }

    resetFormState() {
      this.formElement.reset();
      this.characterCounter.textContent = '0';
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = `
        <span class="relative z-10">Send via WhatsApp</span>
        <svg class="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      `;
      
      // Remove all validation states
      const allFields = [
        this.nameField,
        this.emailField,
        this.phoneField,
        this.subjectField,
        this.messageField
      ];
      
      allFields.forEach(field => {
        field.classList.remove('validated-successfully', 'validation-failed');
      });
    }
  }

  // Auto-resize textarea as user types
  class TextareaAutoExpansionController {
    constructor() {
      this.textareaElement = document.getElementById('messageContentPayload');
      this.initializeAutoExpansion();
    }

    initializeAutoExpansion() {
      this.textareaElement.addEventListener('input', () => {
        this.textareaElement.style.height = 'auto';
        this.textareaElement.style.height = this.textareaElement.scrollHeight + 'px';
      });
    }
  }

  // Form analytics and tracking (optional)
  class FormInteractionAnalytics {
    constructor() {
      this.trackFormInteractions();
    }

    trackFormInteractions() {
      const formInputs = document.querySelectorAll('.data-acquisition-field');
      
      formInputs.forEach(input => {
        input.addEventListener('focus', () => {
          console.log(`Field focused: ${input.id}`);
          // You can add analytics tracking here
        });
      });
    }
  }

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new CommunicationTransmissionOrchestrator();
    new TextareaAutoExpansionController();
    new FormInteractionAnalytics();

    // Add smooth scroll to form from other sections
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const formSection = document.getElementById('communicationTransmissionInterface');
        if (formSection) {
          formSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      });
    });

    // Add entrance animation to quick contact cards
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.rapid-communication-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease';
      cardObserver.observe(card);
    });
  });






  // Back to Top Button Functionality
    const beautyBackToTopBtn = document.getElementById('beautyBackToTop');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        beautyBackToTopBtn.classList.add('beauty-footer-visible');
      } else {
        beautyBackToTopBtn.classList.remove('beauty-footer-visible');
      }
    });

    beautyBackToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Newsletter Form Handling
    const beautyNewsletterForm = document.querySelector('.beauty-footer-newsletter form');
    
    beautyNewsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = beautyNewsletterForm.querySelector('input[type="email"]');
      
      // Simple validation
      if (emailInput.value.trim() !== '') {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          background: linear-gradient(135deg, #FF69B4, #800080);
          color: white;
          padding: 1rem;
          border-radius: 1rem;
          text-align: center;
          margin-top: 1rem;
          animation: beautyFooterFadeUp 0.5s ease-out;
        `;
        successMsg.textContent = '🎉 Thank you for subscribing! Check your email for exclusive offers.';
        
        beautyNewsletterForm.parentElement.appendChild(successMsg);
        emailInput.value = '';
        
        setTimeout(() => {
          successMsg.style.opacity = '0';
          successMsg.style.transform = 'translateY(-20px)';
          setTimeout(() => successMsg.remove(), 500);
        }, 3000);
      }
    });

    // Animate elements on scroll
    const beautyFooterObserverConfig = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const beautyFooterScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, beautyFooterObserverConfig);

    document.querySelectorAll('.beauty-footer-section').forEach(section => {
      beautyFooterScrollObserver.observe(section);
    });

    // Add ripple effect to buttons
    document.querySelector('.beauty-footer-newsletter-btn').addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: beautyFooterRipple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple animation
    const beautyFooterRippleStyle = document.createElement('style');
    beautyFooterRippleStyle.textContent = `
      @keyframes beautyFooterRipple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(beautyFooterRippleStyle);

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
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