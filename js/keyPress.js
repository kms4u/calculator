document.addEventListener('DOMContentLoaded', function () {
    const nums = this.querySelectorAll('.num');

    nums.forEach(num => {
        num.addEventListener('click', function () {
            num.classList.add("clicked");

            setTimeout(function () {
                num.classList.remove("clicked");
            }, 100);
            
        });
    });

})