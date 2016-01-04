// import
window.jQuery = $ = require('../components/jquery/jquery-2.1.4.min');
require('../components/bootstrap/js/bootstrap');

$(function () {
  $('#drop-zone').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = 'copy';
  });

  $('#drop-zone').on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.originalEvent.dataTransfer.files[0];

    var arr = file.name.split(".");
    var extention = arr[arr.length - 1];
    if (extention.toLowerCase() !== "csv") {
      alert("Please drop the CSV file.");
      return;
    }

    var reader = new FileReader();

    reader.onloadstart = function(e) {
      // UI初期化
      $('.progress-bar')
        .attr('aria-valuenow', 0)
        .css('width', '0%')
        .text('0%');
      $('input[name="data"]').val('');
      $('button[type="submit"]').attr('disabled', 'disabled');
      $('#file-list').empty();
    };

    reader.onprogress = function (e) {
      if (e.lengthComputable) {
        var percentLoaded = Math.round((e.loaded / e.total) * 100);
        if (percentLoaded <= 100) {
          $('.progress-bar')
            .attr('aria-valuenow', percentLoaded)
            .css('width', percentLoaded + '%')
            .text(percentLoaded + '%');
        }
      }
    };

    reader.onload = function (e) {
      $('input[name="data"]').val(e.target.result);
      $('button[type="submit"]').removeAttr('disabled');
      var list = '<li>' +
                    '<strong>' + escape(file.name) + '</strong>' +
                    ' (' + file.type + ')' +
                    ' - ' + file.size + ' bytes,' +
                    ' last modified: ' + file.lastModifiedDate.toLocaleDateString() +
                  '</li>';
      $('#file-list').append(list);
    };

    reader.readAsText(file, 'UTF-8');
  });
});
