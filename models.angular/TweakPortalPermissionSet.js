(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalPermissionSet', TweakPortalPermissionSet);

    TweakPortalPermissionSet.$inject = ['$log'];

    function TweakPortalPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param templatePermission      {object}    $ref: #/definitions/TemplatePermissionSet  
         * @param tweakTemplatePermission {object}    $ref: #/definitions/TemplatePermissionSet  
         * @param id                      {string}    
         * @param portalId                {string}    
         * @param portal                  {object}    $ref: #/definitions/Portal  
         */
        function TweakPortalPermissionSet(data) {
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
        var parameters = ['templatePermission', 'tweakTemplatePermission', 'id', 'portalId', 'portal'];
        var parametersType = ['object', 'object', 'string', 'string', 'object'];
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
        TweakPortalPermissionSet.build = function (data) {
            return new TweakPortalPermissionSet(data);
        };

        TweakPortalPermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalPermissionSet.build).filter(Boolean);
            }
            return TweakPortalPermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalPermissionSet;
    }
})();