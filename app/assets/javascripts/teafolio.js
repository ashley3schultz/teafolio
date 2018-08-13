$(function(){
  $('#new_post').submit(function(event){
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post('/posts', values)
    posting.done(function(info){
      var postid = info.data.id
      var post = info.data.attributes
      console.log(info)
      $("#js-posts").html(`
    <p id='postid-${postid}'><strong><a href='/users/${post.user_id}'>${postid}</a>: </strong>${post.content}</p>
    <h5 class='tight'><a href="javascript:editPost(${postid})">Edit</a><a href="javascript:deletePost(${postid})">Delete</a></h5>`)
    })
  })
})
