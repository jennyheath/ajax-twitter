$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
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
      success: this.handleResponse.bind(this)
    });
  } else {
    this.followState = "unfollowing";
    this.render();
    $.ajax({
      type: "delete",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: this.handleResponse.bind(this)
    });
  }
};

$.FollowToggle.prototype.handleResponse = function() {
  this.followState = (
    (this.followState === "following") ? "followed" : "unfollowed"
  );
  this.render();
};

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
