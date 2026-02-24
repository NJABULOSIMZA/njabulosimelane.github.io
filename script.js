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
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
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
    
    emailjs.send('service_bc13rq6', 'template_4pd2evg', formData)
        .then(function(response) {
            showNotification('✅ Message sent successfully! I\'ll respond within 24 hours!', 'success');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            showNotification('❌ Error sending message. Please email me directly at Njabulosim11@gmail.com', 'error');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// Notification function
function showNotification(message, type) {
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

// 2026 Functions
function updateYearHighlights() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    if (currentYear === 2026) {
        document.body.classList.add('year-2026');
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const value = stat.textContent;
        if (value.includes('+') || value.includes('GPLAT')) return;
        
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

// Focus cards animation
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

function trackEngagement() {
    const engagementData = {
        page: 'IT Portfolio 2026',
        visits: localStorage.getItem('visits_2026') || 0,
        lastVisit: localStorage.getItem('last_visit_2026') || new Date().toISOString()
    };
    
    engagementData.visits = parseInt(engagementData.visits) + 1;
    localStorage.setItem('visits_2026', engagementData.visits);
    localStorage.setItem('last_visit_2026', new Date().toISOString());
    
    console.log('2026 Portfolio Engagement:', engagementData);
}

// Prefetch CV
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

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// WEATHER WIDGET - Using Open-Meteo (No API Key Required)
// ============================================
function initializeWeatherWidget() {
    const weatherCard = document.getElementById('weatherCard');
    const weatherLoading = document.getElementById('weatherLoading');
    const weatherError = document.getElementById('weatherError');
    const errorMessage = document.getElementById('errorMessage');
    
    const cityName = document.getElementById('cityName');
    const localTime = document.getElementById('localTime');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDesc = document.getElementById('weatherDesc');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const feelsLike = document.getElementById('feelsLike');
    const pressure = document.getElementById('pressure');
    
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const currentLocationBtn = document.getElementById('currentLocationBtn');
    
    // Weather code mapping
    const weatherCodes = {
        0: { icon: '01d', desc: 'Clear sky', emoji: '☀️' },
        1: { icon: '02d', desc: 'Mainly clear', emoji: '🌤️' },
        2: { icon: '03d', desc: 'Partly cloudy', emoji: '⛅' },
        3: { icon: '04d', desc: 'Overcast', emoji: '☁️' },
        45: { icon: '50d', desc: 'Fog', emoji: '🌫️' },
        48: { icon: '50d', desc: 'Rime fog', emoji: '🌫️' },
        51: { icon: '10d', desc: 'Light drizzle', emoji: '🌦️' },
        53: { icon: '10d', desc: 'Moderate drizzle', emoji: '🌦️' },
        55: { icon: '10d', desc: 'Dense drizzle', emoji: '🌧️' },
        61: { icon: '10d', desc: 'Slight rain', emoji: '🌧️' },
        63: { icon: '10d', desc: 'Moderate rain', emoji: '🌧️' },
        65: { icon: '10d', desc: 'Heavy rain', emoji: '🌧️' },
        71: { icon: '13d', desc: 'Slight snow fall', emoji: '🌨️' },
        73: { icon: '13d', desc: 'Moderate snow fall', emoji: '🌨️' },
        75: { icon: '13d', desc: 'Heavy snow fall', emoji: '❄️' },
        95: { icon: '11d', desc: 'Thunderstorm', emoji: '⛈️' },
        96: { icon: '11d', desc: 'Thunderstorm with hail', emoji: '⛈️' },
        99: { icon: '11d', desc: 'Thunderstorm with heavy hail', emoji: '⛈️' }
    };
    
    // Load default city
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
    
    async function fetchWeatherData(location) {
        showLoading(true);
        hideError();
        
        try {
            // Get coordinates
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
            );
            
            if (!geoResponse.ok) throw new Error('Failed to find location');
            
            const geoData = await geoResponse.json();
            
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`City "${location}" not found`);
            }
            
            const { latitude, longitude, name, country, timezone } = geoData.results[0];
            
            // Get weather
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,pressure_msl,apparent_temperature&timezone=${encodeURIComponent(timezone)}&forecast_days=1`
            );
            
            if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
            
            const weatherData = await weatherResponse.json();
            
            displayWeatherData({
                cityName: name,
                country: country,
                currentWeather: weatherData.current_weather,
                hourly: weatherData.hourly,
                timezone: timezone
            });
            
            cityInput.value = name;
            
        } catch (error) {
            showError(error.message);
        } finally {
            showLoading(false);
        }
    }
    
    async function getCurrentLocationWeather() {
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
                    
                    const geoResponse = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`
                    );
                    
                    if (!geoResponse.ok) throw new Error('Failed to get location name');
                    
                    const geoData = await geoResponse.json();
                    
                    let locationName = 'Unknown';
                    let country = '';
                    let timezone = 'auto';
                    
                    if (geoData.results && geoData.results.length > 0) {
                        locationName = geoData.results[0].name;
                        country = geoData.results[0].country || '';
                        timezone = geoData.results[0].timezone || 'auto';
                    }
                    
                    const weatherResponse = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,pressure_msl,apparent_temperature&timezone=${timezone}&forecast_days=1`
                    );
                    
                    if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
                    
                    const weatherData = await weatherResponse.json();
                    
                    displayWeatherData({
                        cityName: locationName,
                        country: country,
                        currentWeather: weatherData.current_weather,
                        hourly: weatherData.hourly,
                        timezone: timezone
                    });
                    
                    cityInput.value = locationName;
                    
                } catch (error) {
                    showError(error.message);
                } finally {
                    showLoading(false);
                }
            },
            (error) => {
                let errorMsg = 'Unable to retrieve your location';
                if (error.code === 1) errorMsg = 'Location access denied. Please enter a city manually.';
                else if (error.code === 2) errorMsg = 'Location unavailable. Please enter a city manually.';
                else if (error.code === 3) errorMsg = 'Location request timed out. Please enter a city manually.';
                showError(errorMsg);
                showLoading(false);
            }
        );
    }
    
    function displayWeatherData(data) {
        cityName.textContent = data.country ? `${data.cityName}, ${data.country}` : data.cityName;
        
        // Update local time
        if (window.weatherTimer) clearInterval(window.weatherTimer);
        
        const updateTime = () => {
            try {
                const options = { timeZone: data.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                localTime.textContent = new Intl.DateTimeFormat([], options).format(new Date());
            } catch (e) {
                localTime.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            }
        };
        updateTime();
        window.weatherTimer = setInterval(updateTime, 1000);
        
        // Weather data
        const current = data.currentWeather;
        const currentHour = new Date().getHours();
        const weatherInfo = weatherCodes[current.weathercode] || { icon: '03d', desc: 'Unknown', emoji: '🌈' };
        
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
        weatherDesc.innerHTML = `${weatherInfo.emoji} ${weatherInfo.desc}`;
        temperature.textContent = Math.round(current.temperature);
        windSpeed.innerHTML = `${Math.round(current.windspeed)}<small> km/h</small>`;
        
        humidity.innerHTML = data.hourly.relativehumidity_2m[currentHour] ? 
            `${data.hourly.relativehumidity_2m[currentHour]}<small>%</small>` : 'N/A';
        pressure.innerHTML = data.hourly.pressure_msl[currentHour] ? 
            `${Math.round(data.hourly.pressure_msl[currentHour])}<small> hPa</small>` : 'N/A';
        feelsLike.innerHTML = data.hourly.apparent_temperature[currentHour] ? 
            `${Math.round(data.hourly.apparent_temperature[currentHour])}<small>°C</small>` : 
            `${Math.round(current.temperature)}<small>°C</small>`;
        
        weatherCard.style.display = 'block';
        
        // Add weather class
        weatherCard.classList.remove('clear-sky', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy');
        if ([0, 1].includes(current.weathercode)) weatherCard.classList.add('clear-sky');
        else if ([2, 3].includes(current.weathercode)) weatherCard.classList.add('cloudy');
        else if ([51, 53, 55, 61, 63, 65].includes(current.weathercode)) weatherCard.classList.add('rainy');
        else if ([71, 73, 75].includes(current.weathercode)) weatherCard.classList.add('snowy');
        else if ([95, 96, 99].includes(current.weathercode)) weatherCard.classList.add('stormy');
        else if ([45, 48].includes(current.weathercode)) weatherCard.classList.add('foggy');
    }
    
    function showLoading(show) {
        weatherLoading.style.display = show ? 'block' : 'none';
        if (show) weatherCard.style.display = 'none';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        weatherError.style.display = 'block';
        weatherCard.style.display = 'none';
        weatherLoading.style.display = 'none';
        
        setTimeout(() => {
            if (weatherError.style.display === 'block') {
                weatherError.style.display = 'none';
            }
        }, 5000);
    }
    
    function hideError() {
        weatherError.style.display = 'none';
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    updateYearHighlights();
    animateStats();
    trackEngagement();
    prefetchCV();
    initializeWeatherWidget();
    
    console.log('🚀 Njabulo Simelane Portfolio 2026 Edition · Loaded successfully');
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.style.fontSize = '2rem';
        });
    } else {
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.style.fontSize = '';
        });
    }
});
