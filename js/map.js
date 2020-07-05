function checkAgent() {
  $('#agents').change(function(){
    switch ($('#agents').val()) {
      case 'sova':
        console.log('Sova')
        $('#subtype').append($('<option>', {
          value: 'shock',
          text: 'Shock Darts',
        }, '</option><option>', {
          value: 'recon',
          text: 'Recon Darts'
        }));
        break;
      case 'sage':
        break;
      case 'jett':
        break;
      case 'rage':
        break;
      default:
        break;
    }
  });
}

checkAgent();
