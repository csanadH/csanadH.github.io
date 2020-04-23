let textArea;
let okButton;

function getData() {
    return JSON.parse(textArea.value);
};

document.addEventListener('DOMContentLoaded', (event) => {
    textArea = document.getElementById('textarea');
    textArea.addEventListener('keyup', onTextChanged);
    okButton = document.getElementById('ok-button');
    okButton.addEventListener('click', createTree);
    document.getElementById('example-button').addEventListener('click', addExample);
    document.getElementById('clear-button').addEventListener('click', () => { textArea.value = ''; textArea.dispatchEvent(new Event('keyup')); });
});

function onTextChanged() {
    if (textArea.value && textArea.value != '' && isJsonString(textArea.value)) {
        okButton.disabled = false;
    } else {
        okButton.disabled = true;
    }
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function createTree() {
    var data = getData();
    
    var treePlugin = new d3.mitchTree.boxedTree()
        .setData(data)
        .setAllowFocus(true)
        .setAllowZoom(false)
        .setAllowPan(true)
        .setAllowNodeCentering(true)
        .setElement(document.getElementById("visualization"))
        .setIdAccessor(function(data) {
            return data.id;
        })
        .setChildrenAccessor(function(data) {
            return data.children;
        })
        .setBodyDisplayTextAccessor(function(data) {
            return data.description;
        })
        .setTitleDisplayTextAccessor(function(data) {
            return data.name;
        })
        .on("nodeClick", function(event) {
            event.preventDefault()
        })
        .getNodeSettings()
					.setSizingMode('nodesize')
					.setVerticalSpacing(25)				
					.setHorizontalSpacing(100)
					.back()
        .initialize();
        
    treePlugin.getZoomListener().scaleTo(treePlugin.getSvg(), 0.2);
    treePlugin.getZoomListener().translateTo(treePlugin.getSvg(), treePlugin.getWidthWithoutMargins(), treePlugin.getHeightWithoutMargins() / 2);

    var nodes = treePlugin.getNodes();
    nodes.forEach(function(node, index, arr) {
        treePlugin.expand(node);
    });
    treePlugin.update(treePlugin.getRoot());

    document.getElementById('input').remove();
    document.getElementById('visualization').setAttribute('style', 'width: 100%; border: 0px');
    document.getElementById('visualization').children[0].setAttribute('viewBox', '0 0 1200 1200');
}

function addExample() {
    textArea.value = "\{\n" +
        "\t\"name\": \"BRANDS\",\n" +
        "\t\"description\": \"Verajohn JP, Intercasino JP\",\n" +
        "\t\"children\": [\n" +
            "\t\t\{\n" +
                "\t\t\t\"name\": \"PLATFORM\"\,\n" +
                "\t\t\t\"description\": \"RIDGE\"\,\n" +
                "\t\t\t\"children\"\: [\n" +
                    "\t\t\t\t\{\n" +
                        "\t\t\t\t\t\"name\": \"DATA CENTER\"\,\n" +
                        "\t\t\t\t\t\"description\": \"Taiwan 1\",\n" +
                        "\t\t\t\t\t\"children\"\: [\n" +
                            "\t\t\t\t\t\t\{\n" +
                                "\t\t\t\t\t\t\t\"name\": \"PROVIDER\",\n" +
                                "\t\t\t\t\t\t\t\"description\": \"RELAX RGS\",\n" +
                                "\t\t\t\t\t\t\t\"children\": [\n" +
                                "\t\t\t\t\t\t\t\t\{\n" +
                                    "\t\t\t\t\t\t\t\t\t\"name\": \"SUBPROVIDER\",\n" +
                                    "\t\t\t\t\t\t\t\t\t\"description\": \"Bigtime Gaming\"\n" +
                                "\t\t\t\t\t\t\t\t\},\n" +
                                "\t\t\t\t\t\t\t\t\{\n" +
                                    "\t\t\t\t\t\t\t\t\t\"name\": \"SUBPROVIDER\",\n" +
                                    "\t\t\t\t\t\t\t\t\t\"description\": \"Push Gaming\"\n" +
                                "\t\t\t\t\t\t\t\t\}\n" +
                            "\t\t\t\t\t\t\t]\n" +
                        "\t\t\t\t\t\t},\n" +
                        "\t\t\t\t\t\t{\n" +
                            "\t\t\t\t\t\t\t\"name\": \"PROVIDER\",\n" +
                            "\t\t\t\t\t\t\t\"description\": \"Thunderkick\",\n" +
                            "\t\t\t\t\t\t\t\"children\": [\n" +
                                "\t\t\t\t\t\t\t\t{\n" +
                                    "\t\t\t\t\t\t\t\t\t\"name\": \"SUBPROVIDER\",\n" +
                                    "\t\t\t\t\t\t\t\t\t\"description\": \"Thunderkick\"\n" +
                                "\t\t\t\t\t\t\t\t}\n" +
                            "\t\t\t\t\t\t\t]\n" +
                        "\t\t\t\t\t\t}\n" +
                    "\t\t\t\t\t]\n" +
                "\t\t\t\t}\n" +
            "\t\t\t]\n" +
        "\t\t}\n" +
    "\t]\n" +
    "}"
    textArea.dispatchEvent(new Event('keyup'));
}

/* Alternative Options Object Syntax, opposed to the Fluent Interface Above
    var options = {
        data: data,
        element: document.getElementById("visualisation"),
        getId: function (data) {
            return data.id;
        },
        getChildren: function (data) {
            return data.children;
        },
        getBodyDisplayText: function (data) {
            return data.description;
        },
        getTitleDisplayText: function (data) {
            return data.name;
        }
    };
    var treePlugin = new d3.MitchTree.BoxedTree(options).initialize();
*/