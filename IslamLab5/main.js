window.onload = () => { // Страница загружена полностью вместе с изображениями, стилями и тд

	const progress = () => { // объявляем основную функцию

		const line = document.createElement('div') // создаем элемент <div>
		line.className = 'progress' // назначаем ему класс progress
		line.style.cssText = `
			height: 6px;
			background: linear-gradient(to right, #7b4397, #dc2430);
			position: fixed;
			top: 0;
			left: 0;
			transition: 1s;
			z-index: 99999;
		` // добавляем инлайновые стили

		document.body.prepend(line) // вставляем созданный элемент <div> в начало <body>

		const progressWidth = () => { // объявляем функцию расчета ширины элемента <div>
			return line.style.width = Math.floor(window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%'
		}

		progressWidth() // вызываем функцию progressWidth, когда страница загружена, для корректного отображения ширины индикатора прокрутки

		document.addEventListener('scroll', throttle(progressWidth, 64)) // вызываем функцию при прокрутке
		window.addEventListener('resize', throttle(progressWidth, 64)) // вызываем функцию при изменения размеров окна

	}

	progress() // вызываем основную функцию

}

// функция throttle будет ограничивать частоту вызовов функции progressWidth
const throttle = (func, ms) => { // объявляем функцию throttle и передаем параметры: func - функция, частоту вызовов которой будем ограничивать, ms - время, которое должно пройти между предыдущим и следующим вызовом функции func
	let locked = false // создаем переменную, которая будет блокировать вызов функции
	return () => { // при вызове функции throttle, автоматически вызывается анонимная функция, которая будет иметь доступ к переменной isThrottled
		if (locked) return // если заблокировано, то прекращаем выполнение функции
		locked = true // следующий вызов функции wrapper блокируется, пока не истечет переданное время в ms
		setTimeout(() => { // когда истекает переданное время в ms, внутренний код выполняется
			func() // выполняем переданную функцию func
			locked = false // снимаем блокировку
		}, ms) // подставляем переданное время в ms
	}
}