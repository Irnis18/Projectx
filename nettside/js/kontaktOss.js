$(document).ready(function() {
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
