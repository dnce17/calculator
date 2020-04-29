const buttons = document.getElementsByTagName('button');
const input = document.querySelector('.input');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

for (const btn of buttons) {
  btn.addEventListener('click', pressed);
}

function pressed() {
  if (this != equal && this != clear) {
    var pushed = this.textContent;
    // console.log(pushed.charAt(pushed.length - 1));
    input.textContent += pushed;
  } else if (this == clear) {
    input.textContent = '';
  }

  if (this == equal) {
    inputs = input.textContent.split('');
    var num = '';
    var numlist = [];
    for (var i = 0; i < inputs.length; i++) {
      if (Number(inputs[i]) || inputs[i] == '.' || inputs[i] == '0') {
        num += inputs[i];
      } else {
        numlist.push(num);
        numlist.push(inputs[i]);
        num = '';
      }

      if (i == inputs.length - 1) {
        numlist.push(num);
      }
    }
    // console.log(numlist);
    while (numlist.includes('x') || numlist.includes('/')) {
      for (var i = 0; i < numlist.length; i++) {
        var ran = 0;
        while (numlist[i] == 'x' || numlist[i] == '/') {
          var operation = numlist[i];
          var x = Number(numlist[i - 1]);
          var y = Number(numlist[i + 1]);
          var answer = math_it_up[operation](x, y);
          numlist[i - 1] = answer;
          numlist.splice(i, 2);
        }
      }
    }

    // console.log(numlist);

    while (numlist.length != 1) {
      for (var i = 0; i < numlist.length; i++) {
        while (numlist[i] == '+' || numlist[i] == '-') {
          if (numlist[i] == "+" || numlist[i] == "-") {
            var operation = numlist[i];
            var x = Number(numlist[i - 1]);
            var y = Number(numlist[i + 1]);
            var answer = math_it_up[operation](x, y);
            numlist[i - 1] = answer;
            numlist.splice(i, 2);
          }
        }
      }
    }
    //
    // console.log(numlist);
    input.textContent = numlist[0];
  }
}

var math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    'x': function (x, y) { return x * y },
    '/': function (x, y) { return x / y },
};