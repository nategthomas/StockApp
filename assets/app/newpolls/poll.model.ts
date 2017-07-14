export class Poll {
  constructor(
          public title: string,
          public options: Array<string>,
          public user: string,
          public pollid: string,
          public votes?: Array<number>
  ) {}

}
