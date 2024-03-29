(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakProductPdfColorProfile', TweakProductPdfColorProfile);

    TweakProductPdfColorProfile.$inject = ['$log'];

    function TweakProductPdfColorProfile($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param code     {string}    [REQUIRED]    
         * @param status   {string}                  enum: public, private
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {string}                  
         * @param teamId   {string}                  
         * @param team     {object}                  $ref: #/definitions/Team  
         */
        function TweakProductPdfColorProfile(data) {
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
        var parameters = ['name', 'code', 'status', 'created', 'modified', 'id', 'teamId', 'team'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'object'];
        var requiredParameters = ['name', 'code'];

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
        TweakProductPdfColorProfile.build = function (data) {
            return new TweakProductPdfColorProfile(data);
        };

        TweakProductPdfColorProfile.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakProductPdfColorProfile.build).filter(Boolean);
            }
            return TweakProductPdfColorProfile.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakProductPdfColorProfile;
    }
})();