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
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {number}                  format: double  
         */
        function TweakImage(name, fileName, link, created, modified, id) {
            this.name = name;
            this.fileName = fileName;
            this.link = link;
            this.created = created;
            this.modified = modified;
            this.id = id;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'fileName', 'link', 'created', 'modified', 'id'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'number'];
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
            return new TweakImage(
                data.name,
                data.fileName,
                data.link,
                data.created,
                data.modified,
                data.id
            );
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