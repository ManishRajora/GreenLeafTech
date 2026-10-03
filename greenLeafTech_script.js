// Navigation active link highlight (for dynamic navigation if needed)
document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('nav ul li a');
	navLinks.forEach(link => {
		if (link.href === window.location.href) {
			navLinks.forEach(l => l.classList.remove('active'));
			link.classList.add('active');
		}
	});

	// ---------- Mobile nav toggle ----------
	const navToggle = document.getElementById('navToggle');
	const navMenu = document.getElementById('navMenu');
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', function() {
			navMenu.classList.toggle('open');
			navToggle.classList.toggle('active');
		});
		// Close menu when a link is clicked
		navMenu.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navMenu.classList.remove('open');
				navToggle.classList.remove('active');
			});
		});
	}

	// ---------- Scroll reveal animations ----------
	const revealElements = document.querySelectorAll(
		'.service-card, .app-card, .game-card, .why-card, .stat-item, .section-header, .cta-content, .gamedev-cta'
	);
	revealElements.forEach(el => el.classList.add('reveal'));

	const revealObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				revealObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

	revealElements.forEach(el => revealObserver.observe(el));

	// ---------- Animated stat counters ----------
	const statNumbers = document.querySelectorAll('.stat-number[data-target]');
	let statsCounted = false;

	function animateCounters() {
		if (statsCounted) return;
		statsCounted = true;

		statNumbers.forEach(counter => {
			const target = parseInt(counter.getAttribute('data-target'), 10);
			const duration = 1800;
			const startTime = performance.now();

			function updateCounter(currentTime) {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				// Ease-out cubic
				const eased = 1 - Math.pow(1 - progress, 3);
				const current = Math.round(eased * target);
				counter.textContent = current;
				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				} else {
					counter.textContent = target;
				}
			}
			requestAnimationFrame(updateCounter);
		});
	}

	if (statNumbers.length > 0) {
		const statsSection = document.getElementById('stats');
		if (statsSection) {
			const statsObserver = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						animateCounters();
						statsObserver.unobserve(entry.target);
					}
				});
			}, { threshold: 0.3 });
			statsObserver.observe(statsSection);
		}
	}

	// ---------- Header scroll effect ----------
	const header = document.querySelector('header');
	if (header) {
		let lastScroll = 0;
		window.addEventListener('scroll', () => {
			const currentScroll = window.scrollY;
			if (currentScroll > 80) {
				header.style.background = 'rgba(10, 15, 13, 0.95)';
			} else {
				header.style.background = 'rgba(10, 15, 13, 0.8)';
			}
			lastScroll = currentScroll;
		}, { passive: true });
	}

	// ---------- Floating contact form logic ----------
    const openBtn = document.getElementById('openFloatingForm');
    const closeBtn = document.getElementById('closeFloatingForm');
    const floatingForm = document.getElementById('floatingContactForm');
    if (openBtn && closeBtn && floatingForm) {
        openBtn.addEventListener('click', function() {
            floatingForm.style.display = 'block';
            openBtn.style.display = 'none';
        });
        closeBtn.addEventListener('click', function() {
            floatingForm.style.display = 'none';
            openBtn.style.display = 'block';
        });
        // Hide form on load
        floatingForm.style.display = 'none';
    }

	// Contact form handling
	const contactForm = document.getElementById('contactForm');
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const name = document.getElementById('name').value.trim();
			const email = document.getElementById('email').value.trim();
			const message = document.getElementById('message').value.trim();
			const formMessage = document.getElementById('formMessage');

			if (!name || !email || !message) {
				formMessage.textContent = 'Please fill in all fields.';
				formMessage.style.color = '#d32f2f';
				return;
			}

			// Simulate form submission (replace with real backend integration as needed)
			formMessage.textContent = 'Thank you for contacting us, ' + name + '! We will get back to you soon.';
			formMessage.style.color = '#0cc85e';
			contactForm.reset();
		});
	}
});
