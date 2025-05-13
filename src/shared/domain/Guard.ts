export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefined(
    args: any = {},
    requiredArgs: string[],
  ): IGuardResult {
    if (Object.keys(args).length === 0)
      throw new Error('there are no arguments to check');

    for (const key of requiredArgs) {
      if (!(key in args)) {
        return { succeeded: false, message: `${key} is required` };
      }
      if (args[key] === undefined || args[key] === null) {
        return { succeeded: false, message: `${key} is null or undefined` };
      }
    }

    return { succeeded: true };
  }
}
