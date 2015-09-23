define([
        'backbone',
        'underscore',
        'leaflet',

        'views/layersView',

        'models/mapModel'
    ],

    function (Backbone,
              _,
              L,
              LayersView,
              Model) {

        var DEBUG = false;

        var AppView = Backbone.View.extend({

            events: {},

            el: '#map',

            template: "",

            initialize: function () {
                _.bindAll.apply(_, [this].concat(_.functions(this)));
                if (DEBUG) console.debug("AppView Init");
                this.model = new Model();
                this.listenTo(this.model, 'sync', this.handleSuccess);
                this.listenTo(this.model, 'error', this.handleError);
            },
            render: function () {
                this.model.fetch();
            },
            handleSuccess: function(model, response){
                if (DEBUG) console.debug("success", collection, response);
                this.renderOnSuccess();
            },
            handleError: function(model, response){
                if (DEBUG) console.debug("error", collection, response);
            },
            renderOnSuccess: function(){
                App.map = L.map('map', {
                    center: this.model.get("center"),
                    zoom: this.model.get("zoom"),
                    minZoom: this.model.get("minZoom"),
                    maxZoom: this.model.get("maxZoom")
                });

                this.layersView = new LayersView();
                this.layersView.render();
            }
        });

        return AppView;

    });