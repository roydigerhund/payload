"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_i18next_1 = require("react-i18next");
const Config_1 = require("../../../utilities/Config");
const Eyebrow_1 = __importDefault(require("../../../elements/Eyebrow"));
const Form_1 = __importDefault(require("../../../forms/Form"));
const PreviewButton_1 = __importDefault(require("../../../elements/PreviewButton"));
const RenderFields_1 = __importDefault(require("../../../forms/RenderFields"));
const CopyToClipboard_1 = __importDefault(require("../../../elements/CopyToClipboard"));
const DuplicateDocument_1 = __importDefault(require("../../../elements/DuplicateDocument"));
const DeleteDocument_1 = __importDefault(require("../../../elements/DeleteDocument"));
const Meta_1 = __importDefault(require("../../../utilities/Meta"));
const field_types_1 = __importDefault(require("../../../forms/field-types"));
const RenderTitle_1 = __importDefault(require("../../../elements/RenderTitle"));
const LeaveWithoutSaving_1 = __importDefault(require("../../../modals/LeaveWithoutSaving"));
const Auth_1 = __importDefault(require("./Auth"));
const VersionsCount_1 = __importDefault(require("../../../elements/VersionsCount"));
const Upload_1 = __importDefault(require("./Upload"));
const Autosave_1 = __importDefault(require("../../../elements/Autosave"));
const Status_1 = __importDefault(require("../../../elements/Status"));
const Publish_1 = require("../../../elements/Publish");
const SaveDraft_1 = require("../../../elements/SaveDraft");
const Save_1 = require("../../../elements/Save");
const DocumentInfo_1 = require("../../../utilities/DocumentInfo");
const OperationProvider_1 = require("../../../utilities/OperationProvider");
const Gutter_1 = require("../../../elements/Gutter");
const getTranslation_1 = require("../../../../../utilities/getTranslation");
const SetStepNav_1 = require("./SetStepNav");
const Loading_1 = require("../../../elements/Loading");
const formatDate_1 = require("../../../../utilities/formatDate");
require("./index.scss");
const baseClass = 'collection-edit';
const DefaultEditView = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    const { admin: { dateFormat }, routes: { admin } } = (0, Config_1.useConfig)();
    const { publishedDoc } = (0, DocumentInfo_1.useDocumentInfo)();
    const { t, i18n } = (0, react_i18next_1.useTranslation)('general');
    const { collection, isEditing, data, onSave: onSaveFromProps, permissions, isLoading, internalState, apiURL, action, hasSavePermission, disableEyebrow, disableActions, disableLeaveWithoutSaving, customHeader, id, updatedAt, } = props;
    const { slug, fields, admin: { useAsTitle, disableDuplicate, preview, hideAPIURL, }, versions, timestamps, auth, upload, } = collection;
    const classes = [
        baseClass,
        isEditing && `${baseClass}--is-editing`,
    ].filter(Boolean).join(' ');
    const onSave = (0, react_1.useCallback)((json) => {
        if (typeof onSaveFromProps === 'function') {
            onSaveFromProps({
                ...json,
                operation: id ? 'update' : 'create',
            });
        }
    }, [id, onSaveFromProps]);
    const operation = isEditing ? 'update' : 'create';
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes },
            react_1.default.createElement(OperationProvider_1.OperationContext.Provider, { value: operation },
                react_1.default.createElement(Form_1.default, { className: `${baseClass}__form`, method: id ? 'patch' : 'post', action: action, onSuccess: onSave, disabled: !hasSavePermission, initialState: internalState },
                    react_1.default.createElement(Loading_1.FormLoadingOverlayToggle, { formIsLoading: isLoading, action: isLoading ? 'loading' : operation, name: `collection-edit--${collection.labels.singular}`, loadingSuffix: (0, getTranslation_1.getTranslation)(collection.labels.singular, i18n), type: "withoutNav" }),
                    !isLoading && (react_1.default.createElement(react_1.default.Fragment, null,
                        !disableEyebrow && (react_1.default.createElement(SetStepNav_1.SetStepNav, { collection: collection, isEditing: isEditing, id: data === null || data === void 0 ? void 0 : data.id })),
                        react_1.default.createElement("div", { className: `${baseClass}__main` },
                            react_1.default.createElement(Meta_1.default, { title: `${isEditing ? t('editing') : t('creating')} - ${(0, getTranslation_1.getTranslation)(collection.labels.singular, i18n)}`, description: `${isEditing ? t('editing') : t('creating')} - ${(0, getTranslation_1.getTranslation)(collection.labels.singular, i18n)}`, keywords: `${(0, getTranslation_1.getTranslation)(collection.labels.singular, i18n)}, Payload, CMS` }),
                            !disableEyebrow && (react_1.default.createElement(Eyebrow_1.default, null)),
                            (!(((_a = collection.versions) === null || _a === void 0 ? void 0 : _a.drafts) && ((_c = (_b = collection.versions) === null || _b === void 0 ? void 0 : _b.drafts) === null || _c === void 0 ? void 0 : _c.autosave)) && !disableLeaveWithoutSaving) && (react_1.default.createElement(LeaveWithoutSaving_1.default, null)),
                            react_1.default.createElement(Gutter_1.Gutter, { className: `${baseClass}__edit` },
                                react_1.default.createElement("header", { className: `${baseClass}__header` },
                                    customHeader && customHeader,
                                    !customHeader && (react_1.default.createElement("h1", null,
                                        react_1.default.createElement(RenderTitle_1.default, { data: data, collection: collection, useAsTitle: useAsTitle, fallback: `[${t('untitled')}]` })))),
                                auth && (react_1.default.createElement(Auth_1.default, { useAPIKey: auth.useAPIKey, requirePassword: !isEditing, verify: auth.verify, collection: collection, email: data === null || data === void 0 ? void 0 : data.email, operation: operation })),
                                upload && (react_1.default.createElement(Upload_1.default, { data: data, collection: collection, internalState: internalState })),
                                react_1.default.createElement(RenderFields_1.default, { readOnly: !hasSavePermission, permissions: permissions.fields, filter: (field) => { var _a, _b; return (!((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.position) || (((_b = field === null || field === void 0 ? void 0 : field.admin) === null || _b === void 0 ? void 0 : _b.position) !== 'sidebar')); }, fieldTypes: field_types_1.default, fieldSchema: fields }))),
                        react_1.default.createElement("div", { className: `${baseClass}__sidebar-wrap` },
                            react_1.default.createElement("div", { className: `${baseClass}__sidebar` },
                                react_1.default.createElement("div", { className: `${baseClass}__sidebar-sticky-wrap` },
                                    !disableActions && (react_1.default.createElement("ul", { className: `${baseClass}__collection-actions` },
                                        ((_d = permissions === null || permissions === void 0 ? void 0 : permissions.create) === null || _d === void 0 ? void 0 : _d.permission) && (react_1.default.createElement(react_1.default.Fragment, null,
                                            react_1.default.createElement("li", null,
                                                react_1.default.createElement(react_router_dom_1.Link, { id: "action-create", to: `${admin}/collections/${slug}/create` }, t('createNew'))),
                                            !disableDuplicate && isEditing && (react_1.default.createElement("li", null,
                                                react_1.default.createElement(DuplicateDocument_1.default, { collection: collection, id: id, slug: slug }))))),
                                        ((_e = permissions === null || permissions === void 0 ? void 0 : permissions.delete) === null || _e === void 0 ? void 0 : _e.permission) && (react_1.default.createElement("li", null,
                                            react_1.default.createElement(DeleteDocument_1.default, { collection: collection, id: id, buttonId: "action-delete" }))))),
                                    react_1.default.createElement("div", { className: [
                                            `${baseClass}__document-actions`,
                                            ((((_f = collection.versions) === null || _f === void 0 ? void 0 : _f.drafts) && !((_h = (_g = collection.versions) === null || _g === void 0 ? void 0 : _g.drafts) === null || _h === void 0 ? void 0 : _h.autosave)) || (isEditing && preview)) && `${baseClass}__document-actions--has-2`,
                                        ].filter(Boolean).join(' ') },
                                        (isEditing && preview && (!((_j = collection.versions) === null || _j === void 0 ? void 0 : _j.drafts) || ((_l = (_k = collection.versions) === null || _k === void 0 ? void 0 : _k.drafts) === null || _l === void 0 ? void 0 : _l.autosave))) && (react_1.default.createElement(PreviewButton_1.default, { generatePreviewURL: preview, CustomComponent: (_p = (_o = (_m = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _m === void 0 ? void 0 : _m.components) === null || _o === void 0 ? void 0 : _o.edit) === null || _p === void 0 ? void 0 : _p.PreviewButton })),
                                        hasSavePermission && (react_1.default.createElement(react_1.default.Fragment, null, ((_q = collection.versions) === null || _q === void 0 ? void 0 : _q.drafts) ? (react_1.default.createElement(react_1.default.Fragment, null,
                                            !collection.versions.drafts.autosave && (react_1.default.createElement(SaveDraft_1.SaveDraft, { CustomComponent: (_t = (_s = (_r = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _r === void 0 ? void 0 : _r.components) === null || _s === void 0 ? void 0 : _s.edit) === null || _t === void 0 ? void 0 : _t.SaveDraftButton })),
                                            react_1.default.createElement(Publish_1.Publish, { CustomComponent: (_w = (_v = (_u = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _u === void 0 ? void 0 : _u.components) === null || _v === void 0 ? void 0 : _v.edit) === null || _w === void 0 ? void 0 : _w.PublishButton }))) : (react_1.default.createElement(Save_1.Save, { CustomComponent: (_z = (_y = (_x = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _x === void 0 ? void 0 : _x.components) === null || _y === void 0 ? void 0 : _y.edit) === null || _z === void 0 ? void 0 : _z.SaveButton }))))),
                                    react_1.default.createElement("div", { className: `${baseClass}__sidebar-fields` },
                                        (isEditing && preview && (((_0 = collection.versions) === null || _0 === void 0 ? void 0 : _0.drafts) && !((_2 = (_1 = collection.versions) === null || _1 === void 0 ? void 0 : _1.drafts) === null || _2 === void 0 ? void 0 : _2.autosave))) && (react_1.default.createElement(PreviewButton_1.default, { generatePreviewURL: preview, CustomComponent: (_5 = (_4 = (_3 = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _3 === void 0 ? void 0 : _3.components) === null || _4 === void 0 ? void 0 : _4.edit) === null || _5 === void 0 ? void 0 : _5.PreviewButton })),
                                        ((_6 = collection.versions) === null || _6 === void 0 ? void 0 : _6.drafts) && (react_1.default.createElement(react_1.default.Fragment, null,
                                            react_1.default.createElement(Status_1.default, null),
                                            (((_7 = collection.versions) === null || _7 === void 0 ? void 0 : _7.drafts.autosave) && hasSavePermission) && (react_1.default.createElement(Autosave_1.default, { publishedDocUpdatedAt: (publishedDoc === null || publishedDoc === void 0 ? void 0 : publishedDoc.updatedAt) || (data === null || data === void 0 ? void 0 : data.createdAt), collection: collection, id: id })))),
                                        react_1.default.createElement(RenderFields_1.default, { readOnly: !hasSavePermission, permissions: permissions.fields, filter: (field) => { var _a; return ((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.position) === 'sidebar'; }, fieldTypes: field_types_1.default, fieldSchema: fields })),
                                    isEditing && (react_1.default.createElement("ul", { className: `${baseClass}__meta` },
                                        !hideAPIURL && (react_1.default.createElement("li", { className: `${baseClass}__api-url` },
                                            react_1.default.createElement("span", { className: `${baseClass}__label` },
                                                "API URL",
                                                ' ',
                                                react_1.default.createElement(CopyToClipboard_1.default, { value: apiURL })),
                                            react_1.default.createElement("a", { href: apiURL, target: "_blank", rel: "noopener noreferrer" }, apiURL))),
                                        versions && (react_1.default.createElement("li", null,
                                            react_1.default.createElement("div", { className: `${baseClass}__label` }, t('version:versions')),
                                            react_1.default.createElement(VersionsCount_1.default, { collection: collection, id: id }))),
                                        timestamps && (react_1.default.createElement(react_1.default.Fragment, null,
                                            updatedAt && (react_1.default.createElement("li", null,
                                                react_1.default.createElement("div", { className: `${baseClass}__label` }, t('lastModified')),
                                                react_1.default.createElement("div", null, (0, formatDate_1.formatDate)(data.updatedAt, dateFormat, i18n === null || i18n === void 0 ? void 0 : i18n.language)))),
                                            ((publishedDoc === null || publishedDoc === void 0 ? void 0 : publishedDoc.createdAt) || (data === null || data === void 0 ? void 0 : data.createdAt)) && (react_1.default.createElement("li", null,
                                                react_1.default.createElement("div", { className: `${baseClass}__label` }, t('created')),
                                                react_1.default.createElement("div", null, (0, formatDate_1.formatDate)((publishedDoc === null || publishedDoc === void 0 ? void 0 : publishedDoc.createdAt) || (data === null || data === void 0 ? void 0 : data.createdAt), dateFormat, i18n === null || i18n === void 0 ? void 0 : i18n.language))))))))))))))))));
};
exports.default = DefaultEditView;
//# sourceMappingURL=Default.js.map