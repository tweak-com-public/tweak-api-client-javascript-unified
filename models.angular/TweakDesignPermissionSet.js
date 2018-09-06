(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignPermissionSet', TweakDesignPermissionSet);

    TweakDesignPermissionSet.$inject = ['$log'];

    function TweakDesignPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param highResPdf           {boolean}   default: false  
         * @param proofPdf             {boolean}   default: false  
         * @param jpegs                {boolean}   default: false  
         * @param socialSharing        {boolean}   default: false  
         * @param canEdit              {boolean}   default: false  
         * @param needAdminApproval    {boolean}   default: false  
         * @param externalCommenting   {boolean}   default: false  
         * @param externalRequireLogin {boolean}   default: false  
         * @param externalPdfDownload  {boolean}   default: false  
         * @param id                   {string}    
         * @param designId             {string}    
         * @param design               {object}    $ref: #/definitions/Design  
         */
        function TweakDesignPermissionSet(data) {
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
        var parameters = ['highResPdf', 'proofPdf', 'jpegs', 'socialSharing', 'canEdit', 'needAdminApproval', 'externalCommenting', 'externalRequireLogin', 'externalPdfDownload', 'id', 'designId', 'design'];
        var parametersType = ['boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'string', 'string', 'object'];
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
        TweakDesignPermissionSet.build = function (data) {
            return new TweakDesignPermissionSet(data);
        };

        TweakDesignPermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignPermissionSet.build).filter(Boolean);
            }
            return TweakDesignPermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignPermissionSet;
    }
})();