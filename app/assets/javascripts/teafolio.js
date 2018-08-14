$(function(){
  $('#new_post').submit(function(e){e.preventDefault(); createPost(this)})
})

function postProfile(info){
  var postid = info.data.id
  var post = info.data.attributes
  return $(`#postid-${postid}`).html(`
  <div class="showprofile" id="postprofile-${postid}">
  <p><strong><a href='/users/${post.user_id}'>${post.user.username}</a>: </strong>${post.content}</p>
  <h5 class='tight'><a href="javascript:renderEditForm(${postid})">Edit </a>
  <a data-confirm="Are you sure you want to delete this post?" rel="nofollow" data-method="delete" href="/posts/${postid}">Delete</a></h5></div></div>
  <div class="hiddenform" id="postform-${postid}">
  <form class="edit_post" id="edit_post_${postid}" action="/posts/${postid}" accept-charset="UTF-8" method="post">
  <input name="utf8" type="hidden" value="✓">
  <input type="hidden" name="_method" value="patch">
  <input type="hidden" name="authenticity_token" value="HYSWQOsIbxMpLV+HJ4XQ06o0RnE5cllbQMeMJR2zV0HFac6H+Uk0cUX5ONovZEkRVA5LON/wYm/d8F3TCdPxmg==">
  <textarea placeholder="Content " name="post[content]" id="post_content">${post.content}</textarea>
  <input value="${'teaid'}" type="hidden" name="post[tea_id]" id="post_tea_id">
  <input value="${info.id}" type="hidden" name="post[user_id]" id="post_user_id">
  <input type="submit" name="commit" value="Publish" data-disable-with="Publish"></form></div>`)
}

function createPost(obj){
  var path = $('.new_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    $("#js-posts").append(`<div class='profile' id='postid-${info.data.id}'></div>`)
    postProfile(info)
    $('#post_content').val('')
    $("input").removeAttr('disabled')
  })
}

function resethidden(){
  $('.showform').attr('class', 'hiddenform')
  $('.hiddenprofile').attr('class', 'showprofile')
}

function renderEditForm(postid){
  resethidden()
  $(`#postform-${postid}`).attr('class', 'showform')
  $(`#postprofile-${postid}`).attr('class', 'hiddenprofile')
  $(`#edit_post_${postid}`).submit(function(e){e.preventDefault(); updatePost(this)})
}

function updatePost(obj){
  var path = $('.showform form.edit_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    postProfile(info)
    resethidden()
  })
}
