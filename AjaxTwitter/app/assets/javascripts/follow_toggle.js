$.FollowToggle = function (el) {
  this.$el = $(el);
  console.log(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.on("click", function(event) {
    this.handleClick(event);
  }.bind(this));
};

$.FollowToggle.prototype.handleClick = function(event) {
  event.preventDefault();

  if (this.followState === "unfollowed") {
    this.followState = "following";
    this.render();
    $.ajax({
      type: "post",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function() { handleResponse(this); }.bind(this)
    });
  } else {
    this.followState = "unfollowing";
    this.render();
    $.ajax({
      type: "delete",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function() { handleResponse(this); }.bind(this)
    });
  }
};

function handleResponse(el) {

  el.followState = (
    el.followState === "following" ? "followed" : "unfollowed"
  );
  el.render();
}

$.FollowToggle.prototype.render = function() {
  if (this.followState === "following") {
    this.$el.prop("disabled", true);
    this.$el.text("Following");
  } else if (this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
    this.$el.text("Unfollowing");
  } else if (this.followState === "unfollowed") {
    this.$el.prop("disabled", false);
    this.$el.text("Follow!");
  } else {
    this.$el.prop("disabled", false);
    this.$el.text("Unfollow!");
  }
};



$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
