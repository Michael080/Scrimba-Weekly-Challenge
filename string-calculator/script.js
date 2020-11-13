const input = document.getElementById('input'),
    submit = document.getElementById('submit'),
    answ = document.querySelector('.solution-display');

// +When the 'Solve' button is clicked
// -Create a new div with the
// class 'equation-component'
// its text value should be the solution
// to the input equation
// -This element should be added as a child of
// the `solutionDisplay` div

submit.addEventListener('click', function(){
    console.log(input.value);
})

// function Parser(string, chars)

// input.value = '6 * 7';
function Parser(string, chars, num1, num2, op, eq) {
    this.string = input.value;
    this.chars = chars;
    this.num1 = num1;
    this.num2 = num2;
    this.op = op;
    this.eq = [num1, op, num2];

    this.setChars = function() {
        return this.chars = this.string.split(' ');
    }

    this.setNum1 = function(value){
        this.num1 = Number(value);
        return this.num1;
    }

    this.setNum2 = function(value){
        this.num2 = Number(value);
        return this.num2;
    }

    this.setOp = function() {
        this.op = this.chars[1];
    }
}

const myCalc = new Parser();

// Parse input from DOM
myCalc.setChars();
myCalc.setNum1(myCalc.chars[0]);
myCalc.setNum2(myCalc.chars[2]);
myCalc.setOp(); // id user spec'd math operation +, -, *, /. etc.

// TODO --- Use setOp to set the type of operation & execution of operation should happen elsewhere
// const operators = {
//     'add' : oper = () => {
//         console.log(typeof(num1));
//         console.log(this.num1 + this.num2);
//     }
// }

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