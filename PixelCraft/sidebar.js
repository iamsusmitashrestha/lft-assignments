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

    if (link.dataset.target === "filters") {
      document.querySelectorAll(".filter-preview").forEach((preview) => {
        preview.src = document.querySelector("#image").src;
      });
    }

    if (link.dataset.target === "remove-bg") {
      document.querySelectorAll(".replace-bg-button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const image = btn.querySelector("img");
          const imageWrapper = document.querySelector(".img");

          imageWrapper.style.backgroundImage = `url(${image.src})`;
          imageWrapper.style.backgroundSize = `cover`;
          imageWrapper.style.backgroundRepeat = `no-repeat`;
          imageWrapper.style.backgroundPosition = `center center`;
        });
      });
    }
  });
});
