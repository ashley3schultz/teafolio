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
    return `${this.name}${this.aka ? `, AKA: ${this.aka}` : ''} (${this.posts.length})`
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
}

$(function(){
  $('#search').on('input', function(e){e.preventDefault(); search(this)})
  $('#new_post').submit(function(e){e.preventDefault(); createPost(this)})
  $('#new_post textarea').on('click', function(e){resethidden()})
})

function search(item){
  $('.show').attr('class', 'hide')
  $('#show-search').empty()
  var string = $('#search').val()
  $.get(`/search/${string}.json`, function(info){
    info.data.forEach(function(t){
      tea = new Tea(t)
      $('#show-search').append(`<div class="profile" id="teaid-${tea.id}">
        <h2 class="tight">${tea.oxidation} Tea</h2>
        <h3 class="tight"><a href="/teas/${tea.id}">${tea.fullName()}</a></h3>
        ${tea.description}<br><div class="add-rmv"></div></div>`)
        teaBtns(tea.id)
    })
  })
}


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
  $(`#postid-${post.id} #post_tea_id`).val(`${post.tea_id}`)
  $(`#postid-${post.id} #post_user_id`).val(`${post.user_id}`)
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
    $('#new_post textarea').val('')
    $("input").removeAttr('disabled')
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
        $(`#teaid-${id} #rate-${num}`).attr("class", "selected");
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
    type: 'DELETE',
    url: `/posts/${postid}`,
    success: function(){
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

function toggleView(view){
  $('#show-search').empty()
  if(view === 'all'){
    $(`.hide`).attr('class', 'show')
  }else{
    $(`.show`).attr('class', 'hide')
    $(`#${view}`).attr('class', 'show')
  }
}

function timer() {
  var min = $('#min').val()
  var sec = $('#sec').val()
  if((min > 0) || (sec > 0)){
    if(sec == 0){
      if(min < 11){min = '0' + --min}else{--min}
      $('#min').val(`${min}`)
      $('#sec').val(`59`)
    }else{
      if(sec < 11){sec = '0' + --sec}else{--sec}
      $('#sec').val(`${sec}`)
    }
    setTimeout(timer, 1000);
  }else{
    $('#min').val('')
    $('#sec').val('')
    alert('alarm')
  }
}

function toggleAdmin(userid){
  $.ajax({
    type: 'PATCH',
    url: `/users/${userid}.json`,
    success: function(info){
      var user = info.data.attributes
      $(`#userid-${userid} h6.tight`).html(`
        <a data-confirm="Are you sure you change status for
        ${'user.username'}?"
        rel="nofollow" data-method="put"
        href="javascript:toggleAdmin(${userid})">
        ${user.admin ? 'remove' : 'grant'} admin permission</a>`)
    }
  })
}

function updateTea(obj){
  var path = $('.show-form form.edit_tea').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    tea= new Tea(info.data)
    $(`#teaprofile-${tea.id}`).html(`
        <h2 class="tight">${tea.oxidation} Tea</h2>
        <h3 class="tight"><a href="/teas/${tea.id}">${tea.fullName()}</a></h3>
        ${tea.description}<br></div>
        <h5 class="tight"><a href="javascript:renderTeaForm(${tea.id})">Edit</a> |
        <a rel="nofollow" data-method="delete" href="javascript:deleteTea(${tea.id})">Delete</a></h5>`)
    resethidden()
    $("input").removeAttr('disabled')
  })
}

function renderTeaForm(teaid){
  resethidden()
  $(`#teaform-${teaid}`).attr('class', 'show-form')
  $(`#teaprofile-${teaid}`).attr('class', 'hide-profile')
  $(`#edit_tea_${teaid}`).submit(function(e){e.preventDefault(); updateTea(this)})
}

function deleteTea(teaid){
  $.ajax({
    type: 'DELETE',
    url: `/teas/${teaid}`,
    success: function(){
      $(`#teaid-${teaid}`).html('')
    }
  })
}
