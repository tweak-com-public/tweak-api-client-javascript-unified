(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakUser', TweakUser);

    TweakUser.$inject = ['$log'];

    function TweakUser($log) {

        /**
         * Constructor, with class name
         * @param realm         {string}                  
         * @param username      {string}                  
         * @param email         {string}    [REQUIRED]    
         * @param emailVerified {boolean}                 
         * @param id            {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakUser(data) {
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
        var parameters = ['realm', 'username', 'email', 'emailVerified', 'id'];
        var parametersType = ['string', 'string', 'string', 'boolean', 'object'];
        var requiredParameters = ['email'];

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
        TweakUser.build = function (data) {
            return new TweakUser(data);
        };

        TweakUser.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakUser.build).filter(Boolean);
            }
            return TweakUser.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakUser;
    }
})();