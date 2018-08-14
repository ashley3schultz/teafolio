$(function(){
  $('#new_post').submit(function(e){e.preventDefault(); createPost(this)})
  $('#new_post textarea').on('click', function(e){resethidden()})
})

function postProfile(info){
  var postid = info.data.id
  var post = info.data.attributes
  return $(`#postid-${postid}`).html(`<div class="show-profile" id="postprofile-${postid}">
  <p><strong><a href='/users/${post.user_id}'>${post.user.username}</a>: </strong>${post.content}</p>
  <h5 class='tight'><a href="javascript:renderEditForm(${postid})">Edit </a>
  <a data-confirm="Are you sure you want to delete this post?" rel="nofollow" data-method="delete" href="/posts/${postid}">Delete</a></h5></div></div>
  <div class="hide-form" id="postform-${postid}">
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
    $("#posts").append(`<div class='profile' id='postid-${info.data.id}'></div>`)
    postProfile(info)
    $('#new_post textarea').val('')
    $("input").removeAttr('disabled')
  })
}

function resethidden(){
  $('.show-form').attr('class', 'hide-form')
  $('.hide-profile').attr('class', 'show-profile')
}

function renderEditForm(postid){
  resethidden()
  $(`#postform-${postid}`).attr('class', 'show-form')
  $(`#postprofile-${postid}`).attr('class', 'hide-profile')
  $(`#edit_post_${postid}`).submit(function(e){e.preventDefault(); updatePost(this)})
}

function updatePost(obj){
  var path = $('.show-form form.edit_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    postProfile(info)
    resethidden()
  })
}

function rateTea(teaid, num){
  var posting = $.get(`/teas/${teaid}/rate/${num}.json`)
  posting.done(function(info){
    var id = info.id
    $(`#teaid-${id} button.selected`).attr('class', 'rate-button')
    $(`#teaid-${id} button#rate-${num}`).attr('class', 'selected')
  })
}

function addTea(teaid){
  var posting = $.get(`/teas/${teaid}/add`)
  posting.done(function(info){
    var id = info.id
    $(`#teaid-${id} div.add-rmv`).html(`
      <button class="rate-button" id='rate-1'><a href="javascript:rateTea(${id}, 1)">1</a></button>
      <button class="rate-button" id='rate-2'><a href="javascript:rateTea(${id}, 2)">2</a></button>
      <button class="rate-button" id='rate-3'><a href="javascript:rateTea(${id}, 3)">3</a></button>
      <button class="rate-button" id='rate-4'><a href="javascript:rateTea(${id}, 4)">4</a></button>
      <button class="rate-button" id='rate-5'><a href="javascript:rateTea(${id}, 5)">5</a></button>
      <h5 class="tight"><a href="javascript:rmvTea(${id})">Remove from collection</a></h5>`)
  })
}

function rmvTea(teaid){
  var posting = $.get(`/teas/${teaid}/remove.json`)
  posting.done(function(info){
    var id = info.id
    $(`#teaid-${id} div.add-rmv`).html(`<h5 class="tight"><a href="javascript:addTea(${id})">Add to collection</a></h5>`)
    $(`#teaid-${id} div.tea-rate`).text(``)
  })
}
