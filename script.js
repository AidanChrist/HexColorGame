if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}


let colorSample = null; // the color sample element
let answers = []; // array of elements
let correctColorCode = null; // color code of actual color sample
let score = 0; // number of guessed correct guesses
let total = 0; // total number of questions
let level = 2;
let mode = 1;

// initialize page
window.onload = function() {
  colorSample = document.getElementById("colorSample");

  answers.push(document.getElementById("a"));
  answers.push(document.getElementById("b"));
  answers.push(document.getElementById("c"));
  answers.push(document.getElementById("d"));

  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function() {
      if (total < 10) {
        markIt(this);
      }
    });
  }

  loadNewQuestion();
};

function markIt(elem) {
  let gotItRight = false;
  total++;

  if (mode == 1) {
    console.log("Comparing " + elem.innerHTML + " to " + correctColorCode);
  } else {
    console.log(
      "Comparing " + elem.style.backgroundColor + " to " + correctColorCode
    );
  }

  if (elem.innerHTML == correctColorCode) {
    score++;
    gotItRight = true;
  }

  document.getElementById("score").innerHTML = score + " / " + total;

  window.setTimeout(function() {
    if (gotItRight) {
      colorSample.innerHTML = "Correct!";
    } else {
      colorSample.innerHTML = "Incorrect!";
    }
  }, 100);

  window.setTimeout(function() {
    if (total < 10) {
      loadNewQuestion();
    } else {
      colorSample.innerHTML = "Final Score: " + score + " / " + total;
    }
  }, 800);
}

function loadNewQuestion() {
  let colorCode = getRandomHexCode();
  console.log(colorCode);
  if (mode == 1) {
    colorSample.innerHTML = "";
    colorSample.style.backgroundColor = colorCode;

    for (let i = 0; i < answers.length; i++) {
      answers[i].innerHTML = getRandomHexCode();
    }

    let solution = Math.floor(Math.random() * level * 2);
    answers[solution].innerHTML = colorCode;
  } else {
    colorSample.innerHTML = colorCode;
    for (let i = 0; i < answers.length; i++) {
      answers[i].style.backgroundColor = getRandomHexCode();
    }

    let solution = Math.floor(Math.random() * level * 2);
    answers[solution].style.backgroundColor = colorCode;
  }

  console.log(answers);
  correctColorCode = colorCode;
}

function getRandomHexCode() {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];
  result.push("#");
  for (let n = 0; n < 6; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }

  return result.join("");
}

function levelSelect(lv) {
  level = lv;
  score = 0;
  total = 0;

  document.getElementById("c").style.display = "none";
  document.getElementById("d").style.display = "none";
  document.getElementById("e").style.display = "none";
  document.getElementById("f").style.display = "none";

  answers = [];
  answers.push(document.getElementById("a"));
  answers.push(document.getElementById("b"));

  if (lv >= 2) {
    document.getElementById("c").style.display = "block";
    document.getElementById("d").style.display = "block";
    answers.push(document.getElementById("c"));
    answers.push(document.getElementById("d"));
  }

  if (lv == 3) {
    document.getElementById("e").style.display = "block";
    document.getElementById("f").style.display = "block";
    answers.push(document.getElementById("e"));
    answers.push(document.getElementById("f"));
  }

  document.getElementById("level1").innerHTML = "Level 1";
  document.getElementById("level2").innerHTML = "Level 2";
  document.getElementById("level3").innerHTML = "Level 3";

  switch (lv) {
    case 1:
      document.getElementById("level1").innerHTML = "<b>Level 1</b>";
      break;
    case 2:
      document.getElementById("level2").innerHTML = "<b>Level 2</b>";
      break;
    case 3:
      document.getElementById("level3").innerHTML = "<b>Level 3</b>";
      break;
    default:
      document.getElementById("level1").innerHTML = "<b>Level 1</b>";
  }

  document.getElementById("score").innerHTML = "0";
  loadNewQuestion();

  console.log(answers);
}

function modeSelect(md) {
  console.log(md);

  mode = md;
  score = 0;
  total = 0;

  switch (md) {
    case 1:
      document.getElementById("mode1").innerHTML = "<b>Pick Code</b>";
      document.getElementById("mode2").innerHTML = "Pick Color";
      document.getElementById("a").style.backgroundColor = "#ffffff";
      document.getElementById("b").style.backgroundColor = "#ffffff";
      document.getElementById("c").style.backgroundColor = "#ffffff";
      document.getElementById("d").style.backgroundColor = "#ffffff";
      document.getElementById("e").style.backgroundColor = "#ffffff";
      document.getElementById("f").style.backgroundColor = "#ffffff";
      break;
    case 2:
      document.getElementById("mode2").innerHTML = "<b>Pick Color</b>";
      document.getElementById("mode1").innerHTML = "Pick Code";
      colorSample.style.backgroundColor = "#666";
      document.getElementById("a").innerHTML = "A";
      document.getElementById("b").innerHTML = "B";
      document.getElementById("c").innerHTML = "C";
      document.getElementById("d").innerHTML = "D";
      document.getElementById("e").innerHTML = "E";
      document.getElementById("f").innerHTML = "F";
      break;
    default:
      document.getElementById("mode2").innerHTML = "Pick Color";
      document.getElementById("mode1").innerHTML = "Pick Code";
  }

  document.getElementById("score").innerHTML = "0";
  loadNewQuestion();
}
