/**
 * Алгоритм рассчетм ИМТ
 * 1. Инициализация данных
 * Создать переменную для вес пользователя в килограммах (например, weight)
 * Создать переменную для роста пользователя в сантиметрах (например, heightCm)
 *
 * 2. Подготовка данных
 * Перевести рост из сантиметров в метры: разделить heightCm на 100 и записать в переменну heightM.
 *
 * 3. Вычисление ИМТ
 * Возвести рост в метрах (heightM) в квадрат.
 * Разделить вес (weight) на полученный квадрат роста.
 * Округлить результат до одного или двух знаков после запятой с помощью метода toFixed().
 * Сохранить финльное число в переменную bmi.
 *
 * 4. Интерпретация результата
 *
 * Использовать условные конструкции (if / else if / else) для проверки значение bmi
 * - Если bmi меньше 18.5 - вес недостаточный
 * - Если bmi от 18.5 до 24.9 - вес в норме
 * - Если bmi от 25 до 29.9 - избыточный вес (предожирение)
 * - Если bmi равен 30  или больше - ожирение
 *
 * 5. Вывод
 * Вернуть или отобразить пользователю текстовое сообщеие с его числовым ИМТ и соответствующей категорией
 */

function calculationBmi() {
  const root = document.querySelector(".form");
  if (!root) return;

  const selectSystems = root.querySelectorAll('input[name="radio"]');
  const optionsSystems = root.querySelectorAll(".header__input");

  selectSystems.forEach((select) => {
    select.addEventListener("change", (event) => {
      const show = select.dataset.show;

      optionsSystems.forEach((options) => {
        options.hidden = true;
        const id = options.getAttribute("id");
        if (id === show) {
          options.hidden = false;
        }
      });
    });
  });
}
calculationBmi();


/**
 * разобраться с актив
 * описать код - что и как означает каждая фраза
 * Почему при переключении скачет блок?
 * Перевод метрических в дюймы и футы
 */