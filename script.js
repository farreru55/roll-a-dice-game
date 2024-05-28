let ask = true;
let conme = 0,
  conbot = 0;
ques: while (ask) {
  greet: var hi = alert(
    "Welcome to Roll a Dice Game \n\nBest of 3 \n\nif got 0 / draw = roll again"
  );
  game: for (let i = 1; i <= 3; i++) {
    // Player
    var opsi = confirm(
      "Roll a dice! \n\nBot = " +
        conbot +
        "\nYou = " +
        conme +
        " \n\nRound " +
        i
    );
    if (opsi == true) {
      var roll = Math.round(Math.random() * 6);
      alert("Round " + i + "\n\nYou get " + roll);
    } else {
      alert("Okay!");
      break ques;
    }

    // Computer
    let bot = Math.round(Math.random() * 6);
    alert("Round " + i + "\n\nBot get " + bot);

    // Rules
    if (roll == bot || roll == 0 || bot == 0) {
      alert("roll again");
      i -= 1;
    } else if (roll < bot) {
      conbot += 1;
      alert("Round " + i + "\n\nBot win");
    } else if (roll > bot) {
      conme += 1;
      alert("Round " + i + "\n\nYou win");
    }

    // End
    if (conme == 2) {
      alert(
        "Congratulations! you win \n\nGame Result: \nYou = " +
          conme +
          " \nBot = " +
          conbot
      );
      break game;
    } else if (conbot == 2) {
      alert(
        "Bot win! \n\nGame Result: \nYou = " + conme + " \nBot = " + conbot
      );
      break game;
    }
  }
  let lastQues = confirm("Do you want to play again?");
    if (lastQues == false) {
        alert("Thank you for playing");
        break ques;
    }
  window.location.reload();
}

// var bot = Math.round(Math.random() * 6);
// console.log(roll);
