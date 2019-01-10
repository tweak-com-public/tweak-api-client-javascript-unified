(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignExport', TweakDesignExport);

    TweakDesignExport.$inject = ['$log'];

    function TweakDesignExport($log) {

        /**
         * Constructor, with class name
         * @param type        {string}    [REQUIRED]    enum: proof, pdf
         * @param created     {string}                  format: date-time  
         * @param id          {string}                  
         * @param designId    {string}                  
         * @param requesterId {string}                  
         * @param designs     {object}                  $ref: #/definitions/Design  
         * @param requester   {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakDesignExport(data) {
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
        var parameters = ['type', 'created', 'id', 'designId', 'requesterId', 'designs', 'requester'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'object'];
        var requiredParameters = ['type'];

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
        TweakDesignExport.build = function (data) {
            return new TweakDesignExport(data);
        };

        TweakDesignExport.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignExport.build).filter(Boolean);
            }
            return TweakDesignExport.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignExport;
    }
})();