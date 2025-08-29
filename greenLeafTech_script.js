// Navigation active link highlight (for dynamic navigation if needed)
document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('nav ul li a');
	navLinks.forEach(link => {
		if (link.href === window.location.href) {
			navLinks.forEach(l => l.classList.remove('active'));
			link.classList.add('active');
		}
	});
	
	// Floating contact form logic
	document.addEventListener('DOMContentLoaded', function() {
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
	});

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
			formMessage.style.color = '#1a7f4f';
			contactForm.reset();
		});
	}
});
