$(function () {
  $('#result-table').tablesorter();
  $('#copy-btn').tooltip({trigger: 'manual'});
  $('#copy-btn').hover(function(){
    $(this).attr('title', 'Copy to clipboard')
      .tooltip('fixTitle')
      .tooltip('show');
  }, function(){
    $(this).tooltip('hide');
  });
  $('#copy-btn').on('click', function () {
    var text = document.getElementById("result-table").innerText;
    copyClipboard(text);
    $(this).attr('title', 'Copied!')
      .tooltip('fixTitle')
      .tooltip('show');
  });

  function copyClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.cssText = "position:absolute;left:-100%";
    document.body.appendChild(textArea);
    textArea.value = text;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
});
