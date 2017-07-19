(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourceRecord', TweakDataSourceRecord);

    TweakDataSourceRecord.$inject = ['$log'];

    function TweakDataSourceRecord($log) {

        /**
         * Constructor, with class name
         * @param line         {number}    [REQUIRED]    format: double  
         * @param id           {string}                  
         * @param teamId       {string}                  
         * @param dataSourceId {string}                  
         * @param team         {object}                  $ref: #/definitions/Team  
         * @param dataSource   {object}                  $ref: #/definitions/DataSource  
         * @param values       {array}                   items: $ref: #/definitions/DataSourceRecordValue    
         */
        function TweakDataSourceRecord(data) {
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
        var parameters = ['line', 'id', 'teamId', 'dataSourceId', 'team', 'dataSource', 'values'];
        var parametersType = ['number', 'string', 'string', 'string', 'object', 'object', 'array'];
        var requiredParameters = ['line'];

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
        TweakDataSourceRecord.build = function (data) {
            return new TweakDataSourceRecord(data);
        };

        TweakDataSourceRecord.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourceRecord.build).filter(Boolean);
            }
            return TweakDataSourceRecord.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourceRecord;
    }
})();