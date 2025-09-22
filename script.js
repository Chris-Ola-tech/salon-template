document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  // Toggle mobile menu
  const openMenu = () => {
    mobileMenu.style.right = "0px";
    overlay.classList.remove("hidden");
  };
  const closeMenu = () => {
    mobileMenu.style.right = "-100%";
    overlay.classList.add("hidden");
  };

  menuBtn.addEventListener("click", () => {
    if (mobileMenu.style.right === "0px") {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Click outside (overlay) closes menu
  overlay.addEventListener("click", closeMenu);

  // Transparent → Opaque on scroll
  const checkScroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add("bg-[#800080]", "shadow-md");
      navbar.classList.remove("bg-transparent");
    } else {
      navbar.classList.remove("bg-[#800080]", "shadow-md");
      navbar.classList.add("bg-transparent");
    }
  };

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check
});






const images = [
  "./assets/images for makeup/download (12).jpeg",
  "./assets/imags for hair and logos/22” 5x5 Wavy Weave _ Virgin Hair SDD Bouncy Curls 💕Don’t you just love beautiful units like this❓.jpeg",
  "./assets/images for nails/download.jpeg"
];

const words = [
  "Professional Makeup for Every Occasion",
  "Beautiful Hair Styling & Braiding",
  "Expert Nail Care & Stunning Manicures"
];

let index = 0;

function animateHero() {
  const img = document.getElementById("animated-img");
  const text = document.getElementById("animated-text");

  // Reset image and text positions
  img.style.transition = "none";
  text.style.transition = "none";
  img.style.transform = "translateX(100%)";
  img.style.opacity = 0;
  text.style.transform = "translateX(-100%)";
  text.style.opacity = 0;

  // Update image and text
  img.src = images[index];
  text.textContent = words[index];

  // Animate in
  setTimeout(() => {
    img.style.transition = "all 0.8s ease-out";
    text.style.transition = "all 0.8s ease-out";
    img.style.transform = "translateX(0)";
    img.style.opacity = 1;
    text.style.transform = "translateX(0)";
    text.style.opacity = 1;
  }, 50);

  index = (index + 1) % images.length;
}

// Run every 3 seconds
setInterval(animateHero, 3000);

// Initialize first hero
animateHero();


document.getElementById("sendBtn").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !email || !message) {
      alert("⚠️ Please fill in all fields before submitting!");
      return;
    }

    // Replace with your WhatsApp number (no "+" sign, e.g. 234XXXXXXXXXX for Nigeria)
    const whatsappNumber = "2348134260378";

    // Encode message for WhatsApp
    const whatsappMessage = `Hello! My name is ${name}.%0A📞 Phone: ${phone}%0A📧 Email: ${email}%0A💬 Message: ${message}`;

    // Redirect to WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(url, "_blank");
  });




  const container = document.getElementById("testimonial-container");
  const slides = document.querySelectorAll("#testimonial-list > div");
  const dots = document.querySelectorAll(".dot");

  // Show active dot
  function updateDots() {
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-[#FF69B4]", i === index);
      dot.classList.toggle("bg-gray-400", i !== index);
    });
  }

  // Click dot to scroll
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      container.scrollTo({
        left: i * container.offsetWidth,
        behavior: "smooth"
      });
    });
  });

  // Update dots on scroll
  container.addEventListener("scroll", () => {
    updateDots();
  });

  // Initialize
  updateDots();



   document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('click', () => {
      const overlay = card.querySelector('div.absolute');
      overlay.classList.toggle('opacity-100');
    });
  });