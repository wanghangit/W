export class Store{
  constructor(options){
    this._commiting = false
    this._modules = new ModuleCollection(options)
    installModule(this, state, [], this._modules.root)
    resetStoreVM(this, state)
  }
}