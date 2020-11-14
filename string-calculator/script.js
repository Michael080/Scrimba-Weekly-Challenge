// DOM elements:
const input = document.getElementById('input'),
     submit = document.getElementById('submit'),
   solution = document.querySelector('.solution-display'),
    operation = document.querySelector('.operation'),
    final = document.querySelector('.final-solution');

// Identify operator, numbers, and convert string input into numbers:
function Parser(string, chars, num1, num2, op, eq) {
    this.string = input.value;
    this.chars = chars;
    this.num1 = num1;
    this.num2 = num2;
    this.op = op;
    this.eq = [num1, op, num2];

    this.checkString = () => {
        return this.string.includes(' ');
    }

    this.formatString = () => {
        let format;
        this.checkString() ?
            format = this.string.split(' ') :
            format = this.string.split('');
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
        !Number.isInteger(num) ? (num = round(num, 2)) : console.log(`${num} is an integer`);
        return num;
    }

    const round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    // Use as 'switch' to access user spec'd operation after input is parsed
    const operations = {
        '+' : sum = (num1, num2) => {
            let result = checkInt(num1 + num2);
            return result;
        },
        '-' : subtract = (num1, num2) => {
            let result = num1 - num2;
            return result;
        },
        '/' : divide = (num1, num2) => {
            let result = checkInt(num1 / num2);
            return result;
        },
        'def' : def = () => {
            let result = 'invalid input';
            return result;
        }
    }

    return operations[operator](num1, num2) || operations['def']();
}

// Parse input and update DOM w/ resultant nodes
function runCalc() {
    const parser = parseInput();
    const num1 =   parser.num1;
    const num2 =   parser.num2;
    const op =     parser.op;
    const sol = calculator(num1, num2, op, parser);
    displaySol(sol, num1, op, num2);
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
        console.log('updateDOM(): parent', parent);
        console.log('updateDOM(): node', node);
        parent.appendChild(node);
    }
}

// input.value = '6+2';
// let parser = parseInput();
// Run calculator on click-of-submit !!!
submit.addEventListener('click', runCalc);

// *! TESTS
// module.exports = parser;
/*

            class 'equation-component'
            its text value should be the solution
            to the input equation
        -This element should be added as a child of
            the `solutionDisplay` div

    Note: You can assume there will always only be 2 values,
        both whole integers, and always a space between each
        integer and the operator as in the above examples


Part 2 (Flex Display):
    Then, you'll Flex your Flexbox skills!
    + Vertically stack the contents of the mainContainer
    + Center the content horizontally
    + Display all components of the equation
        in the solutionDisplay using a horizontal Flexbox
        with `space around` each component

Skills:
    Event Listeners, String Manipulation, Array Manipulation,
Arithmetic, DOM Manipulation, Flexbox



STRETCH GOALS:
    +Accept and solve more complex problems with more than 2 inputs
    +Signal the different types of components (operator/value/solution) with different colors
    +Accept strings without spaces
    +C
*/