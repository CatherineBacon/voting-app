'use strict';

(function () {

    var addButton = document.querySelector('.btn-add');
    var nextOptionNumber = 3;
    
    addButton.addEventListener('click', function () {
        
        var container = document.getElementById('options-fields');

        var newDiv = document.createElement('div');

        var newLabel = document.createElement('label');
        newLabel.htmlFor = "option" + nextOptionNumber;
        newLabel.innerHTML = "Option:";
        
        var newInput = document.createElement('input');
        newInput.type = "text";
        newInput.name = "option" + nextOptionNumber;

        newDiv.appendChild(newLabel);
        newDiv.appendChild(newInput);
        
        container.appendChild(newDiv);

        nextOptionNumber += 1;
        
    }, false);

})();


