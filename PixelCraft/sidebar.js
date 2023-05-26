const links = document.querySelectorAll(".link");
const options = document.querySelectorAll(".option");

const hideAllOptions = () => {
  options.forEach((option) => {
    option.style.display = "none";
  });
};

const deactivateAllLinks = () => {
  links.forEach((link) => {
    link.classList.remove("active");
  });
};

links.forEach((link) => {
  link.addEventListener("click", () => {
    hideAllOptions();
    deactivateAllLinks();
    link.classList.add("active");
    const option = document.getElementById(link.dataset.target);
    option.style.display = "block";
  });
});
