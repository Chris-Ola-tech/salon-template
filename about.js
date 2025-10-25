
  // Elements
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const hamburger = document.querySelector('.hamburger');

    // Scroll Effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
      
      lastScrollTop = scrollTop;
    });

    // Open Mobile Menu
    function openMenu() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Close Mobile Menu
    function closeMenu() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Event Listeners
    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-link a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
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



    // Enhanced button interactions
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function(e) {
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
          top: ${y}px;
          left: ${x}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      button {
        position: relative;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    // Parallax effect on mouse move (desktop only)
    if (window.innerWidth > 768) {
      let mouseX = 0, mouseY = 0;
      let currentX = 0, currentY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      });

      function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        document.querySelectorAll('.glass-card').forEach((card, index) => {
          const depth = (index + 1) * 10;
          card.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        });

        requestAnimationFrame(animate);
      }

      animate();
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';



    // Intersection Observer for scroll animations
    const beautyObserverConfig = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const beautyScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('beauty-visible');
          }, index * 200);
          beautyScrollObserver.unobserve(entry.target);
        }
      });
    }, beautyObserverConfig);

    // Observe all fade-in sections
    document.querySelectorAll('.beauty-section-reveal').forEach(element => {
      beautyScrollObserver.observe(element);
    });

    // Parallax effect for decorative elements (desktop only)
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (event) => {
        const moveXAxis = (event.clientX - window.innerWidth / 2) / 50;
        const moveYAxis = (event.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.beauty-stats-showcase').forEach((statsCard, cardIndex) => {
          statsCard.style.transform = `translate(${moveXAxis * (cardIndex + 1) * 0.3}px, ${moveYAxis * (cardIndex + 1) * 0.3}px)`;
        });
      });
    }

    // Button ripple effect
    document.querySelectorAll('button').forEach(beautyButton => {
      beautyButton.addEventListener('click', function(clickEvent) {
        const beautyRipple = document.createElement('span');
        const buttonRect = this.getBoundingClientRect();
        const rippleSize = Math.max(buttonRect.width, buttonRect.height);
        const rippleX = clickEvent.clientX - buttonRect.left - rippleSize / 2;
        const rippleY = clickEvent.clientY - buttonRect.top - rippleSize / 2;
        
        beautyRipple.style.cssText = `
          position: absolute;
          width: ${rippleSize}px;
          height: ${rippleSize}px;
          top: ${rippleY}px;
          left: ${rippleX}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: beautyRippleEffect 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(beautyRipple);
        setTimeout(() => beautyRipple.remove(), 600);
      });
    });

    // Add ripple animation
    const beautyRippleStyle = document.createElement('style');
    beautyRippleStyle.textContent = `
      @keyframes beautyRippleEffect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(beautyRippleStyle);






    // Intersection Observer for scroll-triggered animations
    const beautyTeamObserverConfig = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const beautyTeamScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          beautyTeamScrollObserver.unobserve(entry.target);
        }
      });
    }, beautyTeamObserverConfig);

    // Observe all team cards
    document.querySelectorAll('.beauty-team-card').forEach(card => {
      beautyTeamScrollObserver.observe(card);
    });

    // Parallax effect on cards (desktop only)
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (moveEvent) => {
        const xAxisMovement = (moveEvent.clientX - window.innerWidth / 2) / 50;
        const yAxisMovement = (moveEvent.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.beauty-team-card').forEach((teamCard, cardIndex) => {
          const depth = (cardIndex + 1) * 0.5;
          teamCard.style.transform = `translate(${xAxisMovement * depth}px, ${yAxisMovement * depth}px)`;
        });
      });
    }

    // Button ripple effect
    document.querySelectorAll('.beauty-team-cta-btn').forEach(beautyBtn => {
      beautyBtn.addEventListener('click', function(clickEvent) {
        clickEvent.preventDefault();
        const beautyRippleElement = document.createElement('span');
        const btnRect = this.getBoundingClientRect();
        const rippleSize = Math.max(btnRect.width, btnRect.height);
        const xPosition = clickEvent.clientX - btnRect.left - rippleSize / 2;
        const yPosition = clickEvent.clientY - btnRect.top - rippleSize / 2;
        
        beautyRippleElement.style.cssText = `
          position: absolute;
          width: ${rippleSize}px;
          height: ${rippleSize}px;
          top: ${yPosition}px;
          left: ${xPosition}px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transform: scale(0);
          animation: beautyTeamRippleWave 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.appendChild(beautyRippleElement);
        setTimeout(() => beautyRippleElement.remove(), 600);
      });
    });

    // Add ripple animation to stylesheet
    const beautyTeamRippleStyles = document.createElement('style');
    beautyTeamRippleStyles.textContent = `
      @keyframes beautyTeamRippleWave {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(beautyTeamRippleStyles);

    // Smooth hover effect for social icons
    document.querySelectorAll('.beauty-team-social-icon').forEach(socialIcon => {
      socialIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) rotate(10deg)';
      });
      
      socialIcon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
      });
    });

    // Card tilt effect on hover (desktop only)
    if (window.innerWidth > 768) {
      document.querySelectorAll('.beauty-team-card').forEach(teamCard => {
        teamCard.addEventListener('mousemove', function(hoverEvent) {
          const cardRect = this.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          const angleX = (hoverEvent.clientY - cardCenterY) / 20;
          const angleY = (cardCenterX - hoverEvent.clientX) / 20;
          
          this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-12px)`;
        });
        
        teamCard.addEventListener('mouseleave', function() {
          this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
      });
    }





    // Intersection Observer for scroll animations
    const beautyValuesObserverConfig = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const beautyValuesScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          beautyValuesScrollObserver.unobserve(entry.target);
        }
      });
    }, beautyValuesObserverConfig);

    // Observe all value cards
    document.querySelectorAll('.beauty-values-card').forEach(valueCard => {
      beautyValuesScrollObserver.observe(valueCard);
    });

    // Parallax effect on cards (desktop only)
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (moveEvent) => {
        const xMove = (moveEvent.clientX - window.innerWidth / 2) / 60;
        const yMove = (moveEvent.clientY - window.innerHeight / 2) / 60;
        
        document.querySelectorAll('.beauty-values-card').forEach((card, index) => {
          const depth = (index % 3 + 1) * 0.5;
          card.style.transform = `translate(${xMove * depth}px, ${yMove * depth}px)`;
        });
      });
    }

    // Button ripple effect
    document.querySelector('.beauty-values-cta-btn').addEventListener('click', function(clickEvent) {
      clickEvent.preventDefault();
      const rippleElement = document.createElement('span');
      const btnRect = this.getBoundingClientRect();
      const rippleSize = Math.max(btnRect.width, btnRect.height);
      const xPos = clickEvent.clientX - btnRect.left - rippleSize / 2;
      const yPos = clickEvent.clientY - btnRect.top - rippleSize / 2;
      
      rippleElement.style.cssText = `
        position: absolute;
        width: ${rippleSize}px;
        height: ${rippleSize}px;
        top: ${yPos}px;
        left: ${xPos}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: beautyValuesRipple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(rippleElement);
      setTimeout(() => rippleElement.remove(), 600);
    });

    // Add ripple animation
    const beautyValuesRippleStyle = document.createElement('style');
    beautyValuesRippleStyle.textContent = `
      @keyframes beautyValuesRipple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(beautyValuesRippleStyle);

    // Counter animation for stats
    function beautyValuesAnimateCounter(element, target, duration) {
      let current = 0;
      const increment = target / (duration / 16);
      const isDecimal = target.toString().includes('.');
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = isDecimal ? target.toFixed(1) : target + '+';
          clearInterval(timer);
        } else {
          element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current) + '+';
        }
      }, 16);
    }

    // Trigger counter animation when stats are visible
    const beautyValuesStatsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.beauty-values-stat-number');
          const text = statNumber.textContent;
          const value = parseFloat(text);
          
          if (!isNaN(value)) {
            statNumber.textContent = '0';
            beautyValuesAnimateCounter(statNumber, value, 2000);
          }
          
          beautyValuesStatsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.beauty-values-stat-box').forEach(statBox => {
      beautyValuesStatsObserver.observe(statBox);
    });




    // Intersection Observer for scroll-triggered animations
    const beautyStoryObserverConfig = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const beautyStoryScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('beauty-story-visible');
          beautyStoryScrollObserver.unobserve(entry.target);
        }
      });
    }, beautyStoryObserverConfig);

    // Observe animated elements
    document.querySelectorAll('.beauty-story-paragraph, .beauty-story-quote, .beauty-story-milestone-grid').forEach(element => {
      beautyStoryScrollObserver.observe(element);
    });

    // Parallax effect for image (desktop only)
    if (window.innerWidth > 768) {
      const beautyStoryImageWrapper = document.querySelector('.beauty-story-image-wrapper');
      
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = beautyStoryImageWrapper.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition + windowHeight > elementOffset && scrollPosition < elementOffset + beautyStoryImageWrapper.offsetHeight) {
          const parallaxSpeed = (scrollPosition - elementOffset + windowHeight) * 0.1;
          beautyStoryImageWrapper.style.transform = `translateY(${parallaxSpeed}px)`;
        }
      });
    }

    // Smooth hover effect for paragraphs
    document.querySelectorAll('.beauty-story-paragraph').forEach(paragraph => {
      paragraph.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
      });
      
      paragraph.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });

    // Add interactive glow to highlights
    document.querySelectorAll('.beauty-story-highlight').forEach(highlight => {
      highlight.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(255, 105, 180, 0.5)';
      });
      
      highlight.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
      });
    });

    // Milestone counter animation
    const beautyStoryMilestoneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.beauty-story-milestone-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              item.style.transition = 'all 0.5s ease';
              
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            }, index * 150);
          });
          beautyStoryMilestoneObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const milestoneGrid = document.querySelector('.beauty-story-milestone-grid');
    if (milestoneGrid) {
      beautyStoryMilestoneObserver.observe(milestoneGrid);
    }

    // Add reading progress indicator
    const beautyStorySection = document.querySelector('.beauty-story-section');
    const beautyStoryProgressBar = document.createElement('div');
    beautyStoryProgressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, #800080, #FF69B4);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(beautyStoryProgressBar);

    window.addEventListener('scroll', () => {
      const sectionTop = beautyStorySection.offsetTop;
      const sectionHeight = beautyStorySection.offsetHeight;
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition >= sectionTop - windowHeight && scrollPosition <= sectionTop + sectionHeight) {
        const progress = ((scrollPosition - (sectionTop - windowHeight)) / (sectionHeight + windowHeight)) * 100;
        beautyStoryProgressBar.style.width = Math.min(progress, 100) + '%';
      }
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