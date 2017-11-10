(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDynamicData', TweakDynamicData);

    TweakDynamicData.$inject = ['$log'];

    function TweakDynamicData($log) {

        /**
         * Constructor, with class name
         * @param name            {string}    [REQUIRED]    
         * @param propertiesOrder {array}                   default: items: type: string    
         * @param properties      {object}                  default:   
         * @param relations       {object}                  default:   
         * @param validations     {object}                  default:   
         * @param created         {string}                  format: date-time  
         * @param modified        {string}                  format: date-time  
         * @param recordCount     {number}                  default: 0  format: double  
         * @param id              {string}                  
         * @param teamId          {string}                  
         * @param team            {object}                  $ref: #/definitions/Team  
         * @param designs         {array}                   items: $ref: #/definitions/Design    
         */
        function TweakDynamicData(data) {
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
        var parameters = ['name', 'propertiesOrder', 'properties', 'relations', 'validations', 'created', 'modified', 'recordCount', 'id', 'teamId', 'team', 'designs'];
        var parametersType = ['string', 'array', 'object', 'object', 'object', 'string', 'string', 'number', 'string', 'string', 'object', 'array'];
        var requiredParameters = ['name'];

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
        TweakDynamicData.build = function (data) {
            return new TweakDynamicData(data);
        };

        TweakDynamicData.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDynamicData.build).filter(Boolean);
            }
            return TweakDynamicData.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDynamicData;
    }
})();