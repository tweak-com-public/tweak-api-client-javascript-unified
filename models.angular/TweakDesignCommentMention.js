(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignCommentMention', TweakDesignCommentMention);

    TweakDesignCommentMention.$inject = ['$log'];

    function TweakDesignCommentMention($log) {

        /**
         * Constructor, with class name
         * @param created   {string}    format: date-time  
         * @param modified  {string}    format: date-time  
         * @param id        {string}    
         * @param commentId {string}    
         * @param mentionId {string}    
         * @param comment   {object}    $ref: #/definitions/DesignComment  
         * @param mention   {object}    $ref: #/definitions/TeamMember  
         */
        function TweakDesignCommentMention(data) {
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
        var parameters = ['created', 'modified', 'id', 'commentId', 'mentionId', 'comment', 'mention'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'object'];
        var requiredParameters = [];

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
        TweakDesignCommentMention.build = function (data) {
            return new TweakDesignCommentMention(data);
        };

        TweakDesignCommentMention.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignCommentMention.build).filter(Boolean);
            }
            return TweakDesignCommentMention.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignCommentMention;
    }
})();