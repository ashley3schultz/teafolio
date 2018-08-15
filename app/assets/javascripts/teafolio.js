class Tea {
  constructor(data){
    console.log(data)
    this.id = data.id
    this.name = data.attributes.name
    this.aka = data.attributes.aka
    this.oxidation = data.attributes.oxidation
    this.description = data.attributes.description
    this.posts = data.attributes.posts
  }
  fullName(){
    return `${this.name}, AKA: ${this.aka} (${this.posts.length})`
  }
}

class Post {
  constructor(data){
    this.id = data.id
    this.content = data.attributes.content
    this.user_id = data.attributes.user_id
    this.tea_id = data.attributes.tea_id
    this.user = data.attributes.user
    this.tea = data.attributes.tea
  }
  description(){
    return `${this.user.username}: ${this.content}`
  }
}

$(function(){
  $('#new_post').submit(function(e){e.preventDefault(); createPost(this)})
  $('#new_post textarea').on('click', function(e){resethidden()})
})

function postProfile(post){
  return $(`#postid-${post.id}`).html(`
    <div class="show-profile" id="postprofile-${post.id}">
      <p><strong><a href='/users/${post.user_id}'>${post.user.username}</a>: </strong>${post.content}</p>
      <h5 class='tight'><a href="javascript:renderEditForm(${post.id})">Edit </a>
      <a data-confirm="Are you sure you want to delete this post?" href="javascript:deletePost(${post.id})">Delete</a></h5></div></div>
      <div class="hide-form" id="postform-${post.id}">${$('#newForm')[0].innerHTML}
    </div>`)
}

function fillEditForm(post){
  $(`#postid-${post.id} form`).attr('class', 'edit_post')
  $(`#postid-${post.id} form`).attr('id', `edit_post_${post.id}`)
  $(`#postid-${post.id} form`).attr('action', `/posts/${post.id}`)
  $(`#postid-${post.id} textarea`).val(`${post.content}`)
  $(`#postid-${post.id} form`).append(`<input type="hidden" name="_method" value="patch">`)
}


function createPost(obj){
  var path = $('.new_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    $("#posts").append(`<div class='profile' id='postid-${info.data.id}'></div>`)
    post = new Post(info.data)
    postProfile(post)
    fillEditForm(post)
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
    post = new Post(info.data)
    postProfile(post)
    fillEditForm(post)
    resethidden()
  })
}

function rateTea(teaid, num){
  var posting = $.get(`/teas/${teaid}/rate/${num}.json`)
  posting.done(function(info){
    var id = info.data.id
    $(`#teaid-${id} button.selected`).attr('class', 'rate-button')
    $(`#teaid-${id} button#rate-${num}`).attr('class', 'selected')
  })
}

function teaBtns(id){
  $.get(`/teas/${id}/owner.json`, function(resault){
    if(!!resault){
      $(`#teaid-${id} div.add-rmv`).html(`
        <button class="rate-button" id='rate-1'><a href="javascript:rateTea(${id}, 1)">1</a></button>
        <button class="rate-button" id='rate-2'><a href="javascript:rateTea(${id}, 2)">2</a></button>
        <button class="rate-button" id='rate-3'><a href="javascript:rateTea(${id}, 3)">3</a></button>
        <button class="rate-button" id='rate-4'><a href="javascript:rateTea(${id}, 4)">4</a></button>
        <button class="rate-button" id='rate-5'><a href="javascript:rateTea(${id}, 5)">5</a></button>
        <h5 class="tight"><a href="javascript:rmvTea(${id})">Remove from collection</a></h5>`)
      $.get(`/teas/${id}/rate.json`, function(num){
        document.getElementById(`rate-${num}`).setAttribute("class", "selected");
      })
    }else{
      $(`#teaid-${id} div.add-rmv`).html(`
        <h5 class="tight"><a href="javascript:addTea(${id})">Add to collection</a></h5>`)
    }
  })
}

function addTea(teaid){
  var posting = $.get(`/teas/${teaid}/add.json`)
  posting.done(function(info){
    teaBtns(info.data.id)
  })
}

function rmvTea(teaid){
  var posting = $.get(`/teas/${teaid}/remove.json`)
  posting.done(function(info){
    teaBtns(info.data.id)
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

function teaProfile(tea){
  $('.tea').html(`<div class="profile" id="teaid-${tea.id}">
    <h2 class="tight">${tea.oxidation} Tea</h2>
    <h3 class="tight"><a href="/teas/${tea.id}">${tea.fullName()}</a></h3>
    ${tea.description}<br><div class="add-rmv"></div></div>`)
    teaBtns(tea.id)
}

function teaPosts(posts){
  posts.forEach(function(post){
    $("#posts").append(`<div class='profile' id='postid-${post.id}'></div>`)
    var posting = $.get(`/posts/${post.id}.json`)
    posting.done(function(info){
      post = new Post(info.data)
      postProfile(post)
      fillEditForm(post)
    })
  })
}

function nextTea(teaid){
  var username = $('#new_post label').html()
  var userid = $('#post_user_id').val()
  var form = $('#newForm')[0].innerHTML
  $.get(`/teas/${++teaid}.json`, function(info){
    tea = new Tea(info.data)
    $('.tea-page').html(`
      <a href="javascript:nextTea(${tea.id})">Next</a>
      <div class="tea"></div>
      <div id="posts"></div>
      <div id="newForm">${form}</div>`)
      teaProfile(tea)
      teaPosts(tea.posts)
      $(`#new_post input#post_tea_id`).val(`${tea.id}`)
  })
}

function profileView(view){
  if(view === 'all'){
    $(`.hide`).attr('class', 'show')
    $(`#all`).attr('class', 'show-all')
  }else{
    $(`.show`).attr('class', 'hide')
    $(`#${view}`).attr('class', 'show')
  }
}
