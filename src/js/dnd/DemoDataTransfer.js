define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DemoDataTransfer = void 0;
    /**
     * A DataTransfer-like object.  Used in demos to support browsers that do not expose
     * the DataTransfer constructor (Safari < 14.1)
     */
    class DemoDataTransfer {
        constructor() {
            this.dataMap = new Map();
        }
        setData(type, data) {
            this.dataMap.set(type, data);
        }
        getData(type) {
            return this.dataMap.get(type);
        }
        clearData() {
            this.dataMap.clear();
        }
    }
    exports.DemoDataTransfer = DemoDataTransfer;
});