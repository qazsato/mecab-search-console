// import
window.jQuery = $ = require('../components/jquery/jquery-2.1.4.min');
require('../components/bootstrap/js/bootstrap');

$(function () {
  var text = "";
  $("#drop-zone").on("dragover", function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = "copy";
  });

  $("#drop-zone").on("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.originalEvent.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onprogress = function (e) {
      if (e.lengthComputable) {
        var percentLoaded = Math.round((e.loaded / e.total) * 100);
        console.log(percentLoaded);
        if (percentLoaded <= 100) {
          $('.progress-bar')
            .attr('aria-valuenow', percentLoaded)
            .css('width', percentLoaded + '%')
            .text(percentLoaded + '%');
        }
      }
    };

    reader.onload = function (e) {
      text = e.target.result;
      $("#import-btn").removeAttr("disabled");
      var list = "<li>" +
                    "<strong>" + escape(file.name) + "</strong>" +
                    " (" + file.type + ")" +
                    " - " + file.size + " bytes," +
                    " last modified: " + file.lastModifiedDate.toLocaleDateString() +
                  "</li>";
      $("#file-list").append(list);
    };

    reader.readAsText(file, "Shift_JIS");
  });

  $("#import-btn").on("click", function () {
    $.ajax({
      type: "GET",
      url: "/mecab",
      data: {
        text: text
      },
      success: function (res) {
        console.log(res);
      }
    });
  });
});
