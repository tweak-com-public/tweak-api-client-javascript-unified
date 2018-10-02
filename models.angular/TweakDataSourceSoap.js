(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourceSoap', TweakDataSourceSoap);

    TweakDataSourceSoap.$inject = ['$log'];

    function TweakDataSourceSoap($log) {

        /**
         * Constructor, with class name
         * @param name         {string}    [REQUIRED]    
         * @param url          {string}    [REQUIRED]    
         * @param wsdl         {string}    [REQUIRED]    
         * @param wsdl_options {object}                  default:   
         * @param security     {object}                  default:   
         * @param soapHeaders  {array}                   default: items: type: object    
         * @param created      {string}                  format: date-time  
         * @param modified     {string}                  format: date-time  
         * @param id           {string}                  
         * @param teamId       {string}                  
         * @param team         {object}                  $ref: #/definitions/Team  
         * @param dynamicDatas {array}                   items: $ref: #/definitions/DynamicData    
         */
        function TweakDataSourceSoap(data) {
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
        var parameters = ['name', 'url', 'wsdl', 'wsdl_options', 'security', 'soapHeaders', 'created', 'modified', 'id', 'teamId', 'team', 'dynamicDatas'];
        var parametersType = ['string', 'string', 'string', 'object', 'object', 'array', 'string', 'string', 'string', 'string', 'object', 'array'];
        var requiredParameters = ['name', 'url', 'wsdl'];

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
        TweakDataSourceSoap.build = function (data) {
            return new TweakDataSourceSoap(data);
        };

        TweakDataSourceSoap.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourceSoap.build).filter(Boolean);
            }
            return TweakDataSourceSoap.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourceSoap;
    }
})();