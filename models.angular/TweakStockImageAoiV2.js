(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakStockImageAoiV2', TweakStockImageAoiV2);

    TweakStockImageAoiV2.$inject = ['$log'];

    function TweakStockImageAoiV2($log) {

        /**
         * Constructor, with class name
         * @param imageType    {string}    enum: standard, clipped
         * @param x1           {number}    format: double  
         * @param y1           {number}    format: double  
         * @param x2           {number}    format: double  
         * @param y2           {number}    format: double  
         * @param aoi          {number}    format: double  
         * @param id           {object}    $ref: #/definitions/ObjectID  
         * @param stockImageId {object}    $ref: #/definitions/ObjectID  
         */
        function TweakStockImageAoiV2(data) {
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
        var parameters = ['imageType', 'x1', 'y1', 'x2', 'y2', 'aoi', 'id', 'stockImageId'];
        var parametersType = ['string', 'number', 'number', 'number', 'number', 'number', 'object', 'object'];
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
        TweakStockImageAoiV2.build = function (data) {
            return new TweakStockImageAoiV2(data);
        };

        TweakStockImageAoiV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakStockImageAoiV2.build).filter(Boolean);
            }
            return TweakStockImageAoiV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakStockImageAoiV2;
    }
})();