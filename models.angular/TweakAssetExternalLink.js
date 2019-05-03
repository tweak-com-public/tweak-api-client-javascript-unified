(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetExternalLink', TweakAssetExternalLink);

    TweakAssetExternalLink.$inject = ['$log'];

    function TweakAssetExternalLink($log) {

        /**
         * Constructor, with class name
         * @param expires       {string}    format: date-time  
         * @param storageEngine {string}    enum: s3
         * @param resources     {object}    
         * @param id            {object}    $ref: #/definitions/ObjectID  
         */
        function TweakAssetExternalLink(data) {
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
        var parameters = ['expires', 'storageEngine', 'resources', 'id'];
        var parametersType = ['string', 'string', 'object', 'object'];
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
        TweakAssetExternalLink.build = function (data) {
            return new TweakAssetExternalLink(data);
        };

        TweakAssetExternalLink.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetExternalLink.build).filter(Boolean);
            }
            return TweakAssetExternalLink.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetExternalLink;
    }
})();