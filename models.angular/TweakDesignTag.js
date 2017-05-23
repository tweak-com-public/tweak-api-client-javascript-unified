(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignTag', TweakDesignTag);

    TweakDesignTag.$inject = ['$log'];

    function TweakDesignTag($log) {

        /**
         * Constructor, with class name
         * @param id       {string}    
         * @param designId {string}    
         * @param tagId    {string}    
         * @param design   {object}    $ref: #/definitions/Design  
         * @param tag      {object}    $ref: #/definitions/Tag  
         */
        function TweakDesignTag(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'designId', 'tagId', 'design', 'tag'];
        var parametersType = ['string', 'string', 'string', 'object', 'object'];
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
        TweakDesignTag.build = function (data) {
            return new TweakDesignTag(data);
        };

        TweakDesignTag.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignTag.build).filter(Boolean);
            }
            return TweakDesignTag.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignTag;
    }
})();