$(document).ready(function(){
  var getItems = function(){
    $.ajax({
      type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
      dataType: 'json',
      success: function(response){
        $('#toAppend').children().remove();
        for (i=0; i<response.length; i++){
          var userID=response[i]._id;
          var userName=response[i].user;
          var userTitle=response[i].title;
          var userText=response[i].text;
          var htmlToAppend = "<tr>";
          htmlToAppend += "<td>"+userID+"</td>";
          htmlToAppend += "<td>"+userName+"</td>";
          htmlToAppend += "<td>"+userTitle+"</td>";
          htmlToAppend += "<td>"+userText+"</td>";
          htmlToAppend += "</tr>";
          $("#toAppend").append(htmlToAppend);
        }
      }
    });
  }

  getItems();

  $("#btn-create").click(function(){
    if (($('#user').val()!="")&&($('#title').val()!="")&&($('#text').val()!="")){
      $.ajax({
        type: 'POST',
        url: 'http://ga-wdi-api.meteor.com/api/posts/',
        data: {
          user: $('#user').val(),
          title: $('#title').val(),
          text: $('#text').val(),
          x: Date.parse("2011-02-10"),
          dateCreated: new Date()
        },
        dataType: 'json',
        success: function(){
          console.log("Success!");
          getItems();
        } 
      });
    }
  });

  $("#btn-update").click(function(){
    if (($('#user').val()!="")&&($('#title').val()!="")&&($('#text').val()!="")&&($('#postid').val()!="")){
      urlID = $('#postid').val();
      urlID = 'http://ga-wdi-api.meteor.com/api/posts/'+urlID;
      $.ajax({
        type: 'PUT',
        url: urlID,
        data: {
          user: $('#user').val(),
          title: $('#title').val(),
          text: $('#text').val(),
          x: Date.parse("2011-02-10"),
          dateCreated: new Date()
        },
        dataType: 'json',
        success: function(){
          console.log("Success!");
          getItems();
        } 
      });
    }
  });

  $("#btn-delete").click(function(){
    if ($('#Delete').val()!=""){
      urlID = $('#Delete').val();
      urlID = 'http://ga-wdi-api.meteor.com/api/posts/'+urlID;
      $.ajax({
        type: 'DELETE',
        url: urlID,
        success: function(){
          console.log("Success!");
          getItems();
        } 
      });
    }
  });
});