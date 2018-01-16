$(document).ready(function() {
  var TimerState = {
    NO_TIMER: 1,
    SESSION_TIMER: 2,
    BREAK_TIMER: 3
  }
  var sessionTimer = 25;
  var breakTimer = 5;
  var millisecondsToMinutesConverter = 60000;
  var state = TimerState.NO_TIMER;
  var timerEnd;
  var timeBetweenUpdatesInMilliseconds = 1000;
  var isPaused = true;
  var disabledColor = "#2e2e2e";
  
  /*---- Custom functions ----*/
  
  // Showing the timer to the user, updating every second
  function updateTimer() {
    if (!isPaused) {
      var timeLeft = timerEnd - Date.now();
      // Doing conversion into minutes and seconds
      timeLeft /= 1000; // getting the total seconds
      var minutes = Math.floor(timeLeft / 60);
      var seconds = Math.floor(timeLeft % 60);
      
      if (minutes < 10 && seconds < 10) {
        $("#clock-timer").html("0" + minutes + ":" + "0" + seconds);
      } else if (minutes < 10) {
        $("#clock-timer").html("0" + minutes + ":" + seconds);
      } else if (seconds < 10) {
        $("#clock-timer").html(minutes + ":0" + seconds);
      } else {
        $("#clock-timer").html(minutes + ":" + seconds);
      }
    
      if (timeLeft < 1) {
        if (state === TimerState.session_TIMER) {
          state = TimerState.BREAK_TIMER;
          timerEnd = Date.now() + breakTimer * millisecondsToMinutesConverter;
          setTimeout(updateTimer, timeBetweenUpdatesInMilliseconds);
        } else if (state === TimerState.BREAK_TIMER) {
          state = TimerState.NO_TIMER;
          $("#clock-timer").html("Start");
          $("#play").css("color", "white");
        }
      } else {
        setTimeout(updateTimer, timeBetweenUpdatesInMilliseconds);
      }
    } else {
      timerEnd += 1000;
      setTimeout(updateTimer, timeBetweenUpdatesInMilliseconds);
    }
  }  
  
  
  /*---- Click events ----*/
  
  // session Timer Buttons
  $("#session-plus").click(function() {
    sessionTimer++;
    if (sessionTimer < 10) {
      $("#session").html("0" + sessionTimer + ":00");
    } else {
      $("#session").html(sessionTimer + ":00");
    }
    
    
    if (state === TimerState.NO_TIMER) {
      if (sessionTimer < 10) {
        $("#clock-timer").html("0" + sessionTimer + ":00");
      } else {
        $("#clock-timer").html(sessionTimer + ":00");
      }
      
    }
  });


  $("#session-minus").click(function() {
    if (sessionTimer !== 0) {
      sessionTimer--;
      if (sessionTimer < 10) {
        $("#session").html("0" + sessionTimer + ":00");
      } else {
        $("#session").html(sessionTimer + ":00");
      }
      
      if (state === TimerState.NO_TIMER) {
        if (sessionTimer < 10) {
          $("#clock-timer").html("0" + sessionTimer + ":00");
        } else {
          $("#clock-timer").html(sessionTimer + ":00");
        }
      }
    }
  });
  

  // Break Timer Buttons
  $("#break-plus").click(function() {
    breakTimer++;
    $("#break").html(breakTimer + ":00");
  });


  $("#break-minus").click(function() {
    if (breakTimer !== 0) {
      breakTimer--;
      $("#break").html(breakTimer + ":00");
    }
  });
  
  
  $("#play").click(function() {
    if (state === TimerState.NO_TIMER) {
      isPaused = false;
      $(this).toggle();
      $("#pause").toggle();
      state = TimerState.session_TIMER;
      timerEnd = Date.now() + sessionTimer * millisecondsToMinutesConverter;
      updateTimer();
    } else {
      if (isPaused) {
        isPaused = false;
        $(this).toggle();
        $("#pause").toggle();
      }
    } 
  });
  
  
  $("#pause").click(function() {
    if (!isPaused) {
      isPaused = true;
      $(this).toggle();
      $("#play").toggle();
    }
  });
  
  
  $("#reset").click(function() {
    if (state === TimerState.session_TIMER || state === TimerState.BREAK_TIMER) {
      state = TimerState.NO_TIMER;
      
      if (!isPaused) {
        $("#pause").css("display", "none");
        $("#play").css("display", "inline-block");
      }
      
      isPaused = true;
      if (sessionTimer < 10) {
        $("#clock-timer").html("0" + sessionTimer + ":00");
      } else {
        $("#clock-timer").html(sessionTimer + ":00");
      }
    }
  });
});