$(function(){
  $('#new_post').submit(function(event){
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post('/posts' + '.json', values)
    posting.done(function(info){
      var postid = info.data.id
      var user = info.data.relationships.user.data
      var post = info.data.attributes
      console.log(info)
      $("#js-posts").append(`
    <p id='postid-${postid}'><strong><a href='/users/${post.user_id}'>${user}</a>: </strong>${post.content}</p>
    <h5 class='tight'><a href="javascript:editPost(${postid})">Edit</a><a href="javascript:deletePost(${postid})">Delete</a></h5>`)
    })
  })
})
