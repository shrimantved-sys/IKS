document.addEventListener('DOMContentLoaded', () => {
  // 1. Remove Loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 600); // Small delay to show off the loader
  }

  // 2. Navbar & Back to Top Scroll Behavior
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    // Navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to Top Button
    if (backToTop) {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  // 3. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
      });
    });
  }

  // 4. Back to Top Click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Active Navigation Link Highlighting
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return; // skip hash links for path checking

    const cleanHref = href.replace('./', '').replace('../', '');
    if (currentPath.includes(cleanHref)) {
      if(cleanHref !== 'index.html' || currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
         link.classList.add('active');
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
