document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    // Mobile menu functions
    function openMenu() {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('open');
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100');
      menuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('open');
      overlay.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100');
      menuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener("click", function() {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", closeMenu);
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Navbar scroll effect
    function handleScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add("glass-effect");
      } else {
        navbar.classList.remove("glass-effect");
      }
    }

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

    handleScroll();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
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








    class ServicePresentationOrchestrator {
    constructor() {
      this.serviceCards = document.querySelectorAll('.service-presentation-module');
      this.initializeScrollAnimations();
      this.initializeCardInteractions();
      this.revealInitialCards();
    }

    initializeScrollAnimations() {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-animation');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.serviceCards.forEach(card => {
        observer.observe(card);
      });
    }

    initializeCardInteractions() {
      this.serviceCards.forEach(card => {
        // Add parallax effect on mouse move
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 30;
          const rotateY = (centerX - x) / 30;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });

        // Add ripple effect to buttons
        const button = card.querySelector('.service-engagement-trigger');
        if (button) {
          button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              left: ${x}px;
              top: ${y}px;
              background: rgba(255, 255, 255, 0.6);
              border-radius: 50%;
              pointer-events: none;
              z-index: 1;
              animation: ripple-expand 0.8s ease-out;
            `;
            
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
          });
        }
      });
    }

    revealInitialCards() {
      // Reveal cards that are already in viewport on page load
      setTimeout(() => {
        this.serviceCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
              card.classList.add('reveal-animation');
            }, index * 100);
          }
        });
      }, 300);
    }
  }

  // Image lazy loading with fade effect
  class ImageLoadingEnhancement {
    constructor() {
      this.initializeLazyLoading();
    }

    initializeLazyLoading() {
      const images = document.querySelectorAll('.service-visual-container img');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loading placeholder effect
            img.style.opacity = '0';
            img.style.filter = 'blur(10px)';
            
            img.onload = () => {
              img.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
              img.style.opacity = '1';
              img.style.filter = 'blur(0)';
            };
            
            // If image is already cached
            if (img.complete) {
              img.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
              img.style.opacity = '1';
              img.style.filter = 'blur(0)';
            }
            
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '100px' });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Smooth scroll enhancement
  class NavigationScrollOptimization {
    constructor() {
      this.initializeSmoothScrolling();
    }

    initializeSmoothScrolling() {
      // Smooth scroll to services section from other pages
      if (window.location.hash === '#services') {
        setTimeout(() => {
          const servicesSection = document.getElementById('servicesGridContainer');
          if (servicesSection) {
            servicesSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 500);
      }

      // Add smooth scroll to all service links
      document.querySelectorAll('a[href^="#services"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  // Price animation on scroll
  class PricingAnimationController {
    constructor() {
      this.animatePricesOnScroll();
    }

    animatePricesOnScroll() {
      const priceBadges = document.querySelectorAll('.pricing-indicator-badge');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const badge = entry.target;
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0) rotate(-180deg)';
            
            setTimeout(() => {
              badge.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
              badge.style.opacity = '1';
              badge.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
            
            observer.unobserve(badge);
          }
        });
      }, { threshold: 0.5 });

      priceBadges.forEach(badge => observer.observe(badge));
    }
  }

  // Service category counter
  class ServiceStatisticsDisplay {
    constructor() {
      this.displayServiceStats();
    }

    displayServiceStats() {
      const totalServices = document.querySelectorAll('.service-presentation-module').length;
      console.log(`Total Services Available: ${totalServices}`);
      
      // You can add a visual counter if needed
      // Example: Show "9 Services Available" badge somewhere
    }
  }

  // Add ripple animation keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-expand {
      from {
        transform: scale(0);
        opacity: 1;
      }
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Initialize all systems when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new ServicePresentationOrchestrator();
    new ImageLoadingEnhancement();
    new NavigationScrollOptimization();
    new PricingAnimationController();
    new ServiceStatisticsDisplay();

    // Add entrance animation to CTA section
    const ctaSection = document.querySelector('.mt-20.text-center');
    if (ctaSection) {
      const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
              entry.target.style.transition = 'all 0.8s ease';
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            ctaObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      ctaObserver.observe(ctaSection);
    }

    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('.service-engagement-trigger').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.animation = 'none';
        setTimeout(() => {
          btn.style.animation = 'pulse-button 0.3s ease';
        }, 10);
      });
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
      @keyframes pulse-button {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(pulseStyle);
  });










  class FAQAccordionOrchestrator {
    constructor() {
      this.faqModules = document.querySelectorAll('.inquiry-response-module');
      this.initializeAccordion();
      this.initializeScrollAnimations();
      this.revealInitialFAQs();
    }

    initializeAccordion() {
      this.faqModules.forEach(module => {
        const trigger = module.querySelector('.question-trigger-interface');
        
        trigger.addEventListener('click', () => {
          this.toggleFAQ(module);
        });

        // Keyboard accessibility
        trigger.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleFAQ(module);
          }
        });

        // Make trigger focusable
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-expanded', 'false');
      });
    }

    toggleFAQ(module) {
      const isExpanded = module.classList.contains('expanded-state');
      
      if (isExpanded) {
        // Collapse
        module.classList.remove('expanded-state');
        module.querySelector('.question-trigger-interface').setAttribute('aria-expanded', 'false');
      } else {
        // Collapse all others (optional - remove if you want multiple open)
        this.faqModules.forEach(m => {
          m.classList.remove('expanded-state');
          m.querySelector('.question-trigger-interface').setAttribute('aria-expanded', 'false');
        });
        
        // Expand clicked one
        module.classList.add('expanded-state');
        module.querySelector('.question-trigger-interface').setAttribute('aria-expanded', 'true');
      }
    }

    initializeScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-animation');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.faqModules.forEach(module => {
        observer.observe(module);
      });
    }

    revealInitialFAQs() {
      setTimeout(() => {
        this.faqModules.forEach((module, index) => {
          setTimeout(() => {
            module.classList.add('reveal-animation');
          }, index * 150);
        });
      }, 300);
    }
  }

  // Smooth scroll to FAQ section
  class FAQNavigationEnhancement {
    constructor() {
      this.initializeSmoothScrolling();
    }

    initializeSmoothScrolling() {
      if (window.location.hash === '#faq') {
        setTimeout(() => {
          const faqSection = document.getElementById('faq');
          if (faqSection) {
            faqSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 500);
      }

      document.querySelectorAll('a[href="#faq"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('faq');
          if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  // Auto-expand first FAQ on load (optional)
  class InitialFAQExpansion {
    constructor() {
      this.expandFirstFAQ();
    }

    expandFirstFAQ() {
      setTimeout(() => {
        const firstFAQ = document.querySelector('.inquiry-response-module[data-faq="1"]');
        if (firstFAQ) {
          firstFAQ.classList.add('expanded-state');
          firstFAQ.querySelector('.question-trigger-interface').setAttribute('aria-expanded', 'true');
        }
      }, 1000);
    }
  }

  // Initialize all systems
  document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordionOrchestrator();
    new FAQNavigationEnhancement();
    new InitialFAQExpansion();

    // Add ripple effect to CTA button
    const ctaButton = document.querySelector('.inquiry-submission-trigger');
    if (ctaButton) {
      ctaButton.addEventListener('click', function(e) {
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
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: ripple-out 0.8s ease-out;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
      });
    }

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      @keyframes ripple-out {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);
  });