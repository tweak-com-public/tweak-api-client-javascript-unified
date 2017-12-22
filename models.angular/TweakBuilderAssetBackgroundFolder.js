(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBuilderAssetBackgroundFolder', TweakBuilderAssetBackgroundFolder);

    TweakBuilderAssetBackgroundFolder.$inject = ['$log'];

    function TweakBuilderAssetBackgroundFolder($log) {

        /**
         * Constructor, with class name
         * @param name      {string}    [REQUIRED]    
         * @param path      {string}    [REQUIRED]    
         * @param thumbnail {object}                  $ref: #/definitions/CloudinaryImage  
         * @param id        {string}                  
         */
        function TweakBuilderAssetBackgroundFolder(data) {
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
        var parameters = ['name', 'path', 'thumbnail', 'id'];
        var parametersType = ['string', 'string', 'object', 'string'];
        var requiredParameters = ['name', 'path'];

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
        TweakBuilderAssetBackgroundFolder.build = function (data) {
            return new TweakBuilderAssetBackgroundFolder(data);
        };

        TweakBuilderAssetBackgroundFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBuilderAssetBackgroundFolder.build).filter(Boolean);
            }
            return TweakBuilderAssetBackgroundFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBuilderAssetBackgroundFolder;
    }
})();