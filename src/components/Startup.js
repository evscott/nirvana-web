import { useEffect } from "react";
import { connect } from "react-redux";
import { getInventory } from "../redux/actions/inventoryActions";

function Startup(props) {
    // On startup, perform the following actions
    useEffect(() => {
        props.getInventory();
    });
    return props.children;
}

export default connect(null, { getInventory})(Startup);