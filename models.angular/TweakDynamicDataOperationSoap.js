(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDynamicDataOperationSoap', TweakDynamicDataOperationSoap);

    TweakDynamicDataOperationSoap.$inject = ['$log'];

    function TweakDynamicDataOperationSoap($log) {

        /**
         * Constructor, with class name
         * @param name         {string}    [REQUIRED]    
         * @param params       {object}                  default:   
         * @param root         {object}                  default: *  $ref: #/definitions/x-any  
         * @param parseRootXml {boolean}                 default: false  
         * @param map          {object}                  default: *  $ref: #/definitions/x-any  
         * @param id           {string}                  
         */
        function TweakDynamicDataOperationSoap(data) {
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
        var parameters = ['name', 'params', 'root', 'parseRootXml', 'map', 'id'];
        var parametersType = ['string', 'object', 'object', 'boolean', 'object', 'string'];
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
        TweakDynamicDataOperationSoap.build = function (data) {
            return new TweakDynamicDataOperationSoap(data);
        };

        TweakDynamicDataOperationSoap.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDynamicDataOperationSoap.build).filter(Boolean);
            }
            return TweakDynamicDataOperationSoap.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDynamicDataOperationSoap;
    }
})();