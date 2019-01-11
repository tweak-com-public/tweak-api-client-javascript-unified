(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourceRest', TweakDataSourceRest);

    TweakDataSourceRest.$inject = ['$log'];

    function TweakDataSourceRest($log) {

        /**
         * Constructor, with class name
         * @param name         {string}    [REQUIRED]    
         * @param baseURL      {string}    [REQUIRED]    
         * @param options      {object}                  default:   
         * @param operations   {array}                   default: items: $ref: #/definitions/DataSourceRestOperation    
         * @param created      {string}                  format: date-time  
         * @param modified     {string}                  format: date-time  
         * @param id           {string}                  
         * @param teamId       {string}                  
         * @param team         {object}                  $ref: #/definitions/Team  
         * @param dynamicDatas {array}                   items: $ref: #/definitions/DynamicData    
         */
        function TweakDataSourceRest(data) {
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
        var parameters = ['name', 'baseURL', 'options', 'operations', 'created', 'modified', 'id', 'teamId', 'team', 'dynamicDatas'];
        var parametersType = ['string', 'string', 'object', 'array', 'string', 'string', 'string', 'string', 'object', 'array'];
        var requiredParameters = ['name', 'baseURL'];

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
        TweakDataSourceRest.build = function (data) {
            return new TweakDataSourceRest(data);
        };

        TweakDataSourceRest.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourceRest.build).filter(Boolean);
            }
            return TweakDataSourceRest.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourceRest;
    }
})();