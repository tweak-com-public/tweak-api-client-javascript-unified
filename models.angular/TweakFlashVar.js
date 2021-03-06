(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakFlashVar', TweakFlashVar);

    TweakFlashVar.$inject = ['$log'];

    function TweakFlashVar($log) {

        /**
         * Constructor, with class name
         * @param apiPartnerAuthUrl               {string}    default:   
         * @param pluginProductId                 {string}    
         * @param savedProductId                  {string}    
         * @param allowAddImage                   {boolean}   default: false  
         * @param allowAddText                    {boolean}   default: false  
         * @param allowJPEG                       {boolean}   default: false  
         * @param allowLowResPDF                  {boolean}   default: false  
         * @param allowHighResPDF                 {boolean}   default: false  
         * @param allowSaveForLater               {boolean}   default: false  
         * @param allowSaveAsTemplate             {boolean}   default: false  
         * @param allowDuplicateDesign            {boolean}   default: false  
         * @param blockEditing                    {boolean}   default: false  
         * @param makeAllItemsEditable            {boolean}   default: false  
         * @param showConfirm                     {boolean}   default: false  
         * @param allowApprovePluginProduct       {boolean}   default: false  
         * @param allowSendToApprovePluginProduct {boolean}   default: false  
         * @param workflowForm                    {string}    
         * @param designFormData                  {array}     default: items: type: object    
         * @param showPluginImages                {boolean}   default: false  
         * @param pluginImageLibraries            {array}     default: items: type: string    
         * @param isTweakTemplate                 {boolean}   default: false  
         * @param showItemNavigator               {boolean}   default: false  
         * @param showItemCounts                  {boolean}   default: false  
         * @param showEditableItemToggle          {boolean}   default: false  
         * @param id                              {string}    
         * @param teamId                          {string}    
         * @param team                            {object}    $ref: #/definitions/Team  
         * @param teamMemberId                    {string}    
         * @param teamMember                      {object}    $ref: #/definitions/TeamMember  
         * @param portalId                        {string}    
         * @param portal                          {object}    $ref: #/definitions/Portal  
         * @param portalMemberId                  {string}    
         * @param portalMember                    {object}    $ref: #/definitions/PortalMember  
         * @param designId                        {string}    
         * @param design                          {object}    $ref: #/definitions/Design  
         * @param templateId                      {string}    
         * @param template                        {object}    $ref: #/definitions/Template  
         */
        function TweakFlashVar(data) {
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
        var parameters = ['apiPartnerAuthUrl', 'pluginProductId', 'savedProductId', 'allowAddImage', 'allowAddText', 'allowJPEG', 'allowLowResPDF', 'allowHighResPDF', 'allowSaveForLater', 'allowSaveAsTemplate', 'allowDuplicateDesign', 'blockEditing', 'makeAllItemsEditable', 'showConfirm', 'allowApprovePluginProduct', 'allowSendToApprovePluginProduct', 'workflowForm', 'designFormData', 'showPluginImages', 'pluginImageLibraries', 'isTweakTemplate', 'showItemNavigator', 'showItemCounts', 'showEditableItemToggle', 'id', 'teamId', 'team', 'teamMemberId', 'teamMember', 'portalId', 'portal', 'portalMemberId', 'portalMember', 'designId', 'design', 'templateId', 'template'];
        var parametersType = ['string', 'string', 'string', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'string', 'array', 'boolean', 'array', 'boolean', 'boolean', 'boolean', 'boolean', 'string', 'string', 'object', 'string', 'object', 'string', 'object', 'string', 'object', 'string', 'object', 'string', 'object'];
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
        TweakFlashVar.build = function (data) {
            return new TweakFlashVar(data);
        };

        TweakFlashVar.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakFlashVar.build).filter(Boolean);
            }
            return TweakFlashVar.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakFlashVar;
    }
})();