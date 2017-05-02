(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignComment', TweakDesignComment);

    TweakDesignComment.$inject = ['$log'];

    function TweakDesignComment($log) {

        /**
         * Constructor, with class name
         * @param comment     {string}    [REQUIRED]    
         * @param position    {string}                  $ref: #/definitions/GeoPoint  
         * @param pageIndex   {number}                  minimum: 0  default: 0  format: double  
         * @param status      {string}                  default: unsolved  enum: unsolved, resolved
         * @param created     {string}                  format: date-time  
         * @param modified    {string}                  format: date-time  
         * @param id          {number}                  format: double  
         * @param designId    {number}                  format: double  
         * @param commentId   {number}                  format: double  
         * @param commenterId {number}                  format: double  
         * @param design      {string}                  $ref: #/definitions/Design  
         * @param replies     {array}                   items: $ref: #/definitions/DesignComment    
         * @param commenter   {string}                  $ref: #/definitions/TeamMember  
         * @param replyOf     {string}                  $ref: #/definitions/DesignComment  
         */
        function TweakDesignComment(comment, position, pageIndex, status, created, modified, id, designId, commentId, commenterId, design, replies, commenter, replyOf) {
            this.comment = comment;
            this.position = position;
            this.pageIndex = pageIndex;
            this.status = status;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.designId = designId;
            this.commentId = commentId;
            this.commenterId = commenterId;
            this.design = design;
            this.replies = replies;
            this.commenter = commenter;
            this.replyOf = replyOf;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['comment', 'position', 'pageIndex', 'status', 'created', 'modified', 'id', 'designId', 'commentId', 'commenterId', 'design', 'replies', 'commenter', 'replyOf'];
        var parametersType = ['string', 'string', 'number', 'string', 'string', 'string', 'number', 'number', 'number', 'number', 'string', 'array', 'string', 'string'];
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
            return new TweakDesignComment(
                data.comment,
                data.position,
                data.pageIndex,
                data.status,
                data.created,
                data.modified,
                data.id,
                data.designId,
                data.commentId,
                data.commenterId,
                data.design,
                data.replies,
                data.commenter,
                data.replyOf
            );
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