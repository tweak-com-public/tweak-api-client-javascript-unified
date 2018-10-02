(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetComment', TweakAssetComment);

    TweakAssetComment.$inject = ['$log'];

    function TweakAssetComment($log) {

        /**
         * Constructor, with class name
         * @param comment      {string}    [REQUIRED]    
         * @param position     {object}                  $ref: #/definitions/Axes  
         * @param pageIndex    {number}                  minimum: 0  default: 0  format: double  
         * @param status       {string}                  enum: unsolved, resolved
         * @param designStatus {string}                  enum: unsolved, resolved
         * @param type         {string}                  enum: comment, rejection, reaction
         * @param created      {string}                  format: date-time  
         * @param modified     {string}                  format: date-time  
         * @param id           {string}                  
         * @param assetId      {string}                  
         * @param commentId    {string}                  
         * @param commenterId  {string}                  
         * @param assignTo     {string}                  
         * @param asset        {object}                  $ref: #/definitions/Asset  
         * @param replies      {array}                   items: $ref: #/definitions/AssetComment    
         * @param commenter    {object}                  $ref: #/definitions/TeamMember  
         * @param replyOf      {object}                  $ref: #/definitions/AssetComment  
         * @param assign       {object}                  $ref: #/definitions/TeamMember  
         * @param mentions     {array}                   items: $ref: #/definitions/TeamMember    
         */
        function TweakAssetComment(data) {
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
        var parameters = ['comment', 'position', 'pageIndex', 'status', 'designStatus', 'type', 'created', 'modified', 'id', 'assetId', 'commentId', 'commenterId', 'assignTo', 'asset', 'replies', 'commenter', 'replyOf', 'assign', 'mentions'];
        var parametersType = ['string', 'object', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'object', 'object', 'object', 'array'];
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
        TweakAssetComment.build = function (data) {
            return new TweakAssetComment(data);
        };

        TweakAssetComment.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetComment.build).filter(Boolean);
            }
            return TweakAssetComment.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetComment;
    }
})();