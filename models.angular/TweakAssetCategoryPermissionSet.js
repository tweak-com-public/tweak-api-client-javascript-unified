(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCategoryPermissionSet', TweakAssetCategoryPermissionSet);

    TweakAssetCategoryPermissionSet.$inject = ['$log'];

    function TweakAssetCategoryPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param assetCategoryId                {string}    [REQUIRED]    
         * @param selectType                     {string}                  enum: autoComplete, text, longText, date, linkAsset, sourcefile, vector
         * @param filterable                     {boolean}                 default: true  
         * @param required                       {boolean}                 default: true  
         * @param mainFilter                     {boolean}                 default: true  
         * @param multiSelect                    {boolean}                 default: true  
         * @param multiFilter                    {boolean}                 default: true  
         * @param displayField                   {boolean}                 default: true  
         * @param showInListView                 {boolean}                 default: true  
         * @param showInDuplicateView            {boolean}                 default: true  
         * @param showInGridView                 {boolean}                 default: true  
         * @param showInContactSheetView         {boolean}                 default: true  
         * @param hidePublic                     {boolean}                 default: true  
         * @param hideOptionsWithoutDependencies {boolean}                 default: true  
         * @param id                             {string}                  
         */
        function TweakAssetCategoryPermissionSet(data) {
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
        var parameters = ['assetCategoryId', 'selectType', 'filterable', 'required', 'mainFilter', 'multiSelect', 'multiFilter', 'displayField', 'showInListView', 'showInDuplicateView', 'showInGridView', 'showInContactSheetView', 'hidePublic', 'hideOptionsWithoutDependencies', 'id'];
        var parametersType = ['string', 'string', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'string'];
        var requiredParameters = ['assetCategoryId'];

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
        TweakAssetCategoryPermissionSet.build = function (data) {
            return new TweakAssetCategoryPermissionSet(data);
        };

        TweakAssetCategoryPermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCategoryPermissionSet.build).filter(Boolean);
            }
            return TweakAssetCategoryPermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCategoryPermissionSet;
    }
})();