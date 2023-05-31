/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { PayloadRequest, Where, WhereField } from '../types';
import { EntityPolicies, validOperators } from '../mongoose/buildQuery';
import QueryError from '../errors/QueryError';
import { SanitizedCollectionConfig } from '../collections/config/types';
import { SanitizedGlobalConfig } from '../globals/config/types';
import flattenFields from './flattenTopLevelFields';
import { Field, FieldAffectingData } from '../fields/config/types';
import { validateSearchParam } from './validateSearchParams';

const flattenWhere = (query: Where): WhereField[] => Object.entries(query).reduce((flattenedConstraints, [key, val]) => {
  if ((key === 'and' || key === 'or') && Array.isArray(val)) {
    return [
      ...flattenedConstraints,
      ...val.map((subVal) => flattenWhere(subVal)),
    ];
  }

  return [
    ...flattenedConstraints,
    { [key]: val },
  ];
}, []);

type Args = {
  where: Where
  errors?: {path: string}[]
  policies?: EntityPolicies
  req: PayloadRequest
  versionFields?: Field[]
} & ({
  collectionConfig: SanitizedCollectionConfig
  globalConfig?: never | undefined
} | {
  globalConfig: SanitizedGlobalConfig
  collectionConfig?: never | undefined
})
export async function validateQueryPaths({
  where,
  collectionConfig,
  globalConfig,
  errors = [],
  policies = {
    collections: {},
    globals: {},
  },
  versionFields,
  req,
}: Args): Promise<void> {
  const fields = flattenFields(versionFields || (globalConfig || collectionConfig).fields) as FieldAffectingData[];
  if (typeof where === 'object') {
    // const flattenedWhere = flattenWhere(where);
    const whereFields = flattenWhere(where);
    // We need to determine if the whereKey is an AND, OR, or a schema path
    const promises = [];
    whereFields.map(async (constraint) => {
      Object.keys(constraint).map(async (path) => {
        Object.entries(constraint[path]).map(async ([operator, val]) => {
          if (validOperators.includes(operator)) {
            promises.push(validateSearchParam({
              collectionConfig,
              globalConfig,
              fields: (fields as Field[]),
              versionFields,
              errors,
              policies,
              req,
              path,
              val,
              operator,
            }));
          }
        });
      });
    });
    await Promise.all(promises);
    if (errors.length > 0) {
      throw new QueryError(errors);
    }
  }
}
