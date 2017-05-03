(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalPermissionSet', TweakPortalPermissionSet);

    TweakPortalPermissionSet.$inject = ['$log'];

    function TweakPortalPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param highResPdf                  {boolean}   default: true  
         * @param approveOrdersByPortalAdmin  {boolean}   default: true  
         * @param approveDesignsByPortalAdmin {boolean}   default: true  
         * @param id                          {string}    
         * @param portalId                    {number}    format: double  
         * @param portal                      {string}    $ref: #/definitions/Portal  
         */
        function TweakPortalPermissionSet(highResPdf, approveOrdersByPortalAdmin, approveDesignsByPortalAdmin, id, portalId, portal) {
            this.highResPdf = highResPdf;
            this.approveOrdersByPortalAdmin = approveOrdersByPortalAdmin;
            this.approveDesignsByPortalAdmin = approveDesignsByPortalAdmin;
            this.id = id;
            this.portalId = portalId;
            this.portal = portal;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['highResPdf', 'approveOrdersByPortalAdmin', 'approveDesignsByPortalAdmin', 'id', 'portalId', 'portal'];
        var parametersType = ['boolean', 'boolean', 'boolean', 'string', 'number', 'string'];
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
            return new TweakPortalPermissionSet(
                data.highResPdf,
                data.approveOrdersByPortalAdmin,
                data.approveDesignsByPortalAdmin,
                data.id,
                data.portalId,
                data.portal
            );
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