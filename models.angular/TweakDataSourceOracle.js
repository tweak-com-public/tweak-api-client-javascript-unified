(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourceOracle', TweakDataSourceOracle);

    TweakDataSourceOracle.$inject = ['$log'];

    function TweakDataSourceOracle($log) {

        /**
         * Constructor, with class name
         * @param id           {string}    
         * @param teamId       {string}    
         * @param team         {object}    $ref: #/definitions/Team  
         * @param dynamicDatas {array}     items: $ref: #/definitions/DynamicData    
         */
        function TweakDataSourceOracle(data) {
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
        var parameters = ['id', 'teamId', 'team', 'dynamicDatas'];
        var parametersType = ['string', 'string', 'object', 'array'];
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
        TweakDataSourceOracle.build = function (data) {
            return new TweakDataSourceOracle(data);
        };

        TweakDataSourceOracle.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourceOracle.build).filter(Boolean);
            }
            return TweakDataSourceOracle.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourceOracle;
    }
})();