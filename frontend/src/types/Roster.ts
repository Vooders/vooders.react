export type Selection = {
  readonly meta: Meta,
  readonly rules: Rule[],
  readonly profiles: {
    readonly [key: string]: Profile[]
  },
  readonly selections: Selection[],
  readonly costs: Characteristic[],
  readonly categories: Categories
}

export type Meta = {
  readonly name: string,
  readonly number?: string,
  readonly type?: string,
  readonly catalogueName?: string
}

export type Profile = {
  readonly meta: Meta,
  readonly characteristics: Characteristic[]
}

export type Characteristic = {
  readonly name: string,
  readonly value: string
}

export type Categories = {
  readonly primary: string[],
  readonly faction: string[],
  readonly others: string[]
}

export type Keyword = {
  readonly name: string,
  readonly primary: string
}

export type Rule = {
  readonly name: string,
  readonly description: string
}

export type Detachment = {
  readonly meta: Meta,
  readonly units: Selection[],
  readonly abilities?: Profile[]
}
