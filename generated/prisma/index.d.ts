
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model image
 * 
 */
export type image = $Result.DefaultSelection<Prisma.$imagePayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model country
 * 
 */
export type country = $Result.DefaultSelection<Prisma.$countryPayload>
/**
 * Model branches
 * 
 */
export type branches = $Result.DefaultSelection<Prisma.$branchesPayload>
/**
 * Model workHours
 * 
 */
export type workHours = $Result.DefaultSelection<Prisma.$workHoursPayload>
/**
 * Model store
 * 
 */
export type store = $Result.DefaultSelection<Prisma.$storePayload>
/**
 * Model transaction
 * 
 */
export type transaction = $Result.DefaultSelection<Prisma.$transactionPayload>
/**
 * Model socialLinks
 * 
 */
export type socialLinks = $Result.DefaultSelection<Prisma.$socialLinksPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Images
 * const images = await prisma.image.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Images
   * const images = await prisma.image.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.image`: Exposes CRUD operations for the **image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.imageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.countryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branches`: Exposes CRUD operations for the **branches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branches.findMany()
    * ```
    */
  get branches(): Prisma.branchesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workHours`: Exposes CRUD operations for the **workHours** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkHours
    * const workHours = await prisma.workHours.findMany()
    * ```
    */
  get workHours(): Prisma.workHoursDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.store`: Exposes CRUD operations for the **store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.storeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.transactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.socialLinks`: Exposes CRUD operations for the **socialLinks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialLinks
    * const socialLinks = await prisma.socialLinks.findMany()
    * ```
    */
  get socialLinks(): Prisma.socialLinksDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    image: 'image',
    user: 'user',
    country: 'country',
    branches: 'branches',
    workHours: 'workHours',
    store: 'store',
    transaction: 'transaction',
    socialLinks: 'socialLinks'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "image" | "user" | "country" | "branches" | "workHours" | "store" | "transaction" | "socialLinks"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      image: {
        payload: Prisma.$imagePayload<ExtArgs>
        fields: Prisma.imageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.imageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.imageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          findFirst: {
            args: Prisma.imageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.imageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          findMany: {
            args: Prisma.imageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>[]
          }
          create: {
            args: Prisma.imageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          createMany: {
            args: Prisma.imageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.imageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>[]
          }
          delete: {
            args: Prisma.imageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          update: {
            args: Prisma.imageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          deleteMany: {
            args: Prisma.imageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.imageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.imageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>[]
          }
          upsert: {
            args: Prisma.imageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.imageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.imageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      country: {
        payload: Prisma.$countryPayload<ExtArgs>
        fields: Prisma.countryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.countryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.countryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          findFirst: {
            args: Prisma.countryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.countryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          findMany: {
            args: Prisma.countryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>[]
          }
          create: {
            args: Prisma.countryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          createMany: {
            args: Prisma.countryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.countryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>[]
          }
          delete: {
            args: Prisma.countryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          update: {
            args: Prisma.countryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          deleteMany: {
            args: Prisma.countryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.countryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.countryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>[]
          }
          upsert: {
            args: Prisma.countryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry>
          }
          groupBy: {
            args: Prisma.countryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountryGroupByOutputType>[]
          }
          count: {
            args: Prisma.countryCountArgs<ExtArgs>
            result: $Utils.Optional<CountryCountAggregateOutputType> | number
          }
        }
      }
      branches: {
        payload: Prisma.$branchesPayload<ExtArgs>
        fields: Prisma.branchesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.branchesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.branchesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>
          }
          findFirst: {
            args: Prisma.branchesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.branchesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>
          }
          findMany: {
            args: Prisma.branchesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>[]
          }
          create: {
            args: Prisma.branchesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>
          }
          createMany: {
            args: Prisma.branchesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.branchesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>[]
          }
          delete: {
            args: Prisma.branchesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>
          }
          update: {
            args: Prisma.branchesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>
          }
          deleteMany: {
            args: Prisma.branchesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.branchesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.branchesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>[]
          }
          upsert: {
            args: Prisma.branchesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$branchesPayload>
          }
          aggregate: {
            args: Prisma.BranchesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranches>
          }
          groupBy: {
            args: Prisma.branchesGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchesGroupByOutputType>[]
          }
          count: {
            args: Prisma.branchesCountArgs<ExtArgs>
            result: $Utils.Optional<BranchesCountAggregateOutputType> | number
          }
        }
      }
      workHours: {
        payload: Prisma.$workHoursPayload<ExtArgs>
        fields: Prisma.workHoursFieldRefs
        operations: {
          findUnique: {
            args: Prisma.workHoursFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.workHoursFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>
          }
          findFirst: {
            args: Prisma.workHoursFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.workHoursFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>
          }
          findMany: {
            args: Prisma.workHoursFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>[]
          }
          create: {
            args: Prisma.workHoursCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>
          }
          createMany: {
            args: Prisma.workHoursCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.workHoursCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>[]
          }
          delete: {
            args: Prisma.workHoursDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>
          }
          update: {
            args: Prisma.workHoursUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>
          }
          deleteMany: {
            args: Prisma.workHoursDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.workHoursUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.workHoursUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>[]
          }
          upsert: {
            args: Prisma.workHoursUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$workHoursPayload>
          }
          aggregate: {
            args: Prisma.WorkHoursAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkHours>
          }
          groupBy: {
            args: Prisma.workHoursGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkHoursGroupByOutputType>[]
          }
          count: {
            args: Prisma.workHoursCountArgs<ExtArgs>
            result: $Utils.Optional<WorkHoursCountAggregateOutputType> | number
          }
        }
      }
      store: {
        payload: Prisma.$storePayload<ExtArgs>
        fields: Prisma.storeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.storeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.storeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>
          }
          findFirst: {
            args: Prisma.storeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.storeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>
          }
          findMany: {
            args: Prisma.storeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>[]
          }
          create: {
            args: Prisma.storeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>
          }
          createMany: {
            args: Prisma.storeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.storeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>[]
          }
          delete: {
            args: Prisma.storeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>
          }
          update: {
            args: Prisma.storeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>
          }
          deleteMany: {
            args: Prisma.storeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.storeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.storeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>[]
          }
          upsert: {
            args: Prisma.storeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$storePayload>
          }
          aggregate: {
            args: Prisma.StoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore>
          }
          groupBy: {
            args: Prisma.storeGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.storeCountArgs<ExtArgs>
            result: $Utils.Optional<StoreCountAggregateOutputType> | number
          }
        }
      }
      transaction: {
        payload: Prisma.$transactionPayload<ExtArgs>
        fields: Prisma.transactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.transactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.transactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>
          }
          findFirst: {
            args: Prisma.transactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.transactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>
          }
          findMany: {
            args: Prisma.transactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>[]
          }
          create: {
            args: Prisma.transactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>
          }
          createMany: {
            args: Prisma.transactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.transactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>[]
          }
          delete: {
            args: Prisma.transactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>
          }
          update: {
            args: Prisma.transactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>
          }
          deleteMany: {
            args: Prisma.transactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.transactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.transactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>[]
          }
          upsert: {
            args: Prisma.transactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.transactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.transactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      socialLinks: {
        payload: Prisma.$socialLinksPayload<ExtArgs>
        fields: Prisma.socialLinksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.socialLinksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.socialLinksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>
          }
          findFirst: {
            args: Prisma.socialLinksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.socialLinksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>
          }
          findMany: {
            args: Prisma.socialLinksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>[]
          }
          create: {
            args: Prisma.socialLinksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>
          }
          createMany: {
            args: Prisma.socialLinksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.socialLinksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>[]
          }
          delete: {
            args: Prisma.socialLinksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>
          }
          update: {
            args: Prisma.socialLinksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>
          }
          deleteMany: {
            args: Prisma.socialLinksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.socialLinksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.socialLinksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>[]
          }
          upsert: {
            args: Prisma.socialLinksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$socialLinksPayload>
          }
          aggregate: {
            args: Prisma.SocialLinksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocialLinks>
          }
          groupBy: {
            args: Prisma.socialLinksGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialLinksGroupByOutputType>[]
          }
          count: {
            args: Prisma.socialLinksCountArgs<ExtArgs>
            result: $Utils.Optional<SocialLinksCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    image?: imageOmit
    user?: userOmit
    country?: countryOmit
    branches?: branchesOmit
    workHours?: workHoursOmit
    store?: storeOmit
    transaction?: transactionOmit
    socialLinks?: socialLinksOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    transaction: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | UserCountOutputTypeCountTransactionArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionWhereInput
  }


  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    user: number
    branches: number
  }

  export type CountryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | CountryCountOutputTypeCountUserArgs
    branches?: boolean | CountryCountOutputTypeCountBranchesArgs
  }

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: branchesWhereInput
  }


  /**
   * Count Type BranchesCountOutputType
   */

  export type BranchesCountOutputType = {
    workHours: number
  }

  export type BranchesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workHours?: boolean | BranchesCountOutputTypeCountWorkHoursArgs
  }

  // Custom InputTypes
  /**
   * BranchesCountOutputType without action
   */
  export type BranchesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchesCountOutputType
     */
    select?: BranchesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchesCountOutputType without action
   */
  export type BranchesCountOutputTypeCountWorkHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: workHoursWhereInput
  }


  /**
   * Count Type StoreCountOutputType
   */

  export type StoreCountOutputType = {
    branches: number
    transactions: number
  }

  export type StoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branches?: boolean | StoreCountOutputTypeCountBranchesArgs
    transactions?: boolean | StoreCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     */
    select?: StoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: branchesWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionWhereInput
  }


  /**
   * Count Type SocialLinksCountOutputType
   */

  export type SocialLinksCountOutputType = {
    store: number
  }

  export type SocialLinksCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | SocialLinksCountOutputTypeCountStoreArgs
  }

  // Custom InputTypes
  /**
   * SocialLinksCountOutputType without action
   */
  export type SocialLinksCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialLinksCountOutputType
     */
    select?: SocialLinksCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SocialLinksCountOutputType without action
   */
  export type SocialLinksCountOutputTypeCountStoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: storeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    fileId: string | null
    url: string | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    fileId: string | null
    url: string | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    fileId: number
    url: number
    _all: number
  }


  export type ImageMinAggregateInputType = {
    id?: true
    fileId?: true
    url?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    fileId?: true
    url?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    fileId?: true
    url?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which image to aggregate.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type imageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: imageWhereInput
    orderBy?: imageOrderByWithAggregationInput | imageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: imageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    fileId: string
    url: string
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends imageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type imageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    url?: boolean
  }, ExtArgs["result"]["image"]>

  export type imageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    url?: boolean
  }, ExtArgs["result"]["image"]>

  export type imageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    url?: boolean
  }, ExtArgs["result"]["image"]>

  export type imageSelectScalar = {
    id?: boolean
    fileId?: boolean
    url?: boolean
  }

  export type imageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileId" | "url", ExtArgs["result"]["image"]>

  export type $imagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "image"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileId: string
      url: string
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type imageGetPayload<S extends boolean | null | undefined | imageDefaultArgs> = $Result.GetResult<Prisma.$imagePayload, S>

  type imageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<imageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface imageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['image'], meta: { name: 'image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {imageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends imageFindUniqueArgs>(args: SelectSubset<T, imageFindUniqueArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {imageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends imageFindUniqueOrThrowArgs>(args: SelectSubset<T, imageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends imageFindFirstArgs>(args?: SelectSubset<T, imageFindFirstArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends imageFindFirstOrThrowArgs>(args?: SelectSubset<T, imageFindFirstOrThrowArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends imageFindManyArgs>(args?: SelectSubset<T, imageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {imageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends imageCreateArgs>(args: SelectSubset<T, imageCreateArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {imageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends imageCreateManyArgs>(args?: SelectSubset<T, imageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {imageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends imageCreateManyAndReturnArgs>(args?: SelectSubset<T, imageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Image.
     * @param {imageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends imageDeleteArgs>(args: SelectSubset<T, imageDeleteArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {imageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends imageUpdateArgs>(args: SelectSubset<T, imageUpdateArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {imageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends imageDeleteManyArgs>(args?: SelectSubset<T, imageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends imageUpdateManyArgs>(args: SelectSubset<T, imageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images and returns the data updated in the database.
     * @param {imageUpdateManyAndReturnArgs} args - Arguments to update many Images.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends imageUpdateManyAndReturnArgs>(args: SelectSubset<T, imageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Image.
     * @param {imageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends imageUpsertArgs>(args: SelectSubset<T, imageUpsertArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends imageCountArgs>(
      args?: Subset<T, imageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends imageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: imageGroupByArgs['orderBy'] }
        : { orderBy?: imageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, imageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the image model
   */
  readonly fields: imageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__imageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the image model
   */
  interface imageFieldRefs {
    readonly id: FieldRef<"image", 'String'>
    readonly fileId: FieldRef<"image", 'String'>
    readonly url: FieldRef<"image", 'String'>
  }
    

  // Custom InputTypes
  /**
   * image findUnique
   */
  export type imageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image findUniqueOrThrow
   */
  export type imageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image findFirst
   */
  export type imageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for images.
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * image findFirstOrThrow
   */
  export type imageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for images.
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * image findMany
   */
  export type imageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Filter, which images to fetch.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing images.
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * image create
   */
  export type imageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * The data needed to create a image.
     */
    data: XOR<imageCreateInput, imageUncheckedCreateInput>
  }

  /**
   * image createMany
   */
  export type imageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many images.
     */
    data: imageCreateManyInput | imageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * image createManyAndReturn
   */
  export type imageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * The data used to create many images.
     */
    data: imageCreateManyInput | imageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * image update
   */
  export type imageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * The data needed to update a image.
     */
    data: XOR<imageUpdateInput, imageUncheckedUpdateInput>
    /**
     * Choose, which image to update.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image updateMany
   */
  export type imageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update images.
     */
    data: XOR<imageUpdateManyMutationInput, imageUncheckedUpdateManyInput>
    /**
     * Filter which images to update
     */
    where?: imageWhereInput
    /**
     * Limit how many images to update.
     */
    limit?: number
  }

  /**
   * image updateManyAndReturn
   */
  export type imageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * The data used to update images.
     */
    data: XOR<imageUpdateManyMutationInput, imageUncheckedUpdateManyInput>
    /**
     * Filter which images to update
     */
    where?: imageWhereInput
    /**
     * Limit how many images to update.
     */
    limit?: number
  }

  /**
   * image upsert
   */
  export type imageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * The filter to search for the image to update in case it exists.
     */
    where: imageWhereUniqueInput
    /**
     * In case the image found by the `where` argument doesn't exist, create a new image with this data.
     */
    create: XOR<imageCreateInput, imageUncheckedCreateInput>
    /**
     * In case the image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<imageUpdateInput, imageUncheckedUpdateInput>
  }

  /**
   * image delete
   */
  export type imageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Filter which image to delete.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image deleteMany
   */
  export type imageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which images to delete
     */
    where?: imageWhereInput
    /**
     * Limit how many images to delete.
     */
    limit?: number
  }

  /**
   * image without action
   */
  export type imageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    dateOfBirth: Date | null
    gender: string | null
    countryId: string | null
    phone: string | null
    email: string | null
    password: string | null
    role: string | null
    isVerified: boolean | null
    refreshTokenSecret: string | null
    accessTokenSecret: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    dateOfBirth: Date | null
    gender: string | null
    countryId: string | null
    phone: string | null
    email: string | null
    password: string | null
    role: string | null
    isVerified: boolean | null
    refreshTokenSecret: string | null
    accessTokenSecret: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    dateOfBirth: number
    gender: number
    countryId: number
    phone: number
    email: number
    password: number
    role: number
    isVerified: number
    refreshTokenSecret: number
    accessTokenSecret: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    dateOfBirth?: true
    gender?: true
    countryId?: true
    phone?: true
    email?: true
    password?: true
    role?: true
    isVerified?: true
    refreshTokenSecret?: true
    accessTokenSecret?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    dateOfBirth?: true
    gender?: true
    countryId?: true
    phone?: true
    email?: true
    password?: true
    role?: true
    isVerified?: true
    refreshTokenSecret?: true
    accessTokenSecret?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    dateOfBirth?: true
    gender?: true
    countryId?: true
    phone?: true
    email?: true
    password?: true
    role?: true
    isVerified?: true
    refreshTokenSecret?: true
    accessTokenSecret?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    dateOfBirth: Date | null
    gender: string | null
    countryId: string
    phone: string
    email: string | null
    password: string | null
    role: string
    isVerified: boolean
    refreshTokenSecret: string | null
    accessTokenSecret: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    countryId?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userCountry?: boolean | countryDefaultArgs<ExtArgs>
    transaction?: boolean | user$transactionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    countryId?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userCountry?: boolean | countryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    countryId?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userCountry?: boolean | countryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    name?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    countryId?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "dateOfBirth" | "gender" | "countryId" | "phone" | "email" | "password" | "role" | "isVerified" | "refreshTokenSecret" | "accessTokenSecret" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userCountry?: boolean | countryDefaultArgs<ExtArgs>
    transaction?: boolean | user$transactionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userCountry?: boolean | countryDefaultArgs<ExtArgs>
  }
  export type userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userCountry?: boolean | countryDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      userCountry: Prisma.$countryPayload<ExtArgs>
      transaction: Prisma.$transactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      dateOfBirth: Date | null
      gender: string | null
      countryId: string
      phone: string
      email: string | null
      password: string | null
      role: string
      isVerified: boolean
      refreshTokenSecret: string | null
      accessTokenSecret: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userCountry<T extends countryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, countryDefaultArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends user$transactionArgs<ExtArgs> = {}>(args?: Subset<T, user$transactionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly dateOfBirth: FieldRef<"user", 'DateTime'>
    readonly gender: FieldRef<"user", 'String'>
    readonly countryId: FieldRef<"user", 'String'>
    readonly phone: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly role: FieldRef<"user", 'String'>
    readonly isVerified: FieldRef<"user", 'Boolean'>
    readonly refreshTokenSecret: FieldRef<"user", 'String'>
    readonly accessTokenSecret: FieldRef<"user", 'String'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.transaction
   */
  export type user$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    where?: transactionWhereInput
    orderBy?: transactionOrderByWithRelationInput | transactionOrderByWithRelationInput[]
    cursor?: transactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryMinAggregateOutputType = {
    id: string | null
    countryName: string | null
    currencyCode: string | null
    countryIsoCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountryMaxAggregateOutputType = {
    id: string | null
    countryName: string | null
    currencyCode: string | null
    countryIsoCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountryCountAggregateOutputType = {
    id: number
    countryName: number
    currencyCode: number
    countryIsoCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CountryMinAggregateInputType = {
    id?: true
    countryName?: true
    currencyCode?: true
    countryIsoCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountryMaxAggregateInputType = {
    id?: true
    countryName?: true
    currencyCode?: true
    countryIsoCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountryCountAggregateInputType = {
    id?: true
    countryName?: true
    currencyCode?: true
    countryIsoCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CountryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which country to aggregate.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type countryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: countryWhereInput
    orderBy?: countryOrderByWithAggregationInput | countryOrderByWithAggregationInput[]
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum
    having?: countryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }

  export type CountryGroupByOutputType = {
    id: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt: Date
    updatedAt: Date
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends countryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type countrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    countryName?: boolean
    currencyCode?: boolean
    countryIsoCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | country$userArgs<ExtArgs>
    branches?: boolean | country$branchesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["country"]>

  export type countrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    countryName?: boolean
    currencyCode?: boolean
    countryIsoCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["country"]>

  export type countrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    countryName?: boolean
    currencyCode?: boolean
    countryIsoCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["country"]>

  export type countrySelectScalar = {
    id?: boolean
    countryName?: boolean
    currencyCode?: boolean
    countryIsoCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type countryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "countryName" | "currencyCode" | "countryIsoCode" | "createdAt" | "updatedAt", ExtArgs["result"]["country"]>
  export type countryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | country$userArgs<ExtArgs>
    branches?: boolean | country$branchesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type countryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type countryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $countryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "country"
    objects: {
      user: Prisma.$userPayload<ExtArgs>[]
      branches: Prisma.$branchesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      countryName: string
      currencyCode: string
      countryIsoCode: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["country"]>
    composites: {}
  }

  type countryGetPayload<S extends boolean | null | undefined | countryDefaultArgs> = $Result.GetResult<Prisma.$countryPayload, S>

  type countryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<countryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountryCountAggregateInputType | true
    }

  export interface countryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['country'], meta: { name: 'country' } }
    /**
     * Find zero or one Country that matches the filter.
     * @param {countryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends countryFindUniqueArgs>(args: SelectSubset<T, countryFindUniqueArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {countryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends countryFindUniqueOrThrowArgs>(args: SelectSubset<T, countryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends countryFindFirstArgs>(args?: SelectSubset<T, countryFindFirstArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends countryFindFirstOrThrowArgs>(args?: SelectSubset<T, countryFindFirstOrThrowArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countryWithIdOnly = await prisma.country.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends countryFindManyArgs>(args?: SelectSubset<T, countryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Country.
     * @param {countryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
     */
    create<T extends countryCreateArgs>(args: SelectSubset<T, countryCreateArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Countries.
     * @param {countryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends countryCreateManyArgs>(args?: SelectSubset<T, countryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countries and returns the data saved in the database.
     * @param {countryCreateManyAndReturnArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countries and only return the `id`
     * const countryWithIdOnly = await prisma.country.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends countryCreateManyAndReturnArgs>(args?: SelectSubset<T, countryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Country.
     * @param {countryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
     */
    delete<T extends countryDeleteArgs>(args: SelectSubset<T, countryDeleteArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Country.
     * @param {countryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends countryUpdateArgs>(args: SelectSubset<T, countryUpdateArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Countries.
     * @param {countryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends countryDeleteManyArgs>(args?: SelectSubset<T, countryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends countryUpdateManyArgs>(args: SelectSubset<T, countryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries and returns the data updated in the database.
     * @param {countryUpdateManyAndReturnArgs} args - Arguments to update many Countries.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countries and only return the `id`
     * const countryWithIdOnly = await prisma.country.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends countryUpdateManyAndReturnArgs>(args: SelectSubset<T, countryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Country.
     * @param {countryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends countryUpsertArgs>(args: SelectSubset<T, countryUpsertArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends countryCountArgs>(
      args?: Subset<T, countryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): Prisma.PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends countryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: countryGroupByArgs['orderBy'] }
        : { orderBy?: countryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, countryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the country model
   */
  readonly fields: countryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__countryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends country$userArgs<ExtArgs> = {}>(args?: Subset<T, country$userArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branches<T extends country$branchesArgs<ExtArgs> = {}>(args?: Subset<T, country$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the country model
   */
  interface countryFieldRefs {
    readonly id: FieldRef<"country", 'String'>
    readonly countryName: FieldRef<"country", 'String'>
    readonly currencyCode: FieldRef<"country", 'String'>
    readonly countryIsoCode: FieldRef<"country", 'String'>
    readonly createdAt: FieldRef<"country", 'DateTime'>
    readonly updatedAt: FieldRef<"country", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * country findUnique
   */
  export type countryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country findUniqueOrThrow
   */
  export type countryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country findFirst
   */
  export type countryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for countries.
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * country findFirstOrThrow
   */
  export type countryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for countries.
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * country findMany
   */
  export type countryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which countries to fetch.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing countries.
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * country create
   */
  export type countryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * The data needed to create a country.
     */
    data: XOR<countryCreateInput, countryUncheckedCreateInput>
  }

  /**
   * country createMany
   */
  export type countryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many countries.
     */
    data: countryCreateManyInput | countryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * country createManyAndReturn
   */
  export type countryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * The data used to create many countries.
     */
    data: countryCreateManyInput | countryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * country update
   */
  export type countryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * The data needed to update a country.
     */
    data: XOR<countryUpdateInput, countryUncheckedUpdateInput>
    /**
     * Choose, which country to update.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country updateMany
   */
  export type countryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update countries.
     */
    data: XOR<countryUpdateManyMutationInput, countryUncheckedUpdateManyInput>
    /**
     * Filter which countries to update
     */
    where?: countryWhereInput
    /**
     * Limit how many countries to update.
     */
    limit?: number
  }

  /**
   * country updateManyAndReturn
   */
  export type countryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * The data used to update countries.
     */
    data: XOR<countryUpdateManyMutationInput, countryUncheckedUpdateManyInput>
    /**
     * Filter which countries to update
     */
    where?: countryWhereInput
    /**
     * Limit how many countries to update.
     */
    limit?: number
  }

  /**
   * country upsert
   */
  export type countryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * The filter to search for the country to update in case it exists.
     */
    where: countryWhereUniqueInput
    /**
     * In case the country found by the `where` argument doesn't exist, create a new country with this data.
     */
    create: XOR<countryCreateInput, countryUncheckedCreateInput>
    /**
     * In case the country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<countryUpdateInput, countryUncheckedUpdateInput>
  }

  /**
   * country delete
   */
  export type countryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter which country to delete.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country deleteMany
   */
  export type countryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which countries to delete
     */
    where?: countryWhereInput
    /**
     * Limit how many countries to delete.
     */
    limit?: number
  }

  /**
   * country.user
   */
  export type country$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    cursor?: userWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * country.branches
   */
  export type country$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    where?: branchesWhereInput
    orderBy?: branchesOrderByWithRelationInput | branchesOrderByWithRelationInput[]
    cursor?: branchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * country without action
   */
  export type countryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
  }


  /**
   * Model branches
   */

  export type AggregateBranches = {
    _count: BranchesCountAggregateOutputType | null
    _min: BranchesMinAggregateOutputType | null
    _max: BranchesMaxAggregateOutputType | null
  }

  export type BranchesMinAggregateOutputType = {
    id: string | null
    storeId: string | null
    address: string | null
    countryId: string | null
    phone: string | null
    isFreezed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchesMaxAggregateOutputType = {
    id: string | null
    storeId: string | null
    address: string | null
    countryId: string | null
    phone: string | null
    isFreezed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchesCountAggregateOutputType = {
    id: number
    storeId: number
    address: number
    countryId: number
    phone: number
    isFreezed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BranchesMinAggregateInputType = {
    id?: true
    storeId?: true
    address?: true
    countryId?: true
    phone?: true
    isFreezed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchesMaxAggregateInputType = {
    id?: true
    storeId?: true
    address?: true
    countryId?: true
    phone?: true
    isFreezed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchesCountAggregateInputType = {
    id?: true
    storeId?: true
    address?: true
    countryId?: true
    phone?: true
    isFreezed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BranchesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which branches to aggregate.
     */
    where?: branchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of branches to fetch.
     */
    orderBy?: branchesOrderByWithRelationInput | branchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: branchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned branches
    **/
    _count?: true | BranchesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchesMaxAggregateInputType
  }

  export type GetBranchesAggregateType<T extends BranchesAggregateArgs> = {
        [P in keyof T & keyof AggregateBranches]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranches[P]>
      : GetScalarType<T[P], AggregateBranches[P]>
  }




  export type branchesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: branchesWhereInput
    orderBy?: branchesOrderByWithAggregationInput | branchesOrderByWithAggregationInput[]
    by: BranchesScalarFieldEnum[] | BranchesScalarFieldEnum
    having?: branchesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchesCountAggregateInputType | true
    _min?: BranchesMinAggregateInputType
    _max?: BranchesMaxAggregateInputType
  }

  export type BranchesGroupByOutputType = {
    id: string
    storeId: string
    address: string
    countryId: string
    phone: string
    isFreezed: boolean
    createdAt: Date
    updatedAt: Date
    _count: BranchesCountAggregateOutputType | null
    _min: BranchesMinAggregateOutputType | null
    _max: BranchesMaxAggregateOutputType | null
  }

  type GetBranchesGroupByPayload<T extends branchesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchesGroupByOutputType[P]>
            : GetScalarType<T[P], BranchesGroupByOutputType[P]>
        }
      >
    >


  export type branchesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    address?: boolean
    countryId?: boolean
    phone?: boolean
    isFreezed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | storeDefaultArgs<ExtArgs>
    country?: boolean | countryDefaultArgs<ExtArgs>
    workHours?: boolean | branches$workHoursArgs<ExtArgs>
    _count?: boolean | BranchesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branches"]>

  export type branchesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    address?: boolean
    countryId?: boolean
    phone?: boolean
    isFreezed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | storeDefaultArgs<ExtArgs>
    country?: boolean | countryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branches"]>

  export type branchesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    address?: boolean
    countryId?: boolean
    phone?: boolean
    isFreezed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | storeDefaultArgs<ExtArgs>
    country?: boolean | countryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branches"]>

  export type branchesSelectScalar = {
    id?: boolean
    storeId?: boolean
    address?: boolean
    countryId?: boolean
    phone?: boolean
    isFreezed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type branchesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "address" | "countryId" | "phone" | "isFreezed" | "createdAt" | "updatedAt", ExtArgs["result"]["branches"]>
  export type branchesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | storeDefaultArgs<ExtArgs>
    country?: boolean | countryDefaultArgs<ExtArgs>
    workHours?: boolean | branches$workHoursArgs<ExtArgs>
    _count?: boolean | BranchesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type branchesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | storeDefaultArgs<ExtArgs>
    country?: boolean | countryDefaultArgs<ExtArgs>
  }
  export type branchesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | storeDefaultArgs<ExtArgs>
    country?: boolean | countryDefaultArgs<ExtArgs>
  }

  export type $branchesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "branches"
    objects: {
      store: Prisma.$storePayload<ExtArgs>
      country: Prisma.$countryPayload<ExtArgs>
      workHours: Prisma.$workHoursPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storeId: string
      address: string
      countryId: string
      phone: string
      isFreezed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["branches"]>
    composites: {}
  }

  type branchesGetPayload<S extends boolean | null | undefined | branchesDefaultArgs> = $Result.GetResult<Prisma.$branchesPayload, S>

  type branchesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<branchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchesCountAggregateInputType | true
    }

  export interface branchesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['branches'], meta: { name: 'branches' } }
    /**
     * Find zero or one Branches that matches the filter.
     * @param {branchesFindUniqueArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends branchesFindUniqueArgs>(args: SelectSubset<T, branchesFindUniqueArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branches that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {branchesFindUniqueOrThrowArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends branchesFindUniqueOrThrowArgs>(args: SelectSubset<T, branchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {branchesFindFirstArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends branchesFindFirstArgs>(args?: SelectSubset<T, branchesFindFirstArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branches that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {branchesFindFirstOrThrowArgs} args - Arguments to find a Branches
     * @example
     * // Get one Branches
     * const branches = await prisma.branches.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends branchesFindFirstOrThrowArgs>(args?: SelectSubset<T, branchesFindFirstOrThrowArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {branchesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branches.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branches.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchesWithIdOnly = await prisma.branches.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends branchesFindManyArgs>(args?: SelectSubset<T, branchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branches.
     * @param {branchesCreateArgs} args - Arguments to create a Branches.
     * @example
     * // Create one Branches
     * const Branches = await prisma.branches.create({
     *   data: {
     *     // ... data to create a Branches
     *   }
     * })
     * 
     */
    create<T extends branchesCreateArgs>(args: SelectSubset<T, branchesCreateArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {branchesCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branches = await prisma.branches.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends branchesCreateManyArgs>(args?: SelectSubset<T, branchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {branchesCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branches = await prisma.branches.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `id`
     * const branchesWithIdOnly = await prisma.branches.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends branchesCreateManyAndReturnArgs>(args?: SelectSubset<T, branchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branches.
     * @param {branchesDeleteArgs} args - Arguments to delete one Branches.
     * @example
     * // Delete one Branches
     * const Branches = await prisma.branches.delete({
     *   where: {
     *     // ... filter to delete one Branches
     *   }
     * })
     * 
     */
    delete<T extends branchesDeleteArgs>(args: SelectSubset<T, branchesDeleteArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branches.
     * @param {branchesUpdateArgs} args - Arguments to update one Branches.
     * @example
     * // Update one Branches
     * const branches = await prisma.branches.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends branchesUpdateArgs>(args: SelectSubset<T, branchesUpdateArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {branchesDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branches.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends branchesDeleteManyArgs>(args?: SelectSubset<T, branchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {branchesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branches = await prisma.branches.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends branchesUpdateManyArgs>(args: SelectSubset<T, branchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {branchesUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branches = await prisma.branches.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `id`
     * const branchesWithIdOnly = await prisma.branches.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends branchesUpdateManyAndReturnArgs>(args: SelectSubset<T, branchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branches.
     * @param {branchesUpsertArgs} args - Arguments to update or create a Branches.
     * @example
     * // Update or create a Branches
     * const branches = await prisma.branches.upsert({
     *   create: {
     *     // ... data to create a Branches
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branches we want to update
     *   }
     * })
     */
    upsert<T extends branchesUpsertArgs>(args: SelectSubset<T, branchesUpsertArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {branchesCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branches.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends branchesCountArgs>(
      args?: Subset<T, branchesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchesAggregateArgs>(args: Subset<T, BranchesAggregateArgs>): Prisma.PrismaPromise<GetBranchesAggregateType<T>>

    /**
     * Group by Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {branchesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends branchesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: branchesGroupByArgs['orderBy'] }
        : { orderBy?: branchesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, branchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the branches model
   */
  readonly fields: branchesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for branches.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__branchesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends storeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, storeDefaultArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    country<T extends countryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, countryDefaultArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workHours<T extends branches$workHoursArgs<ExtArgs> = {}>(args?: Subset<T, branches$workHoursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the branches model
   */
  interface branchesFieldRefs {
    readonly id: FieldRef<"branches", 'String'>
    readonly storeId: FieldRef<"branches", 'String'>
    readonly address: FieldRef<"branches", 'String'>
    readonly countryId: FieldRef<"branches", 'String'>
    readonly phone: FieldRef<"branches", 'String'>
    readonly isFreezed: FieldRef<"branches", 'Boolean'>
    readonly createdAt: FieldRef<"branches", 'DateTime'>
    readonly updatedAt: FieldRef<"branches", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * branches findUnique
   */
  export type branchesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * Filter, which branches to fetch.
     */
    where: branchesWhereUniqueInput
  }

  /**
   * branches findUniqueOrThrow
   */
  export type branchesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * Filter, which branches to fetch.
     */
    where: branchesWhereUniqueInput
  }

  /**
   * branches findFirst
   */
  export type branchesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * Filter, which branches to fetch.
     */
    where?: branchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of branches to fetch.
     */
    orderBy?: branchesOrderByWithRelationInput | branchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for branches.
     */
    cursor?: branchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of branches.
     */
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * branches findFirstOrThrow
   */
  export type branchesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * Filter, which branches to fetch.
     */
    where?: branchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of branches to fetch.
     */
    orderBy?: branchesOrderByWithRelationInput | branchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for branches.
     */
    cursor?: branchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of branches.
     */
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * branches findMany
   */
  export type branchesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * Filter, which branches to fetch.
     */
    where?: branchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of branches to fetch.
     */
    orderBy?: branchesOrderByWithRelationInput | branchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing branches.
     */
    cursor?: branchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` branches.
     */
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * branches create
   */
  export type branchesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * The data needed to create a branches.
     */
    data: XOR<branchesCreateInput, branchesUncheckedCreateInput>
  }

  /**
   * branches createMany
   */
  export type branchesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many branches.
     */
    data: branchesCreateManyInput | branchesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * branches createManyAndReturn
   */
  export type branchesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * The data used to create many branches.
     */
    data: branchesCreateManyInput | branchesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * branches update
   */
  export type branchesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * The data needed to update a branches.
     */
    data: XOR<branchesUpdateInput, branchesUncheckedUpdateInput>
    /**
     * Choose, which branches to update.
     */
    where: branchesWhereUniqueInput
  }

  /**
   * branches updateMany
   */
  export type branchesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update branches.
     */
    data: XOR<branchesUpdateManyMutationInput, branchesUncheckedUpdateManyInput>
    /**
     * Filter which branches to update
     */
    where?: branchesWhereInput
    /**
     * Limit how many branches to update.
     */
    limit?: number
  }

  /**
   * branches updateManyAndReturn
   */
  export type branchesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * The data used to update branches.
     */
    data: XOR<branchesUpdateManyMutationInput, branchesUncheckedUpdateManyInput>
    /**
     * Filter which branches to update
     */
    where?: branchesWhereInput
    /**
     * Limit how many branches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * branches upsert
   */
  export type branchesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * The filter to search for the branches to update in case it exists.
     */
    where: branchesWhereUniqueInput
    /**
     * In case the branches found by the `where` argument doesn't exist, create a new branches with this data.
     */
    create: XOR<branchesCreateInput, branchesUncheckedCreateInput>
    /**
     * In case the branches was found with the provided `where` argument, update it with this data.
     */
    update: XOR<branchesUpdateInput, branchesUncheckedUpdateInput>
  }

  /**
   * branches delete
   */
  export type branchesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    /**
     * Filter which branches to delete.
     */
    where: branchesWhereUniqueInput
  }

  /**
   * branches deleteMany
   */
  export type branchesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which branches to delete
     */
    where?: branchesWhereInput
    /**
     * Limit how many branches to delete.
     */
    limit?: number
  }

  /**
   * branches.workHours
   */
  export type branches$workHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    where?: workHoursWhereInput
    orderBy?: workHoursOrderByWithRelationInput | workHoursOrderByWithRelationInput[]
    cursor?: workHoursWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkHoursScalarFieldEnum | WorkHoursScalarFieldEnum[]
  }

  /**
   * branches without action
   */
  export type branchesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
  }


  /**
   * Model workHours
   */

  export type AggregateWorkHours = {
    _count: WorkHoursCountAggregateOutputType | null
    _avg: WorkHoursAvgAggregateOutputType | null
    _sum: WorkHoursSumAggregateOutputType | null
    _min: WorkHoursMinAggregateOutputType | null
    _max: WorkHoursMaxAggregateOutputType | null
  }

  export type WorkHoursAvgAggregateOutputType = {
    day: number | null
  }

  export type WorkHoursSumAggregateOutputType = {
    day: number | null
  }

  export type WorkHoursMinAggregateOutputType = {
    id: string | null
    branchId: string | null
    startTime: Date | null
    endTime: Date | null
    day: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkHoursMaxAggregateOutputType = {
    id: string | null
    branchId: string | null
    startTime: Date | null
    endTime: Date | null
    day: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkHoursCountAggregateOutputType = {
    id: number
    branchId: number
    startTime: number
    endTime: number
    day: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkHoursAvgAggregateInputType = {
    day?: true
  }

  export type WorkHoursSumAggregateInputType = {
    day?: true
  }

  export type WorkHoursMinAggregateInputType = {
    id?: true
    branchId?: true
    startTime?: true
    endTime?: true
    day?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkHoursMaxAggregateInputType = {
    id?: true
    branchId?: true
    startTime?: true
    endTime?: true
    day?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkHoursCountAggregateInputType = {
    id?: true
    branchId?: true
    startTime?: true
    endTime?: true
    day?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkHoursAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which workHours to aggregate.
     */
    where?: workHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workHours to fetch.
     */
    orderBy?: workHoursOrderByWithRelationInput | workHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: workHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned workHours
    **/
    _count?: true | WorkHoursCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkHoursAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkHoursSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkHoursMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkHoursMaxAggregateInputType
  }

  export type GetWorkHoursAggregateType<T extends WorkHoursAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkHours]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkHours[P]>
      : GetScalarType<T[P], AggregateWorkHours[P]>
  }




  export type workHoursGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: workHoursWhereInput
    orderBy?: workHoursOrderByWithAggregationInput | workHoursOrderByWithAggregationInput[]
    by: WorkHoursScalarFieldEnum[] | WorkHoursScalarFieldEnum
    having?: workHoursScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkHoursCountAggregateInputType | true
    _avg?: WorkHoursAvgAggregateInputType
    _sum?: WorkHoursSumAggregateInputType
    _min?: WorkHoursMinAggregateInputType
    _max?: WorkHoursMaxAggregateInputType
  }

  export type WorkHoursGroupByOutputType = {
    id: string
    branchId: string
    startTime: Date
    endTime: Date
    day: number
    createdAt: Date
    updatedAt: Date
    _count: WorkHoursCountAggregateOutputType | null
    _avg: WorkHoursAvgAggregateOutputType | null
    _sum: WorkHoursSumAggregateOutputType | null
    _min: WorkHoursMinAggregateOutputType | null
    _max: WorkHoursMaxAggregateOutputType | null
  }

  type GetWorkHoursGroupByPayload<T extends workHoursGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkHoursGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkHoursGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkHoursGroupByOutputType[P]>
            : GetScalarType<T[P], WorkHoursGroupByOutputType[P]>
        }
      >
    >


  export type workHoursSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branchId?: boolean
    startTime?: boolean
    endTime?: boolean
    day?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branch?: boolean | branchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workHours"]>

  export type workHoursSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branchId?: boolean
    startTime?: boolean
    endTime?: boolean
    day?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branch?: boolean | branchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workHours"]>

  export type workHoursSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branchId?: boolean
    startTime?: boolean
    endTime?: boolean
    day?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branch?: boolean | branchesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workHours"]>

  export type workHoursSelectScalar = {
    id?: boolean
    branchId?: boolean
    startTime?: boolean
    endTime?: boolean
    day?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type workHoursOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "branchId" | "startTime" | "endTime" | "day" | "createdAt" | "updatedAt", ExtArgs["result"]["workHours"]>
  export type workHoursInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | branchesDefaultArgs<ExtArgs>
  }
  export type workHoursIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | branchesDefaultArgs<ExtArgs>
  }
  export type workHoursIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | branchesDefaultArgs<ExtArgs>
  }

  export type $workHoursPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "workHours"
    objects: {
      branch: Prisma.$branchesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      branchId: string
      startTime: Date
      endTime: Date
      day: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workHours"]>
    composites: {}
  }

  type workHoursGetPayload<S extends boolean | null | undefined | workHoursDefaultArgs> = $Result.GetResult<Prisma.$workHoursPayload, S>

  type workHoursCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<workHoursFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkHoursCountAggregateInputType | true
    }

  export interface workHoursDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['workHours'], meta: { name: 'workHours' } }
    /**
     * Find zero or one WorkHours that matches the filter.
     * @param {workHoursFindUniqueArgs} args - Arguments to find a WorkHours
     * @example
     * // Get one WorkHours
     * const workHours = await prisma.workHours.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends workHoursFindUniqueArgs>(args: SelectSubset<T, workHoursFindUniqueArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkHours that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {workHoursFindUniqueOrThrowArgs} args - Arguments to find a WorkHours
     * @example
     * // Get one WorkHours
     * const workHours = await prisma.workHours.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends workHoursFindUniqueOrThrowArgs>(args: SelectSubset<T, workHoursFindUniqueOrThrowArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workHoursFindFirstArgs} args - Arguments to find a WorkHours
     * @example
     * // Get one WorkHours
     * const workHours = await prisma.workHours.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends workHoursFindFirstArgs>(args?: SelectSubset<T, workHoursFindFirstArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkHours that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workHoursFindFirstOrThrowArgs} args - Arguments to find a WorkHours
     * @example
     * // Get one WorkHours
     * const workHours = await prisma.workHours.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends workHoursFindFirstOrThrowArgs>(args?: SelectSubset<T, workHoursFindFirstOrThrowArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workHoursFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkHours
     * const workHours = await prisma.workHours.findMany()
     * 
     * // Get first 10 WorkHours
     * const workHours = await prisma.workHours.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workHoursWithIdOnly = await prisma.workHours.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends workHoursFindManyArgs>(args?: SelectSubset<T, workHoursFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkHours.
     * @param {workHoursCreateArgs} args - Arguments to create a WorkHours.
     * @example
     * // Create one WorkHours
     * const WorkHours = await prisma.workHours.create({
     *   data: {
     *     // ... data to create a WorkHours
     *   }
     * })
     * 
     */
    create<T extends workHoursCreateArgs>(args: SelectSubset<T, workHoursCreateArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkHours.
     * @param {workHoursCreateManyArgs} args - Arguments to create many WorkHours.
     * @example
     * // Create many WorkHours
     * const workHours = await prisma.workHours.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends workHoursCreateManyArgs>(args?: SelectSubset<T, workHoursCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkHours and returns the data saved in the database.
     * @param {workHoursCreateManyAndReturnArgs} args - Arguments to create many WorkHours.
     * @example
     * // Create many WorkHours
     * const workHours = await prisma.workHours.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkHours and only return the `id`
     * const workHoursWithIdOnly = await prisma.workHours.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends workHoursCreateManyAndReturnArgs>(args?: SelectSubset<T, workHoursCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkHours.
     * @param {workHoursDeleteArgs} args - Arguments to delete one WorkHours.
     * @example
     * // Delete one WorkHours
     * const WorkHours = await prisma.workHours.delete({
     *   where: {
     *     // ... filter to delete one WorkHours
     *   }
     * })
     * 
     */
    delete<T extends workHoursDeleteArgs>(args: SelectSubset<T, workHoursDeleteArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkHours.
     * @param {workHoursUpdateArgs} args - Arguments to update one WorkHours.
     * @example
     * // Update one WorkHours
     * const workHours = await prisma.workHours.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends workHoursUpdateArgs>(args: SelectSubset<T, workHoursUpdateArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkHours.
     * @param {workHoursDeleteManyArgs} args - Arguments to filter WorkHours to delete.
     * @example
     * // Delete a few WorkHours
     * const { count } = await prisma.workHours.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends workHoursDeleteManyArgs>(args?: SelectSubset<T, workHoursDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workHoursUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkHours
     * const workHours = await prisma.workHours.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends workHoursUpdateManyArgs>(args: SelectSubset<T, workHoursUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkHours and returns the data updated in the database.
     * @param {workHoursUpdateManyAndReturnArgs} args - Arguments to update many WorkHours.
     * @example
     * // Update many WorkHours
     * const workHours = await prisma.workHours.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkHours and only return the `id`
     * const workHoursWithIdOnly = await prisma.workHours.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends workHoursUpdateManyAndReturnArgs>(args: SelectSubset<T, workHoursUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkHours.
     * @param {workHoursUpsertArgs} args - Arguments to update or create a WorkHours.
     * @example
     * // Update or create a WorkHours
     * const workHours = await prisma.workHours.upsert({
     *   create: {
     *     // ... data to create a WorkHours
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkHours we want to update
     *   }
     * })
     */
    upsert<T extends workHoursUpsertArgs>(args: SelectSubset<T, workHoursUpsertArgs<ExtArgs>>): Prisma__workHoursClient<$Result.GetResult<Prisma.$workHoursPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workHoursCountArgs} args - Arguments to filter WorkHours to count.
     * @example
     * // Count the number of WorkHours
     * const count = await prisma.workHours.count({
     *   where: {
     *     // ... the filter for the WorkHours we want to count
     *   }
     * })
    **/
    count<T extends workHoursCountArgs>(
      args?: Subset<T, workHoursCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkHoursCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkHoursAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkHoursAggregateArgs>(args: Subset<T, WorkHoursAggregateArgs>): Prisma.PrismaPromise<GetWorkHoursAggregateType<T>>

    /**
     * Group by WorkHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workHoursGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends workHoursGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: workHoursGroupByArgs['orderBy'] }
        : { orderBy?: workHoursGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, workHoursGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkHoursGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the workHours model
   */
  readonly fields: workHoursFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for workHours.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__workHoursClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends branchesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, branchesDefaultArgs<ExtArgs>>): Prisma__branchesClient<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the workHours model
   */
  interface workHoursFieldRefs {
    readonly id: FieldRef<"workHours", 'String'>
    readonly branchId: FieldRef<"workHours", 'String'>
    readonly startTime: FieldRef<"workHours", 'DateTime'>
    readonly endTime: FieldRef<"workHours", 'DateTime'>
    readonly day: FieldRef<"workHours", 'Int'>
    readonly createdAt: FieldRef<"workHours", 'DateTime'>
    readonly updatedAt: FieldRef<"workHours", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * workHours findUnique
   */
  export type workHoursFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * Filter, which workHours to fetch.
     */
    where: workHoursWhereUniqueInput
  }

  /**
   * workHours findUniqueOrThrow
   */
  export type workHoursFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * Filter, which workHours to fetch.
     */
    where: workHoursWhereUniqueInput
  }

  /**
   * workHours findFirst
   */
  export type workHoursFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * Filter, which workHours to fetch.
     */
    where?: workHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workHours to fetch.
     */
    orderBy?: workHoursOrderByWithRelationInput | workHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for workHours.
     */
    cursor?: workHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of workHours.
     */
    distinct?: WorkHoursScalarFieldEnum | WorkHoursScalarFieldEnum[]
  }

  /**
   * workHours findFirstOrThrow
   */
  export type workHoursFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * Filter, which workHours to fetch.
     */
    where?: workHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workHours to fetch.
     */
    orderBy?: workHoursOrderByWithRelationInput | workHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for workHours.
     */
    cursor?: workHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of workHours.
     */
    distinct?: WorkHoursScalarFieldEnum | WorkHoursScalarFieldEnum[]
  }

  /**
   * workHours findMany
   */
  export type workHoursFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * Filter, which workHours to fetch.
     */
    where?: workHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workHours to fetch.
     */
    orderBy?: workHoursOrderByWithRelationInput | workHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing workHours.
     */
    cursor?: workHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workHours.
     */
    skip?: number
    distinct?: WorkHoursScalarFieldEnum | WorkHoursScalarFieldEnum[]
  }

  /**
   * workHours create
   */
  export type workHoursCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * The data needed to create a workHours.
     */
    data: XOR<workHoursCreateInput, workHoursUncheckedCreateInput>
  }

  /**
   * workHours createMany
   */
  export type workHoursCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many workHours.
     */
    data: workHoursCreateManyInput | workHoursCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * workHours createManyAndReturn
   */
  export type workHoursCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * The data used to create many workHours.
     */
    data: workHoursCreateManyInput | workHoursCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * workHours update
   */
  export type workHoursUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * The data needed to update a workHours.
     */
    data: XOR<workHoursUpdateInput, workHoursUncheckedUpdateInput>
    /**
     * Choose, which workHours to update.
     */
    where: workHoursWhereUniqueInput
  }

  /**
   * workHours updateMany
   */
  export type workHoursUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update workHours.
     */
    data: XOR<workHoursUpdateManyMutationInput, workHoursUncheckedUpdateManyInput>
    /**
     * Filter which workHours to update
     */
    where?: workHoursWhereInput
    /**
     * Limit how many workHours to update.
     */
    limit?: number
  }

  /**
   * workHours updateManyAndReturn
   */
  export type workHoursUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * The data used to update workHours.
     */
    data: XOR<workHoursUpdateManyMutationInput, workHoursUncheckedUpdateManyInput>
    /**
     * Filter which workHours to update
     */
    where?: workHoursWhereInput
    /**
     * Limit how many workHours to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * workHours upsert
   */
  export type workHoursUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * The filter to search for the workHours to update in case it exists.
     */
    where: workHoursWhereUniqueInput
    /**
     * In case the workHours found by the `where` argument doesn't exist, create a new workHours with this data.
     */
    create: XOR<workHoursCreateInput, workHoursUncheckedCreateInput>
    /**
     * In case the workHours was found with the provided `where` argument, update it with this data.
     */
    update: XOR<workHoursUpdateInput, workHoursUncheckedUpdateInput>
  }

  /**
   * workHours delete
   */
  export type workHoursDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
    /**
     * Filter which workHours to delete.
     */
    where: workHoursWhereUniqueInput
  }

  /**
   * workHours deleteMany
   */
  export type workHoursDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which workHours to delete
     */
    where?: workHoursWhereInput
    /**
     * Limit how many workHours to delete.
     */
    limit?: number
  }

  /**
   * workHours without action
   */
  export type workHoursDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the workHours
     */
    select?: workHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the workHours
     */
    omit?: workHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: workHoursInclude<ExtArgs> | null
  }


  /**
   * Model store
   */

  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreMinAggregateOutputType = {
    id: string | null
    name: string | null
    bio: string | null
    logo: string | null
    banner: string | null
    phone: string | null
    email: string | null
    password: string | null
    socialLinksId: string | null
    paymentId: string | null
    refreshTokenSecret: string | null
    accessTokenSecret: string | null
    type: string | null
    isApprovedByAdmin: boolean | null
    isFreezed: boolean | null
    isBanned: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreMaxAggregateOutputType = {
    id: string | null
    name: string | null
    bio: string | null
    logo: string | null
    banner: string | null
    phone: string | null
    email: string | null
    password: string | null
    socialLinksId: string | null
    paymentId: string | null
    refreshTokenSecret: string | null
    accessTokenSecret: string | null
    type: string | null
    isApprovedByAdmin: boolean | null
    isFreezed: boolean | null
    isBanned: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    name: number
    bio: number
    logo: number
    banner: number
    phone: number
    email: number
    password: number
    socialLinksId: number
    paymentId: number
    refreshTokenSecret: number
    accessTokenSecret: number
    type: number
    isApprovedByAdmin: number
    isFreezed: number
    isBanned: number
    isDeleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StoreMinAggregateInputType = {
    id?: true
    name?: true
    bio?: true
    logo?: true
    banner?: true
    phone?: true
    email?: true
    password?: true
    socialLinksId?: true
    paymentId?: true
    refreshTokenSecret?: true
    accessTokenSecret?: true
    type?: true
    isApprovedByAdmin?: true
    isFreezed?: true
    isBanned?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    name?: true
    bio?: true
    logo?: true
    banner?: true
    phone?: true
    email?: true
    password?: true
    socialLinksId?: true
    paymentId?: true
    refreshTokenSecret?: true
    accessTokenSecret?: true
    type?: true
    isApprovedByAdmin?: true
    isFreezed?: true
    isBanned?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    name?: true
    bio?: true
    logo?: true
    banner?: true
    phone?: true
    email?: true
    password?: true
    socialLinksId?: true
    paymentId?: true
    refreshTokenSecret?: true
    accessTokenSecret?: true
    type?: true
    isApprovedByAdmin?: true
    isFreezed?: true
    isBanned?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which store to aggregate.
     */
    where?: storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stores to fetch.
     */
    orderBy?: storeOrderByWithRelationInput | storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type storeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: storeWhereInput
    orderBy?: storeOrderByWithAggregationInput | storeOrderByWithAggregationInput[]
    by: StoreScalarFieldEnum[] | StoreScalarFieldEnum
    having?: storeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }

  export type StoreGroupByOutputType = {
    id: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    socialLinksId: string
    paymentId: string | null
    refreshTokenSecret: string | null
    accessTokenSecret: string | null
    type: string
    isApprovedByAdmin: boolean
    isFreezed: boolean
    isBanned: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: StoreCountAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends storeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type storeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bio?: boolean
    logo?: boolean
    banner?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    socialLinksId?: boolean
    paymentId?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    type?: boolean
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialLinks?: boolean | socialLinksDefaultArgs<ExtArgs>
    branches?: boolean | store$branchesArgs<ExtArgs>
    transactions?: boolean | store$transactionsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type storeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bio?: boolean
    logo?: boolean
    banner?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    socialLinksId?: boolean
    paymentId?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    type?: boolean
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialLinks?: boolean | socialLinksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type storeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bio?: boolean
    logo?: boolean
    banner?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    socialLinksId?: boolean
    paymentId?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    type?: boolean
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialLinks?: boolean | socialLinksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type storeSelectScalar = {
    id?: boolean
    name?: boolean
    bio?: boolean
    logo?: boolean
    banner?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    socialLinksId?: boolean
    paymentId?: boolean
    refreshTokenSecret?: boolean
    accessTokenSecret?: boolean
    type?: boolean
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type storeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "bio" | "logo" | "banner" | "phone" | "email" | "password" | "socialLinksId" | "paymentId" | "refreshTokenSecret" | "accessTokenSecret" | "type" | "isApprovedByAdmin" | "isFreezed" | "isBanned" | "isDeleted" | "createdAt" | "updatedAt", ExtArgs["result"]["store"]>
  export type storeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialLinks?: boolean | socialLinksDefaultArgs<ExtArgs>
    branches?: boolean | store$branchesArgs<ExtArgs>
    transactions?: boolean | store$transactionsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type storeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialLinks?: boolean | socialLinksDefaultArgs<ExtArgs>
  }
  export type storeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialLinks?: boolean | socialLinksDefaultArgs<ExtArgs>
  }

  export type $storePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "store"
    objects: {
      socialLinks: Prisma.$socialLinksPayload<ExtArgs>
      branches: Prisma.$branchesPayload<ExtArgs>[]
      transactions: Prisma.$transactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      bio: string
      logo: string
      banner: string
      phone: string
      email: string
      password: string
      socialLinksId: string
      paymentId: string | null
      refreshTokenSecret: string | null
      accessTokenSecret: string | null
      type: string
      isApprovedByAdmin: boolean
      isFreezed: boolean
      isBanned: boolean
      isDeleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["store"]>
    composites: {}
  }

  type storeGetPayload<S extends boolean | null | undefined | storeDefaultArgs> = $Result.GetResult<Prisma.$storePayload, S>

  type storeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<storeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreCountAggregateInputType | true
    }

  export interface storeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['store'], meta: { name: 'store' } }
    /**
     * Find zero or one Store that matches the filter.
     * @param {storeFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends storeFindUniqueArgs>(args: SelectSubset<T, storeFindUniqueArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {storeFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends storeFindUniqueOrThrowArgs>(args: SelectSubset<T, storeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storeFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends storeFindFirstArgs>(args?: SelectSubset<T, storeFindFirstArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storeFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends storeFindFirstOrThrowArgs>(args?: SelectSubset<T, storeFindFirstOrThrowArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends storeFindManyArgs>(args?: SelectSubset<T, storeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store.
     * @param {storeCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
     */
    create<T extends storeCreateArgs>(args: SelectSubset<T, storeCreateArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stores.
     * @param {storeCreateManyArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends storeCreateManyArgs>(args?: SelectSubset<T, storeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stores and returns the data saved in the database.
     * @param {storeCreateManyAndReturnArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends storeCreateManyAndReturnArgs>(args?: SelectSubset<T, storeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Store.
     * @param {storeDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
     */
    delete<T extends storeDeleteArgs>(args: SelectSubset<T, storeDeleteArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store.
     * @param {storeUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends storeUpdateArgs>(args: SelectSubset<T, storeUpdateArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stores.
     * @param {storeDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends storeDeleteManyArgs>(args?: SelectSubset<T, storeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends storeUpdateManyArgs>(args: SelectSubset<T, storeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores and returns the data updated in the database.
     * @param {storeUpdateManyAndReturnArgs} args - Arguments to update many Stores.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends storeUpdateManyAndReturnArgs>(args: SelectSubset<T, storeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Store.
     * @param {storeUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
     */
    upsert<T extends storeUpsertArgs>(args: SelectSubset<T, storeUpsertArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storeCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends storeCountArgs>(
      args?: Subset<T, storeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends storeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: storeGroupByArgs['orderBy'] }
        : { orderBy?: storeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, storeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the store model
   */
  readonly fields: storeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__storeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socialLinks<T extends socialLinksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, socialLinksDefaultArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    branches<T extends store$branchesArgs<ExtArgs> = {}>(args?: Subset<T, store$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$branchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends store$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, store$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the store model
   */
  interface storeFieldRefs {
    readonly id: FieldRef<"store", 'String'>
    readonly name: FieldRef<"store", 'String'>
    readonly bio: FieldRef<"store", 'String'>
    readonly logo: FieldRef<"store", 'String'>
    readonly banner: FieldRef<"store", 'String'>
    readonly phone: FieldRef<"store", 'String'>
    readonly email: FieldRef<"store", 'String'>
    readonly password: FieldRef<"store", 'String'>
    readonly socialLinksId: FieldRef<"store", 'String'>
    readonly paymentId: FieldRef<"store", 'String'>
    readonly refreshTokenSecret: FieldRef<"store", 'String'>
    readonly accessTokenSecret: FieldRef<"store", 'String'>
    readonly type: FieldRef<"store", 'String'>
    readonly isApprovedByAdmin: FieldRef<"store", 'Boolean'>
    readonly isFreezed: FieldRef<"store", 'Boolean'>
    readonly isBanned: FieldRef<"store", 'Boolean'>
    readonly isDeleted: FieldRef<"store", 'Boolean'>
    readonly createdAt: FieldRef<"store", 'DateTime'>
    readonly updatedAt: FieldRef<"store", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * store findUnique
   */
  export type storeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * Filter, which store to fetch.
     */
    where: storeWhereUniqueInput
  }

  /**
   * store findUniqueOrThrow
   */
  export type storeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * Filter, which store to fetch.
     */
    where: storeWhereUniqueInput
  }

  /**
   * store findFirst
   */
  export type storeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * Filter, which store to fetch.
     */
    where?: storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stores to fetch.
     */
    orderBy?: storeOrderByWithRelationInput | storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for stores.
     */
    cursor?: storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * store findFirstOrThrow
   */
  export type storeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * Filter, which store to fetch.
     */
    where?: storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stores to fetch.
     */
    orderBy?: storeOrderByWithRelationInput | storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for stores.
     */
    cursor?: storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * store findMany
   */
  export type storeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * Filter, which stores to fetch.
     */
    where?: storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stores to fetch.
     */
    orderBy?: storeOrderByWithRelationInput | storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing stores.
     */
    cursor?: storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stores.
     */
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * store create
   */
  export type storeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * The data needed to create a store.
     */
    data: XOR<storeCreateInput, storeUncheckedCreateInput>
  }

  /**
   * store createMany
   */
  export type storeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many stores.
     */
    data: storeCreateManyInput | storeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * store createManyAndReturn
   */
  export type storeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * The data used to create many stores.
     */
    data: storeCreateManyInput | storeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * store update
   */
  export type storeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * The data needed to update a store.
     */
    data: XOR<storeUpdateInput, storeUncheckedUpdateInput>
    /**
     * Choose, which store to update.
     */
    where: storeWhereUniqueInput
  }

  /**
   * store updateMany
   */
  export type storeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update stores.
     */
    data: XOR<storeUpdateManyMutationInput, storeUncheckedUpdateManyInput>
    /**
     * Filter which stores to update
     */
    where?: storeWhereInput
    /**
     * Limit how many stores to update.
     */
    limit?: number
  }

  /**
   * store updateManyAndReturn
   */
  export type storeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * The data used to update stores.
     */
    data: XOR<storeUpdateManyMutationInput, storeUncheckedUpdateManyInput>
    /**
     * Filter which stores to update
     */
    where?: storeWhereInput
    /**
     * Limit how many stores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * store upsert
   */
  export type storeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * The filter to search for the store to update in case it exists.
     */
    where: storeWhereUniqueInput
    /**
     * In case the store found by the `where` argument doesn't exist, create a new store with this data.
     */
    create: XOR<storeCreateInput, storeUncheckedCreateInput>
    /**
     * In case the store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<storeUpdateInput, storeUncheckedUpdateInput>
  }

  /**
   * store delete
   */
  export type storeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    /**
     * Filter which store to delete.
     */
    where: storeWhereUniqueInput
  }

  /**
   * store deleteMany
   */
  export type storeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which stores to delete
     */
    where?: storeWhereInput
    /**
     * Limit how many stores to delete.
     */
    limit?: number
  }

  /**
   * store.branches
   */
  export type store$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the branches
     */
    select?: branchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the branches
     */
    omit?: branchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: branchesInclude<ExtArgs> | null
    where?: branchesWhereInput
    orderBy?: branchesOrderByWithRelationInput | branchesOrderByWithRelationInput[]
    cursor?: branchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchesScalarFieldEnum | BranchesScalarFieldEnum[]
  }

  /**
   * store.transactions
   */
  export type store$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    where?: transactionWhereInput
    orderBy?: transactionOrderByWithRelationInput | transactionOrderByWithRelationInput[]
    cursor?: transactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * store without action
   */
  export type storeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
  }


  /**
   * Model transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    type: boolean | null
    userId: string | null
    storeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    type: boolean | null
    userId: string | null
    storeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    type: number
    userId: number
    storeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionMinAggregateInputType = {
    id?: true
    type?: true
    userId?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    type?: true
    userId?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    type?: true
    userId?: true
    storeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transaction to aggregate.
     */
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionOrderByWithRelationInput | transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type transactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionWhereInput
    orderBy?: transactionOrderByWithAggregationInput | transactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: transactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    type: boolean
    userId: string | null
    storeId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends transactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type transactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | transaction$userArgs<ExtArgs>
    store?: boolean | transaction$storeArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type transactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | transaction$userArgs<ExtArgs>
    store?: boolean | transaction$storeArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type transactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | transaction$userArgs<ExtArgs>
    store?: boolean | transaction$storeArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type transactionSelectScalar = {
    id?: boolean
    type?: boolean
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type transactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "userId" | "storeId" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type transactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | transaction$userArgs<ExtArgs>
    store?: boolean | transaction$storeArgs<ExtArgs>
  }
  export type transactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | transaction$userArgs<ExtArgs>
    store?: boolean | transaction$storeArgs<ExtArgs>
  }
  export type transactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | transaction$userArgs<ExtArgs>
    store?: boolean | transaction$storeArgs<ExtArgs>
  }

  export type $transactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "transaction"
    objects: {
      user: Prisma.$userPayload<ExtArgs> | null
      store: Prisma.$storePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: boolean
      userId: string | null
      storeId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type transactionGetPayload<S extends boolean | null | undefined | transactionDefaultArgs> = $Result.GetResult<Prisma.$transactionPayload, S>

  type transactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<transactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface transactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['transaction'], meta: { name: 'transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {transactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends transactionFindUniqueArgs>(args: SelectSubset<T, transactionFindUniqueArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {transactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends transactionFindUniqueOrThrowArgs>(args: SelectSubset<T, transactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends transactionFindFirstArgs>(args?: SelectSubset<T, transactionFindFirstArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends transactionFindFirstOrThrowArgs>(args?: SelectSubset<T, transactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends transactionFindManyArgs>(args?: SelectSubset<T, transactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {transactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends transactionCreateArgs>(args: SelectSubset<T, transactionCreateArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {transactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends transactionCreateManyArgs>(args?: SelectSubset<T, transactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {transactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends transactionCreateManyAndReturnArgs>(args?: SelectSubset<T, transactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {transactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends transactionDeleteArgs>(args: SelectSubset<T, transactionDeleteArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {transactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends transactionUpdateArgs>(args: SelectSubset<T, transactionUpdateArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {transactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends transactionDeleteManyArgs>(args?: SelectSubset<T, transactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends transactionUpdateManyArgs>(args: SelectSubset<T, transactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {transactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends transactionUpdateManyAndReturnArgs>(args: SelectSubset<T, transactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {transactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends transactionUpsertArgs>(args: SelectSubset<T, transactionUpsertArgs<ExtArgs>>): Prisma__transactionClient<$Result.GetResult<Prisma.$transactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends transactionCountArgs>(
      args?: Subset<T, transactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends transactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: transactionGroupByArgs['orderBy'] }
        : { orderBy?: transactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, transactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the transaction model
   */
  readonly fields: transactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__transactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends transaction$userArgs<ExtArgs> = {}>(args?: Subset<T, transaction$userArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    store<T extends transaction$storeArgs<ExtArgs> = {}>(args?: Subset<T, transaction$storeArgs<ExtArgs>>): Prisma__storeClient<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the transaction model
   */
  interface transactionFieldRefs {
    readonly id: FieldRef<"transaction", 'String'>
    readonly type: FieldRef<"transaction", 'Boolean'>
    readonly userId: FieldRef<"transaction", 'String'>
    readonly storeId: FieldRef<"transaction", 'String'>
    readonly createdAt: FieldRef<"transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * transaction findUnique
   */
  export type transactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * Filter, which transaction to fetch.
     */
    where: transactionWhereUniqueInput
  }

  /**
   * transaction findUniqueOrThrow
   */
  export type transactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * Filter, which transaction to fetch.
     */
    where: transactionWhereUniqueInput
  }

  /**
   * transaction findFirst
   */
  export type transactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * Filter, which transaction to fetch.
     */
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionOrderByWithRelationInput | transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * transaction findFirstOrThrow
   */
  export type transactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * Filter, which transaction to fetch.
     */
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionOrderByWithRelationInput | transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * transaction findMany
   */
  export type transactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionOrderByWithRelationInput | transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transactions.
     */
    cursor?: transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * transaction create
   */
  export type transactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * The data needed to create a transaction.
     */
    data: XOR<transactionCreateInput, transactionUncheckedCreateInput>
  }

  /**
   * transaction createMany
   */
  export type transactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many transactions.
     */
    data: transactionCreateManyInput | transactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * transaction createManyAndReturn
   */
  export type transactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * The data used to create many transactions.
     */
    data: transactionCreateManyInput | transactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * transaction update
   */
  export type transactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * The data needed to update a transaction.
     */
    data: XOR<transactionUpdateInput, transactionUncheckedUpdateInput>
    /**
     * Choose, which transaction to update.
     */
    where: transactionWhereUniqueInput
  }

  /**
   * transaction updateMany
   */
  export type transactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionUpdateManyMutationInput, transactionUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionWhereInput
    /**
     * Limit how many transactions to update.
     */
    limit?: number
  }

  /**
   * transaction updateManyAndReturn
   */
  export type transactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionUpdateManyMutationInput, transactionUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionWhereInput
    /**
     * Limit how many transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * transaction upsert
   */
  export type transactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * The filter to search for the transaction to update in case it exists.
     */
    where: transactionWhereUniqueInput
    /**
     * In case the transaction found by the `where` argument doesn't exist, create a new transaction with this data.
     */
    create: XOR<transactionCreateInput, transactionUncheckedCreateInput>
    /**
     * In case the transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<transactionUpdateInput, transactionUncheckedUpdateInput>
  }

  /**
   * transaction delete
   */
  export type transactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
    /**
     * Filter which transaction to delete.
     */
    where: transactionWhereUniqueInput
  }

  /**
   * transaction deleteMany
   */
  export type transactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to delete
     */
    where?: transactionWhereInput
    /**
     * Limit how many transactions to delete.
     */
    limit?: number
  }

  /**
   * transaction.user
   */
  export type transaction$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
  }

  /**
   * transaction.store
   */
  export type transaction$storeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    where?: storeWhereInput
  }

  /**
   * transaction without action
   */
  export type transactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transaction
     */
    select?: transactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transaction
     */
    omit?: transactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionInclude<ExtArgs> | null
  }


  /**
   * Model socialLinks
   */

  export type AggregateSocialLinks = {
    _count: SocialLinksCountAggregateOutputType | null
    _min: SocialLinksMinAggregateOutputType | null
    _max: SocialLinksMaxAggregateOutputType | null
  }

  export type SocialLinksMinAggregateOutputType = {
    id: string | null
    tiktok: string | null
    youtube: string | null
    facebook: string | null
    x: string | null
    instagram: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SocialLinksMaxAggregateOutputType = {
    id: string | null
    tiktok: string | null
    youtube: string | null
    facebook: string | null
    x: string | null
    instagram: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SocialLinksCountAggregateOutputType = {
    id: number
    tiktok: number
    youtube: number
    facebook: number
    x: number
    instagram: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SocialLinksMinAggregateInputType = {
    id?: true
    tiktok?: true
    youtube?: true
    facebook?: true
    x?: true
    instagram?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SocialLinksMaxAggregateInputType = {
    id?: true
    tiktok?: true
    youtube?: true
    facebook?: true
    x?: true
    instagram?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SocialLinksCountAggregateInputType = {
    id?: true
    tiktok?: true
    youtube?: true
    facebook?: true
    x?: true
    instagram?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SocialLinksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which socialLinks to aggregate.
     */
    where?: socialLinksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of socialLinks to fetch.
     */
    orderBy?: socialLinksOrderByWithRelationInput | socialLinksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: socialLinksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` socialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` socialLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned socialLinks
    **/
    _count?: true | SocialLinksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialLinksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialLinksMaxAggregateInputType
  }

  export type GetSocialLinksAggregateType<T extends SocialLinksAggregateArgs> = {
        [P in keyof T & keyof AggregateSocialLinks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocialLinks[P]>
      : GetScalarType<T[P], AggregateSocialLinks[P]>
  }




  export type socialLinksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: socialLinksWhereInput
    orderBy?: socialLinksOrderByWithAggregationInput | socialLinksOrderByWithAggregationInput[]
    by: SocialLinksScalarFieldEnum[] | SocialLinksScalarFieldEnum
    having?: socialLinksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialLinksCountAggregateInputType | true
    _min?: SocialLinksMinAggregateInputType
    _max?: SocialLinksMaxAggregateInputType
  }

  export type SocialLinksGroupByOutputType = {
    id: string
    tiktok: string | null
    youtube: string | null
    facebook: string | null
    x: string | null
    instagram: string | null
    createdAt: Date
    updatedAt: Date
    _count: SocialLinksCountAggregateOutputType | null
    _min: SocialLinksMinAggregateOutputType | null
    _max: SocialLinksMaxAggregateOutputType | null
  }

  type GetSocialLinksGroupByPayload<T extends socialLinksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialLinksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialLinksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialLinksGroupByOutputType[P]>
            : GetScalarType<T[P], SocialLinksGroupByOutputType[P]>
        }
      >
    >


  export type socialLinksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tiktok?: boolean
    youtube?: boolean
    facebook?: boolean
    x?: boolean
    instagram?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    store?: boolean | socialLinks$storeArgs<ExtArgs>
    _count?: boolean | SocialLinksCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialLinks"]>

  export type socialLinksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tiktok?: boolean
    youtube?: boolean
    facebook?: boolean
    x?: boolean
    instagram?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["socialLinks"]>

  export type socialLinksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tiktok?: boolean
    youtube?: boolean
    facebook?: boolean
    x?: boolean
    instagram?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["socialLinks"]>

  export type socialLinksSelectScalar = {
    id?: boolean
    tiktok?: boolean
    youtube?: boolean
    facebook?: boolean
    x?: boolean
    instagram?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type socialLinksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tiktok" | "youtube" | "facebook" | "x" | "instagram" | "createdAt" | "updatedAt", ExtArgs["result"]["socialLinks"]>
  export type socialLinksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | socialLinks$storeArgs<ExtArgs>
    _count?: boolean | SocialLinksCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type socialLinksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type socialLinksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $socialLinksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "socialLinks"
    objects: {
      store: Prisma.$storePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tiktok: string | null
      youtube: string | null
      facebook: string | null
      x: string | null
      instagram: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["socialLinks"]>
    composites: {}
  }

  type socialLinksGetPayload<S extends boolean | null | undefined | socialLinksDefaultArgs> = $Result.GetResult<Prisma.$socialLinksPayload, S>

  type socialLinksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<socialLinksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocialLinksCountAggregateInputType | true
    }

  export interface socialLinksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['socialLinks'], meta: { name: 'socialLinks' } }
    /**
     * Find zero or one SocialLinks that matches the filter.
     * @param {socialLinksFindUniqueArgs} args - Arguments to find a SocialLinks
     * @example
     * // Get one SocialLinks
     * const socialLinks = await prisma.socialLinks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends socialLinksFindUniqueArgs>(args: SelectSubset<T, socialLinksFindUniqueArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SocialLinks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {socialLinksFindUniqueOrThrowArgs} args - Arguments to find a SocialLinks
     * @example
     * // Get one SocialLinks
     * const socialLinks = await prisma.socialLinks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends socialLinksFindUniqueOrThrowArgs>(args: SelectSubset<T, socialLinksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SocialLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialLinksFindFirstArgs} args - Arguments to find a SocialLinks
     * @example
     * // Get one SocialLinks
     * const socialLinks = await prisma.socialLinks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends socialLinksFindFirstArgs>(args?: SelectSubset<T, socialLinksFindFirstArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SocialLinks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialLinksFindFirstOrThrowArgs} args - Arguments to find a SocialLinks
     * @example
     * // Get one SocialLinks
     * const socialLinks = await prisma.socialLinks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends socialLinksFindFirstOrThrowArgs>(args?: SelectSubset<T, socialLinksFindFirstOrThrowArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SocialLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialLinksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SocialLinks
     * const socialLinks = await prisma.socialLinks.findMany()
     * 
     * // Get first 10 SocialLinks
     * const socialLinks = await prisma.socialLinks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialLinksWithIdOnly = await prisma.socialLinks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends socialLinksFindManyArgs>(args?: SelectSubset<T, socialLinksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SocialLinks.
     * @param {socialLinksCreateArgs} args - Arguments to create a SocialLinks.
     * @example
     * // Create one SocialLinks
     * const SocialLinks = await prisma.socialLinks.create({
     *   data: {
     *     // ... data to create a SocialLinks
     *   }
     * })
     * 
     */
    create<T extends socialLinksCreateArgs>(args: SelectSubset<T, socialLinksCreateArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SocialLinks.
     * @param {socialLinksCreateManyArgs} args - Arguments to create many SocialLinks.
     * @example
     * // Create many SocialLinks
     * const socialLinks = await prisma.socialLinks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends socialLinksCreateManyArgs>(args?: SelectSubset<T, socialLinksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SocialLinks and returns the data saved in the database.
     * @param {socialLinksCreateManyAndReturnArgs} args - Arguments to create many SocialLinks.
     * @example
     * // Create many SocialLinks
     * const socialLinks = await prisma.socialLinks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SocialLinks and only return the `id`
     * const socialLinksWithIdOnly = await prisma.socialLinks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends socialLinksCreateManyAndReturnArgs>(args?: SelectSubset<T, socialLinksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SocialLinks.
     * @param {socialLinksDeleteArgs} args - Arguments to delete one SocialLinks.
     * @example
     * // Delete one SocialLinks
     * const SocialLinks = await prisma.socialLinks.delete({
     *   where: {
     *     // ... filter to delete one SocialLinks
     *   }
     * })
     * 
     */
    delete<T extends socialLinksDeleteArgs>(args: SelectSubset<T, socialLinksDeleteArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SocialLinks.
     * @param {socialLinksUpdateArgs} args - Arguments to update one SocialLinks.
     * @example
     * // Update one SocialLinks
     * const socialLinks = await prisma.socialLinks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends socialLinksUpdateArgs>(args: SelectSubset<T, socialLinksUpdateArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SocialLinks.
     * @param {socialLinksDeleteManyArgs} args - Arguments to filter SocialLinks to delete.
     * @example
     * // Delete a few SocialLinks
     * const { count } = await prisma.socialLinks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends socialLinksDeleteManyArgs>(args?: SelectSubset<T, socialLinksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialLinksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SocialLinks
     * const socialLinks = await prisma.socialLinks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends socialLinksUpdateManyArgs>(args: SelectSubset<T, socialLinksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialLinks and returns the data updated in the database.
     * @param {socialLinksUpdateManyAndReturnArgs} args - Arguments to update many SocialLinks.
     * @example
     * // Update many SocialLinks
     * const socialLinks = await prisma.socialLinks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SocialLinks and only return the `id`
     * const socialLinksWithIdOnly = await prisma.socialLinks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends socialLinksUpdateManyAndReturnArgs>(args: SelectSubset<T, socialLinksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SocialLinks.
     * @param {socialLinksUpsertArgs} args - Arguments to update or create a SocialLinks.
     * @example
     * // Update or create a SocialLinks
     * const socialLinks = await prisma.socialLinks.upsert({
     *   create: {
     *     // ... data to create a SocialLinks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SocialLinks we want to update
     *   }
     * })
     */
    upsert<T extends socialLinksUpsertArgs>(args: SelectSubset<T, socialLinksUpsertArgs<ExtArgs>>): Prisma__socialLinksClient<$Result.GetResult<Prisma.$socialLinksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SocialLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialLinksCountArgs} args - Arguments to filter SocialLinks to count.
     * @example
     * // Count the number of SocialLinks
     * const count = await prisma.socialLinks.count({
     *   where: {
     *     // ... the filter for the SocialLinks we want to count
     *   }
     * })
    **/
    count<T extends socialLinksCountArgs>(
      args?: Subset<T, socialLinksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialLinksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SocialLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialLinksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SocialLinksAggregateArgs>(args: Subset<T, SocialLinksAggregateArgs>): Prisma.PrismaPromise<GetSocialLinksAggregateType<T>>

    /**
     * Group by SocialLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialLinksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends socialLinksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: socialLinksGroupByArgs['orderBy'] }
        : { orderBy?: socialLinksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, socialLinksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialLinksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the socialLinks model
   */
  readonly fields: socialLinksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for socialLinks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__socialLinksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends socialLinks$storeArgs<ExtArgs> = {}>(args?: Subset<T, socialLinks$storeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$storePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the socialLinks model
   */
  interface socialLinksFieldRefs {
    readonly id: FieldRef<"socialLinks", 'String'>
    readonly tiktok: FieldRef<"socialLinks", 'String'>
    readonly youtube: FieldRef<"socialLinks", 'String'>
    readonly facebook: FieldRef<"socialLinks", 'String'>
    readonly x: FieldRef<"socialLinks", 'String'>
    readonly instagram: FieldRef<"socialLinks", 'String'>
    readonly createdAt: FieldRef<"socialLinks", 'DateTime'>
    readonly updatedAt: FieldRef<"socialLinks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * socialLinks findUnique
   */
  export type socialLinksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * Filter, which socialLinks to fetch.
     */
    where: socialLinksWhereUniqueInput
  }

  /**
   * socialLinks findUniqueOrThrow
   */
  export type socialLinksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * Filter, which socialLinks to fetch.
     */
    where: socialLinksWhereUniqueInput
  }

  /**
   * socialLinks findFirst
   */
  export type socialLinksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * Filter, which socialLinks to fetch.
     */
    where?: socialLinksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of socialLinks to fetch.
     */
    orderBy?: socialLinksOrderByWithRelationInput | socialLinksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for socialLinks.
     */
    cursor?: socialLinksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` socialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` socialLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of socialLinks.
     */
    distinct?: SocialLinksScalarFieldEnum | SocialLinksScalarFieldEnum[]
  }

  /**
   * socialLinks findFirstOrThrow
   */
  export type socialLinksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * Filter, which socialLinks to fetch.
     */
    where?: socialLinksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of socialLinks to fetch.
     */
    orderBy?: socialLinksOrderByWithRelationInput | socialLinksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for socialLinks.
     */
    cursor?: socialLinksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` socialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` socialLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of socialLinks.
     */
    distinct?: SocialLinksScalarFieldEnum | SocialLinksScalarFieldEnum[]
  }

  /**
   * socialLinks findMany
   */
  export type socialLinksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * Filter, which socialLinks to fetch.
     */
    where?: socialLinksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of socialLinks to fetch.
     */
    orderBy?: socialLinksOrderByWithRelationInput | socialLinksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing socialLinks.
     */
    cursor?: socialLinksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` socialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` socialLinks.
     */
    skip?: number
    distinct?: SocialLinksScalarFieldEnum | SocialLinksScalarFieldEnum[]
  }

  /**
   * socialLinks create
   */
  export type socialLinksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * The data needed to create a socialLinks.
     */
    data: XOR<socialLinksCreateInput, socialLinksUncheckedCreateInput>
  }

  /**
   * socialLinks createMany
   */
  export type socialLinksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many socialLinks.
     */
    data: socialLinksCreateManyInput | socialLinksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * socialLinks createManyAndReturn
   */
  export type socialLinksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * The data used to create many socialLinks.
     */
    data: socialLinksCreateManyInput | socialLinksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * socialLinks update
   */
  export type socialLinksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * The data needed to update a socialLinks.
     */
    data: XOR<socialLinksUpdateInput, socialLinksUncheckedUpdateInput>
    /**
     * Choose, which socialLinks to update.
     */
    where: socialLinksWhereUniqueInput
  }

  /**
   * socialLinks updateMany
   */
  export type socialLinksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update socialLinks.
     */
    data: XOR<socialLinksUpdateManyMutationInput, socialLinksUncheckedUpdateManyInput>
    /**
     * Filter which socialLinks to update
     */
    where?: socialLinksWhereInput
    /**
     * Limit how many socialLinks to update.
     */
    limit?: number
  }

  /**
   * socialLinks updateManyAndReturn
   */
  export type socialLinksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * The data used to update socialLinks.
     */
    data: XOR<socialLinksUpdateManyMutationInput, socialLinksUncheckedUpdateManyInput>
    /**
     * Filter which socialLinks to update
     */
    where?: socialLinksWhereInput
    /**
     * Limit how many socialLinks to update.
     */
    limit?: number
  }

  /**
   * socialLinks upsert
   */
  export type socialLinksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * The filter to search for the socialLinks to update in case it exists.
     */
    where: socialLinksWhereUniqueInput
    /**
     * In case the socialLinks found by the `where` argument doesn't exist, create a new socialLinks with this data.
     */
    create: XOR<socialLinksCreateInput, socialLinksUncheckedCreateInput>
    /**
     * In case the socialLinks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<socialLinksUpdateInput, socialLinksUncheckedUpdateInput>
  }

  /**
   * socialLinks delete
   */
  export type socialLinksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
    /**
     * Filter which socialLinks to delete.
     */
    where: socialLinksWhereUniqueInput
  }

  /**
   * socialLinks deleteMany
   */
  export type socialLinksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which socialLinks to delete
     */
    where?: socialLinksWhereInput
    /**
     * Limit how many socialLinks to delete.
     */
    limit?: number
  }

  /**
   * socialLinks.store
   */
  export type socialLinks$storeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store
     */
    select?: storeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store
     */
    omit?: storeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: storeInclude<ExtArgs> | null
    where?: storeWhereInput
    orderBy?: storeOrderByWithRelationInput | storeOrderByWithRelationInput[]
    cursor?: storeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * socialLinks without action
   */
  export type socialLinksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socialLinks
     */
    select?: socialLinksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the socialLinks
     */
    omit?: socialLinksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: socialLinksInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ImageScalarFieldEnum: {
    id: 'id',
    fileId: 'fileId',
    url: 'url'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    countryId: 'countryId',
    phone: 'phone',
    email: 'email',
    password: 'password',
    role: 'role',
    isVerified: 'isVerified',
    refreshTokenSecret: 'refreshTokenSecret',
    accessTokenSecret: 'accessTokenSecret',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    id: 'id',
    countryName: 'countryName',
    currencyCode: 'currencyCode',
    countryIsoCode: 'countryIsoCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const BranchesScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    address: 'address',
    countryId: 'countryId',
    phone: 'phone',
    isFreezed: 'isFreezed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BranchesScalarFieldEnum = (typeof BranchesScalarFieldEnum)[keyof typeof BranchesScalarFieldEnum]


  export const WorkHoursScalarFieldEnum: {
    id: 'id',
    branchId: 'branchId',
    startTime: 'startTime',
    endTime: 'endTime',
    day: 'day',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkHoursScalarFieldEnum = (typeof WorkHoursScalarFieldEnum)[keyof typeof WorkHoursScalarFieldEnum]


  export const StoreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    bio: 'bio',
    logo: 'logo',
    banner: 'banner',
    phone: 'phone',
    email: 'email',
    password: 'password',
    socialLinksId: 'socialLinksId',
    paymentId: 'paymentId',
    refreshTokenSecret: 'refreshTokenSecret',
    accessTokenSecret: 'accessTokenSecret',
    type: 'type',
    isApprovedByAdmin: 'isApprovedByAdmin',
    isFreezed: 'isFreezed',
    isBanned: 'isBanned',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    userId: 'userId',
    storeId: 'storeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SocialLinksScalarFieldEnum: {
    id: 'id',
    tiktok: 'tiktok',
    youtube: 'youtube',
    facebook: 'facebook',
    x: 'x',
    instagram: 'instagram',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SocialLinksScalarFieldEnum = (typeof SocialLinksScalarFieldEnum)[keyof typeof SocialLinksScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type imageWhereInput = {
    AND?: imageWhereInput | imageWhereInput[]
    OR?: imageWhereInput[]
    NOT?: imageWhereInput | imageWhereInput[]
    id?: StringFilter<"image"> | string
    fileId?: StringFilter<"image"> | string
    url?: StringFilter<"image"> | string
  }

  export type imageOrderByWithRelationInput = {
    id?: SortOrder
    fileId?: SortOrder
    url?: SortOrder
  }

  export type imageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: imageWhereInput | imageWhereInput[]
    OR?: imageWhereInput[]
    NOT?: imageWhereInput | imageWhereInput[]
    fileId?: StringFilter<"image"> | string
    url?: StringFilter<"image"> | string
  }, "id" | "id">

  export type imageOrderByWithAggregationInput = {
    id?: SortOrder
    fileId?: SortOrder
    url?: SortOrder
    _count?: imageCountOrderByAggregateInput
    _max?: imageMaxOrderByAggregateInput
    _min?: imageMinOrderByAggregateInput
  }

  export type imageScalarWhereWithAggregatesInput = {
    AND?: imageScalarWhereWithAggregatesInput | imageScalarWhereWithAggregatesInput[]
    OR?: imageScalarWhereWithAggregatesInput[]
    NOT?: imageScalarWhereWithAggregatesInput | imageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"image"> | string
    fileId?: StringWithAggregatesFilter<"image"> | string
    url?: StringWithAggregatesFilter<"image"> | string
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    dateOfBirth?: DateTimeNullableFilter<"user"> | Date | string | null
    gender?: StringNullableFilter<"user"> | string | null
    countryId?: StringFilter<"user"> | string
    phone?: StringFilter<"user"> | string
    email?: StringNullableFilter<"user"> | string | null
    password?: StringNullableFilter<"user"> | string | null
    role?: StringFilter<"user"> | string
    isVerified?: BoolFilter<"user"> | boolean
    refreshTokenSecret?: StringNullableFilter<"user"> | string | null
    accessTokenSecret?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    userCountry?: XOR<CountryScalarRelationFilter, countryWhereInput>
    transaction?: TransactionListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    refreshTokenSecret?: SortOrderInput | SortOrder
    accessTokenSecret?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userCountry?: countryOrderByWithRelationInput
    transaction?: transactionOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    dateOfBirth?: DateTimeNullableFilter<"user"> | Date | string | null
    gender?: StringNullableFilter<"user"> | string | null
    countryId?: StringFilter<"user"> | string
    email?: StringNullableFilter<"user"> | string | null
    password?: StringNullableFilter<"user"> | string | null
    role?: StringFilter<"user"> | string
    isVerified?: BoolFilter<"user"> | boolean
    refreshTokenSecret?: StringNullableFilter<"user"> | string | null
    accessTokenSecret?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    userCountry?: XOR<CountryScalarRelationFilter, countryWhereInput>
    transaction?: TransactionListRelationFilter
  }, "id" | "id" | "phone">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    refreshTokenSecret?: SortOrderInput | SortOrder
    accessTokenSecret?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"user"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"user"> | string | null
    countryId?: StringWithAggregatesFilter<"user"> | string
    phone?: StringWithAggregatesFilter<"user"> | string
    email?: StringNullableWithAggregatesFilter<"user"> | string | null
    password?: StringNullableWithAggregatesFilter<"user"> | string | null
    role?: StringWithAggregatesFilter<"user"> | string
    isVerified?: BoolWithAggregatesFilter<"user"> | boolean
    refreshTokenSecret?: StringNullableWithAggregatesFilter<"user"> | string | null
    accessTokenSecret?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
  }

  export type countryWhereInput = {
    AND?: countryWhereInput | countryWhereInput[]
    OR?: countryWhereInput[]
    NOT?: countryWhereInput | countryWhereInput[]
    id?: StringFilter<"country"> | string
    countryName?: StringFilter<"country"> | string
    currencyCode?: StringFilter<"country"> | string
    countryIsoCode?: StringFilter<"country"> | string
    createdAt?: DateTimeFilter<"country"> | Date | string
    updatedAt?: DateTimeFilter<"country"> | Date | string
    user?: UserListRelationFilter
    branches?: BranchesListRelationFilter
  }

  export type countryOrderByWithRelationInput = {
    id?: SortOrder
    countryName?: SortOrder
    currencyCode?: SortOrder
    countryIsoCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: userOrderByRelationAggregateInput
    branches?: branchesOrderByRelationAggregateInput
  }

  export type countryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    countryIsoCode?: string
    AND?: countryWhereInput | countryWhereInput[]
    OR?: countryWhereInput[]
    NOT?: countryWhereInput | countryWhereInput[]
    countryName?: StringFilter<"country"> | string
    currencyCode?: StringFilter<"country"> | string
    createdAt?: DateTimeFilter<"country"> | Date | string
    updatedAt?: DateTimeFilter<"country"> | Date | string
    user?: UserListRelationFilter
    branches?: BranchesListRelationFilter
  }, "id" | "id" | "countryIsoCode">

  export type countryOrderByWithAggregationInput = {
    id?: SortOrder
    countryName?: SortOrder
    currencyCode?: SortOrder
    countryIsoCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: countryCountOrderByAggregateInput
    _max?: countryMaxOrderByAggregateInput
    _min?: countryMinOrderByAggregateInput
  }

  export type countryScalarWhereWithAggregatesInput = {
    AND?: countryScalarWhereWithAggregatesInput | countryScalarWhereWithAggregatesInput[]
    OR?: countryScalarWhereWithAggregatesInput[]
    NOT?: countryScalarWhereWithAggregatesInput | countryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"country"> | string
    countryName?: StringWithAggregatesFilter<"country"> | string
    currencyCode?: StringWithAggregatesFilter<"country"> | string
    countryIsoCode?: StringWithAggregatesFilter<"country"> | string
    createdAt?: DateTimeWithAggregatesFilter<"country"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"country"> | Date | string
  }

  export type branchesWhereInput = {
    AND?: branchesWhereInput | branchesWhereInput[]
    OR?: branchesWhereInput[]
    NOT?: branchesWhereInput | branchesWhereInput[]
    id?: StringFilter<"branches"> | string
    storeId?: StringFilter<"branches"> | string
    address?: StringFilter<"branches"> | string
    countryId?: StringFilter<"branches"> | string
    phone?: StringFilter<"branches"> | string
    isFreezed?: BoolFilter<"branches"> | boolean
    createdAt?: DateTimeFilter<"branches"> | Date | string
    updatedAt?: DateTimeFilter<"branches"> | Date | string
    store?: XOR<StoreScalarRelationFilter, storeWhereInput>
    country?: XOR<CountryScalarRelationFilter, countryWhereInput>
    workHours?: WorkHoursListRelationFilter
  }

  export type branchesOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    address?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    isFreezed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    store?: storeOrderByWithRelationInput
    country?: countryOrderByWithRelationInput
    workHours?: workHoursOrderByRelationAggregateInput
  }

  export type branchesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: branchesWhereInput | branchesWhereInput[]
    OR?: branchesWhereInput[]
    NOT?: branchesWhereInput | branchesWhereInput[]
    storeId?: StringFilter<"branches"> | string
    address?: StringFilter<"branches"> | string
    countryId?: StringFilter<"branches"> | string
    phone?: StringFilter<"branches"> | string
    isFreezed?: BoolFilter<"branches"> | boolean
    createdAt?: DateTimeFilter<"branches"> | Date | string
    updatedAt?: DateTimeFilter<"branches"> | Date | string
    store?: XOR<StoreScalarRelationFilter, storeWhereInput>
    country?: XOR<CountryScalarRelationFilter, countryWhereInput>
    workHours?: WorkHoursListRelationFilter
  }, "id" | "id">

  export type branchesOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    address?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    isFreezed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: branchesCountOrderByAggregateInput
    _max?: branchesMaxOrderByAggregateInput
    _min?: branchesMinOrderByAggregateInput
  }

  export type branchesScalarWhereWithAggregatesInput = {
    AND?: branchesScalarWhereWithAggregatesInput | branchesScalarWhereWithAggregatesInput[]
    OR?: branchesScalarWhereWithAggregatesInput[]
    NOT?: branchesScalarWhereWithAggregatesInput | branchesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"branches"> | string
    storeId?: StringWithAggregatesFilter<"branches"> | string
    address?: StringWithAggregatesFilter<"branches"> | string
    countryId?: StringWithAggregatesFilter<"branches"> | string
    phone?: StringWithAggregatesFilter<"branches"> | string
    isFreezed?: BoolWithAggregatesFilter<"branches"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"branches"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"branches"> | Date | string
  }

  export type workHoursWhereInput = {
    AND?: workHoursWhereInput | workHoursWhereInput[]
    OR?: workHoursWhereInput[]
    NOT?: workHoursWhereInput | workHoursWhereInput[]
    id?: StringFilter<"workHours"> | string
    branchId?: StringFilter<"workHours"> | string
    startTime?: DateTimeFilter<"workHours"> | Date | string
    endTime?: DateTimeFilter<"workHours"> | Date | string
    day?: IntFilter<"workHours"> | number
    createdAt?: DateTimeFilter<"workHours"> | Date | string
    updatedAt?: DateTimeFilter<"workHours"> | Date | string
    branch?: XOR<BranchesScalarRelationFilter, branchesWhereInput>
  }

  export type workHoursOrderByWithRelationInput = {
    id?: SortOrder
    branchId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    day?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    branch?: branchesOrderByWithRelationInput
  }

  export type workHoursWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    branchId?: string
    AND?: workHoursWhereInput | workHoursWhereInput[]
    OR?: workHoursWhereInput[]
    NOT?: workHoursWhereInput | workHoursWhereInput[]
    startTime?: DateTimeFilter<"workHours"> | Date | string
    endTime?: DateTimeFilter<"workHours"> | Date | string
    day?: IntFilter<"workHours"> | number
    createdAt?: DateTimeFilter<"workHours"> | Date | string
    updatedAt?: DateTimeFilter<"workHours"> | Date | string
    branch?: XOR<BranchesScalarRelationFilter, branchesWhereInput>
  }, "id" | "id" | "branchId">

  export type workHoursOrderByWithAggregationInput = {
    id?: SortOrder
    branchId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    day?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: workHoursCountOrderByAggregateInput
    _avg?: workHoursAvgOrderByAggregateInput
    _max?: workHoursMaxOrderByAggregateInput
    _min?: workHoursMinOrderByAggregateInput
    _sum?: workHoursSumOrderByAggregateInput
  }

  export type workHoursScalarWhereWithAggregatesInput = {
    AND?: workHoursScalarWhereWithAggregatesInput | workHoursScalarWhereWithAggregatesInput[]
    OR?: workHoursScalarWhereWithAggregatesInput[]
    NOT?: workHoursScalarWhereWithAggregatesInput | workHoursScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"workHours"> | string
    branchId?: StringWithAggregatesFilter<"workHours"> | string
    startTime?: DateTimeWithAggregatesFilter<"workHours"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"workHours"> | Date | string
    day?: IntWithAggregatesFilter<"workHours"> | number
    createdAt?: DateTimeWithAggregatesFilter<"workHours"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"workHours"> | Date | string
  }

  export type storeWhereInput = {
    AND?: storeWhereInput | storeWhereInput[]
    OR?: storeWhereInput[]
    NOT?: storeWhereInput | storeWhereInput[]
    id?: StringFilter<"store"> | string
    name?: StringFilter<"store"> | string
    bio?: StringFilter<"store"> | string
    logo?: StringFilter<"store"> | string
    banner?: StringFilter<"store"> | string
    phone?: StringFilter<"store"> | string
    email?: StringFilter<"store"> | string
    password?: StringFilter<"store"> | string
    socialLinksId?: StringFilter<"store"> | string
    paymentId?: StringNullableFilter<"store"> | string | null
    refreshTokenSecret?: StringNullableFilter<"store"> | string | null
    accessTokenSecret?: StringNullableFilter<"store"> | string | null
    type?: StringFilter<"store"> | string
    isApprovedByAdmin?: BoolFilter<"store"> | boolean
    isFreezed?: BoolFilter<"store"> | boolean
    isBanned?: BoolFilter<"store"> | boolean
    isDeleted?: BoolFilter<"store"> | boolean
    createdAt?: DateTimeFilter<"store"> | Date | string
    updatedAt?: DateTimeFilter<"store"> | Date | string
    socialLinks?: XOR<SocialLinksScalarRelationFilter, socialLinksWhereInput>
    branches?: BranchesListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type storeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    logo?: SortOrder
    banner?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialLinksId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    refreshTokenSecret?: SortOrderInput | SortOrder
    accessTokenSecret?: SortOrderInput | SortOrder
    type?: SortOrder
    isApprovedByAdmin?: SortOrder
    isFreezed?: SortOrder
    isBanned?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    socialLinks?: socialLinksOrderByWithRelationInput
    branches?: branchesOrderByRelationAggregateInput
    transactions?: transactionOrderByRelationAggregateInput
  }

  export type storeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    email?: string
    socialLinksId?: string
    AND?: storeWhereInput | storeWhereInput[]
    OR?: storeWhereInput[]
    NOT?: storeWhereInput | storeWhereInput[]
    name?: StringFilter<"store"> | string
    bio?: StringFilter<"store"> | string
    logo?: StringFilter<"store"> | string
    banner?: StringFilter<"store"> | string
    password?: StringFilter<"store"> | string
    paymentId?: StringNullableFilter<"store"> | string | null
    refreshTokenSecret?: StringNullableFilter<"store"> | string | null
    accessTokenSecret?: StringNullableFilter<"store"> | string | null
    type?: StringFilter<"store"> | string
    isApprovedByAdmin?: BoolFilter<"store"> | boolean
    isFreezed?: BoolFilter<"store"> | boolean
    isBanned?: BoolFilter<"store"> | boolean
    isDeleted?: BoolFilter<"store"> | boolean
    createdAt?: DateTimeFilter<"store"> | Date | string
    updatedAt?: DateTimeFilter<"store"> | Date | string
    socialLinks?: XOR<SocialLinksScalarRelationFilter, socialLinksWhereInput>
    branches?: BranchesListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "id" | "phone" | "email" | "socialLinksId">

  export type storeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    logo?: SortOrder
    banner?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialLinksId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    refreshTokenSecret?: SortOrderInput | SortOrder
    accessTokenSecret?: SortOrderInput | SortOrder
    type?: SortOrder
    isApprovedByAdmin?: SortOrder
    isFreezed?: SortOrder
    isBanned?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: storeCountOrderByAggregateInput
    _max?: storeMaxOrderByAggregateInput
    _min?: storeMinOrderByAggregateInput
  }

  export type storeScalarWhereWithAggregatesInput = {
    AND?: storeScalarWhereWithAggregatesInput | storeScalarWhereWithAggregatesInput[]
    OR?: storeScalarWhereWithAggregatesInput[]
    NOT?: storeScalarWhereWithAggregatesInput | storeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"store"> | string
    name?: StringWithAggregatesFilter<"store"> | string
    bio?: StringWithAggregatesFilter<"store"> | string
    logo?: StringWithAggregatesFilter<"store"> | string
    banner?: StringWithAggregatesFilter<"store"> | string
    phone?: StringWithAggregatesFilter<"store"> | string
    email?: StringWithAggregatesFilter<"store"> | string
    password?: StringWithAggregatesFilter<"store"> | string
    socialLinksId?: StringWithAggregatesFilter<"store"> | string
    paymentId?: StringNullableWithAggregatesFilter<"store"> | string | null
    refreshTokenSecret?: StringNullableWithAggregatesFilter<"store"> | string | null
    accessTokenSecret?: StringNullableWithAggregatesFilter<"store"> | string | null
    type?: StringWithAggregatesFilter<"store"> | string
    isApprovedByAdmin?: BoolWithAggregatesFilter<"store"> | boolean
    isFreezed?: BoolWithAggregatesFilter<"store"> | boolean
    isBanned?: BoolWithAggregatesFilter<"store"> | boolean
    isDeleted?: BoolWithAggregatesFilter<"store"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"store"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"store"> | Date | string
  }

  export type transactionWhereInput = {
    AND?: transactionWhereInput | transactionWhereInput[]
    OR?: transactionWhereInput[]
    NOT?: transactionWhereInput | transactionWhereInput[]
    id?: StringFilter<"transaction"> | string
    type?: BoolFilter<"transaction"> | boolean
    userId?: StringNullableFilter<"transaction"> | string | null
    storeId?: StringNullableFilter<"transaction"> | string | null
    createdAt?: DateTimeFilter<"transaction"> | Date | string
    updatedAt?: DateTimeFilter<"transaction"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
    store?: XOR<StoreNullableScalarRelationFilter, storeWhereInput> | null
  }

  export type transactionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    userId?: SortOrderInput | SortOrder
    storeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: userOrderByWithRelationInput
    store?: storeOrderByWithRelationInput
  }

  export type transactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: transactionWhereInput | transactionWhereInput[]
    OR?: transactionWhereInput[]
    NOT?: transactionWhereInput | transactionWhereInput[]
    type?: BoolFilter<"transaction"> | boolean
    userId?: StringNullableFilter<"transaction"> | string | null
    storeId?: StringNullableFilter<"transaction"> | string | null
    createdAt?: DateTimeFilter<"transaction"> | Date | string
    updatedAt?: DateTimeFilter<"transaction"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
    store?: XOR<StoreNullableScalarRelationFilter, storeWhereInput> | null
  }, "id" | "id">

  export type transactionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    userId?: SortOrderInput | SortOrder
    storeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: transactionCountOrderByAggregateInput
    _max?: transactionMaxOrderByAggregateInput
    _min?: transactionMinOrderByAggregateInput
  }

  export type transactionScalarWhereWithAggregatesInput = {
    AND?: transactionScalarWhereWithAggregatesInput | transactionScalarWhereWithAggregatesInput[]
    OR?: transactionScalarWhereWithAggregatesInput[]
    NOT?: transactionScalarWhereWithAggregatesInput | transactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"transaction"> | string
    type?: BoolWithAggregatesFilter<"transaction"> | boolean
    userId?: StringNullableWithAggregatesFilter<"transaction"> | string | null
    storeId?: StringNullableWithAggregatesFilter<"transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"transaction"> | Date | string
  }

  export type socialLinksWhereInput = {
    AND?: socialLinksWhereInput | socialLinksWhereInput[]
    OR?: socialLinksWhereInput[]
    NOT?: socialLinksWhereInput | socialLinksWhereInput[]
    id?: StringFilter<"socialLinks"> | string
    tiktok?: StringNullableFilter<"socialLinks"> | string | null
    youtube?: StringNullableFilter<"socialLinks"> | string | null
    facebook?: StringNullableFilter<"socialLinks"> | string | null
    x?: StringNullableFilter<"socialLinks"> | string | null
    instagram?: StringNullableFilter<"socialLinks"> | string | null
    createdAt?: DateTimeFilter<"socialLinks"> | Date | string
    updatedAt?: DateTimeFilter<"socialLinks"> | Date | string
    store?: StoreListRelationFilter
  }

  export type socialLinksOrderByWithRelationInput = {
    id?: SortOrder
    tiktok?: SortOrderInput | SortOrder
    youtube?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    x?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    store?: storeOrderByRelationAggregateInput
  }

  export type socialLinksWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: socialLinksWhereInput | socialLinksWhereInput[]
    OR?: socialLinksWhereInput[]
    NOT?: socialLinksWhereInput | socialLinksWhereInput[]
    tiktok?: StringNullableFilter<"socialLinks"> | string | null
    youtube?: StringNullableFilter<"socialLinks"> | string | null
    facebook?: StringNullableFilter<"socialLinks"> | string | null
    x?: StringNullableFilter<"socialLinks"> | string | null
    instagram?: StringNullableFilter<"socialLinks"> | string | null
    createdAt?: DateTimeFilter<"socialLinks"> | Date | string
    updatedAt?: DateTimeFilter<"socialLinks"> | Date | string
    store?: StoreListRelationFilter
  }, "id" | "id">

  export type socialLinksOrderByWithAggregationInput = {
    id?: SortOrder
    tiktok?: SortOrderInput | SortOrder
    youtube?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    x?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: socialLinksCountOrderByAggregateInput
    _max?: socialLinksMaxOrderByAggregateInput
    _min?: socialLinksMinOrderByAggregateInput
  }

  export type socialLinksScalarWhereWithAggregatesInput = {
    AND?: socialLinksScalarWhereWithAggregatesInput | socialLinksScalarWhereWithAggregatesInput[]
    OR?: socialLinksScalarWhereWithAggregatesInput[]
    NOT?: socialLinksScalarWhereWithAggregatesInput | socialLinksScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"socialLinks"> | string
    tiktok?: StringNullableWithAggregatesFilter<"socialLinks"> | string | null
    youtube?: StringNullableWithAggregatesFilter<"socialLinks"> | string | null
    facebook?: StringNullableWithAggregatesFilter<"socialLinks"> | string | null
    x?: StringNullableWithAggregatesFilter<"socialLinks"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"socialLinks"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"socialLinks"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"socialLinks"> | Date | string
  }

  export type imageCreateInput = {
    id?: string
    fileId: string
    url: string
  }

  export type imageUncheckedCreateInput = {
    id?: string
    fileId: string
    url: string
  }

  export type imageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type imageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type imageCreateManyInput = {
    id?: string
    fileId: string
    url: string
  }

  export type imageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type imageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userCountry: countryCreateNestedOneWithoutUserInput
    transaction?: transactionCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    countryId: string
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: transactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userCountry?: countryUpdateOneRequiredWithoutUserNestedInput
    transaction?: transactionUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: transactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    countryId: string
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type countryCreateInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: userCreateNestedManyWithoutUserCountryInput
    branches?: branchesCreateNestedManyWithoutCountryInput
  }

  export type countryUncheckedCreateInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: userUncheckedCreateNestedManyWithoutUserCountryInput
    branches?: branchesUncheckedCreateNestedManyWithoutCountryInput
  }

  export type countryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateManyWithoutUserCountryNestedInput
    branches?: branchesUpdateManyWithoutCountryNestedInput
  }

  export type countryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUncheckedUpdateManyWithoutUserCountryNestedInput
    branches?: branchesUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type countryCreateManyInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type countryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type countryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type branchesCreateInput = {
    id?: string
    address: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    store: storeCreateNestedOneWithoutBranchesInput
    country: countryCreateNestedOneWithoutBranchesInput
    workHours?: workHoursCreateNestedManyWithoutBranchInput
  }

  export type branchesUncheckedCreateInput = {
    id?: string
    storeId: string
    address: string
    countryId: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workHours?: workHoursUncheckedCreateNestedManyWithoutBranchInput
  }

  export type branchesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: storeUpdateOneRequiredWithoutBranchesNestedInput
    country?: countryUpdateOneRequiredWithoutBranchesNestedInput
    workHours?: workHoursUpdateManyWithoutBranchNestedInput
  }

  export type branchesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workHours?: workHoursUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type branchesCreateManyInput = {
    id?: string
    storeId: string
    address: string
    countryId: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type branchesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type branchesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workHoursCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    day: number
    createdAt?: Date | string
    updatedAt?: Date | string
    branch: branchesCreateNestedOneWithoutWorkHoursInput
  }

  export type workHoursUncheckedCreateInput = {
    id?: string
    branchId: string
    startTime: Date | string
    endTime: Date | string
    day: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type workHoursUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: branchesUpdateOneRequiredWithoutWorkHoursNestedInput
  }

  export type workHoursUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    branchId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workHoursCreateManyInput = {
    id?: string
    branchId: string
    startTime: Date | string
    endTime: Date | string
    day: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type workHoursUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workHoursUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    branchId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type storeCreateInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialLinks: socialLinksCreateNestedOneWithoutStoreInput
    branches?: branchesCreateNestedManyWithoutStoreInput
    transactions?: transactionCreateNestedManyWithoutStoreInput
  }

  export type storeUncheckedCreateInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    socialLinksId: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: branchesUncheckedCreateNestedManyWithoutStoreInput
    transactions?: transactionUncheckedCreateNestedManyWithoutStoreInput
  }

  export type storeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialLinks?: socialLinksUpdateOneRequiredWithoutStoreNestedInput
    branches?: branchesUpdateManyWithoutStoreNestedInput
    transactions?: transactionUpdateManyWithoutStoreNestedInput
  }

  export type storeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    socialLinksId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: branchesUncheckedUpdateManyWithoutStoreNestedInput
    transactions?: transactionUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type storeCreateManyInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    socialLinksId: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type storeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type storeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    socialLinksId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionCreateInput = {
    id?: string
    type?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: userCreateNestedOneWithoutTransactionInput
    store?: storeCreateNestedOneWithoutTransactionsInput
  }

  export type transactionUncheckedCreateInput = {
    id?: string
    type?: boolean
    userId?: string | null
    storeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneWithoutTransactionNestedInput
    store?: storeUpdateOneWithoutTransactionsNestedInput
  }

  export type transactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionCreateManyInput = {
    id?: string
    type?: boolean
    userId?: string | null
    storeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type socialLinksCreateInput = {
    id?: string
    tiktok?: string | null
    youtube?: string | null
    facebook?: string | null
    x?: string | null
    instagram?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    store?: storeCreateNestedManyWithoutSocialLinksInput
  }

  export type socialLinksUncheckedCreateInput = {
    id?: string
    tiktok?: string | null
    youtube?: string | null
    facebook?: string | null
    x?: string | null
    instagram?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    store?: storeUncheckedCreateNestedManyWithoutSocialLinksInput
  }

  export type socialLinksUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    x?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: storeUpdateManyWithoutSocialLinksNestedInput
  }

  export type socialLinksUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    x?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: storeUncheckedUpdateManyWithoutSocialLinksNestedInput
  }

  export type socialLinksCreateManyInput = {
    id?: string
    tiktok?: string | null
    youtube?: string | null
    facebook?: string | null
    x?: string | null
    instagram?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type socialLinksUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    x?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type socialLinksUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    x?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type imageCountOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    url?: SortOrder
  }

  export type imageMaxOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    url?: SortOrder
  }

  export type imageMinOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    url?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CountryScalarRelationFilter = {
    is?: countryWhereInput
    isNot?: countryWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: transactionWhereInput
    some?: transactionWhereInput
    none?: transactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type transactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    refreshTokenSecret?: SortOrder
    accessTokenSecret?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    refreshTokenSecret?: SortOrder
    accessTokenSecret?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    refreshTokenSecret?: SortOrder
    accessTokenSecret?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: userWhereInput
    some?: userWhereInput
    none?: userWhereInput
  }

  export type BranchesListRelationFilter = {
    every?: branchesWhereInput
    some?: branchesWhereInput
    none?: branchesWhereInput
  }

  export type userOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type branchesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type countryCountOrderByAggregateInput = {
    id?: SortOrder
    countryName?: SortOrder
    currencyCode?: SortOrder
    countryIsoCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type countryMaxOrderByAggregateInput = {
    id?: SortOrder
    countryName?: SortOrder
    currencyCode?: SortOrder
    countryIsoCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type countryMinOrderByAggregateInput = {
    id?: SortOrder
    countryName?: SortOrder
    currencyCode?: SortOrder
    countryIsoCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreScalarRelationFilter = {
    is?: storeWhereInput
    isNot?: storeWhereInput
  }

  export type WorkHoursListRelationFilter = {
    every?: workHoursWhereInput
    some?: workHoursWhereInput
    none?: workHoursWhereInput
  }

  export type workHoursOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type branchesCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    address?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    isFreezed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type branchesMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    address?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    isFreezed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type branchesMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    address?: SortOrder
    countryId?: SortOrder
    phone?: SortOrder
    isFreezed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BranchesScalarRelationFilter = {
    is?: branchesWhereInput
    isNot?: branchesWhereInput
  }

  export type workHoursCountOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    day?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type workHoursAvgOrderByAggregateInput = {
    day?: SortOrder
  }

  export type workHoursMaxOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    day?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type workHoursMinOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    day?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type workHoursSumOrderByAggregateInput = {
    day?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SocialLinksScalarRelationFilter = {
    is?: socialLinksWhereInput
    isNot?: socialLinksWhereInput
  }

  export type storeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    logo?: SortOrder
    banner?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialLinksId?: SortOrder
    paymentId?: SortOrder
    refreshTokenSecret?: SortOrder
    accessTokenSecret?: SortOrder
    type?: SortOrder
    isApprovedByAdmin?: SortOrder
    isFreezed?: SortOrder
    isBanned?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type storeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    logo?: SortOrder
    banner?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialLinksId?: SortOrder
    paymentId?: SortOrder
    refreshTokenSecret?: SortOrder
    accessTokenSecret?: SortOrder
    type?: SortOrder
    isApprovedByAdmin?: SortOrder
    isFreezed?: SortOrder
    isBanned?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type storeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    logo?: SortOrder
    banner?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialLinksId?: SortOrder
    paymentId?: SortOrder
    refreshTokenSecret?: SortOrder
    accessTokenSecret?: SortOrder
    type?: SortOrder
    isApprovedByAdmin?: SortOrder
    isFreezed?: SortOrder
    isBanned?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: userWhereInput | null
    isNot?: userWhereInput | null
  }

  export type StoreNullableScalarRelationFilter = {
    is?: storeWhereInput | null
    isNot?: storeWhereInput | null
  }

  export type transactionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type transactionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type transactionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreListRelationFilter = {
    every?: storeWhereInput
    some?: storeWhereInput
    none?: storeWhereInput
  }

  export type storeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type socialLinksCountOrderByAggregateInput = {
    id?: SortOrder
    tiktok?: SortOrder
    youtube?: SortOrder
    facebook?: SortOrder
    x?: SortOrder
    instagram?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type socialLinksMaxOrderByAggregateInput = {
    id?: SortOrder
    tiktok?: SortOrder
    youtube?: SortOrder
    facebook?: SortOrder
    x?: SortOrder
    instagram?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type socialLinksMinOrderByAggregateInput = {
    id?: SortOrder
    tiktok?: SortOrder
    youtube?: SortOrder
    facebook?: SortOrder
    x?: SortOrder
    instagram?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type countryCreateNestedOneWithoutUserInput = {
    create?: XOR<countryCreateWithoutUserInput, countryUncheckedCreateWithoutUserInput>
    connectOrCreate?: countryCreateOrConnectWithoutUserInput
    connect?: countryWhereUniqueInput
  }

  export type transactionCreateNestedManyWithoutUserInput = {
    create?: XOR<transactionCreateWithoutUserInput, transactionUncheckedCreateWithoutUserInput> | transactionCreateWithoutUserInput[] | transactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutUserInput | transactionCreateOrConnectWithoutUserInput[]
    createMany?: transactionCreateManyUserInputEnvelope
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
  }

  export type transactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<transactionCreateWithoutUserInput, transactionUncheckedCreateWithoutUserInput> | transactionCreateWithoutUserInput[] | transactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutUserInput | transactionCreateOrConnectWithoutUserInput[]
    createMany?: transactionCreateManyUserInputEnvelope
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type countryUpdateOneRequiredWithoutUserNestedInput = {
    create?: XOR<countryCreateWithoutUserInput, countryUncheckedCreateWithoutUserInput>
    connectOrCreate?: countryCreateOrConnectWithoutUserInput
    upsert?: countryUpsertWithoutUserInput
    connect?: countryWhereUniqueInput
    update?: XOR<XOR<countryUpdateToOneWithWhereWithoutUserInput, countryUpdateWithoutUserInput>, countryUncheckedUpdateWithoutUserInput>
  }

  export type transactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<transactionCreateWithoutUserInput, transactionUncheckedCreateWithoutUserInput> | transactionCreateWithoutUserInput[] | transactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutUserInput | transactionCreateOrConnectWithoutUserInput[]
    upsert?: transactionUpsertWithWhereUniqueWithoutUserInput | transactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: transactionCreateManyUserInputEnvelope
    set?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    disconnect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    delete?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    update?: transactionUpdateWithWhereUniqueWithoutUserInput | transactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: transactionUpdateManyWithWhereWithoutUserInput | transactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: transactionScalarWhereInput | transactionScalarWhereInput[]
  }

  export type transactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<transactionCreateWithoutUserInput, transactionUncheckedCreateWithoutUserInput> | transactionCreateWithoutUserInput[] | transactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutUserInput | transactionCreateOrConnectWithoutUserInput[]
    upsert?: transactionUpsertWithWhereUniqueWithoutUserInput | transactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: transactionCreateManyUserInputEnvelope
    set?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    disconnect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    delete?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    update?: transactionUpdateWithWhereUniqueWithoutUserInput | transactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: transactionUpdateManyWithWhereWithoutUserInput | transactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: transactionScalarWhereInput | transactionScalarWhereInput[]
  }

  export type userCreateNestedManyWithoutUserCountryInput = {
    create?: XOR<userCreateWithoutUserCountryInput, userUncheckedCreateWithoutUserCountryInput> | userCreateWithoutUserCountryInput[] | userUncheckedCreateWithoutUserCountryInput[]
    connectOrCreate?: userCreateOrConnectWithoutUserCountryInput | userCreateOrConnectWithoutUserCountryInput[]
    createMany?: userCreateManyUserCountryInputEnvelope
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
  }

  export type branchesCreateNestedManyWithoutCountryInput = {
    create?: XOR<branchesCreateWithoutCountryInput, branchesUncheckedCreateWithoutCountryInput> | branchesCreateWithoutCountryInput[] | branchesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutCountryInput | branchesCreateOrConnectWithoutCountryInput[]
    createMany?: branchesCreateManyCountryInputEnvelope
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
  }

  export type userUncheckedCreateNestedManyWithoutUserCountryInput = {
    create?: XOR<userCreateWithoutUserCountryInput, userUncheckedCreateWithoutUserCountryInput> | userCreateWithoutUserCountryInput[] | userUncheckedCreateWithoutUserCountryInput[]
    connectOrCreate?: userCreateOrConnectWithoutUserCountryInput | userCreateOrConnectWithoutUserCountryInput[]
    createMany?: userCreateManyUserCountryInputEnvelope
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
  }

  export type branchesUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<branchesCreateWithoutCountryInput, branchesUncheckedCreateWithoutCountryInput> | branchesCreateWithoutCountryInput[] | branchesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutCountryInput | branchesCreateOrConnectWithoutCountryInput[]
    createMany?: branchesCreateManyCountryInputEnvelope
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
  }

  export type userUpdateManyWithoutUserCountryNestedInput = {
    create?: XOR<userCreateWithoutUserCountryInput, userUncheckedCreateWithoutUserCountryInput> | userCreateWithoutUserCountryInput[] | userUncheckedCreateWithoutUserCountryInput[]
    connectOrCreate?: userCreateOrConnectWithoutUserCountryInput | userCreateOrConnectWithoutUserCountryInput[]
    upsert?: userUpsertWithWhereUniqueWithoutUserCountryInput | userUpsertWithWhereUniqueWithoutUserCountryInput[]
    createMany?: userCreateManyUserCountryInputEnvelope
    set?: userWhereUniqueInput | userWhereUniqueInput[]
    disconnect?: userWhereUniqueInput | userWhereUniqueInput[]
    delete?: userWhereUniqueInput | userWhereUniqueInput[]
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
    update?: userUpdateWithWhereUniqueWithoutUserCountryInput | userUpdateWithWhereUniqueWithoutUserCountryInput[]
    updateMany?: userUpdateManyWithWhereWithoutUserCountryInput | userUpdateManyWithWhereWithoutUserCountryInput[]
    deleteMany?: userScalarWhereInput | userScalarWhereInput[]
  }

  export type branchesUpdateManyWithoutCountryNestedInput = {
    create?: XOR<branchesCreateWithoutCountryInput, branchesUncheckedCreateWithoutCountryInput> | branchesCreateWithoutCountryInput[] | branchesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutCountryInput | branchesCreateOrConnectWithoutCountryInput[]
    upsert?: branchesUpsertWithWhereUniqueWithoutCountryInput | branchesUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: branchesCreateManyCountryInputEnvelope
    set?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    disconnect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    delete?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    update?: branchesUpdateWithWhereUniqueWithoutCountryInput | branchesUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: branchesUpdateManyWithWhereWithoutCountryInput | branchesUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: branchesScalarWhereInput | branchesScalarWhereInput[]
  }

  export type userUncheckedUpdateManyWithoutUserCountryNestedInput = {
    create?: XOR<userCreateWithoutUserCountryInput, userUncheckedCreateWithoutUserCountryInput> | userCreateWithoutUserCountryInput[] | userUncheckedCreateWithoutUserCountryInput[]
    connectOrCreate?: userCreateOrConnectWithoutUserCountryInput | userCreateOrConnectWithoutUserCountryInput[]
    upsert?: userUpsertWithWhereUniqueWithoutUserCountryInput | userUpsertWithWhereUniqueWithoutUserCountryInput[]
    createMany?: userCreateManyUserCountryInputEnvelope
    set?: userWhereUniqueInput | userWhereUniqueInput[]
    disconnect?: userWhereUniqueInput | userWhereUniqueInput[]
    delete?: userWhereUniqueInput | userWhereUniqueInput[]
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
    update?: userUpdateWithWhereUniqueWithoutUserCountryInput | userUpdateWithWhereUniqueWithoutUserCountryInput[]
    updateMany?: userUpdateManyWithWhereWithoutUserCountryInput | userUpdateManyWithWhereWithoutUserCountryInput[]
    deleteMany?: userScalarWhereInput | userScalarWhereInput[]
  }

  export type branchesUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<branchesCreateWithoutCountryInput, branchesUncheckedCreateWithoutCountryInput> | branchesCreateWithoutCountryInput[] | branchesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutCountryInput | branchesCreateOrConnectWithoutCountryInput[]
    upsert?: branchesUpsertWithWhereUniqueWithoutCountryInput | branchesUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: branchesCreateManyCountryInputEnvelope
    set?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    disconnect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    delete?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    update?: branchesUpdateWithWhereUniqueWithoutCountryInput | branchesUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: branchesUpdateManyWithWhereWithoutCountryInput | branchesUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: branchesScalarWhereInput | branchesScalarWhereInput[]
  }

  export type storeCreateNestedOneWithoutBranchesInput = {
    create?: XOR<storeCreateWithoutBranchesInput, storeUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: storeCreateOrConnectWithoutBranchesInput
    connect?: storeWhereUniqueInput
  }

  export type countryCreateNestedOneWithoutBranchesInput = {
    create?: XOR<countryCreateWithoutBranchesInput, countryUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: countryCreateOrConnectWithoutBranchesInput
    connect?: countryWhereUniqueInput
  }

  export type workHoursCreateNestedManyWithoutBranchInput = {
    create?: XOR<workHoursCreateWithoutBranchInput, workHoursUncheckedCreateWithoutBranchInput> | workHoursCreateWithoutBranchInput[] | workHoursUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: workHoursCreateOrConnectWithoutBranchInput | workHoursCreateOrConnectWithoutBranchInput[]
    createMany?: workHoursCreateManyBranchInputEnvelope
    connect?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
  }

  export type workHoursUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<workHoursCreateWithoutBranchInput, workHoursUncheckedCreateWithoutBranchInput> | workHoursCreateWithoutBranchInput[] | workHoursUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: workHoursCreateOrConnectWithoutBranchInput | workHoursCreateOrConnectWithoutBranchInput[]
    createMany?: workHoursCreateManyBranchInputEnvelope
    connect?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
  }

  export type storeUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<storeCreateWithoutBranchesInput, storeUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: storeCreateOrConnectWithoutBranchesInput
    upsert?: storeUpsertWithoutBranchesInput
    connect?: storeWhereUniqueInput
    update?: XOR<XOR<storeUpdateToOneWithWhereWithoutBranchesInput, storeUpdateWithoutBranchesInput>, storeUncheckedUpdateWithoutBranchesInput>
  }

  export type countryUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<countryCreateWithoutBranchesInput, countryUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: countryCreateOrConnectWithoutBranchesInput
    upsert?: countryUpsertWithoutBranchesInput
    connect?: countryWhereUniqueInput
    update?: XOR<XOR<countryUpdateToOneWithWhereWithoutBranchesInput, countryUpdateWithoutBranchesInput>, countryUncheckedUpdateWithoutBranchesInput>
  }

  export type workHoursUpdateManyWithoutBranchNestedInput = {
    create?: XOR<workHoursCreateWithoutBranchInput, workHoursUncheckedCreateWithoutBranchInput> | workHoursCreateWithoutBranchInput[] | workHoursUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: workHoursCreateOrConnectWithoutBranchInput | workHoursCreateOrConnectWithoutBranchInput[]
    upsert?: workHoursUpsertWithWhereUniqueWithoutBranchInput | workHoursUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: workHoursCreateManyBranchInputEnvelope
    set?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    disconnect?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    delete?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    connect?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    update?: workHoursUpdateWithWhereUniqueWithoutBranchInput | workHoursUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: workHoursUpdateManyWithWhereWithoutBranchInput | workHoursUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: workHoursScalarWhereInput | workHoursScalarWhereInput[]
  }

  export type workHoursUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<workHoursCreateWithoutBranchInput, workHoursUncheckedCreateWithoutBranchInput> | workHoursCreateWithoutBranchInput[] | workHoursUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: workHoursCreateOrConnectWithoutBranchInput | workHoursCreateOrConnectWithoutBranchInput[]
    upsert?: workHoursUpsertWithWhereUniqueWithoutBranchInput | workHoursUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: workHoursCreateManyBranchInputEnvelope
    set?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    disconnect?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    delete?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    connect?: workHoursWhereUniqueInput | workHoursWhereUniqueInput[]
    update?: workHoursUpdateWithWhereUniqueWithoutBranchInput | workHoursUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: workHoursUpdateManyWithWhereWithoutBranchInput | workHoursUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: workHoursScalarWhereInput | workHoursScalarWhereInput[]
  }

  export type branchesCreateNestedOneWithoutWorkHoursInput = {
    create?: XOR<branchesCreateWithoutWorkHoursInput, branchesUncheckedCreateWithoutWorkHoursInput>
    connectOrCreate?: branchesCreateOrConnectWithoutWorkHoursInput
    connect?: branchesWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type branchesUpdateOneRequiredWithoutWorkHoursNestedInput = {
    create?: XOR<branchesCreateWithoutWorkHoursInput, branchesUncheckedCreateWithoutWorkHoursInput>
    connectOrCreate?: branchesCreateOrConnectWithoutWorkHoursInput
    upsert?: branchesUpsertWithoutWorkHoursInput
    connect?: branchesWhereUniqueInput
    update?: XOR<XOR<branchesUpdateToOneWithWhereWithoutWorkHoursInput, branchesUpdateWithoutWorkHoursInput>, branchesUncheckedUpdateWithoutWorkHoursInput>
  }

  export type socialLinksCreateNestedOneWithoutStoreInput = {
    create?: XOR<socialLinksCreateWithoutStoreInput, socialLinksUncheckedCreateWithoutStoreInput>
    connectOrCreate?: socialLinksCreateOrConnectWithoutStoreInput
    connect?: socialLinksWhereUniqueInput
  }

  export type branchesCreateNestedManyWithoutStoreInput = {
    create?: XOR<branchesCreateWithoutStoreInput, branchesUncheckedCreateWithoutStoreInput> | branchesCreateWithoutStoreInput[] | branchesUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutStoreInput | branchesCreateOrConnectWithoutStoreInput[]
    createMany?: branchesCreateManyStoreInputEnvelope
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
  }

  export type transactionCreateNestedManyWithoutStoreInput = {
    create?: XOR<transactionCreateWithoutStoreInput, transactionUncheckedCreateWithoutStoreInput> | transactionCreateWithoutStoreInput[] | transactionUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutStoreInput | transactionCreateOrConnectWithoutStoreInput[]
    createMany?: transactionCreateManyStoreInputEnvelope
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
  }

  export type branchesUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<branchesCreateWithoutStoreInput, branchesUncheckedCreateWithoutStoreInput> | branchesCreateWithoutStoreInput[] | branchesUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutStoreInput | branchesCreateOrConnectWithoutStoreInput[]
    createMany?: branchesCreateManyStoreInputEnvelope
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
  }

  export type transactionUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<transactionCreateWithoutStoreInput, transactionUncheckedCreateWithoutStoreInput> | transactionCreateWithoutStoreInput[] | transactionUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutStoreInput | transactionCreateOrConnectWithoutStoreInput[]
    createMany?: transactionCreateManyStoreInputEnvelope
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
  }

  export type socialLinksUpdateOneRequiredWithoutStoreNestedInput = {
    create?: XOR<socialLinksCreateWithoutStoreInput, socialLinksUncheckedCreateWithoutStoreInput>
    connectOrCreate?: socialLinksCreateOrConnectWithoutStoreInput
    upsert?: socialLinksUpsertWithoutStoreInput
    connect?: socialLinksWhereUniqueInput
    update?: XOR<XOR<socialLinksUpdateToOneWithWhereWithoutStoreInput, socialLinksUpdateWithoutStoreInput>, socialLinksUncheckedUpdateWithoutStoreInput>
  }

  export type branchesUpdateManyWithoutStoreNestedInput = {
    create?: XOR<branchesCreateWithoutStoreInput, branchesUncheckedCreateWithoutStoreInput> | branchesCreateWithoutStoreInput[] | branchesUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutStoreInput | branchesCreateOrConnectWithoutStoreInput[]
    upsert?: branchesUpsertWithWhereUniqueWithoutStoreInput | branchesUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: branchesCreateManyStoreInputEnvelope
    set?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    disconnect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    delete?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    update?: branchesUpdateWithWhereUniqueWithoutStoreInput | branchesUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: branchesUpdateManyWithWhereWithoutStoreInput | branchesUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: branchesScalarWhereInput | branchesScalarWhereInput[]
  }

  export type transactionUpdateManyWithoutStoreNestedInput = {
    create?: XOR<transactionCreateWithoutStoreInput, transactionUncheckedCreateWithoutStoreInput> | transactionCreateWithoutStoreInput[] | transactionUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutStoreInput | transactionCreateOrConnectWithoutStoreInput[]
    upsert?: transactionUpsertWithWhereUniqueWithoutStoreInput | transactionUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: transactionCreateManyStoreInputEnvelope
    set?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    disconnect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    delete?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    update?: transactionUpdateWithWhereUniqueWithoutStoreInput | transactionUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: transactionUpdateManyWithWhereWithoutStoreInput | transactionUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: transactionScalarWhereInput | transactionScalarWhereInput[]
  }

  export type branchesUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<branchesCreateWithoutStoreInput, branchesUncheckedCreateWithoutStoreInput> | branchesCreateWithoutStoreInput[] | branchesUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: branchesCreateOrConnectWithoutStoreInput | branchesCreateOrConnectWithoutStoreInput[]
    upsert?: branchesUpsertWithWhereUniqueWithoutStoreInput | branchesUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: branchesCreateManyStoreInputEnvelope
    set?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    disconnect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    delete?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    connect?: branchesWhereUniqueInput | branchesWhereUniqueInput[]
    update?: branchesUpdateWithWhereUniqueWithoutStoreInput | branchesUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: branchesUpdateManyWithWhereWithoutStoreInput | branchesUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: branchesScalarWhereInput | branchesScalarWhereInput[]
  }

  export type transactionUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<transactionCreateWithoutStoreInput, transactionUncheckedCreateWithoutStoreInput> | transactionCreateWithoutStoreInput[] | transactionUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: transactionCreateOrConnectWithoutStoreInput | transactionCreateOrConnectWithoutStoreInput[]
    upsert?: transactionUpsertWithWhereUniqueWithoutStoreInput | transactionUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: transactionCreateManyStoreInputEnvelope
    set?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    disconnect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    delete?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    connect?: transactionWhereUniqueInput | transactionWhereUniqueInput[]
    update?: transactionUpdateWithWhereUniqueWithoutStoreInput | transactionUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: transactionUpdateManyWithWhereWithoutStoreInput | transactionUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: transactionScalarWhereInput | transactionScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutTransactionInput = {
    create?: XOR<userCreateWithoutTransactionInput, userUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: userCreateOrConnectWithoutTransactionInput
    connect?: userWhereUniqueInput
  }

  export type storeCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<storeCreateWithoutTransactionsInput, storeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: storeCreateOrConnectWithoutTransactionsInput
    connect?: storeWhereUniqueInput
  }

  export type userUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<userCreateWithoutTransactionInput, userUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: userCreateOrConnectWithoutTransactionInput
    upsert?: userUpsertWithoutTransactionInput
    disconnect?: userWhereInput | boolean
    delete?: userWhereInput | boolean
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutTransactionInput, userUpdateWithoutTransactionInput>, userUncheckedUpdateWithoutTransactionInput>
  }

  export type storeUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<storeCreateWithoutTransactionsInput, storeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: storeCreateOrConnectWithoutTransactionsInput
    upsert?: storeUpsertWithoutTransactionsInput
    disconnect?: storeWhereInput | boolean
    delete?: storeWhereInput | boolean
    connect?: storeWhereUniqueInput
    update?: XOR<XOR<storeUpdateToOneWithWhereWithoutTransactionsInput, storeUpdateWithoutTransactionsInput>, storeUncheckedUpdateWithoutTransactionsInput>
  }

  export type storeCreateNestedManyWithoutSocialLinksInput = {
    create?: XOR<storeCreateWithoutSocialLinksInput, storeUncheckedCreateWithoutSocialLinksInput> | storeCreateWithoutSocialLinksInput[] | storeUncheckedCreateWithoutSocialLinksInput[]
    connectOrCreate?: storeCreateOrConnectWithoutSocialLinksInput | storeCreateOrConnectWithoutSocialLinksInput[]
    createMany?: storeCreateManySocialLinksInputEnvelope
    connect?: storeWhereUniqueInput | storeWhereUniqueInput[]
  }

  export type storeUncheckedCreateNestedManyWithoutSocialLinksInput = {
    create?: XOR<storeCreateWithoutSocialLinksInput, storeUncheckedCreateWithoutSocialLinksInput> | storeCreateWithoutSocialLinksInput[] | storeUncheckedCreateWithoutSocialLinksInput[]
    connectOrCreate?: storeCreateOrConnectWithoutSocialLinksInput | storeCreateOrConnectWithoutSocialLinksInput[]
    createMany?: storeCreateManySocialLinksInputEnvelope
    connect?: storeWhereUniqueInput | storeWhereUniqueInput[]
  }

  export type storeUpdateManyWithoutSocialLinksNestedInput = {
    create?: XOR<storeCreateWithoutSocialLinksInput, storeUncheckedCreateWithoutSocialLinksInput> | storeCreateWithoutSocialLinksInput[] | storeUncheckedCreateWithoutSocialLinksInput[]
    connectOrCreate?: storeCreateOrConnectWithoutSocialLinksInput | storeCreateOrConnectWithoutSocialLinksInput[]
    upsert?: storeUpsertWithWhereUniqueWithoutSocialLinksInput | storeUpsertWithWhereUniqueWithoutSocialLinksInput[]
    createMany?: storeCreateManySocialLinksInputEnvelope
    set?: storeWhereUniqueInput | storeWhereUniqueInput[]
    disconnect?: storeWhereUniqueInput | storeWhereUniqueInput[]
    delete?: storeWhereUniqueInput | storeWhereUniqueInput[]
    connect?: storeWhereUniqueInput | storeWhereUniqueInput[]
    update?: storeUpdateWithWhereUniqueWithoutSocialLinksInput | storeUpdateWithWhereUniqueWithoutSocialLinksInput[]
    updateMany?: storeUpdateManyWithWhereWithoutSocialLinksInput | storeUpdateManyWithWhereWithoutSocialLinksInput[]
    deleteMany?: storeScalarWhereInput | storeScalarWhereInput[]
  }

  export type storeUncheckedUpdateManyWithoutSocialLinksNestedInput = {
    create?: XOR<storeCreateWithoutSocialLinksInput, storeUncheckedCreateWithoutSocialLinksInput> | storeCreateWithoutSocialLinksInput[] | storeUncheckedCreateWithoutSocialLinksInput[]
    connectOrCreate?: storeCreateOrConnectWithoutSocialLinksInput | storeCreateOrConnectWithoutSocialLinksInput[]
    upsert?: storeUpsertWithWhereUniqueWithoutSocialLinksInput | storeUpsertWithWhereUniqueWithoutSocialLinksInput[]
    createMany?: storeCreateManySocialLinksInputEnvelope
    set?: storeWhereUniqueInput | storeWhereUniqueInput[]
    disconnect?: storeWhereUniqueInput | storeWhereUniqueInput[]
    delete?: storeWhereUniqueInput | storeWhereUniqueInput[]
    connect?: storeWhereUniqueInput | storeWhereUniqueInput[]
    update?: storeUpdateWithWhereUniqueWithoutSocialLinksInput | storeUpdateWithWhereUniqueWithoutSocialLinksInput[]
    updateMany?: storeUpdateManyWithWhereWithoutSocialLinksInput | storeUpdateManyWithWhereWithoutSocialLinksInput[]
    deleteMany?: storeScalarWhereInput | storeScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type countryCreateWithoutUserInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: branchesCreateNestedManyWithoutCountryInput
  }

  export type countryUncheckedCreateWithoutUserInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: branchesUncheckedCreateNestedManyWithoutCountryInput
  }

  export type countryCreateOrConnectWithoutUserInput = {
    where: countryWhereUniqueInput
    create: XOR<countryCreateWithoutUserInput, countryUncheckedCreateWithoutUserInput>
  }

  export type transactionCreateWithoutUserInput = {
    id?: string
    type?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    store?: storeCreateNestedOneWithoutTransactionsInput
  }

  export type transactionUncheckedCreateWithoutUserInput = {
    id?: string
    type?: boolean
    storeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionCreateOrConnectWithoutUserInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutUserInput, transactionUncheckedCreateWithoutUserInput>
  }

  export type transactionCreateManyUserInputEnvelope = {
    data: transactionCreateManyUserInput | transactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type countryUpsertWithoutUserInput = {
    update: XOR<countryUpdateWithoutUserInput, countryUncheckedUpdateWithoutUserInput>
    create: XOR<countryCreateWithoutUserInput, countryUncheckedCreateWithoutUserInput>
    where?: countryWhereInput
  }

  export type countryUpdateToOneWithWhereWithoutUserInput = {
    where?: countryWhereInput
    data: XOR<countryUpdateWithoutUserInput, countryUncheckedUpdateWithoutUserInput>
  }

  export type countryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: branchesUpdateManyWithoutCountryNestedInput
  }

  export type countryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: branchesUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type transactionUpsertWithWhereUniqueWithoutUserInput = {
    where: transactionWhereUniqueInput
    update: XOR<transactionUpdateWithoutUserInput, transactionUncheckedUpdateWithoutUserInput>
    create: XOR<transactionCreateWithoutUserInput, transactionUncheckedCreateWithoutUserInput>
  }

  export type transactionUpdateWithWhereUniqueWithoutUserInput = {
    where: transactionWhereUniqueInput
    data: XOR<transactionUpdateWithoutUserInput, transactionUncheckedUpdateWithoutUserInput>
  }

  export type transactionUpdateManyWithWhereWithoutUserInput = {
    where: transactionScalarWhereInput
    data: XOR<transactionUpdateManyMutationInput, transactionUncheckedUpdateManyWithoutUserInput>
  }

  export type transactionScalarWhereInput = {
    AND?: transactionScalarWhereInput | transactionScalarWhereInput[]
    OR?: transactionScalarWhereInput[]
    NOT?: transactionScalarWhereInput | transactionScalarWhereInput[]
    id?: StringFilter<"transaction"> | string
    type?: BoolFilter<"transaction"> | boolean
    userId?: StringNullableFilter<"transaction"> | string | null
    storeId?: StringNullableFilter<"transaction"> | string | null
    createdAt?: DateTimeFilter<"transaction"> | Date | string
    updatedAt?: DateTimeFilter<"transaction"> | Date | string
  }

  export type userCreateWithoutUserCountryInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: transactionCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutUserCountryInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: transactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutUserCountryInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutUserCountryInput, userUncheckedCreateWithoutUserCountryInput>
  }

  export type userCreateManyUserCountryInputEnvelope = {
    data: userCreateManyUserCountryInput | userCreateManyUserCountryInput[]
    skipDuplicates?: boolean
  }

  export type branchesCreateWithoutCountryInput = {
    id?: string
    address: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    store: storeCreateNestedOneWithoutBranchesInput
    workHours?: workHoursCreateNestedManyWithoutBranchInput
  }

  export type branchesUncheckedCreateWithoutCountryInput = {
    id?: string
    storeId: string
    address: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workHours?: workHoursUncheckedCreateNestedManyWithoutBranchInput
  }

  export type branchesCreateOrConnectWithoutCountryInput = {
    where: branchesWhereUniqueInput
    create: XOR<branchesCreateWithoutCountryInput, branchesUncheckedCreateWithoutCountryInput>
  }

  export type branchesCreateManyCountryInputEnvelope = {
    data: branchesCreateManyCountryInput | branchesCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type userUpsertWithWhereUniqueWithoutUserCountryInput = {
    where: userWhereUniqueInput
    update: XOR<userUpdateWithoutUserCountryInput, userUncheckedUpdateWithoutUserCountryInput>
    create: XOR<userCreateWithoutUserCountryInput, userUncheckedCreateWithoutUserCountryInput>
  }

  export type userUpdateWithWhereUniqueWithoutUserCountryInput = {
    where: userWhereUniqueInput
    data: XOR<userUpdateWithoutUserCountryInput, userUncheckedUpdateWithoutUserCountryInput>
  }

  export type userUpdateManyWithWhereWithoutUserCountryInput = {
    where: userScalarWhereInput
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyWithoutUserCountryInput>
  }

  export type userScalarWhereInput = {
    AND?: userScalarWhereInput | userScalarWhereInput[]
    OR?: userScalarWhereInput[]
    NOT?: userScalarWhereInput | userScalarWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    dateOfBirth?: DateTimeNullableFilter<"user"> | Date | string | null
    gender?: StringNullableFilter<"user"> | string | null
    countryId?: StringFilter<"user"> | string
    phone?: StringFilter<"user"> | string
    email?: StringNullableFilter<"user"> | string | null
    password?: StringNullableFilter<"user"> | string | null
    role?: StringFilter<"user"> | string
    isVerified?: BoolFilter<"user"> | boolean
    refreshTokenSecret?: StringNullableFilter<"user"> | string | null
    accessTokenSecret?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
  }

  export type branchesUpsertWithWhereUniqueWithoutCountryInput = {
    where: branchesWhereUniqueInput
    update: XOR<branchesUpdateWithoutCountryInput, branchesUncheckedUpdateWithoutCountryInput>
    create: XOR<branchesCreateWithoutCountryInput, branchesUncheckedCreateWithoutCountryInput>
  }

  export type branchesUpdateWithWhereUniqueWithoutCountryInput = {
    where: branchesWhereUniqueInput
    data: XOR<branchesUpdateWithoutCountryInput, branchesUncheckedUpdateWithoutCountryInput>
  }

  export type branchesUpdateManyWithWhereWithoutCountryInput = {
    where: branchesScalarWhereInput
    data: XOR<branchesUpdateManyMutationInput, branchesUncheckedUpdateManyWithoutCountryInput>
  }

  export type branchesScalarWhereInput = {
    AND?: branchesScalarWhereInput | branchesScalarWhereInput[]
    OR?: branchesScalarWhereInput[]
    NOT?: branchesScalarWhereInput | branchesScalarWhereInput[]
    id?: StringFilter<"branches"> | string
    storeId?: StringFilter<"branches"> | string
    address?: StringFilter<"branches"> | string
    countryId?: StringFilter<"branches"> | string
    phone?: StringFilter<"branches"> | string
    isFreezed?: BoolFilter<"branches"> | boolean
    createdAt?: DateTimeFilter<"branches"> | Date | string
    updatedAt?: DateTimeFilter<"branches"> | Date | string
  }

  export type storeCreateWithoutBranchesInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialLinks: socialLinksCreateNestedOneWithoutStoreInput
    transactions?: transactionCreateNestedManyWithoutStoreInput
  }

  export type storeUncheckedCreateWithoutBranchesInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    socialLinksId: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: transactionUncheckedCreateNestedManyWithoutStoreInput
  }

  export type storeCreateOrConnectWithoutBranchesInput = {
    where: storeWhereUniqueInput
    create: XOR<storeCreateWithoutBranchesInput, storeUncheckedCreateWithoutBranchesInput>
  }

  export type countryCreateWithoutBranchesInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: userCreateNestedManyWithoutUserCountryInput
  }

  export type countryUncheckedCreateWithoutBranchesInput = {
    id?: string
    countryName: string
    currencyCode: string
    countryIsoCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: userUncheckedCreateNestedManyWithoutUserCountryInput
  }

  export type countryCreateOrConnectWithoutBranchesInput = {
    where: countryWhereUniqueInput
    create: XOR<countryCreateWithoutBranchesInput, countryUncheckedCreateWithoutBranchesInput>
  }

  export type workHoursCreateWithoutBranchInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    day: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type workHoursUncheckedCreateWithoutBranchInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    day: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type workHoursCreateOrConnectWithoutBranchInput = {
    where: workHoursWhereUniqueInput
    create: XOR<workHoursCreateWithoutBranchInput, workHoursUncheckedCreateWithoutBranchInput>
  }

  export type workHoursCreateManyBranchInputEnvelope = {
    data: workHoursCreateManyBranchInput | workHoursCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type storeUpsertWithoutBranchesInput = {
    update: XOR<storeUpdateWithoutBranchesInput, storeUncheckedUpdateWithoutBranchesInput>
    create: XOR<storeCreateWithoutBranchesInput, storeUncheckedCreateWithoutBranchesInput>
    where?: storeWhereInput
  }

  export type storeUpdateToOneWithWhereWithoutBranchesInput = {
    where?: storeWhereInput
    data: XOR<storeUpdateWithoutBranchesInput, storeUncheckedUpdateWithoutBranchesInput>
  }

  export type storeUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialLinks?: socialLinksUpdateOneRequiredWithoutStoreNestedInput
    transactions?: transactionUpdateManyWithoutStoreNestedInput
  }

  export type storeUncheckedUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    socialLinksId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: transactionUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type countryUpsertWithoutBranchesInput = {
    update: XOR<countryUpdateWithoutBranchesInput, countryUncheckedUpdateWithoutBranchesInput>
    create: XOR<countryCreateWithoutBranchesInput, countryUncheckedCreateWithoutBranchesInput>
    where?: countryWhereInput
  }

  export type countryUpdateToOneWithWhereWithoutBranchesInput = {
    where?: countryWhereInput
    data: XOR<countryUpdateWithoutBranchesInput, countryUncheckedUpdateWithoutBranchesInput>
  }

  export type countryUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateManyWithoutUserCountryNestedInput
  }

  export type countryUncheckedUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryName?: StringFieldUpdateOperationsInput | string
    currencyCode?: StringFieldUpdateOperationsInput | string
    countryIsoCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUncheckedUpdateManyWithoutUserCountryNestedInput
  }

  export type workHoursUpsertWithWhereUniqueWithoutBranchInput = {
    where: workHoursWhereUniqueInput
    update: XOR<workHoursUpdateWithoutBranchInput, workHoursUncheckedUpdateWithoutBranchInput>
    create: XOR<workHoursCreateWithoutBranchInput, workHoursUncheckedCreateWithoutBranchInput>
  }

  export type workHoursUpdateWithWhereUniqueWithoutBranchInput = {
    where: workHoursWhereUniqueInput
    data: XOR<workHoursUpdateWithoutBranchInput, workHoursUncheckedUpdateWithoutBranchInput>
  }

  export type workHoursUpdateManyWithWhereWithoutBranchInput = {
    where: workHoursScalarWhereInput
    data: XOR<workHoursUpdateManyMutationInput, workHoursUncheckedUpdateManyWithoutBranchInput>
  }

  export type workHoursScalarWhereInput = {
    AND?: workHoursScalarWhereInput | workHoursScalarWhereInput[]
    OR?: workHoursScalarWhereInput[]
    NOT?: workHoursScalarWhereInput | workHoursScalarWhereInput[]
    id?: StringFilter<"workHours"> | string
    branchId?: StringFilter<"workHours"> | string
    startTime?: DateTimeFilter<"workHours"> | Date | string
    endTime?: DateTimeFilter<"workHours"> | Date | string
    day?: IntFilter<"workHours"> | number
    createdAt?: DateTimeFilter<"workHours"> | Date | string
    updatedAt?: DateTimeFilter<"workHours"> | Date | string
  }

  export type branchesCreateWithoutWorkHoursInput = {
    id?: string
    address: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    store: storeCreateNestedOneWithoutBranchesInput
    country: countryCreateNestedOneWithoutBranchesInput
  }

  export type branchesUncheckedCreateWithoutWorkHoursInput = {
    id?: string
    storeId: string
    address: string
    countryId: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type branchesCreateOrConnectWithoutWorkHoursInput = {
    where: branchesWhereUniqueInput
    create: XOR<branchesCreateWithoutWorkHoursInput, branchesUncheckedCreateWithoutWorkHoursInput>
  }

  export type branchesUpsertWithoutWorkHoursInput = {
    update: XOR<branchesUpdateWithoutWorkHoursInput, branchesUncheckedUpdateWithoutWorkHoursInput>
    create: XOR<branchesCreateWithoutWorkHoursInput, branchesUncheckedCreateWithoutWorkHoursInput>
    where?: branchesWhereInput
  }

  export type branchesUpdateToOneWithWhereWithoutWorkHoursInput = {
    where?: branchesWhereInput
    data: XOR<branchesUpdateWithoutWorkHoursInput, branchesUncheckedUpdateWithoutWorkHoursInput>
  }

  export type branchesUpdateWithoutWorkHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: storeUpdateOneRequiredWithoutBranchesNestedInput
    country?: countryUpdateOneRequiredWithoutBranchesNestedInput
  }

  export type branchesUncheckedUpdateWithoutWorkHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type socialLinksCreateWithoutStoreInput = {
    id?: string
    tiktok?: string | null
    youtube?: string | null
    facebook?: string | null
    x?: string | null
    instagram?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type socialLinksUncheckedCreateWithoutStoreInput = {
    id?: string
    tiktok?: string | null
    youtube?: string | null
    facebook?: string | null
    x?: string | null
    instagram?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type socialLinksCreateOrConnectWithoutStoreInput = {
    where: socialLinksWhereUniqueInput
    create: XOR<socialLinksCreateWithoutStoreInput, socialLinksUncheckedCreateWithoutStoreInput>
  }

  export type branchesCreateWithoutStoreInput = {
    id?: string
    address: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    country: countryCreateNestedOneWithoutBranchesInput
    workHours?: workHoursCreateNestedManyWithoutBranchInput
  }

  export type branchesUncheckedCreateWithoutStoreInput = {
    id?: string
    address: string
    countryId: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    workHours?: workHoursUncheckedCreateNestedManyWithoutBranchInput
  }

  export type branchesCreateOrConnectWithoutStoreInput = {
    where: branchesWhereUniqueInput
    create: XOR<branchesCreateWithoutStoreInput, branchesUncheckedCreateWithoutStoreInput>
  }

  export type branchesCreateManyStoreInputEnvelope = {
    data: branchesCreateManyStoreInput | branchesCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type transactionCreateWithoutStoreInput = {
    id?: string
    type?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: userCreateNestedOneWithoutTransactionInput
  }

  export type transactionUncheckedCreateWithoutStoreInput = {
    id?: string
    type?: boolean
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionCreateOrConnectWithoutStoreInput = {
    where: transactionWhereUniqueInput
    create: XOR<transactionCreateWithoutStoreInput, transactionUncheckedCreateWithoutStoreInput>
  }

  export type transactionCreateManyStoreInputEnvelope = {
    data: transactionCreateManyStoreInput | transactionCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type socialLinksUpsertWithoutStoreInput = {
    update: XOR<socialLinksUpdateWithoutStoreInput, socialLinksUncheckedUpdateWithoutStoreInput>
    create: XOR<socialLinksCreateWithoutStoreInput, socialLinksUncheckedCreateWithoutStoreInput>
    where?: socialLinksWhereInput
  }

  export type socialLinksUpdateToOneWithWhereWithoutStoreInput = {
    where?: socialLinksWhereInput
    data: XOR<socialLinksUpdateWithoutStoreInput, socialLinksUncheckedUpdateWithoutStoreInput>
  }

  export type socialLinksUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    x?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type socialLinksUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    tiktok?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    x?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type branchesUpsertWithWhereUniqueWithoutStoreInput = {
    where: branchesWhereUniqueInput
    update: XOR<branchesUpdateWithoutStoreInput, branchesUncheckedUpdateWithoutStoreInput>
    create: XOR<branchesCreateWithoutStoreInput, branchesUncheckedCreateWithoutStoreInput>
  }

  export type branchesUpdateWithWhereUniqueWithoutStoreInput = {
    where: branchesWhereUniqueInput
    data: XOR<branchesUpdateWithoutStoreInput, branchesUncheckedUpdateWithoutStoreInput>
  }

  export type branchesUpdateManyWithWhereWithoutStoreInput = {
    where: branchesScalarWhereInput
    data: XOR<branchesUpdateManyMutationInput, branchesUncheckedUpdateManyWithoutStoreInput>
  }

  export type transactionUpsertWithWhereUniqueWithoutStoreInput = {
    where: transactionWhereUniqueInput
    update: XOR<transactionUpdateWithoutStoreInput, transactionUncheckedUpdateWithoutStoreInput>
    create: XOR<transactionCreateWithoutStoreInput, transactionUncheckedCreateWithoutStoreInput>
  }

  export type transactionUpdateWithWhereUniqueWithoutStoreInput = {
    where: transactionWhereUniqueInput
    data: XOR<transactionUpdateWithoutStoreInput, transactionUncheckedUpdateWithoutStoreInput>
  }

  export type transactionUpdateManyWithWhereWithoutStoreInput = {
    where: transactionScalarWhereInput
    data: XOR<transactionUpdateManyMutationInput, transactionUncheckedUpdateManyWithoutStoreInput>
  }

  export type userCreateWithoutTransactionInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userCountry: countryCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateWithoutTransactionInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    countryId: string
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userCreateOrConnectWithoutTransactionInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutTransactionInput, userUncheckedCreateWithoutTransactionInput>
  }

  export type storeCreateWithoutTransactionsInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialLinks: socialLinksCreateNestedOneWithoutStoreInput
    branches?: branchesCreateNestedManyWithoutStoreInput
  }

  export type storeUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    socialLinksId: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: branchesUncheckedCreateNestedManyWithoutStoreInput
  }

  export type storeCreateOrConnectWithoutTransactionsInput = {
    where: storeWhereUniqueInput
    create: XOR<storeCreateWithoutTransactionsInput, storeUncheckedCreateWithoutTransactionsInput>
  }

  export type userUpsertWithoutTransactionInput = {
    update: XOR<userUpdateWithoutTransactionInput, userUncheckedUpdateWithoutTransactionInput>
    create: XOR<userCreateWithoutTransactionInput, userUncheckedCreateWithoutTransactionInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutTransactionInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutTransactionInput, userUncheckedUpdateWithoutTransactionInput>
  }

  export type userUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userCountry?: countryUpdateOneRequiredWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type storeUpsertWithoutTransactionsInput = {
    update: XOR<storeUpdateWithoutTransactionsInput, storeUncheckedUpdateWithoutTransactionsInput>
    create: XOR<storeCreateWithoutTransactionsInput, storeUncheckedCreateWithoutTransactionsInput>
    where?: storeWhereInput
  }

  export type storeUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: storeWhereInput
    data: XOR<storeUpdateWithoutTransactionsInput, storeUncheckedUpdateWithoutTransactionsInput>
  }

  export type storeUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialLinks?: socialLinksUpdateOneRequiredWithoutStoreNestedInput
    branches?: branchesUpdateManyWithoutStoreNestedInput
  }

  export type storeUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    socialLinksId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: branchesUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type storeCreateWithoutSocialLinksInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: branchesCreateNestedManyWithoutStoreInput
    transactions?: transactionCreateNestedManyWithoutStoreInput
  }

  export type storeUncheckedCreateWithoutSocialLinksInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: branchesUncheckedCreateNestedManyWithoutStoreInput
    transactions?: transactionUncheckedCreateNestedManyWithoutStoreInput
  }

  export type storeCreateOrConnectWithoutSocialLinksInput = {
    where: storeWhereUniqueInput
    create: XOR<storeCreateWithoutSocialLinksInput, storeUncheckedCreateWithoutSocialLinksInput>
  }

  export type storeCreateManySocialLinksInputEnvelope = {
    data: storeCreateManySocialLinksInput | storeCreateManySocialLinksInput[]
    skipDuplicates?: boolean
  }

  export type storeUpsertWithWhereUniqueWithoutSocialLinksInput = {
    where: storeWhereUniqueInput
    update: XOR<storeUpdateWithoutSocialLinksInput, storeUncheckedUpdateWithoutSocialLinksInput>
    create: XOR<storeCreateWithoutSocialLinksInput, storeUncheckedCreateWithoutSocialLinksInput>
  }

  export type storeUpdateWithWhereUniqueWithoutSocialLinksInput = {
    where: storeWhereUniqueInput
    data: XOR<storeUpdateWithoutSocialLinksInput, storeUncheckedUpdateWithoutSocialLinksInput>
  }

  export type storeUpdateManyWithWhereWithoutSocialLinksInput = {
    where: storeScalarWhereInput
    data: XOR<storeUpdateManyMutationInput, storeUncheckedUpdateManyWithoutSocialLinksInput>
  }

  export type storeScalarWhereInput = {
    AND?: storeScalarWhereInput | storeScalarWhereInput[]
    OR?: storeScalarWhereInput[]
    NOT?: storeScalarWhereInput | storeScalarWhereInput[]
    id?: StringFilter<"store"> | string
    name?: StringFilter<"store"> | string
    bio?: StringFilter<"store"> | string
    logo?: StringFilter<"store"> | string
    banner?: StringFilter<"store"> | string
    phone?: StringFilter<"store"> | string
    email?: StringFilter<"store"> | string
    password?: StringFilter<"store"> | string
    socialLinksId?: StringFilter<"store"> | string
    paymentId?: StringNullableFilter<"store"> | string | null
    refreshTokenSecret?: StringNullableFilter<"store"> | string | null
    accessTokenSecret?: StringNullableFilter<"store"> | string | null
    type?: StringFilter<"store"> | string
    isApprovedByAdmin?: BoolFilter<"store"> | boolean
    isFreezed?: BoolFilter<"store"> | boolean
    isBanned?: BoolFilter<"store"> | boolean
    isDeleted?: BoolFilter<"store"> | boolean
    createdAt?: DateTimeFilter<"store"> | Date | string
    updatedAt?: DateTimeFilter<"store"> | Date | string
  }

  export type transactionCreateManyUserInput = {
    id?: string
    type?: boolean
    storeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: storeUpdateOneWithoutTransactionsNestedInput
  }

  export type transactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    storeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    storeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateManyUserCountryInput = {
    id?: string
    name: string
    dateOfBirth?: Date | string | null
    gender?: string | null
    phone: string
    email?: string | null
    password?: string | null
    role?: string
    isVerified?: boolean
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type branchesCreateManyCountryInput = {
    id?: string
    storeId: string
    address: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type userUpdateWithoutUserCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: transactionUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutUserCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: transactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateManyWithoutUserCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type branchesUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: storeUpdateOneRequiredWithoutBranchesNestedInput
    workHours?: workHoursUpdateManyWithoutBranchNestedInput
  }

  export type branchesUncheckedUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workHours?: workHoursUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type branchesUncheckedUpdateManyWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workHoursCreateManyBranchInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    day: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type workHoursUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workHoursUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workHoursUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type branchesCreateManyStoreInput = {
    id?: string
    address: string
    countryId: string
    phone: string
    isFreezed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionCreateManyStoreInput = {
    id?: string
    type?: boolean
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type branchesUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: countryUpdateOneRequiredWithoutBranchesNestedInput
    workHours?: workHoursUpdateManyWithoutBranchNestedInput
  }

  export type branchesUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workHours?: workHoursUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type branchesUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneWithoutTransactionNestedInput
  }

  export type transactionUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type storeCreateManySocialLinksInput = {
    id?: string
    name: string
    bio: string
    logo: string
    banner: string
    phone: string
    email: string
    password: string
    paymentId?: string | null
    refreshTokenSecret?: string | null
    accessTokenSecret?: string | null
    type?: string
    isApprovedByAdmin?: boolean
    isFreezed?: boolean
    isBanned?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type storeUpdateWithoutSocialLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: branchesUpdateManyWithoutStoreNestedInput
    transactions?: transactionUpdateManyWithoutStoreNestedInput
  }

  export type storeUncheckedUpdateWithoutSocialLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: branchesUncheckedUpdateManyWithoutStoreNestedInput
    transactions?: transactionUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type storeUncheckedUpdateManyWithoutSocialLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    logo?: StringFieldUpdateOperationsInput | string
    banner?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isApprovedByAdmin?: BoolFieldUpdateOperationsInput | boolean
    isFreezed?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}