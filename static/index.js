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
    $("#one").find(".count").text(teamOneScore);
  } else {
    teamTwoScore += roundScore;
    localStorage.setItem(teamTwo, teamTwoScore);
    $("#two").find(".count").text(teamTwoScore);
  }

  roundScore = 0;
  $("#score").text(roundScore);
});

$("#one").find(".count").text(teamOneScore);
$("#two").find(".count").text(teamTwoScore);

$(".member").click(function() {
  let $member = $(this);

  if ($member.hasClass("active")) {
    $member.removeClass("active").addClass("missed");
  } else {
    $member.addClass("active");
    $(".member").not($member).removeClass("active");
  }
});

function reset() {
  localStorage.setItem(teamOne, 0);
  localStorage.setItem(teamTwo, 0);
  $("#one").find(".count").text(0);
  $("#two").find(".count").text(0);
}

function setTeamOne(score) {
  score = parseInt(score, 10);
  localStorage.setItem(teamOne, score);
  $("#one").find(".count").text(score);
}

function setTeamTwo(score) {
  score = parseInt(score, 10);
  localStorage.setItem(teamTwo, score);
  $("#two").find(".count").text(score);
}
