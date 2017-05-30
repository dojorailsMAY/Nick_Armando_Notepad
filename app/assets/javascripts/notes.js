$(document).ready(function(){

  assignNewFormHandlers()

  assignNoteClickHandler()

})

function assignNoteClickHandler(){

    $("#notes-container").on("click", ".note p", function (){
      // var title = $(this).children("h2").text()
      var body = $(this).text()
      var htmlString = '<form id="editing"><textarea id="editing-body" name="body" class="form-control">'+body+'</textarea></form>'


      $(this).parent().html(htmlString)

      $('#editing-body').blur(function(){

        var url = "/notes/" + $('#editing').parent().attr('note-id') + "/update"
        console.log(url)
        console.log()
        console.log($('#editing').serialize())

        $.post({

          url: url,
          data: $('#editing').serialize(),
          success: function(res){
            var body = $('#editing-body').val()
            var htmlString = "<p>"+ body +"</p>"

            $('#editing').parent().html(htmlString)

          }

        })

      });
    });


}


function assignNewFormHandlers(){


    $('#new-form-title').one('click', function(){
      $("#new-form-title").after('<textarea id="new-form-body" class = "form-control" name="body"></textarea>')
    })

    $('#new-note-button').one('click', function(event){

        event.preventDefault();
        console.log($('#new-note').serialize())
        $.post({
          url: '/notes',
          data: $('#new-note').serialize(),
          success: function(res){

            console.log(res)

            htmlString = "<div class='note'><h2>" + res.title + "</h2><div class='text-box' note-id='" + res.id + "'><p>" + res.body + "</p></div></div>"

            $('#notes-container').append(htmlString)

            $('#new-note').html('<input id="new-form-title" class="form-control" type="text" name="title" value="" placeholder="Insert note title here..."><button id="new-note-button" class="btn btn-primary" type="submit">Add Note</button>')

            assignNewFormHandlers()
            assignNoteClickHandler()


          }
        })


    })




}
