define(['../accUtils',
    "text!../data/orders.json", "knockout",
    "ojs/ojmodulerouter-adapter", "ojs/ojarraydataprovider",
    "dnd/DemoDataTransfer", "text!../data/dummy.json", "ojs/ojlistviewdnd", "ojs/ojavatar", "ojs/ojlistitemlayout", "ojs/ojmenu",
    "ojs/ojlistviewdnd", "ojs/ojavatar", "ojs/ojlistitemlayout", "ojs/ojmenu",
    "ojs/ojknockout", "ojs/ojlistview", "ojs/ojmodule-element"
],
    function (accUtils, records, ko, ModuleRouterAdapter, ArrayDataProvider, DemoDataTransfer_1, DummyJSON) {
        function OrdersViewModel(args) {

            this.sourceData = ko.observableArray(JSON.parse(DummyJSON));

            this.targetData = [];
            this.sourceArr = ko.observableArray(this.sourceData());
            this.sourceDataProvider = new ArrayDataProvider(this.sourceArr, {
                keyAttributes: 'id'
            });
            this.targetArr = ko.observableArray(this.targetData);
            this.targetDataProvider = new ArrayDataProvider(this.targetArr, {
                keyAttributes: 'id'
            });

            this.clipboard = new DemoDataTransfer_1.DemoDataTransfer();
            this.cutItem = ko.observable();
            this.handleDrop = (event, context) => {
                event.preventDefault();
                let index = -1;
                if (context.item) {
                    const itemContext = document.getElementById('target').getContextByNode(context.item);
                    index = itemContext.index;
                    if (context.position === 'after') {
                        index += 1;
                    }
                }
                this._handleDataTransfer(event.dataTransfer, index);
            };
            this.handleDragStart = (event) => {
                const dataStr = event.dataTransfer.getData('application/ojlistviewitems+json');
                const data = JSON.parse(dataStr);
                this.dragItemId = data[0].id;
            };
            this.handleDragEnd = (event) => {
                if (event.dataTransfer.dropEffect !== 'none') {
                    this._removeSourceItem(this.dragItemId);
                }
            };
            this._handleDataTransfer = (dataTransfer, index) => {
                const dataStr = dataTransfer.getData('application/ojlistviewitems+json');
                const data = JSON.parse(dataStr)[0];
                this._insertTargetItem(data, index);
            };
            this._removeSourceItem = (itemId) => {
                const arr = this.sourceArr();
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].id === itemId) {
                        arr.splice(j, 1)[0];
                        break;
                    }
                }
                this.sourceArr.valueHasMutated();
            };
            this._insertTargetItem = (data, index) => {
                const arr = this.targetArr();
                if (index === -1) {
                    arr.push(data);
                }
                else {
                    arr.splice(index, 0, data);
                }
                this.targetArr.valueHasMutated();
            };
            this.handleMenuCut = (event) => {
                this._cutCurrentItem();
            };
            this.handleKeyCut = (event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
                    this._cutCurrentItem();
                }
            };
            this._cutCurrentItem = () => {
                const listView = document.getElementById('source');
                const currentItem = listView.currentItem;
                const data = listView.getDataForVisibleItem({ key: currentItem });
                const jsonStr = JSON.stringify([data]);
                this.clipboard.setData('application/ojlistviewitems+json', jsonStr);
                this.cutItem(currentItem);
            };
            this.handleMenuPaste = (event) => {
                this._paste();
            };
            this.handleKeyPaste = (event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
                    this._paste();
                }
            };
            this._paste = () => {
                const listView = document.getElementById('target');
                const currentItem = listView.currentItem;
                const index = this._findIndex(this.targetData, currentItem);
                this._handleDataTransfer(this.clipboard, index + 1);
                this._removeSourceItem(this.cutItem());
                this.cutItem(null);
            };
            this._findIndex = (arr, key) => {
                const keys = arr.map((data) => {
                    return data.id;
                });
                return keys.indexOf(key);
            };






            this.orderData = JSON.parse(records).orders;
            this.dataProvider = new ArrayDataProvider(this.orderData);
            this.record = ko.observable();
            this.selection = ko.pureComputed({
                read: () => {
                    const selected = [];
                    const record = this.record();
                    if (record) {
                        const index = this.orderData.indexOf(record);
                        selected.push(index);
                    }
                    return selected;
                },
                write: (selected) => {
                    this.router.go({ path: 'details', params: { index: selected[0] } });
                }
            });
            this.args = args;
            this.router = this.args.parentRouter.createChildRouter([
                { path: 'details/{index}' },
                { path: '', redirect: 'details' }
            ]);
            this.router.currentState.subscribe((args) => {
                const state = args.state;
                if (state) {
                    this.record(this.orderData[state.params.index]);
                }
            });
            this.module = new ModuleRouterAdapter(this.router, {
                viewPath: 'views/',
                viewModelPath: 'viewModels/'
            });

            this.connected = () => {
                accUtils.announce('Customers page loaded.', 'assertive');
                document.title = "Customers";
            };
            this.disconnected = () => {
            };

            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            this.transitionCompleted = () => {
            };
        }
        return OrdersViewModel;
    });