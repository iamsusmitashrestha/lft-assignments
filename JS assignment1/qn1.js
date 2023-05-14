function printPattern(n) {
  for (let i = n; i > 0; i--) {
    let pattern = "";
    for (let j = 1; j <= i; j++) {
      pattern += "* ";
    }
    console.log(pattern);
  }
}

printPattern(5);
