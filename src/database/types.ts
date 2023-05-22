import type { SchemaOptions } from 'mongoose';
import type { Config, SanitizedConfig } from '../config/types';
import {
  ArrayField,
  BlockField,
  CheckboxField,
  CodeField,
  CollapsibleField,
  DateField,
  EmailField,
  Field,
  GroupField,
  JSONField,
  NumberField,
  PointField,
  RadioField,
  RelationshipField,
  RichTextField,
  RowField,
  SelectField,
  TabsField,
  TextareaField,
  TextField,
  UploadField,
} from '../fields/config/types';
import { SanitizedCollectionConfig } from '../collections/config/types';
import { Payload } from '../payload';
import { Document, Where } from '../types';

export interface DatabaseAdapter<TSchema> {
  /**
   * Open the connection to the database
   */
  connect?: () => Promise<void>

  /**
   * Perform startup tasks required to interact with the database such as building Schema and models
   */
  init?: ({ payload, config }) => Promise<void>

  /**
   * Terminate the connection with the database
   */
  destroy?: () => Promise<void>

  // migrations
  /**
   * Output a migration file
   */
  createMigration: ({ payload }: {payload: Payload}) => Promise<void>

  /**
   * Run any migration up functions that have not yet been performed
   */
  migrate: ({ payload }: {payload: Payload}) => Promise<void>

  /**
   * Read the current state of migrations and output the result to show which have been run
   */
  migrateStatus: ({ payload }: {payload: Payload}) => Promise<void>

  /**
   * Run any migration down functions that have been performed
   */
  migrateDown: ({ payload }: {payload: Payload}) => Promise<void>

  /**
   * Run all migration down functions before running up
   */
  migrateRefresh: ({ payload }: {payload: Payload}) => Promise<void>

  /**
   * Run all migrate down functions
   */
  migrateReset: ({ payload }: {payload: Payload}) => Promise<void>

  /**
   * Drop the current database and run all up functions
   */
  migrateFresh: ({ payload }: {payload: Payload}) => Promise<void>

  // transactions
  /**
   * Perform many database interactions in a single, all-or-nothing operation.
   */
  transaction?: ({ payload }: {payload: Payload}) => Promise<boolean>

  /**
   * Start a transaction, requiring commit() to be called for any changes to be made.
   */
  begin?: ({ payload }: {payload: Payload}) => Promise<boolean>

  /**
   * Cancel any changes since the beginning of the transaction.
   */
  rollback?: ({ payload }: {payload: Payload}) => Promise<boolean>

  /**
   * Instruct the database to complete the changes made in the transaction.
   */
  commit?: ({ payload }: {payload: Payload}) => Promise<boolean>

  // versions
  queryDrafts: QueryDrafts<unknown>

  // operations
  find: Find
  findOne: FindOne
  create: Create
  update: Update
  updateOne: UpdateOne
  deleteOne: DeleteOne
  deleteMany: DeleteMany
}

type QueryDrafts<T> = (args: QueryDraftsArgs) => Promise<PaginatedDocs<T>>

type QueryDraftsArgs = {
  payload: Payload
  collection: SanitizedCollectionConfig
  where?: Where
  page?: number
  limit?: number
  sort?: string
  locale?: string
}

type FindArgs = {
  payload: Payload
  collection: SanitizedCollectionConfig
  where?: Where
  page?: number
  limit?: number
  sort?: string
  locale?: string
}

type Find = (args: FindArgs) => Promise<PaginatedDocs>

type FindOneArgs = {
  payload: Payload
  collection: SanitizedCollectionConfig
  where: Where
  locale?: string
  sort?: {
    [key: string]: string,
  }
}

type FindOne = (args: FindOneArgs) => Promise<PaginatedDocs>

type CreateArgs = {
  payload: Payload
  collection: SanitizedCollectionConfig
  data: Record<string, unknown>
  draft?: boolean
  locale?: string
}

type Create = (args: CreateArgs) => Promise<Document>

type UpdateArgs = {
  payload: Payload
  collection: SanitizedCollectionConfig
  data: Record<string, unknown>
  where: Where
  draft?: boolean
  locale?: string
}

type Update = (args: UpdateArgs) => Promise<Document>

type UpdateOneArgs = {
  payload: Payload,
  collection: SanitizedCollectionConfig,
  data: Record<string, unknown>,
  where: Where,
  draft?: boolean
  locale?: string
}

type UpdateOne = (args: UpdateOneArgs) => Promise<Document>

type DeleteOneArgs = {
  payload: Payload,
  collection: SanitizedCollectionConfig,
  data: Record<string, unknown>,
  where: Where,
}

type DeleteOne = (args: DeleteOneArgs) => Promise<Document>

type DeleteManyArgs = {
  payload: Payload,
  collection: SanitizedCollectionConfig,
  where: Where,
}

type DeleteMany = (args: DeleteManyArgs) => Promise<Document>

export type BuildSchema<TSchema> = (args: {
  config: SanitizedConfig,
  fields: Field[],
  options: BuildSchemaOptions,
}) => TSchema

export type BuildSchemaOptions = {
  options?: SchemaOptions
  allowIDField?: boolean
  disableUnique?: boolean
  draftsEnabled?: boolean
  indexSortableFields?: boolean
}

export type BuildSortParam = (args: {
  sort: string
  config: Config
  fields: Field[]
  timestamps: boolean
  locale: string
}) => {
  sortProperty: string
  sortOrder: string
}

export type PaginatedDocs<T = any> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: number | null | undefined
  nextPage?: number | null | undefined
}

/**
 * Field config types that need representation in the database
 */
type FieldType = 'number'
  | 'text'
  | 'email'
  | 'textarea'
  | 'richText'
  | 'code'
  | 'json'
  | 'point'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'upload'
  | 'relationship'
  | 'row'
  | 'collapsible'
  | 'tabs'
  | 'array'
  | 'group'
  | 'select'
  | 'blocks'

export type FieldGeneratorFunction<TSchema, TField extends Field> = (args: FieldGenerator<TSchema, TField>) => void

/**
 * Object mapping types to a schema based on TSchema
 */
export type FieldToSchemaMap<TSchema> = {
  number: FieldGeneratorFunction<TSchema, NumberField>
  text: FieldGeneratorFunction<TSchema, TextField>
  email: FieldGeneratorFunction<TSchema, EmailField>
  textarea: FieldGeneratorFunction<TSchema, TextareaField>
  richText: FieldGeneratorFunction<TSchema, RichTextField>
  code: FieldGeneratorFunction<TSchema, CodeField>
  json: FieldGeneratorFunction<TSchema, JSONField>
  point: FieldGeneratorFunction<TSchema, PointField>
  radio: FieldGeneratorFunction<TSchema, RadioField>
  checkbox: FieldGeneratorFunction<TSchema, CheckboxField>
  date: FieldGeneratorFunction<TSchema, DateField>
  upload: FieldGeneratorFunction<TSchema, UploadField>
  relationship: FieldGeneratorFunction<TSchema, RelationshipField>
  row: FieldGeneratorFunction<TSchema, RowField>
  collapsible: FieldGeneratorFunction<TSchema, CollapsibleField>
  tabs: FieldGeneratorFunction<TSchema, TabsField>
  array: FieldGeneratorFunction<TSchema, ArrayField>
  group: FieldGeneratorFunction<TSchema, GroupField>
  select: FieldGeneratorFunction<TSchema, SelectField>
  blocks: FieldGeneratorFunction<TSchema, BlockField>
}

export type FieldGenerator<TSchema, TField> = {
  field: TField,
  schema: TSchema,
  config: SanitizedConfig,
  options: BuildSchemaOptions,
}
