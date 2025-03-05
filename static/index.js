let teamOne = "team-one";
let teamTwo = "team-two";
let teamOneScore = parseInt(localStorage.getItem(teamOne), 10) || 0;
let teamTwoScore = parseInt(localStorage.getItem(teamTwo), 10) || 0;
let roundScore = 0;
let activeTeam;

$(document).on("keydown", function (e) {
  // console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      $("#one").trigger("click");
      break;
    case "ArrowRight":
      $("#two").trigger("click");
      break;
    case "ArrowUp":
      activeTeam = undefined;
      $("#one").removeClass("active");
      $("#two").removeClass("active");
      break;
    case "a":
      $("#points").trigger("click");
      break;
    case "p": // p goes to the next player on the active team
      let members = $(`#${activeTeam}`).children(".member");
      let active = members.filter(".active");
      let next = active.next(".member");

      if (active.length && next.length) next.trigger("click");
      else members.first().trigger("click");
      break;
    case "i":
      $("#intro")[0].play();
      break;
    case "n":
      $("#wrong")[0].play();
      break;
    case "y":
      $("#right")[0].play();
      break;
    case "z":
      $("#next")[0].click();
      break;
    case "e":
      window.history.back();
    case "x":
      let misses = $(`#${activeTeam}`).find(".misses");
      let activeX = misses.find(".x.active");
      let nextX = activeX.next(".x");

      if (activeX.length && nextX.length) nextX.addClass("active");
      else misses.find(".x").first().addClass("active");
      break;
    default:
      // 1-9: flip appropriate card
      if (e.which >= 49 && e.which <= 57) {
        let number = e.which - 48;
        $(".card")
          .eq(number - 1)
          .trigger("click");
      }
  }
});

$(".card").flip({
  axis: "x",
  speed: 300,
  trigger: "manual",
});

$(".card").click(function () {
  let $card = $(this);
  let flip = $card.data("flip-model");
  let points = parseInt($card.data("points"), 10);

  if (flip.isFlipped) {
    $card.flip(false);
    roundScore -= points;
  } else {
    $card.flip(true);
    roundScore += points;
  }

  $("#score").text(roundScore);
});

$("#one").click(function () {
  activeTeam = teamOne;
  $(this).addClass("active");
  $("#two").removeClass("active");
});

$("#two").click(function () {
  activeTeam = teamTwo;
  $(this).addClass("active");
  $("#one").removeClass("active");
});

$("#points").click(function () {
  if (activeTeam === undefined) {
    alert("No team selected!");
    return 0;
  } else if (activeTeam === "team-one") {
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

$(".member").click(function () {
  let $member = $(this);

  if ($member.hasClass("active")) {
    $member
      .removeClass("active")
      .closest(".team")
      .find(".misses .x:not(.active)")
      .first()
      .addClass("active");
  } else {
    $member.addClass("active");
    $member.siblings().removeClass("active");
  }
});

$(".x").click(function () {
  $(this).removeClass("active");
});

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
