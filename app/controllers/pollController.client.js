'use strict';

(function () {

  var addButton = document.querySelector('.btn-add');
  var nextOptionNumber = 3;
  var removeButton = document.querySelector('.btn-remove');
  
  addButton.addEventListener('click', function () {
    
    var container = document.getElementById('options-fields');

    var newDiv = document.createElement('div');
    newDiv.id = "option" + nextOptionNumber;
    newDiv.className = "input-field";
        
    var newLabel = document.createElement('label');
    newLabel.htmlFor = "option" + nextOptionNumber;
    newLabel.innerHTML = "Option:";
        
    var newInput = document.createElement('input');
    newInput.type = "text";
    newInput.name = "option" + nextOptionNumber;
        
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
    
    container.appendChild(newDiv);

    nextOptionNumber += 1;
        
  }, false);

  removeButton.addEventListener('click', function () {

    var idNumberToRemove = nextOptionNumber - 1;
    var divToRemove = document.getElementById('option' + idNumberToRemove);
        
    var container = document.getElementById('options-fields');
        
    if (nextOptionNumber > 3) {
      container.removeChild(divToRemove);
      nextOptionNumber -= 1;
    };

  }, false);
  
})();


