var teamOne = "teamOne";
var teamTwo = "teamTwo";
var teamOneScore = parseInt(localStorage.getItem(teamOne), 10) || 0;
var teamTwoScore = parseInt(localStorage.getItem(teamTwo), 10) || 0;
var roundScore = 0;
var activeTeam;

$(".card").flip({
  axis: 'x',
  speed: 300
});


$(".card").click(function() {
  $(this).flip(true);
  var toAdd = parseInt($(this).data("points"), 10);
  console.log(toAdd);
  roundScore += toAdd;
  $("#score").text(roundScore);
});

$("#one").click(function() {
  activeTeam = teamOne;
  $(this).addClass("active");
  $("#two").removeClass("active");
})

$("#two").click(function() {
  activeTeam = teamTwo;
  $(this).addClass("active");
  $("#one").removeClass("active");
})

$("#points").click(function() {
  if (activeTeam === undefined) {
    alert("No team selected!");
    return 0;
  } else if (activeTeam === "teamOne") {
    teamOneScore += roundScore;
    localStorage.setItem(teamOne, teamOneScore);
    $("#one").text("TEAM 1: " + teamOneScore);
  } else {
    teamTwoScore += roundScore;
    localStorage.setItem(teamTwo, teamTwoScore);
    $("#two").text("TEAM 2: " + teamTwoScore);
  }

  roundScore = 0;
  $("#score").text(roundScore);
});

$("#one").text("TEAM 1: " + teamOneScore);
$("#two").text("TEAM 2: " + teamTwoScore);

function reset() {
  localStorage.setItem(teamOne, 0);
  localStorage.setItem(teamTwo, 0);
  $("#one").text("TEAM 1: " + 0);
  $("#two").text("TEAM 2: " + 0);
}

function setTeamOne(score) {
  score = parseInt(score, 10);
  localStorage.setItem(teamOne, score);
  $("#one").text("TEAM 1: " + score);
}

function setTeamTwo(score) {
  score = parseInt(score, 10);
  localStorage.setItem(teamTwo, score);
  $("#two").text("TEAM 2: " + score);
}
