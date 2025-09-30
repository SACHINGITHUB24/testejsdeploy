/**
 * EJS Demo - Main JavaScript
 * Handles client-side interactions and enhancements
 */

// Global App Object
const EJSDemo = {
    init: function() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleFormEnhancements();
        this.setupAnimations();
        console.log('🚀 EJS Demo initialized successfully');
    },

    // Event Listeners
    setupEventListeners: function() {
        // Navigation active state
        this.updateActiveNavigation();
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Auto-hide alerts
        this.setupAutoHideAlerts();
        
        // Setup search enhancements
        this.setupSearchEnhancements();
        
        // Back to top functionality
        this.setupBackToTop();
        
        // Image lazy loading
        this.setupLazyLoading();
    },

    // Initialize Components
    initializeComponents: function() {
        // Initialize tooltips if Bootstrap is available
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
        
        // Initialize popovers if Bootstrap is available
        if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
            const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function(popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        }
    },

    // Form Enhancements
    handleFormEnhancements: function() {
        // Password visibility toggle
        this.setupPasswordToggle();
        
        // Form validation enhancements
        this.setupFormValidation();
        
        // Auto-save drafts
        this.setupAutoSave();
        
        // Character counting
        this.setupCharacterCounters();
    },

    // Navigation Active State
    updateActiveNavigation: function() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath.startsWith(href) && href !== '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    // Password Toggle Functionality
    setupPasswordToggle: function() {
        window.togglePassword = function(inputId) {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(inputId + '-toggle');
            
            if (input && icon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            }
        };
    },

    // Auto-hide Alerts
    setupAutoHideAlerts: function() {
        const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
        alerts.forEach(alert => {
            if (!alert.querySelector('.btn-close')) {
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.style.opacity = '0';
                        alert.style.transition = 'opacity 0.5s ease-out';
                        setTimeout(() => {
                            if (alert.parentNode) {
                                alert.remove();
                            }
                        }, 500);
                    }
                }, 5000);
            }
        });
    },

    // Search Enhancements
    setupSearchEnhancements: function() {
        const searchInputs = document.querySelectorAll('input[name="q"]');
        
        searchInputs.forEach(input => {
            let searchTimeout;
            
            input.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                const query = this.value.trim();
                
                if (query.length >= 2) {
                    searchTimeout = setTimeout(() => {
                        // Add search suggestions or live search here
                        EJSDemo.showSearchSuggestions(query);
                    }, 300);
                }
            });
        });
    },

    // Search Suggestions (placeholder)
    showSearchSuggestions: function(query) {
        // Implement search suggestions if needed
        console.log('Search suggestions for:', query);
    },

    // Back to Top Button
    setupBackToTop: function() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'btn btn-primary back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // Lazy Loading for Images
    setupLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },

    // Form Validation
    setupFormValidation: function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Show first invalid field
                    const firstInvalid = this.querySelector(':invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
                this.classList.add('was-validated');
            });
        });
    },

    // Auto-save Drafts
    setupAutoSave: function() {
        const draftFields = document.querySelectorAll('[data-autosave]');
        
        draftFields.forEach(field => {
            const key = `draft_${field.dataset.autosave}`;
            
            // Load saved draft
            const savedValue = localStorage.getItem(key);
            if (savedValue && !field.value) {
                field.value = savedValue;
                this.showDraftNotification();
            }
            
            // Save draft on input
            let saveTimeout;
            field.addEventListener('input', function() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    localStorage.setItem(key, this.value);
                }, 1000);
            });
            
            // Clear draft on form submit
            const form = field.closest('form');
            if (form) {
                form.addEventListener('submit', () => {
                    localStorage.removeItem(key);
                });
            }
        });
    },

    // Show Draft Notification
    showDraftNotification: function() {
        const notification = document.createElement('div');
        notification.className = 'alert alert-info alert-dismissible fade show';
        notification.innerHTML = `
            <i class="fas fa-info-circle me-2"></i>
            A draft has been restored.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(notification, container.firstChild);
        }
    },

    // Character Counters
    setupCharacterCounters: function() {
        const fieldsWithCounters = document.querySelectorAll('[maxlength]');
        
        fieldsWithCounters.forEach(field => {
            const counterId = field.id + 'Count';
            const counter = document.getElementById(counterId);
            
            if (counter) {
                const updateCounter = () => {
                    const current = field.value.length;
                    const max = field.getAttribute('maxlength');
                    counter.textContent = current;
                    
                    // Color coding
                    if (current > max * 0.9) {
                        counter.style.color = '#dc3545';
                    } else if (current > max * 0.7) {
                        counter.style.color = '#ffc107';
                    } else {
                        counter.style.color = '#6c757d';
                    }
                };
                
                field.addEventListener('input', updateCounter);
                updateCounter(); // Initial count
            }
        });
    },

    // Animation Setup
    setupAnimations: function() {
        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                    }
                });
            }, {
                rootMargin: '0px 0px -100px 0px'
            });
            
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                animationObserver.observe(el);
            });
        }
    },

    // Utility Functions
    utils: {
        // Format date
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        
        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Show loading state
        showLoading: function(element) {
            if (element) {
                element.classList.add('loading');
                element.disabled = true;
            }
        },
        
        // Hide loading state
        hideLoading: function(element) {
            if (element) {
                element.classList.remove('loading');
                element.disabled = false;
            }
        },
        
        // Show toast notification
        showToast: function(message, type = 'info') {
            const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
            
            const toast = document.createElement('div');
            toast.className = `toast align-items-center text-white bg-${type} border-0`;
            toast.setAttribute('role', 'alert');
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
                const bsToast = new bootstrap.Toast(toast);
                bsToast.show();
                
                toast.addEventListener('hidden.bs.toast', () => {
                    toast.remove();
                });
            }
        },
        
        // Create toast container
        createToastContainer: function() {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            container.style.zIndex = '1100';
            document.body.appendChild(container);
            return container;
        }
    }
};

// API Helper Functions
const API = {
    // Generic API call
    call: async function(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            EJSDemo.utils.showToast('Network error. Please try again.', 'danger');
            throw error;
        }
    },
    
    // Like/unlike post
    toggleLike: async function(postId) {
        return this.call(`/posts/${postId}/like`, { method: 'POST' });
    },
    
    // Delete post
    deletePost: async function(postId) {
        return this.call(`/posts/${postId}`, { method: 'DELETE' });
    }
};

// Performance Monitoring
const Performance = {
    init: function() {
        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📊 Page loaded in ${loadTime}ms`);
        });
        
        // Monitor largest contentful paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log(`🎨 LCP: ${lastEntry.startTime}ms`);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
};

// Service Worker Registration
const ServiceWorker = {
    init: function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('📱 Service Worker registered:', registration.scope);
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    EJSDemo.init();
    Performance.init();
    ServiceWorker.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👁️ Page hidden');
    } else {
        console.log('👁️ Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    EJSDemo.utils.showToast('Connection restored!', 'success');
});

window.addEventListener('offline', () => {
    EJSDemo.utils.showToast('You are offline', 'warning');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EJSDemo, API, Performance };
}
