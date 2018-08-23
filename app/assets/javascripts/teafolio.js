/// CLASSES ////////////////////////////////////////////////////////////////////

class Tea {
  constructor(data){
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

/// LISTENERS //////////////////////////////////////////////////////////////////

$(function(){
  $('#search').on('input', function(e){e.preventDefault(); search(this)})
  $('#new_post').submit(function(e){e.preventDefault(); createPost(this)})
  $('#new_post textarea').on('click', function(e){resethidden()})
})

/// HELPERS ////////////////////////////////////////////////////////////////////

function resethidden(){
  $('.show-form').attr('class', 'hide-form')
  $('.hide-profile').attr('class', 'show-profile')
}

function renderForm(id, obj){
  resethidden()
  $(`#${obj}form-${id}`).attr('class', 'show-form')
  $(`#${obj}profile-${id}`).attr('class', 'hide-profile')
  $(`#edit_${obj}_${id}`).submit(function(e){
    e.preventDefault();
    if (obj === 'tea'){
      updateTea(this)
    }else{
      updatePost(this)
    }
  })
}

/// POST TEMPLATES /////////////////////////////////////////////////////////////

function postForm(post){
  $(`#postid-${post.id}`).append(`
  <div class="hide-form" id="postform-${post.id}">${$('#newForm')[0].innerHTML}</div>`)
  $(`#postid-${post.id} form`).attr('class', 'edit_post')
  $(`#postid-${post.id} form`).attr('id', `edit_post_${post.id}`)
  $(`#postid-${post.id} form`).attr('action', `/posts/${post.id}`)
  $(`#postid-${post.id} textarea`).val(`${post.content}`)
  $(`#postid-${post.id} #post_tea_id`).val(`${post.tea_id}`)
  $(`#postid-${post.id} #post_user_id`).val(`${post.user_id}`)
  $(`#postid-${post.id} form`).append(`<input type="hidden" name="_method" value="patch">`)
}

function postBtns(post){
  $.post(`/posts/${post.id}/owner.json`, function(owner){
    if(owner){
      $(`#postid-${post.id}`).append(`
        <h5 class='tight'><a href="javascript:renderForm(${post.id}, 'post')">Edit </a>
        <a data-confirm="Are you sure you want to delete this post?" href="javascript:deletePost(${post.id})">Delete</a></h5>`)
      postForm(post)
    }
  })
  $.post(`/admin.json`, function(admin){
    if(admin){
      $(`#postid-${post.id}`).append(`<h5 class='tight'>
        <a data-confirm="Are you sure you want to delete this post?"
        href="javascript:deletePost(${post.id})">Delete</a></h5>`)
    }
  })
}

function postProfile(post){
  $(`#postid-${post.id}`).html(`
    <div class="show-profile" id="postprofile-${post.id}">
      <p><strong><a href='/users/${post.user_id}'>${post.user.username}</a>: </strong>${post.content}</p>
    </div>`)
  postBtns(post)
}

/// TEA TEMPLATES //////////////////////////////////////////////////////////////

function teaForm(tea, sec) {
  $(`${sec}#teaid-${tea.id}`).append(`<div class="hide-form" id="teaform-${tea.id}">${$('#newForm')[0].innerHTML}</div>`)
  $(`${sec}#teaid-${tea.id} form`).attr('class', 'edit_tea')
  $(`${sec}#teaid-${tea.id} form`).attr('id', `edit_tea_${tea.id}`)
  $(`${sec}#teaid-${tea.id} form`).attr('action', `/teas/${tea.id}`)
  $(`${sec}#teaid-${tea.id} input#tea_oxidation`).val(`${tea.oxidation}`)
  $(`${sec}#teaid-${tea.id} input#tea_name`).val(`${tea.name}`)
  $(`${sec}#teaid-${tea.id} input#tea_aka`).val(`${tea.aka}`)
  $(`${sec}#teaid-${tea.id} textarea#tea_description`).val(`${tea.description}`)
  $(`${sec}#teaid-${tea.id} input#tea_id`).val(`${tea.id}`)
  $(`${sec}#teaid-${tea.id} form`).append(`<input type="hidden" name="_method" value="patch">`)
}

function teaBtns(tea, sec = ''){
  $.post(`/teas/${tea.id}/owner.json`, function(owner){
    if(owner){
      $(`${sec}#teaid-${tea.id} div.add-rmv`).html(`
        <button class="rate-button" id='rate-1'><a href="javascript:rateTea(${tea.id}, 1)">1</a></button>
        <button class="rate-button" id='rate-2'><a href="javascript:rateTea(${tea.id}, 2)">2</a></button>
        <button class="rate-button" id='rate-3'><a href="javascript:rateTea(${tea.id}, 3)">3</a></button>
        <button class="rate-button" id='rate-4'><a href="javascript:rateTea(${tea.id}, 4)">4</a></button>
        <button class="rate-button" id='rate-5'><a href="javascript:rateTea(${tea.id}, 5)">5</a></button>
        <h5 class="tight"><a href="javascript:rmvTea(${tea.id})">Remove from collection</a></h5>`)
    }else{
      $.post(`/admin.json`, function(admin){
        if(admin){
          $(`${sec}#teaid-${tea.id} div.add-rmv`).html(`<h5 class="tight"><a href="javascript:renderForm(${tea.id}, 'tea')">Edit</a> | <a href="javascript:deleteTea(${tea.id})">Delete</a></h5>`)
          teaForm(tea, sec)
        }else{
          $(`${sec}#teaid-${tea.id} div.add-rmv`).html(`<h5 class="tight"><a href="javascript:addTea(${tea.id})">Add to collection</a></h5>`)
        }
      })
    }
    if(owner){
      $.get(`/teas/${tea.id}/rate.json`, function(num){
        $(`${sec}#teaid-${tea.id} #rate-${num}`).attr("class", "selected");
      })
    }
  })
}

function teaProfile(tea, sec = ''){
  $(`${sec}#teaid-${tea.id}`).html(`
    <div class="show-profile" id='teaprofile-${tea.id}'>
    <h2 class="tight">${tea.oxidation} Tea</h2>
    <h3 class="tight"><a href="/teas/${tea.id}">${tea.fullName()}</a></h3>
    ${tea.description}<br>
    <div class="add-rmv"></div></div>`)
    teaBtns(tea, sec)
}

function teaPosts(posts){
  $("#posts").html('')
  posts.forEach(function(post){
    $("#posts").append(`<div class='profile' id='postid-${post.id}'></div>`)
    var posting = $.get(`/posts/${post.id}.json`)
    posting.done(function(info){
      post = new Post(info.data)
      postProfile(post)
    })
  })
}

/// POSTS //////////////////////////////////////////////////////////////////////

function createPost(obj){
  var path = $('.new_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    $("#posts").append(`<div class='profile' id='postid-${info.data.id}'></div>`)
    post = new Post(info.data)
    postProfile(post)
    $('#new_post textarea').val('')
    $("input").removeAttr('disabled')
  })
}

function updatePost(obj){
  var path = $('.show-form form.edit_post').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    post = new Post(info.data)
    postProfile(post)
    resethidden()
    $('#new_post textarea').val('')
    $("input").removeAttr('disabled')
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
  var p = $(`#postQty`).html()
  $(`#postQty`).html(--p)
}

/// TEAS FEATURES //////////////////////////////////////////////////////////////

function alpha(){
  var type = $('#sortAtoZ').attr('class')
  $('.show').attr('class', 'hide')
  $('#show-search').empty()
  var posting = $.get(`/teas.json`)
  posting.done(function(info){
    var teas = info.data.sort(function(a, b){
      var aName = a.attributes.name.toLowerCase()
      var bName = b.attributes.name.toLowerCase()
      if(aName < bName){
        return -1
      }else{
        return 1
      }
    })
    teas.forEach(function(t){
      tea = new Tea(t)
      if(tea.oxidation === type || type === 'all'){
        $('#show-search').append(`<div class="profile" id="teaid-${tea.id}">`)
        teaProfile(tea, '#show-search div')
      }
    })
  })
}

function addTea(teaid){
  var posting = $.get(`/teas/${teaid}/add.json`)
  posting.done(function(info){
    tea = new Tea(info.data)
    teaBtns(tea)
  })
}

function rmvTea(teaid){
  var posting = $.get(`/teas/${teaid}/remove.json`)
  posting.done(function(info){
    tea = new Tea(info.data)
    teaBtns(tea)
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

function nextTea(teaid){
  var form = $('#newForm')[0].innerHTML
  $.get(`/teas/${++teaid}.json`, function(info){
    tea = new Tea(info.data)
    $('.tea').html(`
      <a href="javascript:nextTea(${tea.id})">Next</a>
      <div class="profile" id="teaid-${tea.id}"></div>`)
      teaProfile(tea)
      teaPosts(tea.posts)
      $(`#new_post input#post_tea_id`).val(`${tea.id}`)
  })
}

/// TEAS ///////////////////////////////////////////////////////////////////////

function updateTea(obj){
  var path = $('.show-form form.edit_tea').attr('action')
  var values = $(obj).serialize()
  var posting = $.post(path + '.json', values)
  posting.done(function(info){
    tea= new Tea(info.data)
    teaProfile(tea)
    resethidden()
    $("input").removeAttr('disabled')
  })
}

function deleteTea(teaid){
  $.ajax({
    type: 'DELETE',
    url: `/teas/${teaid}`,
    success: function(){
      $(`#teaid-${teaid}`).html('')
    }
  })
  var t = $(`#teaQty`).html()
  $(`#teaQty`).html(--t)
}

/// ADMIN ONLY FEATURES ////////////////////////////////////////////////////////

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

function teaApprove(teaid){
  var obj = $(`#pendform-${teaid}`)[0].innerHTML
  var values = $(obj).serialize()
  var posting = $.post(`/teas.json`, values)
  posting.done(function(info){
    tea = new Tea(info.data)
    $("#allTeas").append(`<div class="profile" id="teaid-${tea.id}">`)
    teaProfile(tea)
  })
  $(`#pendform-${teaid}`).html('')
  var p = $(`#pteaQty`).html()
  $(`#pteaQty`).html(--p)
  var t = $(`#teaQty`).html()
  $(`#teaQty`).html(++t)
}

function teaDeny(teaid){
  $.ajax({
    type: 'DELETE',
    url: `/pending_teas/${teaid}`,
    success: function(){
      console.log('success')
      $(`#pendform-${teaid}`).html('')
    }
  })
  var p = $(`#pteaQty`).html()
  $(`#pteaQty`).html(--p)
}

/// SPECIAL FEATURES ///////////////////////////////////////////////////////////

function search(item){
  $('.show').attr('class', 'hide')
  $('#show-search').empty()
  var string = $('#search').val()
  $.get(`/search/${string}.json`, function(info){
    info.data.forEach(function(t){
      tea = new Tea(t)
      $('#show-search').append(`<div class="profile" id="teaid-${tea.id}">`)
      teaProfile(tea, '#show-search div')
    })
  })
}

function toggleView(view){
  $('#sortAtoZ').attr('class', view)
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
