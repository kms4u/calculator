document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputField');
    let interval;

    function startInterval(buttonContent) {
        interval = setInterval(() => {
            inputField.value += buttonContent;
        }, 100); // Интервал обновления значения (в миллисекундах)
    }

    function stopInterval() {
        clearInterval(interval);
    }

    function addClass(element) {
        element.classList.add("clicked");
    }

    function removeClass(element) {
        element.classList.remove("clicked");
    }

    const nums = document.querySelectorAll('.pressed');

    nums.forEach(num => {
        num.addEventListener('mousedown', () => {
            addClass(num);
            startInterval(num.textContent);
        });

        num.addEventListener('mouseup', () => {
            removeClass(num);
            stopInterval();
        });

        num.addEventListener('mouseleave', () => {
            removeClass(num);
            stopInterval();
        });

        num.addEventListener('touchstart', (e) => {
            e.preventDefault(); // предотвращает дополнительное событие mousedown
            addClass(num);
            startInterval(num.textContent);
        });

        num.addEventListener('touchend', () => {
            removeClass(num);
            stopInterval();
        });

        num.addEventListener('touchcancel', () => {
            removeClass(num);
            stopInterval();
        });
    });

    document.addEventListener('mouseup', () => {
        nums.forEach(num => removeClass(num));
        stopInterval();
    });

    document.addEventListener('touchend', () => {
        nums.forEach(num => removeClass(num));
        stopInterval();
    });
});