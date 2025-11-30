/**Javascript for feedback page
 * Separated from main layout.js
 */
document.addEventListener('DOMContentLoaded', () => {
  initStarRating();

  renderComments();
});

/**Handles the star rating functionality. Makes correct stars
 * are filled when hovering and remained filled when clicked.
 */
function initStarRating() {
  const starButtons = document.querySelectorAll('.rating_star');
  const ratingInput = document.getElementById('rating_input');

  //Something went wrong and elements could not be found.
  if (!starButtons.length || !ratingInput) return;

  starButtons.forEach(star => {
    star.addEventListener('click', () => {
      updateStars(star, starButtons, ratingInput);
    });
    star.addEventListener('keydown', (event) => {
      if(event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        updateStars(star, starButtons, ratingInput);
      }
    })
    star.addEventListener('mouseover', () => hoverStars(star, starButtons));
    star.addEventListener('mouseout', () => resetStars(starButtons, ratingInput));
  });
}

//Function to make sure correct number of stars are filled when clicked.
function updateStars(target, allStars, ratingInput) {
  //Star that should be last to be filled
  const maxStarFilled = Number(target.dataset.id);
  ratingInput.value = maxStarFilled;

  allStars.forEach(star => {
    const starPoly = star.querySelector('polygon');
    if (!starPoly) return;
    const starID = Number(star.dataset.id);

    if (starID <= maxStarFilled) {
      starPoly.setAttribute('fill', 'var(--saffron)');
      star.classList.add('selected');
      star.setAttribute('aria-pressed', 'true');
    } else {
      starPoly.setAttribute('fill', 'none');
      star.classList.remove('selected');
      star.setAttribute('aria-pressed', 'false');
    }
  });
}

//Star functionality while user hovers over them
function hoverStars(target, allStars) {
  const hoverID = Number(target.dataset.id);
  allStars.forEach(star => {
    const poly = star.querySelector('polygon');
    if (!poly) return;
    const starID = Number(star.dataset.id);

    if (starID <= hoverID) {
      poly.style.fill = 'var(--saffron)';
    } else {
      poly.style.fill = 'none';
    }
  });
}

/**Makes sure that any stars not clicked when mouse leaves rating
 * area reset to being not filled.
 */
function resetStars(allStars, ratingInput) {
  const rating = Number(ratingInput.value) || 0;
  allStars.forEach(star => {
    const poly = star.querySelector('polygon');
    if (!poly) return;
    const starID = Number(star.dataset.id);

    if (starID <= rating) {
      poly.style.fill = 'var(--saffron)';
    } else {
      poly.style.fill = 'none';
    }
  });
}

/**Function to render the comments found in the comment
 * sql table. 
 */
function renderComments() {
  const commentList = document.querySelectorAll('.reviews');
  //Something went wrong and couldn't find comment section
  if (!commentList.length) return;

  //Puts the comment content together for rendering.
  commentList.forEach(span => {
    const firstName = span.dataset.first || '';
    const lastName = span.dataset.last || '';
    const reviewText = span.dataset.comment.trim() || '';
    const rating = Number(span.dataset.rating) || 0;
    const maxRating = 5;

    //Star graphics
    const starSVGFull = `<svg viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 
    8.169L12 18.897l-7.334 3.864 1.4-8.169L.132 9.21l8.2-1.192z" fill="var(--saffron)" stroke="var(--dark-green)" 
    stroke-width="1"/></svg>`;
    const starSVGEmpty = `<svg viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 
    8.169L12 18.897l-7.334 3.864 1.4-8.169L.132 9.21l8.2-1.192z" fill="none" stroke="var(--dark-green)" 
    stroke-width="1"/></svg>`;

    //HTML for each comment
    let reviewHTML = `<strong>${firstName} ${lastName}</strong> gave us a rating of<br> `;
    //Renders stars based upon rating value.
    for (let i = 1; i <= maxRating; i++) {
      reviewHTML += i <= rating ? starSVGFull : starSVGEmpty;
    }
    reviewHTML += `<br>and said: <strong>${reviewText}</strong>`;
    span.innerHTML = reviewHTML;
  });
}
