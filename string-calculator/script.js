const input = document.getElementById('input'),
    submit = document.getElementById('submit'),
    solution = document.querySelector('.solution-display');

// +When the 'Solve' button is clicked
// -Create a new div with the
// class 'equation-component'
// its text value should be the solution
// to the input equation
// -This element should be added as a child of
// the `solutionDisplay` div



// Identify operator, numbers, and convert string input into numbers
function Parser(string, chars, num1, num2, op, eq) {
    this.string = input.value;
    this.chars = chars;
    this.num1 = num1;
    this.num2 = num2;
    this.op = op;
    this.eq = [num1, op, num2];
    // Remove white space and store resultant array
    this.setChars = () => {
        this.chars = this.string.split(' ');
        return this;
    }

    this.setNum1 = value => {
        this.num1 = Number(value);
        return this;
    }

    this.setNum2 = value => {
        this.num2 = Number(value);
        console.log('num2: ', this.num2);
        console.log('typeof(num2): ', typeof(this.num2));
        return this;
    }

    this.setOp = () => {
        this.op = this.chars[1];
        return this;
    }
}

const parseInput = function() {
    // Parse input from DOM
    let parser = new Parser(); // create parser
    parser
        .setChars()
        .setNum1(parser.chars[0])
        .setNum2(parser.chars[2])
        .setOp(); // id user spec'd math operation +, -, *, /. etc.
    console.log('parseInput(): ', parser);
    return parser;
}

function calculator(num1, num2, operator, obj) {

    const checkInt = num => {
        !Number.isInteger(num) ? (num = round(num, 2)) : console.log(`${num} is an integer`);
        return num;
    }

    const round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    const operations = {
        '+' : sum = (num1, num2) => {
            let result = checkInt(num1 + num2);
            console.log('fuckin sum!', result);
            return result;
        },
        '-' : subtract = (num1, num2) => {
            let result = num1 - num2;
            console.log('fuckin subract!', result);
            return result;
        },
        '/' : divide = (num1, num2) => {
            let result = checkInt(num1 / num2);
            console.log('fuckin divide!', result);
            return result;
        },
        'def' : def = () => {
            let result = 'invalid input';
            console.log('invalid input');
            return result;
        }
    }
    return operations[operator](num1, num2) || operations['def']();
}

// TODO --- final form
submit.addEventListener('click', function(){
    let parser = parseInput();
    let num1 = parser.num1;
    let num2 = parser.num2;
    let op = parser.op;
    // console.log('num2 --listener: ', num2 + 5);
    // console.log('typeof(num2) --listener: ', typeof(num2));
    // console.log('op --listener: ', op);
    // console.log('typeof(op) --listener: ', typeof(op));
    // const result =    solution.textContent = calculator(num1, num2, op, parser);
});

// let parser = parseInput();
//
// console.log('parser --global: ', parser);
// console.log('parser --- global: ', parser);

// *! TESTS
// module.exports = parser;
/*
Part 1 (Calculation):
    +Your first goal is to solve a simple text-based
        math problem entered in the input field
    +The problem can be add/sub/multiply/divide
    +Here are few examples:
        "3 + 3" -> 6
        "10 - 3" -> 7
        "44 / 2" -> 22
        "2 * 8" -> 16
    +When the 'Solve' button is clicked
        -Create a new div with the
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