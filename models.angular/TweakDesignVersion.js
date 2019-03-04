(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignVersion', TweakDesignVersion);

    TweakDesignVersion.$inject = ['$log'];

    function TweakDesignVersion($log) {

        /**
         * Constructor, with class name
         * @param objectVersion  {string}    
         * @param objectS3Path   {string}    
         * @param objectS3Bucket {string}    
         * @param created        {string}    format: date-time  
         * @param id             {string}    
         * @param designId       {string}    
         * @param design         {object}    $ref: #/definitions/Design  
         */
        function TweakDesignVersion(data) {
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
        var parameters = ['objectVersion', 'objectS3Path', 'objectS3Bucket', 'created', 'id', 'designId', 'design'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'object'];
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
        TweakDesignVersion.build = function (data) {
            return new TweakDesignVersion(data);
        };

        TweakDesignVersion.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignVersion.build).filter(Boolean);
            }
            return TweakDesignVersion.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignVersion;
    }
})();