function initBmiCalculator() {
  const root = document.querySelector(".form");
  if (!root) return;

  // Элементы переключения систем
  const selectSystems = root.querySelectorAll('input[name="radio"]');
  const optionsSystems = root.querySelectorAll(".header__input");

  // Элементы вывода результатов
  const result = root.querySelector("#result");
  const recommendationWeight = root.querySelector("#recommendation-weight");
  const resultEmpty = root.querySelector(".bmi-result.empty");
  const resultFull = root.querySelector(".bmi-result.full");

  // Переключение систем измерения
  selectSystems.forEach((select) => {
    select.addEventListener("change", () => {
      const show = select.dataset.show;

      optionsSystems.forEach((options) => {
        options.hidden = true;
        if (options.getAttribute("id") === show) {
          options.hidden = false;
        }
      });

      // При смене системы очищаем значения или просто пересчитываем
      updateBmiDisplay();
    });
  });

  // Главная функция: проверяет заполнение полей и запускает расчет
  function updateBmiDisplay() {
    const activeContainer = root.querySelector(".header__input:not([hidden])");
    if (!activeContainer) return;

    const activeInputs = activeContainer.querySelectorAll("input");
    const allFilled = Array.from(activeInputs).every(
      (input) => input.value.trim() !== "",
    );

    if (allFilled) {
      // Считаем ИМТ перед показом блока
      calculateAndRenderBmi(activeContainer.id);

      resultEmpty.style.display = "none";
      resultFull.classList.add("active");
      resultFull.style.display = "block";
    } else {
      resultEmpty.style.display = "block";
      resultFull.classList.remove("active");
      resultFull.style.display = "none";
    }
  }

  // Функция математического расчета и вывода текста
  function calculateAndRenderBmi(activeSystemId) {
    let bmi = 0;
    let minIdealKg = 0;
    let maxIdealKg = 0;

    if (activeSystemId === "metric-fields") {
      // Логика для МЕТРИЧЕСКОЙ системы
      const hCm = parseFloat(root.querySelector("#inputHeight").value);
      const wKg = parseFloat(root.querySelector("#inputWeight").value);

      if (isNaN(hCm) || isNaN(wKg) || hCm <= 0 || wKg <= 0) return;

      const hM = hCm / 100;
      bmi = wKg / (hM * hM);

      // Динамический расчет идеального веса по формуле ВОЗ (ИМТ от 18.5 до 24.9)
      minIdealKg = 18.5 * (hM * hM);
      maxIdealKg = 24.9 * (hM * hM);

      result.innerText = bmi.toFixed(1);
      recommendationWeight.innerText = `${minIdealKg.toFixed(1)}kgs - ${maxIdealKg.toFixed(1)}kgs`;
    } else if (activeSystemId === "imperial-fields") {
      // Логика для ИМПЕРСКОЙ системы
      const ft = parseFloat(root.querySelector("#inputHeightFt").value) || 0;
      const inch = parseFloat(root.querySelector("#inputHeightIn").value) || 0;
      const st = parseFloat(root.querySelector("#inputWeightSt").value) || 0;
      const lbs = parseFloat(root.querySelector("#inputWeightLbs").value) || 0;

      // Переводим всё в единые имперские единицы: дюймы и фунты
      const totalInches = ft * 12 + inch;
      const totalLbs = st * 14 + lbs;

      if (totalInches <= 0 || totalLbs <= 0) return;

      // Формула ИМТ для имперской системы: (фунты / дюймы^2) * 703
      bmi = (totalLbs / (totalInches * totalInches)) * 703;

      // Идеальный вес в фунтах
      const minIdealLbs = (18.5 * (totalInches * totalInches)) / 703;
      const maxIdealLbs = (24.9 * (totalInches * totalInches)) / 703;

      // Переводим идеальный вес обратно в формат стоуны (st) + фунты (lbs) для вывода
      const minSt = Math.floor(minIdealLbs / 14);
      const minLbs = Math.round(minIdealLbs % 14);
      const maxSt = Math.floor(maxIdealLbs / 14);
      const maxLbs = Math.round(maxIdealLbs % 14);

      result.innerText = bmi.toFixed(1);
      recommendationWeight.innerText = `${minSt}st ${minLbs}lbs - ${maxSt}st ${maxLbs}lbs`;
    }
  }

  // Слушаем ввод на абсолютно всех инпутах
  const allInputs = root.querySelectorAll(".header__input input");
  allInputs.forEach((input) => {
    input.addEventListener("input", updateBmiDisplay);
  });
}

// Запуск при загрузке документа
initBmiCalculator();

/**
 * описать код - что и как означает каждая фраза
 * Почему при переключении скачет блок?
 *
 * Сделать новую таблицу с результами
 * подобрать идельный вес - с результами
 */
