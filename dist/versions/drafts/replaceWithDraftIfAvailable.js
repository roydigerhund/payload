"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types");
const auth_1 = require("../../auth");
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const appendVersionToQueryKey_1 = require("./appendVersionToQueryKey");
const replaceWithDraftIfAvailable = async ({ payload, entity, entityType, doc, req, overrideAccess, accessResult, }) => {
    const VersionModel = payload.versions[entity.slug];
    const queryToBuild = {
        and: [
            {
                'version._status': {
                    equals: 'draft',
                },
            },
        ],
    };
    if (entityType === 'collection') {
        queryToBuild.and.push({
            parent: {
                equals: doc.id,
            },
        });
    }
    if ((0, types_1.docHasTimestamps)(doc)) {
        queryToBuild.and.push({
            updatedAt: {
                greater_than: doc.updatedAt,
            },
        });
    }
    let versionAccessResult;
    if ((0, auth_1.hasWhereAccessResult)(accessResult)) {
        versionAccessResult = (0, appendVersionToQueryKey_1.appendVersionToQueryKey)(accessResult);
    }
    const query = await VersionModel.buildQuery({
        where: queryToBuild,
        access: versionAccessResult,
        req,
        overrideAccess,
        globalSlug: entityType === 'global' ? entity.slug : undefined,
    });
    let draft = await VersionModel.findOne(query, {}, {
        lean: true,
        sort: { updatedAt: 'desc' },
    });
    if (!draft) {
        return doc;
    }
    draft = JSON.parse(JSON.stringify(draft));
    draft = (0, sanitizeInternalFields_1.default)(draft);
    // Disregard all other draft content at this point,
    // Only interested in the version itself.
    // Operations will handle firing hooks, etc.
    return {
        id: doc.id,
        ...draft.version,
        createdAt: draft.createdAt,
        updatedAt: draft.updatedAt,
    };
};
exports.default = replaceWithDraftIfAvailable;
//# sourceMappingURL=replaceWithDraftIfAvailable.js.map