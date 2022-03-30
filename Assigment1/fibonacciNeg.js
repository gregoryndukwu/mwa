const fibonacci= function(number) {
    if (number <= 2) {
    return 1;
    } else {
    if (number > 0){
        number = number * -1;
    }
    return fibonacci(number-1) + fibonacci(number-2);
    } } ;
    console.log("Fibonacci of -15 is "+ fibonacci(-15));