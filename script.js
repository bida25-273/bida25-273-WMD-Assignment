document.addEventListener('DOMContentLoaded', function() {
    
    // ========== INDEX PAGE ELEMENTS ==========
    const searchBtn = document.getElementById('searchBtn');
    const allBtn = document.getElementById('allBtn');
    const houseBtn = document.getElementById('houseBtn');
    const indexApartmentBtn = document.getElementById('apartmentBtn');
    
    // ========== BUY PAGE ELEMENTS ==========
    const houseFilterBtn = document.getElementById('houseFilterBtn');
    const buyApartmentBtn = document.getElementById('apartmentBtn');
    const priceInput = document.getElementById('priceInput');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // ========== RENT PAGE ELEMENTS ==========
    const rentApartmentBtn = document.getElementById('rentApartmentBtn');
    const rentHouseBtn = document.getElementById('rentHouseBtn');
    const priceRangeSelect = document.getElementById('priceRangeSelect');
    const bedroomSelect = document.getElementById('bedroomSelect');
    const applyRentFilterBtn = document.getElementById('applyRentFilterBtn');
    const resetRentBtn = document.getElementById('resetRentBtn');
    
    // Get all property cards (works for all pages)
    const propertyCards = document.querySelectorAll('.property-card');
    const detailBtns = document.querySelectorAll('.detailsBtn');
    
    // Get current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // ========== INDEX PAGE FILTERS ==========
    if (allBtn && currentPage === 'index.html') {
        allBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                card.style.display = 'block';
            });
        });
    }
    
    if (houseBtn && currentPage === 'index.html') {
        houseBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                if (card.classList.contains('house')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    if (indexApartmentBtn && currentPage === 'index.html') {
        indexApartmentBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                if (card.classList.contains('apartment')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // ========== BUY PAGE FILTERS ==========
    if (houseFilterBtn && currentPage === 'buy.html') {
        houseFilterBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                if (card.classList.contains('house')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    if (buyApartmentBtn && currentPage === 'buy.html') {
        buyApartmentBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                if (card.classList.contains('apartment')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Buy page price filter functionality
    if (applyFilterBtn && currentPage === 'buy.html') {
        applyFilterBtn.addEventListener('click', function() {
            const priceValue = priceInput.value;
            let minPrice = null;
            let maxPrice = null;
            
            if (priceValue.includes('-')) {
                const parts = priceValue.split('-');
                minPrice = parseInt(parts[0].trim());
                maxPrice = parseInt(parts[1].trim());
            } else if (priceValue.includes('to')) {
                const parts = priceValue.split('to');
                minPrice = parseInt(parts[0].trim());
                maxPrice = parseInt(parts[1].trim());
            } else if (priceValue) {
                minPrice = parseInt(priceValue);
            }
            
            propertyCards.forEach(card => {
                const priceText = card.querySelector('h3').textContent;
                const price = parseInt(priceText.replace(/[$,]/g, ''));
                
                let showByPrice = true;
                if (minPrice && price < minPrice) showByPrice = false;
                if (maxPrice && price > maxPrice) showByPrice = false;
                
                card.style.display = showByPrice ? 'block' : 'none';
            });
        });
    }
    
    // Buy page reset filters
    if (resetBtn && currentPage === 'buy.html') {
        resetBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                card.style.display = 'block';
            });
            if (priceInput) priceInput.value = '';
        });
    }
    
    // ========== RENT PAGE FILTERS ==========
    // Filter by property type (Apartment/House)
    if (rentApartmentBtn && currentPage === 'rent.html') {
        rentApartmentBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                if (card.classList.contains('apartment')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    if (rentHouseBtn && currentPage === 'rent.html') {
        rentHouseBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                if (card.classList.contains('house')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Apply all rent filters (price + bedrooms)
    if (applyRentFilterBtn && currentPage === 'rent.html') {
        applyRentFilterBtn.addEventListener('click', function() {
            const selectedPrice = priceRangeSelect ? priceRangeSelect.value : 'all';
            const selectedBedroom = bedroomSelect ? bedroomSelect.value : 'all';
            
            propertyCards.forEach(card => {
                let showByPrice = true;
                let showByBedroom = true;
                
                // Price filter for rent page
                const priceText = card.querySelector('.price') ? card.querySelector('.price').textContent : card.querySelector('h3').textContent;
                let price = parseInt(priceText.replace(/[$,]/g, '').replace('/month', ''));
                
                if (selectedPrice === 'under1000' && price >= 1000) showByPrice = false;
                else if (selectedPrice === '1000-2000' && (price < 1000 || price > 2000)) showByPrice = false;
                else if (selectedPrice === '2000-3000' && (price < 2000 || price > 3000)) showByPrice = false;
                else if (selectedPrice === '3000plus' && price < 3000) showByPrice = false;
                
                // Bedroom filter for rent page
                const featuresText = card.querySelector('.features') ? card.querySelector('.features').textContent : '';
                let bedrooms = 'all';
                
                if (featuresText.includes('Studio') || featuresText.includes('studio')) {
                    bedrooms = 'studio';
                } else if (featuresText.match(/(\d+)\s*beds/)) {
                    const match = featuresText.match(/(\d+)\s*beds/);
                    bedrooms = match ? match[1] : 'all';
                }
                
                if (selectedBedroom === 'studio' && bedrooms !== 'studio') showByBedroom = false;
                else if (selectedBedroom === '1' && bedrooms !== '1') showByBedroom = false;
                else if (selectedBedroom === '2' && bedrooms !== '2') showByBedroom = false;
                else if (selectedBedroom === '3' && parseInt(bedrooms) < 3 && bedrooms !== 'studio') showByBedroom = false;
                
                card.style.display = (showByPrice && showByBedroom) ? 'block' : 'none';
            });
        });
    }
    
    // Reset rent filters
    if (resetRentBtn && currentPage === 'rent.html') {
        resetRentBtn.addEventListener('click', function() {
            propertyCards.forEach(card => {
                card.style.display = 'block';
            });
            if (priceRangeSelect) priceRangeSelect.value = 'all';
            if (bedroomSelect) bedroomSelect.value = 'all';
        });
    }
    
    // ========== DETAILS BUTTONS (works on all pages) ==========
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.property-card');
            
            // Get price (works for both buy and rent pages)
            let price = '';
            const buyPrice = card.querySelector('h3');
            const rentPrice = card.querySelector('.price');
            price = rentPrice ? rentPrice.textContent : (buyPrice ? buyPrice.textContent : 'Price not available');
            
            // Get description
            let description = '';
            const buyDesc = card.querySelector('p:not(.price):not(.features):not(.location)');
            const rentDesc = card.querySelector('h3');
            const features = card.querySelector('.features');
            const location = card.querySelector('.location');
            
            if (buyDesc && !rentPrice) {
                description = buyDesc.textContent;
            } else if (rentDesc && rentPrice) {
                description = rentDesc.textContent;
                if (features) description += ' · ' + features.textContent;
                if (location) description += ' · ' + location.textContent;
            }
            
            // Determine if it's rent or buy
            const isRent = price.includes('/month');
            const status = isRent ? 'For Rent' : 'For Sale';
            
            // Create modal
            const modalHtml = `
                <div class="property-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:1000;">
                    <div style="background:white; padding:30px; border-radius:10px; max-width:400px; text-align:center;">
                        <h3>Property Details</h3>
                        <p><strong>${description}</strong></p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Status:</strong> ${status}</p>
                        <p><strong>Property ID:</strong> ${Math.floor(Math.random() * 10000)}</p>
                        ${isRent ? '<p><strong>Lease Terms:</strong> 12 months minimum</p>' : '<p><strong>Ownership:</strong> Freehold</p>'}
                        <button onclick="this.closest('.property-modal').remove()" style="background:#007bff; color:white; border:none; padding:10px 20px; border-radius:5px; margin-top:10px; cursor:pointer;">Close</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Close modal when clicking outside
            setTimeout(() => {
                const modal = document.querySelector('.property-modal');
                if (modal) {
                    modal.addEventListener('click', function(e) {
                        if (e.target === this) this.remove();
                    });
                }
            }, 10);
        });
    });
    
    // Search button on index page
    if (searchBtn && currentPage === 'index.html') {
        searchBtn.addEventListener('click', function() {
            const filtersSection = document.querySelector('.filters');
            if (filtersSection) {
                filtersSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Add hover effects for all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.style.transition = 'all 0.3s ease';
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Load more functionality for rent page
    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn && currentPage === 'rent.html') {
        let currentCount = 6;
        const allRentCards = Array.from(propertyCards);
        const totalCards = allRentCards.length;
        
        // Hide cards beyond first 6 initially
        if (totalCards > 6) {
            for (let i = 6; i < totalCards; i++) {
                allRentCards[i].style.display = 'none';
            }
        }
        
        loadMoreBtn.addEventListener('click', function() {
            let nextCards = 0;
            for (let i = currentCount; i < currentCount + 3 && i < totalCards; i++) {
                allRentCards[i].style.display = 'block';
                nextCards++;
            }
            currentCount += nextCards;
            
            if (currentCount >= totalCards) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});