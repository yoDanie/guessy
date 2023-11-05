export const isTitleValid = title => title.length > 4

export const validateError = (questionTitle, answers, selectedAnswer) => {
  if (isTitleValid(questionTitle) === false) {
    return 'Вопрос должен содержать не менее пяти символов'
  }

  if (answers.some(input => input.length === 0)) {
    return 'Пожалуйста, заполните поля'
  }
  if (selectedAnswer === null) {
    return 'Выберите правильный ответ'
  }
  if (answers.length !== [...new Set(answers)].length) {
    return 'Поменяйте одинаковые варианты'
  }

  return null
}

export const validateSignUp = (email, password, passwordConfirm) => {
  if (/^\S+@\S+\.\S+$/.test(email) === false) {
    return 'Введите корректный email'
  }
  if (password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов'
  }
  if (password !== passwordConfirm) {
    return 'Пароли не совпадают'
  }
  return null
}

export const validateSignIn = (email, password) => {
  if (/^\S+@\S+\.\S+$/.test(email) === false) {
    return 'Введите корректный email'
  }
  if (password.length === 0) {
    return 'Введите пароль'
  }

  return null
}

export const validatePincode = pincode => pincode
