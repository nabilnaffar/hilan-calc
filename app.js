var button = document.createElement('button');
var text = document.createTextNode("Calc Hours")
button.appendChild(text);
button.style.width = '100%';
document.body.appendChild(button);
button.addEventListener("click", calcHours);

function calcHours() {
    let hElms = [].slice.call(document.querySelector('iframe').contentDocument.body.querySelectorAll('td .cDM'))
        .map(i => i.innerHTML)
        .filter(i => /^[0-9]{1,2}:[0-9]{1,2}$/.test(i))
        .map(i => {
            let partials = i.split(':');
            return ((+partials[0] + (partials[1] / 60)) - 8.5);
        });

    if (!hElms.length) {
        alert(`Nothing found here..`);
        console.log(`Nothing found here..`);
        return
    }

    let hSum = hElms
        .reduce((acc, cur) => {
            return acc += cur
        }, 0);
    let isNeg = hSum < 0;
    hSum = Math.abs(hSum);
    let hours = Math.floor(hSum), minutes = +((hSum - hours) * 60).toFixed(2);
    if(minutes < 10) {
        minutes = '0'+minutes;
    }
    alert(`${isNeg ? '-' : '+'}${hours}:${minutes}`);
    console.log(`%c ${isNeg ? '-' : '+'}${hours}:${minutes}`, `font-size: 16px; font-weight: bold; color: ${isNeg ? '#e25514' : '#38ea6a'}`);
};