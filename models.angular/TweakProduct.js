(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakProduct', TweakProduct);

    TweakProduct.$inject = ['$log'];

    function TweakProduct($log) {

        /**
         * Constructor, with class name
         * @param name        {string}    [REQUIRED]    
         * @param description {string}                  default:   
         * @param thumbnail   {object}                  default:   
         * @param object      {object}                  
         * @param idml        {object}                  
         * @param language    {string}                  enum: sq_AL, sq, ar_DZ, ar_BH, ar_EG, ar_IQ, ar_JO, ar_KW, ar_LB, ar_LY, ar_MA, ar_OM, ar_QA, ar_SA, ar_SD, ar_SY, ar_TN, ar_AE, ar_YE, ar, be_BY, be, bg_BG, bg, ca_ES, ca, zh_CN, zh_HK, zh_SG, zh_TW, zh, hr_HR, hr, cs_CZ, cs, da_DK, da, nl_BE, nl_NL, nl, en_AU, en_CA, en_IN, en_IE, en_MT, en_NZ, en_PH, en_SG, en_ZA, en_GB, en_US, en, et_EE, et, fi_FI, fi, fr_BE, fr_CA, fr_FR, fr_LU, fr_CH, fr, de_AT, de_DE, de_LU, de_CH, de, el_CY, el_GR, el, iw_IL, iw, hi_IN, hu_HU, hu, is_IS, is, in_ID, in, ga_IE, ga, it_IT, it_CH, it, ja_JP, ja_JP_JP, ja, ko_KR, ko, lv_LV, lv, lt_LT, lt, mk_MK, mk, ms_MY, ms, mt_MT, mt, no_NO, no_NO_NY, no, pl_PL, pl, pt_BR, pt_PT, pt, ro_RO, ro, ru_RU, ru, sr_BA, sr_ME, sr_CS, sr_RS, sr, sk_SK, sk, sl_SI, sl, es_AR, es_BO, es_CL, es_CO, es_CR, es_DO, es_EC, es_SV, es_GT, es_HN, es_MX, es_NI, es_PA, es_PY, es_PE, es_PR, es_ES, es_US, es_UY, es_VE, es, sv_SE, sv, th_TH, th_TH_TH, th, tr_TR, tr, uk_UA, uk, vi_VN, vi
         * @param created     {string}                  format: date-time  
         * @param modified    {string}                  format: date-time  
         * @param id          {string}                  
         * @param sizeId      {string}                  
         * @param size        {object}                  $ref: #/definitions/ProductSize  
         * @param tags        {array}                   items: $ref: #/definitions/Tag    
         */
        function TweakProduct(data) {
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
        var parameters = ['name', 'description', 'thumbnail', 'object', 'idml', 'language', 'created', 'modified', 'id', 'sizeId', 'size', 'tags'];
        var parametersType = ['string', 'string', 'object', 'object', 'object', 'string', 'string', 'string', 'string', 'string', 'object', 'array'];
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
        TweakProduct.build = function (data) {
            return new TweakProduct(data);
        };

        TweakProduct.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakProduct.build).filter(Boolean);
            }
            return TweakProduct.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakProduct;
    }
})();