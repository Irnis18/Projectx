//Function that waits untill all the html is loaded before excecuting
$(document).ready(function() {
  //Function for what to happen when someone tries to contact us through contact us page
  $('#mailBtn').click(function() {
    $('#mailForm').attr(
      'action',
      'mailto:siljmd@stud.ntnu.no?subject=' +
        $('#mailEmne').val() +
        '&body=Avsenders E-post: ' +
        $('#mailAdr').val() +
        escape('\r\n') +
        'Avsenders Navn: ' +
        $('#mailNavn').val() +
        escape('\r\n') +
        'Avsenders Melding: ' +
        escape('\r\n') +
        $('#mailMld').val() +
        escape('\r\n')
    );
    $('#mailForm').submit();
  });
});
