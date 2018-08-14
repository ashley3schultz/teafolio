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
  <a data-confirm="Are you sure you want to delete this post?" href="javascript:deletePost(${postid})">Delete</a></h5></div></div>
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

function deletePost(postid){
  $.ajax({
    type:'DELETE',
    url:`/posts/${postid}.json`,
    data:{id: postid},
    success: function(data){
      $(`#postid-${postid}`).html('')
    }
  })
}

function nextTea(teaid){
  $.get(`/teas/${teaid}.json`, function(data){
    console.log(data)
  })
}

  //   <a href="javascript:nextTea(id)">Next</a>
  //
  //   <div class="profile" id="teaid-13">
  //
  //     <div class="tea-profile">
  //       <h2 class="tight">Black Tea</h2>
  //       <h3 class="tight"><a href="/teas/13">Ruby Black, AKA: Sun Moon Lake (1)</a></h3>
  //       Captivating Black tea unlike any other tea available.<br>
  //
  //     <div class="add-rmv">
  //         <button class="rate-button" id="rate-1"><a href="javascript:rateTea(13, 1)">1</a></button>
  //         <button class="rate-button" id="rate-2"><a href="javascript:rateTea(13, 2)">2</a></button>
  //         <button class="selected" id="rate-3"><a href="javascript:rateTea(13, 3)">3</a></button>
  //         <button class="rate-button" id="rate-4"><a href="javascript:rateTea(13, 4)">4</a></button>
  //         <button class="rate-button" id="rate-5"><a href="javascript:rateTea(13, 5)">5</a></button>
  //         <h5 class="tight"><a href="javascript:rmvTea(13)">Remove from collection</a></h5>
  //     </div></div></div>
  //
  //   <div id="posts">
  //     <div class="profile" id="postid-9">
  //   <div class="show-profile" id="postprofile-9">
  //     <p><strong><a href="/users/1">user1</a>: </strong>very last</p>
  //     <h5 class="tight"><a href="javascript:renderEditForm(9)">Edit</a>
  //     <a data-confirm="Are you sure you want to delete this post?" href="javascript:deletePost(9)">Delete</a></h5>
  //   </div>
  //   <div class="hide-form" id="postform-9">
  //     <form class="edit_post" id="edit_post_9" action="/posts/9" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="_method" value="patch"><input type="hidden" name="authenticity_token" value="GGRaKRhE7J8oESYCumuLBOeY1jpSN5AMwXy1ZulUhQxyH0GV/99hOHqNPiIqT/H/BURRwH/pll6gby1xTS31gg==">
  //   <label for="post_user1">User1</label><br>
  //   <textarea placeholder="Content " name="post[content]" id="post_content">very last</textarea>
  //   <input value="13" type="hidden" name="post[tea_id]" id="post_tea_id">
  //   <input value="1" type="hidden" name="post[user_id]" id="post_user_id">
  //   <input type="submit" name="commit" value="Publish" data-disable-with="Publish">
  // </form>
  //   </div></div></div>
  //
  // <form class="new_post" id="new_post" action="/posts" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="GGRaKRhE7J8oESYCumuLBOeY1jpSN5AMwXy1ZulUhQxyH0GV/99hOHqNPiIqT/H/BURRwH/pll6gby1xTS31gg==">
  //   <label for="post_user1">User1</label><br>
  //   <textarea placeholder="Content " name="post[content]" id="post_content"></textarea>
  //   <input value="13" type="hidden" name="post[tea_id]" id="post_tea_id">
  //   <input value="1" type="hidden" name="post[user_id]" id="post_user_id">
  //   <input type="submit" name="commit" value="Publish" data-disable-with="Publish">
  // </form>
