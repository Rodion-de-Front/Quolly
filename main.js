//инициализация шаблон
let tmpl_enter_name = document.getElementById('tmpl_enter_name').innerHTML;
let tmpl_admin_form = document.getElementById('tmpl_admin_form').innerHTML;
let tmpl_admin_page = document.getElementById('tmpl_admin_page').innerHTML;

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