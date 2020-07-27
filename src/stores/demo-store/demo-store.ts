import { observable, action } from 'mobx';

export default class DemoStore {

  /**
   * 可控对象描述
   *
   * @type {number}
   * @memberof DemoStore
   */
  @observable
  public zhangjiesheight: number = 100;

  /**
   * 方法描述
   *
   * @memberof DemoStore
   */
  @action
  public setzhangjiesshengao = (age: number) => {
    this.zhangjiesheight = age;
  }
}