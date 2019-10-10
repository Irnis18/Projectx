$(document).ready(function() {
  $("#btnChk").click(function() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      $("#txtUt").text(
        "Beklager, denne funksjonaliteten fungerer ikke på mobile enheter"
      );
    } else if (/Edge/.test(navigator.userAgent)) {
      console.log("User has Edge installed.");
      $("#txtUt").text(
        "Du har Microsoft Edge, versjon " + navigator.userAgent.slice(121, 123)
      );
    } else if (
      /Opera/.test(navigator.userAgent) ||
      /OPR/.test(navigator.userAgent)
    ) {
      console.log("User has Opera installed.");
      $("#txtUt").text(
        "Du har Opera, versjon " + navigator.userAgent.slice(119, 120)
      );
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      console.log("User has Firefox installed.");
      $("#txtUt").text(
        "Du har Firefox, versjon " + navigator.userAgent.slice(74, 76)
      );
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      console.log("User has Chrome installed.");
      $("#txtUt").text(
        "Du har Google Chrome, versjon " + navigator.userAgent.slice(88, 90)
      );
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      console.log("User has Safari installed.");
      $("#txtUt").text("Du har Safari, versjonummeret kan ikke hentes");
    } else {
      console.log("User has a unknown browser installed");
      $("#txtUt").text("Du har en ukjent nettleser innstallert");
    }
  });
});
