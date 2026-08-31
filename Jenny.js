const form = document.getElementById("fanForm");
const successMessage = document.getElementById("successMessage");
const submitButton = form.querySelector(".submit-button");

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value.trim();
  const content = document.getElementById("content").value.trim();
  const consent = document.getElementById("consent").checked;


  // Basic validation
  if (!name || !age || !email || !content || !consent) {
    alert("Please complete all required fields.");
    return;
  }


  // Prevent multiple submissions
  submitButton.disabled = true;

  const originalText = submitButton.innerHTML;

  submitButton.innerHTML = `
    <span>VERIFYING...</span>
    <strong>•</strong>
  `;


  /*
    Demo delay.

    IMPORTANT:
    This only displays a success message.
    It does NOT send the information anywhere.

    To actually collect submissions, connect this form
    to your own secure backend/form service.
  */

  setTimeout(() => {

    form.style.display = "none";

    successMessage.classList.add("show");

    successMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 1200);

});


// Smooth scroll for the verification button
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (event) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }

  });

});