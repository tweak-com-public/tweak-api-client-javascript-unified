(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDynamicData', TweakDynamicData);

    TweakDynamicData.$inject = ['$log'];

    function TweakDynamicData($log) {

        /**
         * Constructor, with class name
         * @param name                   {string}    [REQUIRED]    
         * @param propertiesOrder        {array}                   default: items: type: string    
         * @param properties             {object}                  default:   
         * @param relations              {object}                  default:   
         * @param validations            {object}                  default:   
         * @param dataSource             {string}                  enum: tweak-db, soap, rest, mysql, mssql, postgresql, mongo, oracle
         * @param operationSoap          {object}                  $ref: #/definitions/DynamicDataOperationSoap  
         * @param created                {string}                  format: date-time  
         * @param modified               {string}                  format: date-time  
         * @param recordCount            {number}                  default: 0  format: double  
         * @param id                     {string}                  
         * @param dataSourceSoapId       {string}                  
         * @param dataSourceRestId       {string}                  
         * @param dataSourceMySqlId      {string}                  
         * @param dataSourceMsSqlId      {string}                  
         * @param dataSourcePostgreSqlId {string}                  
         * @param dataSourceMongoId      {string}                  
         * @param dataSourceOracleId     {string}                  
         * @param teamId                 {string}                  
         * @param team                   {object}                  $ref: #/definitions/Team  
         * @param designs                {array}                   items: $ref: #/definitions/Design    
         * @param dataSourceSoap         {object}                  $ref: #/definitions/DataSourceSoap  
         * @param dataSourceRest         {object}                  $ref: #/definitions/DataSourceRest  
         * @param dataSourceMySql        {object}                  $ref: #/definitions/DataSourceMySql  
         * @param dataSourceMsSql        {object}                  $ref: #/definitions/DataSourceMsSql  
         * @param dataSourcePostgreSql   {object}                  $ref: #/definitions/DataSourcePostgreSql  
         * @param dataSourceMongo        {object}                  $ref: #/definitions/DataSourceMongo  
         * @param dataSourceOracle       {object}                  $ref: #/definitions/DataSourceOracle  
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
        var parameters = ['name', 'propertiesOrder', 'properties', 'relations', 'validations', 'dataSource', 'operationSoap', 'created', 'modified', 'recordCount', 'id', 'dataSourceSoapId', 'dataSourceRestId', 'dataSourceMySqlId', 'dataSourceMsSqlId', 'dataSourcePostgreSqlId', 'dataSourceMongoId', 'dataSourceOracleId', 'teamId', 'team', 'designs', 'dataSourceSoap', 'dataSourceRest', 'dataSourceMySql', 'dataSourceMsSql', 'dataSourcePostgreSql', 'dataSourceMongo', 'dataSourceOracle'];
        var parametersType = ['string', 'array', 'object', 'object', 'object', 'string', 'object', 'string', 'string', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'object', 'object', 'object', 'object', 'object', 'object', 'object'];
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