// main.js - ملف JavaScript الرئيسي لموقع Visit Libya

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // 1. Mobile Navigation
    // ====================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ====================
    // 2. Back to Top Button
    // ====================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ====================
    // 3. Animated Counter
    // ====================
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // ====================
    // 4. Newsletter Form
    // ====================
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const messageDiv = document.getElementById('form-message');
            
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showMessage(messageDiv, 'الرجاء إدخال بريد إلكتروني صحيح.', 'error');
                return;
            }
            
            // محاكاة إرسال البيانات
            showMessage(messageDiv, 'جاري الإشتراك...', 'loading');
            
            setTimeout(() => {
                showMessage(messageDiv, 'شكراً لك! تم اشتراكك بنجاح.', 'success');
                emailInput.value = '';
                
                // إعادة تعيين الرسالة بعد 5 ثواني
                setTimeout(() => {
                    messageDiv.textContent = '';
                    messageDiv.className = 'form-message';
                }, 5000);
            }, 1500);
        });
    }

    // ====================
    // 5. FAQ Accordion
    // ====================
    const faqToggles = document.querySelectorAll('[data-toggle="faq"]');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            this.classList.toggle('active');
            
            // تغيير الأيقونة
            const icon = this.querySelector('.toggle-icon');
            if (icon) {
                if (content.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });

    // ====================
    // 6. Image Lazy Loading
    // ====================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ====================
    // 7. Smooth Scrolling
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // استبعاد روابط الهاش الفارغة
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================
    // 8. Active Nav Link
    // ====================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            
            if (currentPath.endsWith(linkPath) || 
                (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();

    // ====================
    // 9. Scroll Animations
    // ====================
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    if (scrollElements.length > 0) {
        const elementInView = (el, percentageScroll = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= 
                ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
            );
        };

        const displayScrollElement = (element) => {
            element.classList.add('animated');
        };

        const hideScrollElement = (element) => {
            element.classList.remove('animated');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 90)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };

        // التهيئة الأولى
        handleScrollAnimation();
        window.addEventListener('scroll', () => {
            throttle(handleScrollAnimation, 250);
        });
    }

    // ====================
    // 10. Language Switcher
    // ====================
    const langSwitch = document.querySelector('.lang-switch');
    
    if (langSwitch) {
        langSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            
            // هنا يمكنك إضافة منطق تبديل اللغة
            // مثل إعادة التوجيه إلى صفحة اللغة الأخرى أو تغيير المحتوى ديناميكيًا
            alert(`سيتم تبديل اللغة إلى ${newLang === 'en' ? 'الإنجليزية' : 'العربية'}`);
            
            // مثال: تغيير اتجاه الصفحة
            if (newLang === 'en') {
                document.documentElement.dir = 'ltr';
                document.documentElement.lang = 'en';
            } else {
                document.documentElement.dir = 'rtl';
                document.documentElement.lang = 'ar';
            }
        });
    }

    // ====================
    // 11. Image Modal Gallery
    // ====================
    const galleryImages = document.querySelectorAll('[data-gallery]');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const src = this.src;
                const alt = this.alt;
                createImageModal(src, alt);
            });
        });
    }

    // ====================
    // Helper Functions
    // ====================
    
    // التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // عرض الرسائل
    function showMessage(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.className = 'form-message';
        element.classList.add(type);
    }
    
    // Throttle function لتحسين الأداء
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // إنشاء مودال للصور
    function createImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${src}" alt="${alt}">
                <p>${alt}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // تحميل الصفحة بسلاسة
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // إخفاء شاشة التحميل إذا كانت موجودة
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500);
        }
    });
});