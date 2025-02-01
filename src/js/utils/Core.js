define([],
    function() {
        class CoreUtils {

            constructor() {
                if(!CoreUtils.instance) {
                    this.counter = 0;
                    CoreUtils.instance = this;
                }
                return CoreUtils.instance;
            }

            generateUniqueId() {
                return `uid-${this.counter++}`;
            }
        }

        const instance = new CoreUtils();
        return instance;
    }
)