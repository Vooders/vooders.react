export type Selection = {
  meta: Meta,
  rules: Rule[],
  profiles: {
    [key: string]: Profile[]
  },
  selections: Selection[],
  costs: Characteristic[],
  categories: Categories
}

export type Meta = {
  name: string,
  number?: string,
  type?: string,
  catalogueName?: string
}

export type Profile = {
  meta: Meta,
  characteristics: Characteristic[]
}

export type Characteristic = {
  name: string,
  value: string
}

export type Categories = {
  primary: string[],
  faction: string[],
  others: string[]
}

export type Keyword = {
  name: string,
  primary: string
}

export type Rule = {
  name: string,
  description: string
}

export type Detachment = {
  meta: Meta,
  units: Selection[]
}
