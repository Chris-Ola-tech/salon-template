
class NavigationInterfaceOrchestrator {
    constructor() {
      this.navbar = document.getElementById('primaryNavigationInterface');
      this.mobileMenu = document.getElementById('mobileNavigationPanel');
      this.overlay = document.getElementById('overlayDimmingLayer');
      this.menuButton = document.getElementById('mobileMenuActivationTrigger');
      this.closeButton = document.getElementById('menuDismissalControl');
      
      this.initializeScrollBehavior();
      this.initializeMobileMenu();
      this.initializeSmoothScrolling();
    }

    initializeScrollBehavior() {
      let lastScrollPosition = 0;
      
      window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;
        
        // Add background when scrolled
        if (currentScrollPosition > 50) {
          this.navbar.classList.add('scrolled-state');
        } else {
          this.navbar.classList.remove('scrolled-state');
        }
        
        lastScrollPosition = currentScrollPosition;
      });
    }

    initializeMobileMenu() {
      // Open menu
      this.menuButton.addEventListener('click', () => {
        this.activateMobileMenu();
      });

      // Close menu
      this.closeButton.addEventListener('click', () => {
        this.deactivateMobileMenu();
      });

      // Close on overlay click
      this.overlay.addEventListener('click', () => {
        this.deactivateMobileMenu();
      });

      // Close on menu link click
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.deactivateMobileMenu();
        });
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenu.classList.contains('active-state')) {
          this.deactivateMobileMenu();
        }
      });
    }

    activateMobileMenu() {
      this.mobileMenu.classList.add('active-state');
      this.overlay.classList.add('visible-state');
      document.body.style.overflow = 'hidden';
    }

    deactivateMobileMenu() {
      this.mobileMenu.classList.remove('active-state');
      this.overlay.classList.remove('visible-state');
      document.body.style.overflow = '';
    }

    initializeSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              const offsetTop = target.offsetTop - 90; // Account for navbar height
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new NavigationInterfaceOrchestrator();

    // Add active state to current page link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.navigation-hyperlink-element, .mobile-nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPage || 
          (currentPage === '' && link.getAttribute('href') === './index.html')) {
        link.style.color = '#FFD1DC';
      }
    });
  });







class GalleryManagementOrchestrator {
    constructor() {
      this.filterButtons = document.querySelectorAll('.categorical-selection-trigger');
      this.galleryItems = document.querySelectorAll('.visual-exhibition-module');
      this.lightbox = document.getElementById('lightboxPresentationInterface');
      this.lightboxImage = document.getElementById('lightboxImageDisplay');
      this.lightboxTitle = document.getElementById('lightboxImageTitle');
      this.lightboxIndex = document.getElementById('lightboxImageIndex');
      this.currentImageIndex = 0;
      this.visibleImages = [];
      
      this.initializeFilterSystem();
      this.initializeLightboxSystem();
      this.initializeScrollAnimations();
      this.revealInitialItems();
    }

    initializeFilterSystem() {
      this.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category');
          this.executeFilterOperation(category, button);
        });
      });
    }

    executeFilterOperation(selectedCategory, activeButton) {
      // Update button states
      this.filterButtons.forEach(btn => btn.classList.remove('activated-state'));
      activeButton.classList.add('activated-state');

      // Filter and animate items
      this.visibleImages = [];
      this.galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          setTimeout(() => {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.add('manifestation-active');
              this.visibleImages.push(item);
            }, 50);
          }, index * 50);
        } else {
          item.classList.remove('manifestation-active');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    }

    initializeLightboxSystem() {
      // Open lightbox on image click
      this.galleryItems.forEach((item, index) => {
        const imageContainer = item.querySelector('.image-container-enhanced');
        imageContainer.addEventListener('click', () => {
          this.openLightbox(index);
        });
      });

      // Close lightbox
      document.getElementById('lightboxCloseControl').addEventListener('click', () => {
        this.closeLightbox();
      });

      // Navigation controls
      document.getElementById('lightboxPrevControl').addEventListener('click', () => {
        this.navigateLightbox('prev');
      });

      document.getElementById('lightboxNextControl').addEventListener('click', () => {
        this.navigateLightbox('next');
      });

      // Close on overlay click
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (this.lightbox.classList.contains('visible-state')) {
          if (e.key === 'Escape') this.closeLightbox();
          if (e.key === 'ArrowLeft') this.navigateLightbox('prev');
          if (e.key === 'ArrowRight') this.navigateLightbox('next');
        }
      });
    }

    openLightbox(index) {
      this.currentImageIndex = index;
      const currentItem = this.galleryItems[index];
      const img = currentItem.querySelector('img');
      const title = currentItem.querySelector('h3')?.textContent || 
                    currentItem.querySelector('.descriptive-overlay-layer h3')?.textContent || 
                    img.alt;
      
      this.lightboxImage.src = img.src;
      this.lightboxImage.alt = img.alt;
      this.lightboxTitle.textContent = title;
      this.lightboxIndex.textContent = `${index + 1} / ${this.galleryItems.length}`;
      
      this.lightbox.classList.add('visible-state');
      document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
      this.lightbox.classList.remove('visible-state');
      document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
      if (direction === 'prev') {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
      } else {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryItems.length;
      }
      
      this.openLightbox(this.currentImageIndex);
    }

    initializeScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('manifestation-active');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.galleryItems.forEach(item => {
        observer.observe(item);
      });
    }

    revealInitialItems() {
      // Initial reveal animation for all items
      setTimeout(() => {
        this.galleryItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('manifestation-active');
          }, index * 80);
        });
      }, 200);
    }
  }

  // Smooth scroll to gallery from hero section
  class NavigationScrollEnhancement {
    constructor() {
      this.initializeSmoothScrolling();
    }

    initializeSmoothScrolling() {
      document.querySelectorAll('a[href^="#gallery"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
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

  // Image lazy loading enhancement
  class ImageLoadingOptimizer {
    constructor() {
      this.initializeLazyLoading();
    }

    initializeLazyLoading() {
      const images = document.querySelectorAll('.visual-exhibition-module img');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            
            img.onload = () => {
              img.style.transition = 'opacity 0.5s ease';
              img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Statistics counter animation
  class StatisticsAnimationController {
    constructor() {
      this.animateStatsIfVisible();
    }

    animateStatsIfVisible() {
      const statsElements = document.querySelectorAll('.statistical-indicator-module p:first-child');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = parseInt(element.textContent);
            this.animateCounter(element, finalValue);
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });

      statsElements.forEach(stat => observer.observe(stat));
    }

    animateCounter(element, target) {
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + '+';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, 16);
    }
  }

  // Initialize all systems when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new GalleryManagementOrchestrator();
    new NavigationScrollEnhancement();
    new ImageLoadingOptimizer();
    new StatisticsAnimationController();

    // Add scroll reveal animation to filter buttons
    const filterContainer = document.getElementById('categoryFilterInterface');
    const filterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          entry.target.style.transition = 'all 0.6s ease';
          
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          
          filterObserver.unobserve(entry.target);
        }
      });
    });

    if (filterContainer) {
      filterObserver.observe(filterContainer);
    }
  });












document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  
  let currentIndex = 0;
  let visibleItems = Array.from(galleryItems);

  // Initial animation
  setTimeout(() => {
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 80);
    });
  }, 200);

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      visibleItems = [];
      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
          setTimeout(() => {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.add('visible');
              visibleItems.push(item);
            }, 50);
          }, index * 30);
        } else {
          item.classList.remove('visible');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  galleryItems.forEach((item, index) => {
    const imageWrapper = item.querySelector('.gallery-image-wrapper');
    imageWrapper.addEventListener('click', function() {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxCounter.textContent = `${index + 1} / ${galleryItems.length}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    } else {
      currentIndex = (currentIndex + 1) % galleryItems.length;
    }
    openLightbox(currentIndex);
  }

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
  lightboxNext.addEventListener('click', () => navigateLightbox('next'));
  
  // Close on overlay click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    }
  });

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  galleryItems.forEach(item => observer.observe(item));
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