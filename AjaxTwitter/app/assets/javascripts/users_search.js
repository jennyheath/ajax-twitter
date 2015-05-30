$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = $('div.users-search input');
  this.$ul = $('ul.users');
  this.$input.on("keyup", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
  // event.preventDefault();
  var inputData = $(event.currentTarget).serializeJSON();
  console.log(inputData);
  $.ajax({
    type: "get",
    url: "/users/search",
    data: inputData,
    dataType: "json",
    success: this.renderResults.bind(this)
  });
};


$.UsersSearch.prototype.renderResults = function(response) {
  $('ul.users').empty();
  // console.log(response);
  response.forEach( function(el) {
    console.log(el);
    var userId = el.id;
    var userName = el.username;
    $('ul.users')
      .append($('<li>')
        .append($('<button>')
          .addClass('follow-toggle')
          .followToggle({'userId': userId,
                         'followState': getFollowState(el.followed)}))
        .append($('<a>')
        .text('' + userName + '')
        .attr("href", "/users/" + userId + "")));
  });
};

var getFollowState = function (state) {
  return ((state === true) ? "followed" : "unfollowed");
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
