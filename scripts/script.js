const courses = [
  {
    title: "The Ultimate Google Ads Training Course",
    category: "Marketing",
    price: 100,
    author: "Jerome Bell",
    image: "image-8.png",
  },
  {
    title: "Product Management Fundamentals",
    category: "Management",
    price: 480,
    author: "Marvin McKinney",
    image: "image-7.png",
  },
  {
    title: "HR Management and Analytics",
    category: "HR & Recruiting",
    price: 200,
    author: "Leslie Alexander Li",
    image: "image-6.png",
  },
  {
    title: "Brand Management & PR Communications",
    category: "Marketing",
    price: 530,
    author: "Kristin Watson",
    image: "image-5.png",
  },
  {
    title: "Graphic Design Basic",
    category: "Design",
    price: 500,
    author: "Guy Hawkins",
    image: "image-4.png",
  },
  {
    title: "Business Development Management",
    category: "Management",
    price: 400,
    author: "Dianne Russell",
    image: "image-3.png",
  },
  {
    title: "Highload Software Architecture",
    category: "Development",
    price: 600,
    author: "Brooklyn Simmons",
    image: "image-2.png",
  },
  {
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruiting",
    price: 150,
    author: "Kathryn Murphy",
    image: "image-1.png",
  },
  {
    title: "User Experience. Human-centered Design",
    category: "Design",
    price: 240,
    author: "Cody Fisher",
    image: "image.png",
  },
];

const categories = ["All", "Marketing", "Management", "HR & Recruiting", "Design", "Development"];
const categoryCounts = {
  All: 57,
  Marketing: 4,
  Management: 3,
  "HR & Recruiting": 5,
  Design: 2,
  Development: 3,
};
const categoryClasses = {
  Marketing: "course-card__category--marketing",
  Management: "course-card__category--management",
  "HR & Recruiting": "course-card__category--hr",
  Design: "course-card__category--design",
  Development: "course-card__category--development",
};

const filtersElement = document.querySelector(".courses__filters");
const gridElement = document.querySelector(".catalog__grid");
const emptyElement = document.querySelector(".catalog__empty");
const searchInput = document.querySelector(".search__input");
const loadMoreButton = document.querySelector(".courses__load-more");

let activeCategory = "All";
let searchQuery = "";

const createFilter = (category) => {
  const button = document.createElement("button");
  const isActive = category === activeCategory;

  button.className = `courses__filter${isActive ? " courses__filter--active" : ""}`;
  button.type = "button";
  button.dataset.category = category;
  button.setAttribute("aria-pressed", String(isActive));
  button.innerHTML = `
    <span>${category}</span>
    <sup class="courses__filter-count">${categoryCounts[category]}</sup>
  `;

  return button;
};

const renderFilters = () => {
  filtersElement.replaceChildren(...categories.map(createFilter));
};

const createCourseCard = (course) => {
  const article = document.createElement("article");

  article.className = "course-card";
  article.innerHTML = `
    <img
      class="course-card__image"
      src="./images/${course.image}"
      alt=""
      width="390"
      height="240"
    >
    <div class="course-card__content">
      <span class="course-card__category ${categoryClasses[course.category]}">
        ${course.category}
      </span>
      <h2 class="course-card__title">${course.title}</h2>
      <p class="course-card__meta">
        <strong class="course-card__price">$${course.price}</strong>
        <span class="course-card__divider" aria-hidden="true"></span>
        <span>by ${course.author}</span>
      </p>
    </div>
  `;

  return article;
};

const getVisibleCourses = () => {
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  return courses.filter((course) => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLocaleLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
};

const renderCourses = () => {
  const visibleCourses = getVisibleCourses();

  gridElement.replaceChildren(...visibleCourses.map(createCourseCard));
  emptyElement.hidden = visibleCourses.length > 0;
  loadMoreButton.hidden = visibleCourses.length === 0;
};

filtersElement.addEventListener("click", (event) => {
  const filterButton = event.target.closest(".courses__filter");

  if (!filterButton) {
    return;
  }

  activeCategory = filterButton.dataset.category;
  renderFilters();
  renderCourses();
});

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderCourses();
});

loadMoreButton.addEventListener("click", () => {
  loadMoreButton.classList.add("courses__load-more--loading");

  window.setTimeout(() => {
    loadMoreButton.classList.remove("courses__load-more--loading");
  }, 600);
});

renderFilters();
renderCourses();
