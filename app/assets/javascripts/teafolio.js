$(function(){
  $('#new_post').submit(function(e){e.preventDefault(); createPost(this)})
})

function createPost(obj){
  var path = $('.new_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(p + '.json', values)
  posting.done(function(info){
    var postid = info.data.id
    var post = info.data.attributes
    $("#js-posts").append(`
  <div class='profile' id='postid-${postid}'>
  <p><strong><a href='/users/${post.user_id}'>${post.user.username}</a>: </strong>${post.content}</p>
  <h5 class='tight'><a href="javascript:renderEditForm(${postid})">Edit</a> <a href="javascript:deletePost(${postid})">Delete</a></h5></div>`)
  $('#post_content').val('')
  $("input").removeAttr('disabled')
  })
}

function renderEditForm(postid){
  $('.showform').attr('class', 'hiddenform')
  $('.hiddenprofile').attr('class', 'showprofile')
  $(`#postform-${postid}`).attr('class', 'showform')
  $(`#postprofile-${postid}`).attr('class', 'hiddenprofile')
  $(`#edit_post_${postid}`).submit(function(e){e.preventDefault(); updatePost(this)})
}

function updatePost(obj){
  var path = $('.showform form.edit_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    var postid = info.data.id
    var post = info.data.attributes
    $(`#postid-${postid}`).html(`
  <div class='profile' id='postid-${postid}'>
  <p><strong><a href='/users/${post.user_id}'>${post.user.username}</a>: </strong>${post.content}</p>
  <h5 class='tight'><a href="javascript:renderEditForm(${postid})">Edit</a> <a href="javascript:deletePost(${postid})">Delete</a></h5></div>`)
  $('.showform').attr('class', 'hiddenform')
  $('.hiddenprofile').attr('class', 'showprofile')
  })
}
