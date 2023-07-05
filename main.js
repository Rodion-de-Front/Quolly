//инициализация шаблон
let tmpl_enter_name = document.getElementById('tmpl_enter_name').innerHTML;
let tmpl_admin_form = document.getElementById('tmpl_admin_form').innerHTML;
let tmpl_admin_page = document.getElementById('tmpl_admin_page').innerHTML;
let tmpl_game = document.getElementById('tmpl_game').innerHTML;
let tmpl_leader_board = document.getElementById('tmpl_leader_board').innerHTML;
let tmpl_admin_portfolio = document.getElementById('tmpl_admin_portfolio').innerHTML;
let tmpl_create_quiz = document.getElementById('tmpl_create_quiz').innerHTML;
let tmpl_button = document.getElementById('tmpl_button').innerHTML;
let tmpl_add_button = document.getElementById('tmpl_add_button').innerHTML;
let tmpl_render_question = document.getElementById('tmpl_render_question').innerHTML;
let tmpl_new_media_block = document.getElementById('tmpl_new_media_block').innerHTML;

//количество созданных кнопок
let button_sum = 0
//количесво вопросов
let question_sum = 1

//функция для автоматического перехода курсора на слудующий
function focusNextInput(nextInput, event) {
    var input = event.target;
    var maxLength = parseInt(input.getAttribute("maxlength"));

    if (input.value.length >= maxLength) {
        document.getElementById("input" + nextInput).focus();
    }
}

//функция для отрисовки формы с заполнением имени
function renderEnterNameForm() {
    document.querySelector('main').innerHTML = tmpl_enter_name;
}

//функция для отрисовки формы для входа в админ панель
function renderAdminEnterForm() {
    document.querySelector('main').innerHTML = tmpl_admin_form;
}

//функция для отрисовки админ страницы
function renderAdminPage() {
    document.querySelector('main').innerHTML = tmpl_admin_page;
}

//функция для отрисовки лидеоборда
function renderLeaderBoard() {
  document.querySelector('main').innerHTML = tmpl_leader_board;
}

//функция для отрисовки личного кабинета
function renderPortfolio() {
  document.querySelector('.admin-content').innerHTML = tmpl_admin_portfolio;
}

//функция для отрисовки экрана создания квиза
function createQuiz() {
  document.querySelector('.admin-content').innerHTML = tmpl_create_quiz;
}

//функция для создания кнопки
function addButton() {
  button_sum += 1
  if (button_sum == 4) {
    document.querySelector(".add-button-btn").remove();
    let new_tmpl_button = tmpl_button.replaceAll('${number}', button_sum)
    var newBlock = document.createElement('div');
    newBlock.innerHTML += new_tmpl_button
    document.getElementById('button-container').insertBefore(newBlock, document.querySelector(".add-button-btn"));
  } else {
    let new_tmpl_button = tmpl_button.replaceAll('${number}', button_sum)
    var newBlock = document.createElement('div');
    newBlock.innerHTML += new_tmpl_button
    document.getElementById('button-container').insertBefore(newBlock, document.querySelector(".add-button-btn"));
  }
}

//функция для удаление кнопки
function deleteButton(button_id) {
  if (button_sum == 4) {
    document.getElementById('button' + button_id).parentNode.remove();
    document.getElementById('button-container').innerHTML += tmpl_add_button;
  } else {
    document.getElementById('button' + button_id).parentNode.remove();
  }
  button_sum -= 1
}

//функция для добавления вопроса в панель справа
function addQuestion() {
  let current_question_settings = document.querySelector('.quiz-creator').innerHTML;
  localStorage.setItem(question_sum, current_question_settings);
  question_sum += 1;
  new_tmpl_question = tmpl_render_question.replaceAll('${id}', question_sum);
  document.getElementById('quiz-templates').innerHTML += new_tmpl_question;
  showQuestionSettings(question_sum);
}

//функция для отрисовки настроек вопроса
function showQuestionSettings(question_id) {
  if (localStorage.getItem(question_id) != null) {
    document.querySelector('.quiz-creator').innerHTML = localStorage.getItem(question_id);
  } else {
    new_tmpl_new_media_block = tmpl_new_media_block.replaceAll('${id}', question_id);
    document.querySelector('.quiz-creator').innerHTML = new_tmpl_new_media_block;
  }
  let current_question_settings = document.querySelector('.quiz-creator').innerHTML;
  localStorage.setItem(question_id, current_question_settings);
}

//функция для удаления вопроса
function deleteQuestion(question_id) {
  if (question_sum == 1) {
    return
  } else {
    question_sum -= 1;
    document.getElementById('question' + question_id).remove()
  }
}

//функция для копирования вопроса
function copyQuestion(question_id) {
  question_sum += 1;
  let copy_question = document.getElementById('question' + question_id).outerHTML;
  copy_question.id = question_sum;
  document.getElementById('quiz-templates').innerHTML += copy_question;
}

//функция для изменения текста в вопросе
function editQuestionText(question_title_id) {
  let input_text = document.getElementById('quiz-creator-input' + question_title_id).value;
  document.getElementById('qustion-title' + question_title_id).textContent = input_text
}

//функция для отрисовки игры
function renderGame() {
    document.querySelector('main').innerHTML = tmpl_game;

    //запуск таймера
    function startTimer(duration, display) {
      var timer = duration;
      var interval = setInterval(function () {
        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;

        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = formattedMinutes + " : " + formattedSeconds;

        if (--timer < 0) {
          clearInterval(interval);
          // Действия, которые нужно выполнить по истечении времени
          renderLeaderBoard();
        }
      }, 1000);
    }

    var twentySeconds = 1;
    var display = document.querySelector('#timer');
    startTimer(twentySeconds, display);
}
