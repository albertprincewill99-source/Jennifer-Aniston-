const form = document.getElementById("fanForm");
const submitButton = document.getElementById("submitButton");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");


form.addEventListener("submit", async function (event) {

  event.preventDefault();

  errorMessage.classList.remove("show");

  /*
   * Basic validation
   */

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }


  /*
   * Disable button while submitting.
   * This prevents accidental double submissions.
   */

  submitButton.disabled = true;

  submitButton.innerHTML = `
    <span>SUBMITTING...</span>
    <strong>•</strong>
  `;


  try {

    /*
     * FormData collects every named field,
     * including the Netlify honeypot field.
     */

    const formData = new FormData(form);


    /*
     * Netlify Forms accepts an
     * application/x-www-form-urlencoded POST.
     */

    const response = await fetch("/", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      },

      body: new URLSearchParams(formData).toString()

    });


    /*
     * If Netlify rejected the request,
     * do NOT show a false success message.
     */

    if (!response.ok) {
      throw new Error("Submission failed.");
    }


    /*
     * The submission has reached Netlify.
     */

    form.style.display = "none";

    successMessage.classList.add("show");

    successMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });


  } catch (error) {

    console.error("Form submission error:", error);

    submitButton.disabled = false;

    submitButton.innerHTML = `
      <span>SUBMIT MY VERIFICATION</span>
      <strong>→</strong>
    `;

    errorMessage.classList.add("show");

  }

});