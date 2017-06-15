document.addEventListener('DOMContentLoaded', function () {
    var popup = document.querySelector('#popup');
    var close = document.querySelector('#close');

    show(popup);

    close.addEventListener('click', function () {
        hide(popup);
    });

    var data = document.querySelector('#timeTrackerData');

    for(var i = 0; i < 7;i++){
        var div = document.createElement('div');
        div.innerHTML = '<input type="checkbox" id="chk'+i+' /><input type="textbox" value="'+i+'h 30m" id="txt'+i+'" /></div>';
        data.appendChild(div);
    }

});

function show(el) {
    el.style.display = 'block';
}

function hide(el) {
    el.style.display = 'none';
}

