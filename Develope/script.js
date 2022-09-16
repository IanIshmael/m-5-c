$("#currentDay").text(moment().format("dddd, MMMM Do"));

var scheduleArray = JSON.parse(localStorage.getItem("schedule")) || [];

$(".saveBtn").on("click", function () {
  var text = $(this).siblings(".description").val();
  var time = $(this).parent().attr("id");

  var scheduleObject = {
    time: time,
    text: text,
  };

  scheduleArray.push(scheduleObject);
  localStorage.setItem("schedule", JSON.stringify(scheduleArray));
});

function renderSchedule() {
  for (let index = 0; index < scheduleArray.length; index++) {
    const timeValue = scheduleArray[index].time;
    const textValue = scheduleArray[index].text;
    console.log(timeValue, textValue);
    $(`#${timeValue} .description`).val(textValue);
  }
}
renderSchedule();

function showTimeBackground() {
  var timeNow = moment().hours();

  $(".time-block").each(function () {
    var blockTime = parseInt($(this).attr("id").split("hour")[1]);

   
    if (blockTime < timeNow) {
      $(this).removeClass("future");
      $(this).removeClass("present");
      $(this).addClass("past");
    } else if (blockTime === timeNow) {
      $(this).removeClass("past");
      $(this).removeClass("future");
      $(this).addClass("present");
    } else {
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");
    }
  });
}

showTimeBackground();
