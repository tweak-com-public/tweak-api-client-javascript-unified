(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakProductTag', TweakProductTag);

    TweakProductTag.$inject = ['$log'];

    function TweakProductTag($log) {

        /**
         * Constructor, with class name
         * @param id        {string}    
         * @param tagId     {string}    
         * @param productId {string}    
         * @param product   {object}    $ref: #/definitions/Product  
         * @param tag       {object}    $ref: #/definitions/Tag  
         */
        function TweakProductTag(data) {
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
        var parameters = ['id', 'tagId', 'productId', 'product', 'tag'];
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
                if (parametersType[i].match(/^any$/i)) {
                    continue;
                }
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakProductTag.build = function (data) {
            return new TweakProductTag(data);
        };

        TweakProductTag.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakProductTag.build).filter(Boolean);
            }
            return TweakProductTag.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakProductTag;
    }
})();