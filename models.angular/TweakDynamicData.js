(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDynamicData', TweakDynamicData);

    TweakDynamicData.$inject = ['$log'];

    function TweakDynamicData($log) {

        /**
         * Constructor, with class name
         * @param name                   {string}    [REQUIRED]    
         * @param propertyPrimaryKey     {string}                  
         * @param propertiesOrder        {array}                   default: items: type: string    
         * @param properties             {object}                  default:   
         * @param relations              {object}                  default:   
         * @param validations            {object}                  default:   
         * @param dataSource             {string}                  enum: tweak-db, soap, rest, mysql, mssql, postgresql, mongo, oracle
         * @param operationSoap          {object}                  $ref: #/definitions/DynamicDataOperationSoap  
         * @param operationRest          {object}                  $ref: #/definitions/DynamicDataOperationRest  
         * @param created                {string}                  format: date-time  
         * @param modified               {string}                  format: date-time  
         * @param isLocked               {boolean}                 default: false  
         * @param lockedId               {string}                  
         * @param lockedErrors           {array}                   default: items: $ref: #/definitions/x-any    
         * @param lockedResult           {object}                  default:   
         * @param lastLocked             {string}                  format: date-time  
         * @param recordCount            {number}                  default: 0  format: double  
         * @param example                {object}                  default:   
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
         * @param portals                {array}                   items: $ref: #/definitions/Portal    
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
        var parameters = ['name', 'propertyPrimaryKey', 'propertiesOrder', 'properties', 'relations', 'validations', 'dataSource', 'operationSoap', 'operationRest', 'created', 'modified', 'isLocked', 'lockedId', 'lockedErrors', 'lockedResult', 'lastLocked', 'recordCount', 'example', 'id', 'dataSourceSoapId', 'dataSourceRestId', 'dataSourceMySqlId', 'dataSourceMsSqlId', 'dataSourcePostgreSqlId', 'dataSourceMongoId', 'dataSourceOracleId', 'teamId', 'team', 'portals', 'designs', 'dataSourceSoap', 'dataSourceRest', 'dataSourceMySql', 'dataSourceMsSql', 'dataSourcePostgreSql', 'dataSourceMongo', 'dataSourceOracle'];
        var parametersType = ['string', 'string', 'array', 'object', 'object', 'object', 'string', 'object', 'object', 'string', 'string', 'boolean', 'string', 'array', 'object', 'string', 'number', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'array', 'object', 'object', 'object', 'object', 'object', 'object', 'object'];
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