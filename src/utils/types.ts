type User = {
  name: string;
  id: string;
  employeeCode?: string;
  extraInfo: any;
  readonly orgCode: 'ABC';
};

type UserFunction = (id: string) => User;
const createUser: UserFunction = (id: string) => {
  return { name: 'aaa', id: '112112', extraInfo: '', orgCode: 'ABC' };
};
let numbers: number[];
let strings: string[];
function printArray<T>(item: T[]): void {
  console.log(item);
}
