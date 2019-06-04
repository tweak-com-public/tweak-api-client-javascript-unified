(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakStockImageV2', TweakStockImageV2);

    TweakStockImageV2.$inject = ['$log'];

    function TweakStockImageV2($log) {

        /**
         * Constructor, with class name
         * @param imageUrlBase  {string}                  
         * @param imageUrls     {object}                  default:   
         * @param stockKeywords {array}                   items: type: string    
         * @param keywords      {array}                   items: type: string    
         * @param fup           {number}                  format: double  
         * @param rank          {number}                  format: double  
         * @param caption       {string}                  
         * @param orientation   {string}                  
         * @param colorInfo     {array}                   items: type: string    
         * @param hasCutoff     {boolean}                 
         * @param name          {string}    [REQUIRED]    
         * @param extension     {string}    [REQUIRED]    
         * @param legacyId      {string}                  
         * @param width         {number}                  default: 0  format: double  
         * @param height        {number}                  default: 0  format: double  
         * @param id            {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakStockImageV2(data) {
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
        var parameters = ['imageUrlBase', 'imageUrls', 'stockKeywords', 'keywords', 'fup', 'rank', 'caption', 'orientation', 'colorInfo', 'hasCutoff', 'name', 'extension', 'legacyId', 'width', 'height', 'id'];
        var parametersType = ['string', 'object', 'array', 'array', 'number', 'number', 'string', 'string', 'array', 'boolean', 'string', 'string', 'string', 'number', 'number', 'object'];
        var requiredParameters = ['name', 'extension'];

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
        TweakStockImageV2.build = function (data) {
            return new TweakStockImageV2(data);
        };

        TweakStockImageV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakStockImageV2.build).filter(Boolean);
            }
            return TweakStockImageV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakStockImageV2;
    }
})();