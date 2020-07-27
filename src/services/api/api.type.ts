enum ETypes {
  teacher = 1,
  enginer,
  xxx,
  yyy,
  zzz,
}

export interface ITestServiceRes {
  /** 姓名  */
  name: string;
  /** 年龄  */
  age?: number;
  /** 性别 1 男 2 女  */
  sex: 1 | 2;
  /** 职业  */
  job: ETypes;
}
