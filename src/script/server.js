function submitForm() {
    // Получить значения полей формы
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var projectDescription = document.getElementById('projectDescription').value;
  
    // Создать объект с данными формы
    var formData = {
      name: name,
      surname: surname,
      email: email,
      projectDescription: projectDescription
    };
  
    // Отправить данные на сервер с использованием fetch
    fetch('http://localhost:3000/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(function(response) {
      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Failed to submit application');
      }
    })
    .catch(function(error) {
      alert('An error occurred while submitting the application');
      console.log(error);
    });
  }
  
  // Назначить функцию submitForm() обработчиком события отправки формы
  var form = document.getElementById('modal');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвратить отправку формы по умолчанию
    submitForm();
  });