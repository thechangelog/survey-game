let teamOne = "teamOne";
let teamTwo = "teamTwo";
let teamOneScore = parseInt(localStorage.getItem(teamOne), 10) || 0;
let teamTwoScore = parseInt(localStorage.getItem(teamTwo), 10) || 0;
let roundScore = 0;
let activeTeam;

$(".card").flip({
  axis: "x",
  speed: 300,
  trigger: "manual"
})

$(".card").click(function() {
  let $card = $(this);
  let flip = $card.data("flip-model");
  let points = parseInt($card.data("points"), 10);

  if (flip.isFlipped) {
    $card.flip(false)
    roundScore -= points;
  } else {
    $card.flip(true)
    roundScore += points;
  }

  $("#score").text(roundScore);
})

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
    $member
      .removeClass("active")
      .closest(".team")
      .find(".misses .x:not(.active)")
      .first()
      .addClass("active")
  } else {
    $member.addClass("active");
    $(".member").not($member).removeClass("active");
  }
})

$(".x").click(function() {
  $(this).removeClass("active")
})

function reset() {
  localStorage.setItem(teamOne, 0);
  localStorage.setItem(teamTwo, 0);
  $("#one").find(".count").text(0);
  $("#two").find(".count").text(0);
  $(".x").removeClass("active");
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
