document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'light' || (!savedTheme && !prefersDarkScheme.matches)) {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');

        // Update icon
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Make project cards clickable
    projectCards.forEach(card => {
        const githubLink = card.querySelector('a');
        const githubUrl = githubLink ? githubLink.getAttribute('href') : null;

        if (githubUrl) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on the link itself
                if (e.target.tagName !== 'A') {
                    window.open(githubUrl, '_blank');
                }
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // Add skill progress bars
    document.querySelectorAll('.skill-category li').forEach(skill => {
        // Create a random percentage between 75% and 95% for demonstration
        const percentage = Math.floor(Math.random() * 20) + 75;

        // Create progress bar container
        const progressContainer = document.createElement('div');
        progressContainer.classList.add('skill-progress');

        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.setAttribute('data-width', percentage + '%');

        // Append elements
        progressContainer.appendChild(progressBar);
        skill.appendChild(progressContainer);
    });

    // Animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Add error message elements to each form group
    function setupFormValidation() {
        const formGroups = contactForm.querySelectorAll('.form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            group.appendChild(errorElement);
        });
    }

    // Validate form fields
    function validateForm() {
        let isValid = true;

        // Clear all previous errors
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });

        // Validate name (not empty)
        const nameInput = document.getElementById('name');
        const nameGroup = nameInput.closest('.form-group');
        const nameError = nameGroup.querySelector('.error-message');

        if (!nameInput.value.trim()) {
            nameGroup.classList.add('error');
            nameError.textContent = 'Please enter your name';
            isValid = false;
        }

        // Validate email (valid format)
        const emailInput = document.getElementById('email');
        const emailGroup = emailInput.closest('.form-group');
        const emailError = emailGroup.querySelector('.error-message');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {
            emailGroup.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Validate subject (not empty)
        const subjectInput = document.getElementById('subject');
        const subjectGroup = subjectInput.closest('.form-group');
        const subjectError = subjectGroup.querySelector('.error-message');

        if (!subjectInput.value.trim()) {
            subjectGroup.classList.add('error');
            subjectError.textContent = 'Please enter a subject';
            isValid = false;
        }

        // Validate message (at least 10 characters)
        const messageInput = document.getElementById('message');
        const messageGroup = messageInput.closest('.form-group');
        const messageError = messageGroup.querySelector('.error-message');

        if (messageInput.value.trim().length < 10) {
            messageGroup.classList.add('error');
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    if (contactForm) {
        // Setup validation elements
        setupFormValidation();

        // Support Enter key on message field
        document.getElementById('message').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                contactForm.dispatchEvent(new Event('submit'));
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                // Show error feedback
                formStatus.textContent = 'Please fix the errors in the form.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';

                // Hide error message after 5 seconds
                setTimeout(() => {
                    formStatus.style.animation = 'slideOut 0.3s ease forwards';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.animation = 'slideIn 0.3s ease forwards';
                    }, 300);
                }, 5000);

                return;
            }

            // Get form data for Formspree
            const form = e.target;
            const formData = new FormData(form);

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner"><i class="fas fa-spinner fa-spin"></i></span> Sending...';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Send data to Formspree
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Show success message
                formStatus.textContent = 'Message sent! Thank you for contacting me.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds with animation
                setTimeout(() => {
                    formStatus.style.animation = 'slideOut 0.3s ease forwards';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.animation = 'slideIn 0.3s ease forwards';
                    }, 300);
                }, 5000);
            })
            .catch(error => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Show error message
                formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';

                // Hide error message after 5 seconds
                setTimeout(() => {
                    formStatus.style.animation = 'slideOut 0.3s ease forwards';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.animation = 'slideIn 0.3s ease forwards';
                    }, 300);
                }, 5000);

                console.error('Error:', error);
            });
        });
    }
});
