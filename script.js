const form = document.getElementById("fanForm");
const successMessage = document.getElementById("successMessage");
const submitButton = form.querySelector(".submit-button");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value.trim();
  const gender = document.getElementById("gender").value;
  const content = document.getElementById("content").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const consent = document.getElementById("consent").checked;

  // Check required fields
  if (!name || !age || !email || !content || !consent) {
    alert("Please complete all required fields.");
    return;
  }

  // Prevent another submission while sending
  submitButton.disabled = true;

  submitButton.innerHTML = `
    <span>SENDING...</span>
    <strong>•</strong>
  `;

  // Collect the form information
  const fanData = {
    name,
    age,
    email,
    gender,
    content,
    reason
  };

  try {
    // Send the information to our Netlify Function
    const response = await fetch("/.netlify/functions/submit-fan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fanData)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Submission failed.");
    }

    // Show the success screen
    form.style.display = "none";

    successMessage.classList.add("show");

    successMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  } catch (error) {

    console.error(error);

    alert(
      "We couldn't submit your verification right now. Please try again."
    );

    submitButton.disabled = false;

    submitButton.innerHTML = `
      <span>SUBMIT MY VERIFICATION</span>
      <strong>→</strong>
    `;
  }
});


// Smooth scrolling for page links
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