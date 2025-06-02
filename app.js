class CountUp {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.startTime = null;
    this.hasAnimated = false;
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  animate(currentTime) {
    if (!this.startTime) this.startTime = currentTime;
    
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    const easedProgress = this.easeOutQuart(progress);
    const currentValue = Math.floor(this.target * easedProgress);
    
    const displayValue = this.target >= 100 ? currentValue + '+' : currentValue + '%';
    this.element.textContent = displayValue;
    
    if (progress < 1) {
      requestAnimationFrame((time) => this.animate(time));
    } else {
      const finalValue = this.target >= 100 ? this.target + '+' : this.target + '%';
      this.element.textContent = finalValue;
    }
  }

  start() {
    if (!this.hasAnimated) {
      this.hasAnimated = true;
      requestAnimationFrame((time) => this.animate(time));
    }
  }
}

function createCountUpObserver() {
  const countUpSection = document.querySelector('.count-up');
  const countElements = countUpSection.querySelectorAll('h1');
  
  const targets = [100, 250, 1200, 99]; 
  
  const counters = Array.from(countElements).map((element, index) => {
    return new CountUp(element, targets[index], 2000 + (index * 200)); 
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach((counter, index) => {
          setTimeout(() => {
            counter.start();
          }, index * 150); 
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5, 
    rootMargin: '0px 0px -100px 0px' 
  });

  observer.observe(countUpSection);
}

function addFadeInEffect() {
  const countUpSection = document.querySelector('.count-up');
  const statItems = countUpSection.querySelectorAll('.count-up > div > div');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.3
  });

  statItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(item);
  });
}


function initMenuFilter() {
  const menuItems = document.querySelectorAll(".menu nav li");
  const menuCards = document.querySelectorAll(".menu > div > div");
  
  
  const foodItems = ["Soto", "Lalapan Nila", "Rawon", "Sate Ayam", "Iga Sapi"];
  const drinkItems = ["Es Teh", "Jus Jeruk", "Jus Nanas", "Jus Alpukat", "Jus Mangga"];
  
  
  menuItems[0].classList.add("active");
  
  
  filterMenuItems("makanan");
  
  menuItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      
      menuItems.forEach(i => i.classList.remove("active"));
      
      
      item.classList.add("active");
      
      
      if (index === 0) { 
        filterMenuItems("makanan");
      } else { 
        filterMenuItems("minuman");
      }
    });
  });
  
  function filterMenuItems(category) {
    menuCards.forEach(card => {
      const itemName = card.querySelector("h1").textContent;
      
      if (category === "makanan") {
        if (foodItems.includes(itemName)) {
          card.style.display = "flex";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 50);
        } else {
          card.style.display = "none";
        }
      } else if (category === "minuman") {
        if (drinkItems.includes(itemName)) {
          card.style.display = "flex";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 50);
        } else {
          card.style.display = "none";
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  createCountUpObserver();
  addFadeInEffect();
  initMenuFilter(); 
});

document.querySelectorAll('nav a[href^="#"], a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  });
});

document.querySelectorAll('.booking').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 4px 12px rgba(255, 179, 0, 0.3)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });
});

const testimonials = [
  {
      name: "Maudy Ayunda",
      title: "Penyanyi & Aktivis Pendidikan",
      quote: "Sungguh pengalaman kuliner yang memanjakan lidah dan hati. Rasanya autentik dan disajikan dengan penuh cinta. Cocok dinikmati saat santai ataupun formal. Highly recommended!",
      image: "./assets/maudy.jpg"
  },
  {
      name: "Reza Rahadian",
      title: "Aktor",
      quote: "Saya sering mencicipi berbagai makanan saat syuting, tapi yang satu ini punya rasa yang istimewa. Bumbunya meresap, dan plating-nya bikin selera makan meningkat!",
      image: "./assets/reza.jpg"
  },
  {
      name: "Najwa Shihab",
      title: "Jurnalis & Presenter",
      quote: "Detail rasa dan penyajian makanan ini membuat saya merasa dihargai sebagai konsumen. Setiap gigitan terasa seperti cerita yang sedang diceritakan melalui rasa.",
      image: "./assets/najwa-shihab.png"
  },
  {
      name: "Jerome Polin",
      title: "Content Creator & Edukator",
      quote: "Bukan hanya enak, tapi juga punya cita rasa lokal yang otentik. Pas banget buat saya yang suka eksplorasi makanan nusantara. Wajib dicoba!",
      image: "./assets/jerome.jpg"
  },
  {
      name: "Cinta Laura Kiehl",
      title: "Aktris & Model Internasional",
      quote: "Makanan ini bukan cuma lezat, tapi juga tampil menarik untuk difoto. Cocok banget buat lifestyle saya yang aktif di media sosial. Love it!",
      image: "./assets/cinta-laura.jpg"
  }
];

let currentSlide = 0;
let autoSlideInterval;

function createSlides() {
  const sliderWrapper = document.getElementById('sliderWrapper');
  const dotsContainer = document.getElementById('dotsContainer');
  
  testimonials.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `
          <div class="slide-content">
              <p>"${testimonial.quote}"</p>
              <div class="author-info">
                  <p class="author-name">${testimonial.name}</p>
                  <p class="author-title">${testimonial.title}</p>
              </div>
              <div class="stars">
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
                  <div class="star"></div>
              </div>
          </div>
          <img src="${testimonial.image}" alt="${testimonial.name}">
      `;
      sliderWrapper.appendChild(slide);
      
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  const sliderWrapper = document.getElementById('sliderWrapper');
  const dots = document.querySelectorAll('.dot');
  
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
  resetAutoSlide();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonials.length;
  updateSlider();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
  createSlides();
  updateSlider();
  startAutoSlide();
});

document.querySelector('.slider-container').addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
  startAutoSlide();
});