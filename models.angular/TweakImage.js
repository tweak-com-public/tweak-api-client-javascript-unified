(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakImage', TweakImage);

    TweakImage.$inject = ['$log'];

    function TweakImage($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param fileName {string}                  
         * @param link     {string}                  
         * @param path     {string}                  default: /  
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {string}                  
         * @param teamId   {string}                  
         * @param folderId {string}                  
         * @param folder   {object}                  $ref: #/definitions/ImageFolder  
         * @param team     {object}                  $ref: #/definitions/Team  
         */
        function TweakImage(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'fileName', 'link', 'path', 'created', 'modified', 'id', 'teamId', 'folderId', 'folder', 'team'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object'];
        var requiredParameters = ['name'];

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
        TweakImage.build = function (data) {
            return new TweakImage(data);
        };

        TweakImage.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakImage.build).filter(Boolean);
            }
            return TweakImage.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakImage;
    }
})();