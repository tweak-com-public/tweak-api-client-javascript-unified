(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourceRecordValue', TweakDataSourceRecordValue);

    TweakDataSourceRecordValue.$inject = ['$log'];

    function TweakDataSourceRecordValue($log) {

        /**
         * Constructor, with class name
         * @param value        {string}    
         * @param id           {string}    
         * @param teamId       {string}    
         * @param dataSourceId {string}    
         * @param recordId     {string}    
         * @param keyId        {string}    
         * @param team         {object}    $ref: #/definitions/Team  
         * @param dataSource   {object}    $ref: #/definitions/DataSource  
         * @param values       {object}    $ref: #/definitions/DataSourceRecord  
         * @param key          {object}    $ref: #/definitions/DataSourceKey  
         */
        function TweakDataSourceRecordValue(data) {
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
        var parameters = ['value', 'id', 'teamId', 'dataSourceId', 'recordId', 'keyId', 'team', 'dataSource', 'values', 'key'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object'];
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
        TweakDataSourceRecordValue.build = function (data) {
            return new TweakDataSourceRecordValue(data);
        };

        TweakDataSourceRecordValue.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourceRecordValue.build).filter(Boolean);
            }
            return TweakDataSourceRecordValue.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourceRecordValue;
    }
})();