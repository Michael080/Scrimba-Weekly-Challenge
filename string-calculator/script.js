// DOM elements:
const input = document.getElementById('input'),
     submit = document.getElementById('submit'),
   solution = document.querySelector('.solution-display'),
  operation = document.querySelector('.operation');

// Identify operator, numbers, and convert string input into numbers:
function Parser(string, chars, num1, num2, op, eq) {
    this.string = input.value;
    this.chars = chars;
    this.num1 = num1;
    this.num2 = num2;
    this.op = op;
    this.eq = [num1, op, num2];

    this.checkString = () => {
        return this.string.includes(' '); //check string for whitespace
    }
    this.formatString = () => {
        let format;
        this.checkString() ?
            format = this.string.split(' ') : //remove whitespace && create array
            format = this.string.split('');   //create array
        return format;
    }
    // Remove white space and store resultant array
    this.setChars = () => {
        this.chars = this.formatString();
        return this; // return this for chaining
    }
    // setNum/s store input as Numbers
    this.setNum1 = value => {
        this.num1 = Number(value);
        return this; // return this for chaining
    }
    this.setNum2 = value => {
        this.num2 = Number(value);
        return this; // return this for chaining
    }
    // store user spec'd operation
    this.setOp = () => {
        this.op = this.chars[1];
        return this; // return this for chaining
    }
}

// Create new Parser, parse input, return parsed data
const parseInput = function() {
    let parser = new Parser();
    // Parse input from user
    parser
        .setChars()
        .setNum1(parser.chars[0])
        .setNum2(parser.chars[2])
        .setOp(); // id user spec'd math operation +, -, *, /. etc.
    return parser;
}

function calculator(num1, num2, operator, obj) {
    // Check 'solution' is integer, if not, round to two decimal places
    const checkInt = num => {
        !Number.isInteger(num) ? (num = round(num, 2)) : num = num;
        return num;
    }

    const round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    // Use as 'switch' to access/implement user spec'd operation after input is parsed
    const operations = {
        '+' : (num1, num2) => {
            let result = checkInt(num1 + num2);
            return result;
        },
        '-' : (num1, num2) => {
            let result = checkInt(num1 - num2);
            return result;
        },
        '/' : (num1, num2) => {
            let result = checkInt(num1 / num2);
            return result;
        },
        '*' : (num1, num2) => {
            let result = checkInt(num1 * num2);
            return result;
        },
        'def' : () => {
            let result = 'invalid input';
            return result;
        }
    }
    // check for result of 0 as it evaluates to falsey
    if (operations[operator](num1, num2) !== 0) {
        return operations[operator](num1, num2) || operations['def']();
    } else {
        return 0;
    }
}

// Parse input and update DOM w/ resultant nodes
function runCalc() {
    const parser = parseInput();
    const num1 =   parser.num1;
    const num2 =   parser.num2;
    const op =     parser.op;
    const sol = calculator(num1, num2, op, parser);
    displaySol(sol, num1, op, num2); //display operation && results
    input.addEventListener('click', clearSolution);
}

// Create DOM nodes for each element of the operation and display
function displaySol(sol, ...operators){
    //create/add nodes for left-hand side of operation
    operators.map(value => createElem('div', 'equation-component', value, solution));
    //create/add nodes for right-hand side of operation
    createElem('div', 'equation-component', '=', solution); //display equals sign
    createElem('div', 'equation-component', sol, solution);
    // create elements, add css-class, populate text, and append to parent-node
    function createElem(type, cssClass, value, parentNode) {
        let elem = document.createElement(type);
        elem.classList.add(cssClass);
        popContent(elem, value);
        updateDOM(elem, parentNode);
        return elem;
    }

    function popContent(elem, val) {
        elem.textContent = val;
    }

    function updateDOM(node, parent) {
        parent.appendChild(node);
    }
}

function clearSolution() {
    solution.childElementCount > 0 ? removeChildren() : 'no elements to remove';
}

function removeChildren(parent = solution) {
    const children = Array.from(parent.childNodes);
    children.forEach(child => parent.removeChild(child));
}

// Run calculator on click-of-submit !!!
submit.addEventListener('click', runCalc);

// *! TESTS
// module.exports = parser;
/*

STRETCH GOALS:
    +Accept and solve more complex problems with more than 2 inputs
    +Signal the different types of components (operator/value/solution) with different colors
    +Accept strings without spaces
    +Make UI look like a real calculator:
        -Make segmented LCD style display? (http://www.vintagecalculators.com/html/calculator_display_technology.html)
        -Animate calc buttons as user inputs
        -Show segment electrodes of LCD to further dopeify? (see illustration from above link 'Liquid Crystal Display')
*/