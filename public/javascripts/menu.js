document.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();

  initDonutSearch();
});

//Creates handlers for click and keydown to collapse menus
function initMenuToggle() {
  const menuSections = document.querySelectorAll('.menu_toggle');

  menuSections.forEach(btn => {
    btn.addEventListener('click', () => menuToggle(btn));
    btn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); 
      menuToggle(btn);
      }
    })
  });
}

//Function that toggles menu, separated for removing duplicate code for keydown events
function menuToggle(btn) {
  const targetId = btn.getAttribute('aria-controls');
  const target = document.getElementById(targetId);
  if (!target) return;

  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  target.classList.toggle('hidden', isExpanded);
  btn.setAttribute('aria-expanded', String(!isExpanded));
  if (isExpanded) {
    btn.style.borderRadius = '20px';
  } else {
    btn.style.borderRadius = '20px 20px 0 0';
  }
}

/**Allows searching for specific menu item. Visible items
 * on the menu udpate in real time as the user types
 * their query into the search bar. No need to hit the enter
 * button.
 */
function initDonutSearch() {
  const searchInput = document.getElementById("menu_search");
  const clearBtn = document.getElementById("clear_search");
  const noResults = document.getElementById("no_results");

  const menuItems = document.querySelectorAll(".menu_item");
  const menuSections = document.querySelectorAll(".menu_row");
  const menuToggles = document.querySelectorAll(".menu_toggle");

  if (!searchInput || !menuItems.length) return;

 //Store original donut name and price to make sure it is retained during searching
  menuItems.forEach(item => {
    const nameEl = item.querySelector("strong");
    if (nameEl && !nameEl.dataset.original) {
      nameEl.dataset.original = nameEl.innerHTML;
    }
  });

  //Function that checks to see if query matches anything
  //within menu item's name or description.
  function runSearch() {
    const query = searchInput.value.toLowerCase().trim();

    clearBtn.classList.toggle("visible", query.length > 0);

    let anyMatch = false;

    menuItems.forEach(item => {
      const name = item.dataset.name.toLowerCase();
      const desc = item.dataset.description.toLowerCase();

      const match = name.includes(query) || desc.includes(query);
      item.classList.toggle("hidden", !match);
      if (match) anyMatch = true;

      //Highlights part of name that matches user query
      const nameEl = item.querySelector("strong");
      if (nameEl) {
        const originalHTML = nameEl.dataset.original;
        if (query && name.includes(query)) {
          const regex = new RegExp(`(${query})`, "gi");
          nameEl.innerHTML = originalHTML.replace(regex, '<mark>$1</mark>');
        } else {
          nameEl.innerHTML = originalHTML;
        }
      }
    });

    //If no the user query matches no menu items
    noResults.classList.toggle("visible", !anyMatch);
    noResults.classList.toggle("hidden", anyMatch);

    //Collapses menu sections that have no items that match user query
    menuSections.forEach(section => {
      const children = section.querySelectorAll(".menu_item");
      //"...children" is a spread operator. It takes the collection from
      //the query selector search and makes it into a real array for the
      //"every" statement
      const allHidden = [...children].every(i => i.classList.contains("hidden"));
      section.classList.toggle("hidden", allHidden);

      menuToggles.forEach(btn => {
        const id = btn.getAttribute("aria-controls");
        if (id === section.getAttribute("id")) {
          const isExpanded = btn.getAttribute("aria-expanded") === "true";
          btn.style.borderRadius = allHidden
            ? "20px"
            : isExpanded
              ? "20px 20px 0 0"
              : "20px";
        }
      });
    });

    //Makes sure that a menu section is expanded if a menu item
    //has the user query in it's name or description
    if (query.length > 0) {
      menuToggles.forEach(btn => {
        const id = btn.getAttribute("aria-controls");
        const target = document.getElementById(id);
        if (!target) return;

        const hasVisibleItems = [...target.querySelectorAll(".menu_item")]
          .some(i => !i.classList.contains("hidden"));

        if (hasVisibleItems) {
          btn.setAttribute("aria-expanded", "true");
          target.classList.remove("hidden");
          btn.style.borderRadius = "20px 20px 0 0";
        } else {
          btn.setAttribute("aria-expanded", "false");
          target.classList.add("hidden");
          btn.style.borderRadius = "20px";
        }
      });
    }
  }

  //Handler to update menu through user input in real time
  searchInput.addEventListener("input", runSearch);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    runSearch();
  });
}
