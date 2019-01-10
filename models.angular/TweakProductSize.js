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
         * @param legacyCode        {string}                  
         * @param thumbnail         {object}                  default:   $ref: #/definitions/CloudinaryImage  
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
         * @param pdfOutputScale    {number}                  minimum: 1  maximum: 1000  default: 100  format: double  
         * @param printProfile      {string}                  enum: PDFX1A, PDFX3A
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
         * @param options           {string}                  default: none  
         * @param displayType       {string}                  default: none  
         * @param created           {string}                  format: date-time  
         * @param modified          {string}                  format: date-time  
         * @param id                {string}                  
         * @param pdfColorProfileId {string}                  
         * @param typeId            {string}                  
         * @param type              {object}                  $ref: #/definitions/ProductType  
         * @param materials         {array}                   items: $ref: #/definitions/ProductMaterial    
         * @param sizeMaterials     {array}                   items: $ref: #/definitions/ProductSizeMaterial    
         * @param products          {array}                   items: $ref: #/definitions/Product    
         * @param pdfColorProfile   {object}                  $ref: #/definitions/ProductPdfColorProfile  
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
        var parameters = ['name', 'code', 'legacyCode', 'thumbnail', 'foldingType', 'foldingMethod', 'bindingType', 'doubleSided', 'dieCut', 'unfoldedSize', 'foldedSize', 'pdfSize', 'pdfPageCount', 'pdfDpi', 'pdfOutputScale', 'printProfile', 'customerSize', 'customerPageCount', 'maxBleed', 'defaultBleed', 'safeArea', 'unit', 'frame', 'shape', 'orientation', 'format', 'envelopeWindow', 'canvasImageCount', 'options', 'displayType', 'created', 'modified', 'id', 'pdfColorProfileId', 'typeId', 'type', 'materials', 'sizeMaterials', 'products', 'pdfColorProfile'];
        var parametersType = ['string', 'string', 'string', 'object', 'string', 'string', 'string', 'boolean', 'boolean', 'object', 'object', 'object', 'number', 'number', 'number', 'string', 'object', 'number', 'object', 'object', 'object', 'string', 'number', 'string', 'string', 'string', 'string', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'array', 'array', 'object'];
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