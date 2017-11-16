(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakProductSize', TweakProductSize);

    TweakProductSize.$inject = ['$log'];

    function TweakProductSize($log) {

        /**
         * Constructor, with class name
         * @param name              {string}    [REQUIRED]    
         * @param code              {string}    [REQUIRED]    
         * @param thumbnail         {string}                  
         * @param foldingType       {string}                  enum: none, accordian-left, accordian-right, accordion, letter-left, letter-right, rollover
         * @param foldingMethod     {string}                  enum: none, fold, crease, prefolded
         * @param bindingType       {string}                  enum: none, saddle-stitched, perfect, section-sewn, wiro, cased-in-wiro, pamphlet-stitched, coptic, japanese, screw-post
         * @param doubleSided       {boolean}                 default: false  
         * @param dieCut            {boolean}                 default: false  
         * @param unfoldedSize      {object}                  $ref: #/definitions/Dimensions  
         * @param foldedSize        {object}                  $ref: #/definitions/Dimensions  
         * @param pdfSize           {object}                  $ref: #/definitions/Dimensions  
         * @param pdfPageCount      {number}                  default: 1  format: double  
         * @param pdfDpi            {number}                  minimum: 10  maximum: 4800  default: 300  format: double  
         * @param pdfColorProfile   {string}                  default:   
         * @param customerSize      {object}                  $ref: #/definitions/Dimensions  
         * @param customerPageCount {number}                  default: 1  format: double  
         * @param maxBleed          {object}                  default: right: 0    $ref: #/definitions/Bounds  
         * @param defaultBleed      {object}                  default: right: 0    $ref: #/definitions/Bounds  
         * @param safeArea          {object}                  default: right: 0    $ref: #/definitions/Bounds  
         * @param unit              {string}                  enum: mm, inch
         * @param frame             {number}                  default: 0  format: double  
         * @param shape             {string}                  enum: rect, square, rect-rouded-corners, square-rouded-corners, oval, circle
         * @param orientation       {string}                  enum: none, landscape, portrait
         * @param format            {string}    [REQUIRED]    enum: eu, us
         * @param envelopeWindow    {string}                  enum: none, left, right
         * @param canvasImageCount  {number}                  default: 0  format: double  
         * @param created           {string}                  format: date-time  
         * @param modified          {string}                  format: date-time  
         * @param id                {string}                  
         * @param typeId            {string}                  
         * @param type              {object}                  $ref: #/definitions/ProductType  
         * @param materials         {array}                   items: $ref: #/definitions/ProductMaterial    
         * @param sizeMaterials     {array}                   items: $ref: #/definitions/ProductSizeMaterial    
         * @param products          {array}                   items: $ref: #/definitions/Product    
         */
        function TweakProductSize(data) {
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
        var parameters = ['name', 'code', 'thumbnail', 'foldingType', 'foldingMethod', 'bindingType', 'doubleSided', 'dieCut', 'unfoldedSize', 'foldedSize', 'pdfSize', 'pdfPageCount', 'pdfDpi', 'pdfColorProfile', 'customerSize', 'customerPageCount', 'maxBleed', 'defaultBleed', 'safeArea', 'unit', 'frame', 'shape', 'orientation', 'format', 'envelopeWindow', 'canvasImageCount', 'created', 'modified', 'id', 'typeId', 'type', 'materials', 'sizeMaterials', 'products'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'boolean', 'boolean', 'object', 'object', 'object', 'number', 'number', 'string', 'object', 'number', 'object', 'object', 'object', 'string', 'number', 'string', 'string', 'string', 'string', 'number', 'string', 'string', 'string', 'string', 'object', 'array', 'array', 'array'];
        var requiredParameters = ['name', 'code', 'format'];

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
        TweakProductSize.build = function (data) {
            return new TweakProductSize(data);
        };

        TweakProductSize.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakProductSize.build).filter(Boolean);
            }
            return TweakProductSize.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakProductSize;
    }
})();