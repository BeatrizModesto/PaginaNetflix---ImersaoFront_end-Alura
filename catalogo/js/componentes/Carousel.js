import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from './utils.js';

export function createCarousel(category) {
    const sliderSection = document.createElement('div');
    sliderSection.className = 'slider-section';
    
    const sliderHeader = document.createElement('div');
    sliderHeader.className = 'slider-header';
    const sliderTitle = document.createElement('div');
    sliderTitle.className = 'slider-title';
    sliderTitle.textContent = category.title;
    sliderHeader.appendChild(sliderTitle);
    
    const movieRow = document.createElement('div');
    movieRow.className = 'movie-row';
    
    category.items.forEach((item, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        if (item.progress && item.progress > 0) {
            movieCard.classList.add('has-progress');
        }
        
        let top10Html = '';
        if (item.top10) {
            top10Html = `<div class="badge-top10"><span class="top">Top</span><span class="number">10</span></div>`;
        }
        
        let badgeHtml = '';
        if (item.badge) {
            const badgeColor = item.badgeColor === 'red' ? 'red' : item.badgeColor === 'green' ? 'white' : 'red';
            badgeHtml = `<div class="badge-bottom ${badgeColor}">${item.badge}</div>`;
        }
        
        let progressHtml = '';
        if (item.progress !== undefined && item.progress > 0) {
            progressHtml = `<div class="progress-bar-container"><div class="progress-value" style="width: ${item.progress}%"></div></div>`;
        }
        
        movieCard.innerHTML = `
            <img src="${item.img}" alt="Filme/Série" class="movie-image">
            ${top10Html}
            ${badgeHtml}
            <div class="card-details">
                <div class="details-buttons">
                    <div class="left-buttons">
                        <button class="btn-icon btn-play-icon" onclick="window.open('${item.youtube}', '_blank')">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="btn-icon">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn-icon">
                            <i class="fas fa-thumbs-up"></i>
                        </button>
                    </div>
                    <div class="right-buttons">
                        <button class="btn-icon">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
                <div class="details-info">
                    <span class="match-score">${getRandomMatchScore()}% compatível</span>
                    <span class="age-badge">${getRandomAgeBadge().text}</span>
                    <span class="duration">${getRandomDuration(item.progress > 0)}</span>
                </div>
            </div>
            ${progressHtml}
        `;
        
        movieRow.appendChild(movieCard);
    });
    
    sliderSection.appendChild(sliderHeader);
    sliderSection.appendChild(movieRow);
    
    return sliderSection;
}

