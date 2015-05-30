$.TweetCompose = function(el) {
  this.$el = $(el);
  $('.tweet-compose').on("submit", this.submit.bind(this));
};


$.TweetCompose.prototype.submit = function(event) {
  var formData = $(event.currentTarget).serializeJSON();
  $.ajax({
    type: "post",
    url: "/tweets",
    data: formData,
    dataType: "json",
    success: this.handleSuccess.bind(this)
  });
  $('.tweet-compose:input').prop('disabled', true);
};

$.TweetCompose.prototype.handleSuccess = function(response) {
  this.clearInput();
  $('.tweet-compose:input').prop('disabled', false);
  $(this.$el.data('tweets-ul'))
    .append($('<li>').html(JSON.stringify(response)))
};

$.TweetCompose.prototype.clearInput = function () {
  $('.tweet-compose:input').text("");
};

$.fn.tweetCompose = function() {
  return this.each( function() {
    new $.TweetCompose();
  });
};

$(function() {
  $('.tweet-compose').tweetCompose();
});
