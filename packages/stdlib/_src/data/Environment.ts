import type { Option } from "@tsplus/stdlib/data/Option";
import type { OrElse, UnionToIntersection } from "@tsplus/stdlib/utilities/Types";

export const WithSymbol: unique symbol = Symbol();
export type WithSymbol = typeof WithSymbol;

/**
 * @tsplus type Has
 */
export interface Has<Service> {
  [WithSymbol](): Service;
}

export interface ServiceOf<T> {
  (service: T): Service.Has<T>;
}

export interface ServiceAccess<T> {
  readonly get: <R extends Service.Has<T>>(environment: R) => T;
  readonly in: <R>(environment: R) => environment is R & Service.Has<T>;
}

/**
 * @tspus type Service
 */
export interface Service<T> extends ServiceOf<T>, ServiceAccess<T> {}

/**
 * @tspus type Service/Ops
 */
export interface ServiceOps {
  <T>(key: PropertyKey): Service<T>;
}

export const Service: ServiceOps = <T>(key: PropertyKey): Service<T> => {
  const of: ServiceOf<T> = (r: T) => ({ [key]: r } as any as Service.Has<T>);
  const access: ServiceAccess<T> = {
    get: (r) => r[key],
    in: (environment): environment is any =>
      typeof environment === "object" && environment != null && key in environment
  };
  return Object.assign(of, access);
};

export interface Extractor<A> {
  Option: [A] extends [Option<infer X>] ? X : never;
}

type HasInternal<A> = Has<A>;

export declare namespace Service {
  export type From<A> = OrElse<Extractor<A>[keyof Extractor<A>], A>;
  export type All<Services extends unknown[]> = UnionToIntersection<
    {
      [k in keyof Services]: Services[k] extends Has<any> ? Services[k] : Has<Services[k]>;
    }[number]
  >;
  export type Has<A> = HasInternal<A>;
}

/**
 * @tsplus operator Has &
 * @tsplus fluent Has merge
 */
export function merge<A extends Service.Has<any>, B extends Service.Has<any>>(self: A, that: B): A & B {
  return { ...self, ...that };
}
