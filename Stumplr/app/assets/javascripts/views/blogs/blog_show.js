Stumplr.Views.BlogShow = Backbone.CompositeView.extend({
  Template: JST['blogs/show'],


  className: 'blog-show',

  initialize: function () {
    this.listenTo(this.model, "sync add", this.render);
    this.listenTo(this.model.posts(), "new", this.closeModal);
    this.collection = this.model.posts();
    this.listenTo(this.collection, 'add', this.addPost);
    this.listenTo(this.collection, 'destroy', this.render);


  },

  events: {
    // 'show.bs.modal #modal-form': 'showModal'
    "click button.make-post-form": 'showModal'
  },

  showModal: function (event) {
    var button = $(event.currentTarget);
    var recipient = button.data('whatever');

    var newPost = new Stumplr.Models.Post({ blog_id: this.model.id })
    var view = new Stumplr.Views.PostForm({
      recipient: recipient,
      model: newPost,
      collection: this.model.posts()
    });
    this.$el.find('#modal-form-wrapper').html(view.render().$el);
  },

  render: function () {
    var renderedContent = this.Template({
      blog: this.model
    });
    this.$el.html(renderedContent);
    this.renderPosts();

    return this;
  },


  addPost: function (post) {
    var view = new Stumplr.Views.PostShow({
      model: post
    });
    this.addSubview('#posts', view);
  },

  renderPosts: function () {
    this.model.posts().each(this.addPost.bind(this));
},
});
