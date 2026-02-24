// Smooth scrolling for navigation links
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

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update current year in stats if needed
    updateYearHighlights();
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animated progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for progress bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
        }
    });
}, { threshold: 0.5 });

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state with 2026 flair
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending 2026...';
    submitBtn.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'Njabulosim11@gmail.com',
        year: '2026',
        current_role: 'IT Technician at GPLAT Solutions'
    };
    
    // Send via EmailJS
    emailjs.send('service_bc13rq6', 'template_4pd2evg', formData)
        .then(function(response) {
            showNotification('✅ Message sent successfully! I\'ll respond within 24 hours (2026 speed!', 'success');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            showNotification('❌ Error sending message. Please email me directly at Njabulosim11@gmail.com', 'error');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// Notification function with 2026 styling
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Certificate hover effects
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// 2026 Specific Functions

// Update year highlights across the site
function updateYearHighlights() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Check if we're in 2026
    if (currentYear === 2026) {
        document.body.classList.add('year-2026');
    }
}

// Animate stats counters
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const value = stat.textContent;
        if (value.includes('+') || value.includes('GPLAT')) return; // Skip non-numeric stats
        
        const numericValue = parseInt(value);
        if (!isNaN(numericValue)) {
            let start = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                start += increment;
                if (start > numericValue) {
                    stat.textContent = value;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(start);
                }
            }, 20);
        }
    });
}

// Focus cards animation on scroll
const focusObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.focus-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    focusObserver.observe(card);
});

// Add typing effect to hero greeting (optional)
function typeEffect() {
    const greeting = document.querySelector('.greeting-badge');
    if (!greeting) return;
    
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.width = 'fit-content';
    greeting.style.borderRight = '2px solid white';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            greeting.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            greeting.style.borderRight = 'none';
        }
    }, 100);
}

// Track user engagement with 2026 content
function trackEngagement() {
    const timeOnSite = 0;
    const engagementData = {
        page: 'IT Portfolio 2026',
        visits: localStorage.getItem('visits_2026') || 0,
        lastVisit: localStorage.getItem('last_visit_2026') || new Date().toISOString()
    };
    
    // Update visit count
    engagementData.visits = parseInt(engagementData.visits) + 1;
    localStorage.setItem('visits_2026', engagementData.visits);
    localStorage.setItem('last_visit_2026', new Date().toISOString());
    
    // You could send this data to analytics if needed
    console.log('2026 Portfolio Engagement:', engagementData);
}

// Add current time greeting
function updateTimeGreeting() {
    const hours = new Date().getHours();
    const greeting = document.querySelector('.greeting-badge');
    if (!greeting) return;
    
    let timeGreeting;
    if (hours < 12) {
        timeGreeting = '🌅 Good Morning';
    } else if (hours < 18) {
        timeGreeting = '☀️ Good Afternoon';
    } else {
        timeGreeting = '🌙 Good Evening';
    }
    
    // Don't override if you prefer the static badge
    // greeting.textContent = `${timeGreeting} · 2026 IT Pro`;
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize all 2026 features
    updateYearHighlights();
    animateStats();
    trackEngagement();
    updateTimeGreeting();
    
    // Optional: Uncomment for typing effect
    // setTimeout(typeEffect, 500);
    
    // Add active class to current year in navigation
    const yearLink = document.querySelector('a[href="#2026"]');
    if (yearLink) {
        yearLink.classList.add('active');
    }
    
    // Add 2026 version marker
    console.log('🚀 Njabulo Simelane Portfolio 2026 Edition · Loaded successfully');
});

// Add smooth scroll for 2026 anchor links
document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').includes('2026')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1];
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Handle responsive menu for 2026 (if you add mobile menu)
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        // Mobile optimizations
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.style.fontSize = '2rem';
        });
    } else {
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.style.fontSize = '';
        });
    }
});

// Prefetch CV 2026 (optional)
function prefetchCV() {
    const cvLink = document.querySelector('a[href*="CV_2026.pdf"]');
    if (cvLink) {
        cvLink.addEventListener('mouseenter', () => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = cvLink.getAttribute('href');
            document.head.appendChild(link);
        });
    }
}

prefetchCV();

// Add keyboard shortcuts for 2026
document.addEventListener('keydown', (e) => {
    // Press 'C' to scroll to contact
    if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'P' to scroll to projects
    if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'H' for home
    if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
});

// Export functions if needed (for module usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateStats,
        showNotification,
        updateYearHighlights
    };
}

// Weather Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeWeatherWidget();
});

function initializeWeatherWidget() {
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Get free key from https://openweathermap.org/api
    const weatherCard = document.getElementById('weatherCard');
    const weatherLoading = document.getElementById('weatherLoading');
    const weatherError = document.getElementById('weatherError');
    const errorMessage = document.getElementById('errorMessage');
    
    // DOM elements for weather data
    const cityName = document.getElementById('cityName');
    const localTime = document.getElementById('localTime');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDesc = document.getElementById('weatherDesc');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const feelsLike = document.getElementById('feelsLike');
    const pressure = document.getElementById('pressure');
    
    // Search elements
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const currentLocationBtn = document.getElementById('currentLocationBtn');
    
    // Load default city on page load
    fetchWeatherData('Johannesburg');
    
    // Event listeners
    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            showError('Please enter a city name');
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        }
    });
    
    currentLocationBtn.addEventListener('click', getCurrentLocationWeather);
    
    // Fetch weather data from OpenWeatherMap API
    async function fetchWeatherData(location) {
        showLoading(true);
        hideError();
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
            }
            
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            showError(error.message);
        } finally {
            showLoading(false);
        }
    }
    
    // Get weather for current location using Geolocation API [citation:1]
    function getCurrentLocationWeather() {
        if (!navigator.geolocation) {
            showError('Geolocation is not supported by your browser');
            return;
        }
        
        showLoading(true);
        hideError();
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    
                    const data = await response.json();
                    displayWeatherData(data);
                    cityInput.value = data.name; // Update input with city name
                } catch (error) {
                    showError(error.message);
                } finally {
                    showLoading(false);
                }
            },
            (error) => {
                showError('Unable to retrieve your location. Please enter a city manually.');
                showLoading(false);
            }
        );
    }
    
    // Display weather data in UI
    function displayWeatherData(data) {
        // Basic info
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        
        // Local time (calculate from timezone offset)
        const timezoneOffset = data.timezone; // seconds
        const localTimeObj = new Date(Date.now() + (timezoneOffset * 1000) + (new Date().getTimezoneOffset() * 60000));
        localTime.textContent = localTimeObj.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        // Weather icon and description
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
        weatherDesc.textContent = data.weather[0].description;
        
        // Temperature
        temperature.textContent = Math.round(data.main.temp);
        
        // Details
        humidity.innerHTML = `${data.main.humidity}<small>%</small>`;
        windSpeed.innerHTML = `${Math.round(data.wind.speed * 3.6)}<small> km/h</small>`; // Convert m/s to km/h
        feelsLike.innerHTML = `${Math.round(data.main.feels_like)}<small>°C</small>`;
        pressure.innerHTML = `${data.main.pressure}<small> hPa</small>`;
        
        // Show weather card
        weatherCard.style.display = 'block';
        
        // Add weather condition class for animations
        const weatherMain = data.weather[0].main.toLowerCase();
        weatherCard.className = `weather-card ${weatherMain}`;
    }
    
    // Helper functions
    function showLoading(show) {
        weatherLoading.style.display = show ? 'block' : 'none';
        if (show) {
            weatherCard.style.display = 'none';
        }
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        weatherError.style.display = 'block';
        weatherCard.style.display = 'none';
        weatherLoading.style.display = 'none';
    }
    
    function hideError() {
        weatherError.style.display = 'none';
    }
}
// Alternative: Open-Meteo API (no API key required)
async function fetchWeatherData(location) {
    showLoading(true);
    hideError();
    
    try {
        // First, get coordinates for the city name using Geocoding API
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
        );
        
        if (!geoResponse.ok) {
            throw new Error('Failed to find location');
        }
        
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }
        
        const { latitude, longitude, name, country } = geoData.results[0];
        
        // Fetch weather data from Open-Meteo
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,pressure_msl&timezone=auto`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Format and display the data
        displayOpenMeteoData({
            name: name,
            country: country,
            current: weatherData.current_weather,
            hourly: weatherData.hourly,
            timezone: weatherData.timezone
        });
        
        cityInput.value = name; // Update input with city name
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

function displayOpenMeteoData(data) {
    cityName.textContent = `${data.name}, ${data.country}`;
    
    // Current time
    const now = new Date();
    localTime.textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    // Weather data
    const weather = data.current;
    
    // Map weather codes to icons/descriptions
    const weatherCodes = {
        0: { icon: '01d', desc: 'Clear sky' },
        1: { icon: '02d', desc: 'Mainly clear' },
        2: { icon: '03d', desc: 'Partly cloudy' },
        3: { icon: '04d', desc: 'Overcast' },
        45: { icon: '50d', desc: 'Fog' },
        48: { icon: '50d', desc: 'Rime fog' },
        51: { icon: '10d', desc: 'Light drizzle' },
        61: { icon: '10d', desc: 'Rain' },
        71: { icon: '13d', desc: 'Snow fall' },
        95: { icon: '11d', desc: 'Thunderstorm' }
    };
    
    const weatherInfo = weatherCodes[weather.weathercode] || { icon: '03d', desc: 'Unknown' };
    
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
    weatherDesc.textContent = weatherInfo.desc;
    temperature.textContent = Math.round(weather.temperature);
    
    // Get humidity and pressure from hourly data (closest to current time)
    const currentHour = new Date().getHours();
    humidity.innerHTML = `${data.hourly.relativehumidity_2m[currentHour]}<small>%</small>`;
    pressure.innerHTML = `${Math.round(data.hourly.pressure_msl[currentHour])}<small> hPa</small>`;
    
    windSpeed.innerHTML = `${Math.round(weather.windspeed)}<small> km/h</small>`;
    feelsLike.innerHTML = `${Math.round(weather.temperature)}<small>°C</small>`;
    
    weatherCard.style.display = 'block';
}
