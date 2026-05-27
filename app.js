function initBmiCalculator() {
  const root = document.querySelector(".form");
  if (!root) return;

  // System switching elements
  const selectSystems = root.querySelectorAll('input[name="radio"]');
  const optionsSystems = root.querySelectorAll(".header__input");

// Output elements
  const result = root.querySelector("#result");
  const recommendationWeight = root.querySelector("#recommendation-weight");
  const resultEmpty = root.querySelector(".bmi-result.empty");
  const resultFull = root.querySelector(".bmi-result.full");

// Switching measurement systems
  selectSystems.forEach((select) => {
    select.addEventListener("change", () => {
      const show = select.dataset.show;

      optionsSystems.forEach((options) => {
        options.hidden = true;
        if (options.getAttribute("id") === show) {
          options.hidden = false;
        }
      });

      // When changing the system, we clear the values ​​or simply recalculate
      updateBmiDisplay();
    });
  });

 // Main function: checks that the fields are filled and starts the calculation
  function updateBmiDisplay() {
   // Find a container that is currently NOT hidden (active)
    const activeContainer = root.querySelector(".header__input:not([hidden])");
    if (!activeContainer) return;

    // Take inputs only from the active container
    const activeInputs = activeContainer.querySelectorAll("input");
   // Check that EVERY active field is filled (text length > 0)
    const allFilled = Array.from(activeInputs).every(
      (input) => input.value.trim() !== "",
    );

    if (allFilled) {
      // We calculate the BMI before showing the block
      calculateAndRenderBmi(activeContainer.id);
  // Show the block with the result
      resultEmpty.style.display = "none";
     // Use your active class
      resultFull.classList.add("active");
      resultFull.style.display = "block";
    } else {
      // Return the welcome block
      resultEmpty.style.display = "block";
      resultFull.classList.remove("active");
      resultFull.style.display = "none";
    }
  }

 // Function for mathematical calculation and text output
  function calculateAndRenderBmi(activeSystemId) {
    let bmi = 0;
    let minIdealKg = 0;
    let maxIdealKg = 0;

    if (activeSystemId === "metric-fields") {
     // Logic for the METRIC system
      const hCm = parseFloat(root.querySelector("#inputHeight").value);
      const wKg = parseFloat(root.querySelector("#inputWeight").value);

      // if the entered number is empty or not less than zero or is not a number (possibly a string)
      if (isNaN(hCm) || isNaN(wKg) || hCm <= 0 || wKg <= 0) return;

      const hM = hCm / 100;
      bmi = wKg / (hM * hM);

     // Dynamic calculation of ideal weight according to the WHO formula (BMI from 18.5 to 24.9)
      minIdealKg = 18.5 * (hM * hM);
      maxIdealKg = 24.9 * (hM * hM);

      result.innerText = bmi.toFixed(1);
      recommendationWeight.innerText = `${minIdealKg.toFixed(1)}kgs - ${maxIdealKg.toFixed(1)}kgs`;
    } else if (activeSystemId === "imperial-fields") {
     // Logic for the IMPERIAL system
      const ft = parseFloat(root.querySelector("#inputHeightFt").value) || 0;
      const inch = parseFloat(root.querySelector("#inputHeightIn").value) || 0;
      const st = parseFloat(root.querySelector("#inputWeightSt").value) || 0;
      const lbs = parseFloat(root.querySelector("#inputWeightLbs").value) || 0;

     // We convert everything into single imperial units: inches and pounds
      const totalInches = ft * 12 + inch;
      const totalLbs = st * 14 + lbs;

      if (totalInches <= 0 || totalLbs <= 0) return;

      // BMI formula for the imperial system: (lbs / in^2) * 703
      bmi = (totalLbs / (totalInches * totalInches)) * 703;

   // Ideal weight in pounds
      const minIdealLbs = (18.5 * (totalInches * totalInches)) / 703;
      const maxIdealLbs = (24.9 * (totalInches * totalInches)) / 703;

    // Convert ideal weight back to stones (st) + pounds (lbs) for output
      const minSt = Math.floor(minIdealLbs / 14);
      const minLbs = Math.round(minIdealLbs % 14);
      const maxSt = Math.floor(maxIdealLbs / 14);
      const maxLbs = Math.round(maxIdealLbs % 14);

      result.innerText = bmi.toFixed(1);
      recommendationWeight.innerText = `${minSt}st ${minLbs}lbs - ${maxSt}st ${maxLbs}lbs`;
    }
  }

 // We listen for input on absolutely all inputs
  const allInputs = root.querySelectorAll(".header__input input");
  allInputs.forEach((input) => {
    input.addEventListener("input", updateBmiDisplay);
  });
}

// Launch when the document is loaded
initBmiCalculator();

