(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPublicV1TeamMember', TweakPublicV1TeamMember);

    TweakPublicV1TeamMember.$inject = ['$log'];

    function TweakPublicV1TeamMember($log) {

        /**
         * Constructor, with class name
         * @param id {number}    format: double  
         */
        function TweakPublicV1TeamMember(data) {
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
        var parameters = ['id'];
        var parametersType = ['number'];
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
        TweakPublicV1TeamMember.build = function (data) {
            return new TweakPublicV1TeamMember(data);
        };

        TweakPublicV1TeamMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPublicV1TeamMember.build).filter(Boolean);
            }
            return TweakPublicV1TeamMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPublicV1TeamMember;
    }
})();