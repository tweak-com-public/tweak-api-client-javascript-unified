(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDataSourcePostgreSql', TweakDataSourcePostgreSql);

    TweakDataSourcePostgreSql.$inject = ['$log'];

    function TweakDataSourcePostgreSql($log) {

        /**
         * Constructor, with class name
         * @param id           {string}    
         * @param teamId       {string}    
         * @param team         {object}    $ref: #/definitions/Team  
         * @param dynamicDatas {array}     items: $ref: #/definitions/DynamicData    
         */
        function TweakDataSourcePostgreSql(data) {
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
        TweakDataSourcePostgreSql.build = function (data) {
            return new TweakDataSourcePostgreSql(data);
        };

        TweakDataSourcePostgreSql.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDataSourcePostgreSql.build).filter(Boolean);
            }
            return TweakDataSourcePostgreSql.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDataSourcePostgreSql;
    }
})();