(() => {
  const FORM_SUBMIT_URL = "/url";
  const SUBMIT_DONE_URL = "/done.html";
  const FORM_SUBMIT_METHOD = "POST";

  let handleError = (errorText) => {
    let errorMessageElem = document.querySelector('.error-message');
    errorMessageElem.innerHTML = errorText;
    errorMessageElem.classList.add('show');
  }

  document.addEventListener('click', (ev) => {
    let target = ev.target;
    let isRemoveComposition = target.dataset.removecomposition === '';
    let isAddComposition = target.dataset.addcomposition === '';
    let isSubmit = target.dataset.submit === '';
    if (isRemoveComposition) {
      target.closest('.row_composition').remove();
    }
    if (isAddComposition) {
      let newRowComposition = document.querySelector('.row_composition').cloneNode(true);
      newRowComposition.querySelectorAll('input').forEach(input => input.value = "");
      document.querySelector('#compositions').appendChild(newRowComposition);
    }
    if (isSubmit) {
      let concertRegistrationForm = document.forms.concertRegistration;
      let inputComposer = document.querySelectorAll('.composer')
      let inputComposition = document.querySelectorAll('.composition')
      let inputPerformer = document.querySelectorAll('.performer')

      // создать объект для формы
      let formData = new FormData(concertRegistrationForm);

      // отослать
      let xhr = new XMLHttpRequest();
      xhr.open(FORM_SUBMIT_METHOD, FORM_SUBMIT_URL);

      let promise = new Promise((resolve, reject) => {

        xhr.onload = function() {
          if (this.status == 200) {
            resolve(this.response);
          } else {
            let error = new Error('Не удалось зарегистрироваться!\n ('+this.statusText + ')');
            error.code = this.status;
            reject(error);
          }
        };

        xhr.onerror = function() {
          reject(new Error("Network Error"));
        };

        xhr.send(formData);
      });
      promise.then(
        response => window.location = SUBMIT_DONE_URL, 
        error => handleError(error))
    }
  });


})();
