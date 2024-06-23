document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('input[name="toggle"]');
    const currentTheme = localStorage.getItem('theme') || 'theme1';
    setTheme(currentTheme);

    toggleButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.checked) {
                let theme;
                switch (event.target.id) {
                    case 'state1':
                        theme = 'theme1';
                        break;
                    case 'state2':
                        theme = 'theme2';
                        break;
                    case 'state3':
                        theme = 'theme3';
                        break;
                }
                setTheme(theme);
                localStorage.setItem('theme', theme);
            }
        });
    });

    function setTheme(theme) {
        document.body.classList.remove('theme1', 'theme2', 'theme3');
        document.body.classList.add(theme);
    }
});
