(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignComment', TweakDesignComment);

    TweakDesignComment.$inject = ['$log'];

    function TweakDesignComment($log) {

        /**
         * Constructor, with class name
         * @param comment     {string}    [REQUIRED]    
         * @param position    {object}                  $ref: #/definitions/Axes  
         * @param pageIndex   {number}                  minimum: 0  default: 0  format: double  
         * @param status      {string}                  enum: unsolved, resolved
         * @param created     {string}                  format: date-time  
         * @param modified    {string}                  format: date-time  
         * @param id          {string}                  
         * @param designId    {string}                  
         * @param commentId   {string}                  
         * @param commenterId {string}                  
         * @param design      {object}                  $ref: #/definitions/Design  
         * @param replies     {array}                   items: $ref: #/definitions/DesignComment    
         * @param commenter   {object}                  $ref: #/definitions/TeamMember  
         * @param replyOf     {object}                  $ref: #/definitions/DesignComment  
         */
        function TweakDesignComment(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }


            for (var i = 0; i < parameters.length; i++) {

                if (this[parameters[i]] && parametersType[i] === 'string' ) {

                    this[parameters[i]] = '' + this[parameters[i]];

                }

            }


            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['comment', 'position', 'pageIndex', 'status', 'created', 'modified', 'id', 'designId', 'commentId', 'commenterId', 'design', 'replies', 'commenter', 'replyOf'];
        var parametersType = ['string', 'object', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'object', 'object'];
        var requiredParameters = ['comment'];

        /**
         * Private function
         */
        function constructorValidation(model) {
            requiredParameters.forEach(function(requiredParameter) {
                if (model[requiredParameter] === undefined) {
                    throw new Error('Required parameter `' + requiredParameter + '` is missing!');
                }
            });

            for (var i = 0; i < parameters.length; i++) {
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakDesignComment.build = function (data) {
            return new TweakDesignComment(data);
        };

        TweakDesignComment.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignComment.build).filter(Boolean);
            }
            return TweakDesignComment.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignComment;
    }
})();