(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplateMember', TweakTemplateMember);

    TweakTemplateMember.$inject = ['$log'];

    function TweakTemplateMember($log) {

        /**
         * Constructor, with class name
         * @param id         {string}    
         * @param templateId {string}    
         * @param memberId   {string}    
         * @param portalId   {string}    
         * @param template   {object}    $ref: #/definitions/Template  
         * @param member     {object}    $ref: #/definitions/TeamMember  
         * @param portal     {object}    $ref: #/definitions/Portal  
         */
        function TweakTemplateMember(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'templateId', 'memberId', 'portalId', 'template', 'member', 'portal'];
        var parametersType = ['string', 'string', 'string', 'string', 'object', 'object', 'object'];
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
        TweakTemplateMember.build = function (data) {
            return new TweakTemplateMember(data);
        };

        TweakTemplateMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTemplateMember.build).filter(Boolean);
            }
            return TweakTemplateMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTemplateMember;
    }
})();