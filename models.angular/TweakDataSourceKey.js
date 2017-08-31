(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourceKey', TweakDataSourceKey);

    TweakDataSourceKey.$inject = ['$log'];

    function TweakDataSourceKey($log) {

        /**
         * Constructor, with class name
         * @param label         {string}    [REQUIRED]    
         * @param column        {number}    [REQUIRED]    format: double  
         * @param valueDefault  {string}                  
         * @param primaryKey    {boolean}                 default: false  
         * @param valueRequired {boolean}                 default: false  
         * @param valueMin      {number}                  default: 0  format: double  
         * @param valueMax      {number}                  default: 0  format: double  
         * @param valueType     {string}                  enum: string, boolean, number, date
         * @param id            {string}                  
         * @param teamId        {string}                  
         * @param dataSourceId  {string}                  
         * @param team          {object}                  $ref: #/definitions/Team  
         * @param dataSource    {object}                  $ref: #/definitions/DataSource  
         * @param recordValues  {array}                   items: $ref: #/definitions/DataSourceRecordValue    
         */
        function TweakDataSourceKey(data) {
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
        var parameters = ['label', 'column', 'valueDefault', 'primaryKey', 'valueRequired', 'valueMin', 'valueMax', 'valueType', 'id', 'teamId', 'dataSourceId', 'team', 'dataSource', 'recordValues'];
        var parametersType = ['string', 'number', 'string', 'boolean', 'boolean', 'number', 'number', 'string', 'string', 'string', 'string', 'object', 'object', 'array'];
        var requiredParameters = ['label', 'column'];

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
        TweakDataSourceKey.build = function (data) {
            return new TweakDataSourceKey(data);
        };

        TweakDataSourceKey.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourceKey.build).filter(Boolean);
            }
            return TweakDataSourceKey.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourceKey;
    }
})();