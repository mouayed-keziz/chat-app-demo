
import { addMessage } from "../actions/messages_action";
export default function Debugging() {
    return (
        <div className="login">
            <button onClick={() => {
                addMessage("keziz mouayed World", "111", "333");
            }}>add message</button>
        </div>
    );
}