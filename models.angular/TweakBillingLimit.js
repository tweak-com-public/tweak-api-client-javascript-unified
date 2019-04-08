(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingLimit', TweakBillingLimit);

    TweakBillingLimit.$inject = ['$log'];

    function TweakBillingLimit($log) {

        /**
         * Constructor, with class name
         * @param teamMember           {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param uploader             {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param portal               {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param jpeg                 {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param proof                {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param highResPdf           {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param storage              {object}    default: unitPrefix: GB    $ref: #/definitions/BillingLimitCounter  
         * @param stockImageLibrary    {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param transformationCredit {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param productDbRecord      {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param accountSupport       {boolean}   default: false  
         * @param supportResponse      {string}    
         * @param bandwidth            {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param printerApi           {object}    default:   $ref: #/definitions/BillingLimitCounter  
         * @param dam                  {object}    default:   $ref: #/definitions/BillingLimitDam  
         * @param portals              {object}    default:   $ref: #/definitions/BillingLimitPortal  
         * @param designs              {object}    default:   $ref: #/definitions/BillingLimitDesign  
         * @param templates            {object}    default:   $ref: #/definitions/BillingLimitTemplate  
         * @param workflows            {object}    default:   $ref: #/definitions/BillingLimitWorkflow  
         * @param activity             {object}    default:   $ref: #/definitions/BillingLimitActivity  
         * @param builder              {object}    default:   $ref: #/definitions/BillingLimitBuilder  
         * @param dynamicData          {object}    default:   $ref: #/definitions/BillingLimitDynamicData  
         * @param id                   {number}    format: double  
         */
        function TweakBillingLimit(data) {
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
        var parameters = ['teamMember', 'uploader', 'portal', 'jpeg', 'proof', 'highResPdf', 'storage', 'stockImageLibrary', 'transformationCredit', 'productDbRecord', 'accountSupport', 'supportResponse', 'bandwidth', 'printerApi', 'dam', 'portals', 'designs', 'templates', 'workflows', 'activity', 'builder', 'dynamicData', 'id'];
        var parametersType = ['object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'boolean', 'string', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'number'];
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
        TweakBillingLimit.build = function (data) {
            return new TweakBillingLimit(data);
        };

        TweakBillingLimit.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingLimit.build).filter(Boolean);
            }
            return TweakBillingLimit.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingLimit;
    }
})();