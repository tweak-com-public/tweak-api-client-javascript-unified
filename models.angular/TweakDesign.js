(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesign', TweakDesign);

    TweakDesign.$inject = ['$log'];

    function TweakDesign($log) {

        /**
         * Constructor, with class name
         * @param previewId          {string}                  
         * @param colors             {array}                   items: type: string    
         * @param image              {string}                  
         * @param name               {string}    [REQUIRED]    
         * @param object             {object}    [REQUIRED]    
         * @param thumbnail          {object}                  
         * @param description        {string}                  default:   
         * @param purpose            {string}                  enum: none, printOrder
         * @param status             {string}                  enum: pendingAction, pendingApproval, approved, rejected
         * @param formData           {array}                   default: items: type: object    
         * @param highResPdfUrl      {string}                  default:   
         * @param proofPdfUrl        {string}                  default:   
         * @param jpegsUrl           {string}                  default:   
         * @param edited             {string}                  format: date-time  
         * @param expired            {string}                  format: date-time  
         * @param path               {string}                  default: /  
         * @param isDynamic          {boolean}                 default: false  
         * @param sentForApproval    {string}                  format: date-time  
         * @param approved           {string}                  format: date-time  
         * @param shared             {string}                  format: date-time  
         * @param pagesPreviews      {array}                   items: $ref: #/definitions/CloudinaryImage    
         * @param created            {string}                  format: date-time  
         * @param modified           {string}                  format: date-time  
         * @param id                 {string}                  
         * @param dynamicDataId      {string}                  
         * @param teamId             {string}                  
         * @param requesterId        {string}                  
         * @param assigneeId         {string}                  
         * @param reviewerId         {string}                  
         * @param templateId         {string}                  
         * @param portalId           {string}                  
         * @param rejectionCommentId {string}                  
         * @param folderId           {string}                  
         * @param tags               {array}                   items: $ref: #/definitions/Tag    
         * @param template           {object}                  $ref: #/definitions/Template  
         * @param portal             {object}                  $ref: #/definitions/Portal  
         * @param team               {object}                  $ref: #/definitions/Team  
         * @param comments           {array}                   items: $ref: #/definitions/DesignComment    
         * @param rejectionComment   {object}                  $ref: #/definitions/DesignComment  
         * @param exports            {array}                   items: $ref: #/definitions/DesignExport    
         * @param requester          {object}                  $ref: #/definitions/TeamMember  
         * @param assignee           {object}                  $ref: #/definitions/TeamMember  
         * @param reviewer           {object}                  $ref: #/definitions/TeamMember  
         * @param commenters         {array}                   items: $ref: #/definitions/TeamMember    
         * @param folder             {object}                  $ref: #/definitions/DesignFolder  
         * @param permission         {object}                  $ref: #/definitions/DesignPermissionSet  
         * @param members            {array}                   items: $ref: #/definitions/TeamMember    
         * @param designMembers      {array}                   items: $ref: #/definitions/DesignMember    
         * @param dynamicData        {object}                  $ref: #/definitions/DynamicData  
         */
        function TweakDesign(data) {
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
        var parameters = ['previewId', 'colors', 'image', 'name', 'object', 'thumbnail', 'description', 'purpose', 'status', 'formData', 'highResPdfUrl', 'proofPdfUrl', 'jpegsUrl', 'edited', 'expired', 'path', 'isDynamic', 'sentForApproval', 'approved', 'shared', 'pagesPreviews', 'created', 'modified', 'id', 'dynamicDataId', 'teamId', 'requesterId', 'assigneeId', 'reviewerId', 'templateId', 'portalId', 'rejectionCommentId', 'folderId', 'tags', 'template', 'portal', 'team', 'comments', 'rejectionComment', 'exports', 'requester', 'assignee', 'reviewer', 'commenters', 'folder', 'permission', 'members', 'designMembers', 'dynamicData'];
        var parametersType = ['string', 'array', 'string', 'string', 'object', 'object', 'string', 'string', 'string', 'array', 'string', 'string', 'string', 'string', 'string', 'string', 'boolean', 'string', 'string', 'string', 'array', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'object', 'object', 'object', 'array', 'object', 'array', 'object', 'object', 'object', 'array', 'object', 'object', 'array', 'array', 'object'];
        var requiredParameters = ['name', 'object'];

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
        TweakDesign.build = function (data) {
            return new TweakDesign(data);
        };

        TweakDesign.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesign.build).filter(Boolean);
            }
            return TweakDesign.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesign;
    }
})();